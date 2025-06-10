import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dummyjson.com";

const generateMockAnalytics = () => {
	const today = new Date();
	const monthlyData = [];
	const salesData = [];
	const categoryData = [];

	for (let i = 11; i >= 0; i--) {
		const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
		const month = date.toLocaleDateString("en-US", { month: "short" });

		monthlyData.push({
			month,
			revenue: Math.floor(Math.random() * 50000) + 30000,
			orders: Math.floor(Math.random() * 200) + 100,
			customers: Math.floor(Math.random() * 100) + 50,
		});
	}

	for (let i = 6; i >= 0; i--) {
		const date = new Date();
		date.setDate(date.getDate() - i);

		salesData.push({
			date: date.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
			sales: Math.floor(Math.random() * 5000) + 2000,
			profit: Math.floor(Math.random() * 2000) + 800,
		});
	}
	const categories = [
		"Pain Relief",
		"Antibiotics",
		"Cardiovascular",
		"Anti-inflammatory",
		"Diabetes",
	];
	const colors = ["#3B82F6", "#EF4444", "#F59E0B", "#10B981", "#8B5CF6"];

	categories.forEach((category, index) => {
		categoryData.push({
			name: category,
			value: Math.floor(Math.random() * 30) + 10,
			color: colors[index],
		});
	});

	return {
		monthlyData,
		salesData,
		categoryData,
		stats: {
			totalRevenue: 485000,
			totalOrders: 1847,
			totalCustomers: 892,
			conversionRate: 3.2,
		},
	};
};

export const fetchDashboardData = createAsyncThunk(
	"dashboard/fetchDashboardData",
	async (_, { rejectWithValue }) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const [usersResponse, productsResponse, cartsResponse] =
				await Promise.all([
					axios.get(`${API_URL}/users?limit=5`),
					axios.get(`${API_URL}/products?limit=10`),
					axios.get(`${API_URL}/carts?limit=10`),
				]);

			const mockAnalytics = generateMockAnalytics();

			return {
				...mockAnalytics,
				recentUsers: usersResponse.data.users,
				topProducts: productsResponse.data.products
					.slice(0, 5)
					.map((product) => ({
						id: product.id,
						name: product.title,
						sales: Math.floor(Math.random() * 200) + 50,
						revenue: Math.floor(
							product.price * (Math.random() * 200 + 50)
						),
						image: product.thumbnail,
					})),
				recentOrders: cartsResponse.data.carts
					.slice(0, 5)
					.map((cart) => ({
						id: cart.id,
						customer: `Customer ${cart.userId}`,
						amount: cart.total,
						status: [
							"completed",
							"pending",
							"shipped",
							"processing",
						][Math.floor(Math.random() * 4)],
						date: new Date(
							Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
						)
							.toISOString()
							.split("T")[0],
					})),
			};
		} catch (error) {
			return rejectWithValue("Failed to fetch dashboard data");
		}
	}
);

export const fetchRecentActivity = createAsyncThunk(
	"dashboard/fetchRecentActivity",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/posts?limit=10`);

			return response.data.posts.map((post) => ({
				id: post.id,
				type: [
					"user_signup",
					"order_placed",
					"product_added",
					"payment_received",
				][Math.floor(Math.random() * 4)],
				description: post.title,
				timestamp: new Date(
					Date.now() - Math.random() * 24 * 60 * 60 * 1000
				).toISOString(),
				user: `User ${post.userId}`,
			}));
		} catch (error) {
			return rejectWithValue("Failed to fetch recent activity");
		}
	}
);

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: {
		monthlyData: [],
		salesData: [],
		categoryData: [],
		stats: {
			totalRevenue: 0,
			totalOrders: 0,
			totalCustomers: 0,
			conversionRate: 0,
		},
		recentOrders: [],
		topProducts: [],
		recentUsers: [],
		recentActivity: [],
		isLoading: false,
		error: null,
		lastUpdated: null,
	},
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		updateStats: (state, action) => {
			state.stats = { ...state.stats, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDashboardData.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchDashboardData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.monthlyData = action.payload.monthlyData;
				state.salesData = action.payload.salesData;
				state.categoryData = action.payload.categoryData;
				state.stats = action.payload.stats;
				state.recentOrders = action.payload.recentOrders;
				state.topProducts = action.payload.topProducts;
				state.recentUsers = action.payload.recentUsers;
				state.lastUpdated = new Date().toISOString();
			})
			.addCase(fetchDashboardData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(fetchRecentActivity.fulfilled, (state, action) => {
				state.recentActivity = action.payload;
			});
	},
});

export const { clearError, updateStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;
