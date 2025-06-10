import { motion } from "framer-motion";
import {
	AlertTriangle,
	ArrowDownRight,
	ArrowUpRight,
	Calendar,
	CheckCircle,
	Clock,
	DollarSign,
	Eye,
	MoreHorizontal,
	Package,
	PieChart as PieChartIcon,
	ShoppingCart,
	Star,
	TrendingDown,
	TrendingUp,
	Truck,
	Users,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchDashboardData } from "../store/slices/dashboardSlice";

const StatCard = ({ title, value, icon: Icon, color, trend, description }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
		<div className="flex items-center justify-between">
			<div className="flex-1">
				<p className="text-sm font-medium text-gray-600 mb-1">
					{title}
				</p>
				<p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
				{trend !== undefined && (
					<div className="flex items-center space-x-1">
						{trend >= 0 ? (
							<ArrowUpRight className="w-4 h-4 text-green-500" />
						) : (
							<ArrowDownRight className="w-4 h-4 text-red-500" />
						)}
						<span
							className={`text-sm font-medium ${
								trend >= 0 ? "text-green-600" : "text-red-600"
							}`}>
							{trend > 0 ? "+" : ""}
							{trend}%
						</span>
						<span className="text-sm text-gray-500">
							vs last month
						</span>
					</div>
				)}
				{description && (
					<p className="text-sm text-gray-500 mt-1">{description}</p>
				)}
			</div>
			<div
				className={`flex items-center justify-center w-12 h-12 rounded-lg ${color}`}>
				<Icon className="w-6 h-6 text-white" />
			</div>
		</div>
	</motion.div>
);

const COLORS = ["#3B82F6", "#EF4444", "#F59E0B", "#10B981", "#8B5CF6"];

const getStatusColor = (status) => {
	switch (status) {
		case "completed":
			return "bg-green-100 text-green-800";
		case "pending":
			return "bg-yellow-100 text-yellow-800";
		case "shipped":
			return "bg-blue-100 text-blue-800";
		case "processing":
			return "bg-purple-100 text-purple-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

function Dashboard() {
	const dispatch = useDispatch();
	const { monthlyData, salesData, categoryData, stats, isLoading, error } =
		useSelector((state) => state.dashboard);

	useEffect(() => {
		dispatch(fetchDashboardData());
	}, [dispatch]);
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-96">
				<LoadingSpinner
					size="large"
					message="Loading dashboard data..."
				/>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
				{error}
			</div>
		);
	}
	// Use categoryData for pie chart, fallback to pharmaceutical categories if not available
	const pieData =
		categoryData.length > 0
			? categoryData
			: [
					{ name: "Pain Relief", value: 28, color: "#3B82F6" },
					{ name: "Antibiotics", value: 22, color: "#EF4444" },
					{ name: "Cardiovascular", value: 18, color: "#F59E0B" },
					{ name: "Anti-inflammatory", value: 16, color: "#10B981" },
					{ name: "Diabetes", value: 16, color: "#8B5CF6" },
			  ];

	return (
		<div className="space-y-6 p-6 min-h-screen">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Dashboard
					</h1>
					<p className="text-gray-600 mt-1">
						Welcome back! Here's what's happening with your business
						today.
					</p>
				</div>
				<button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
					<Eye className="w-4 h-4 mr-2" />
					View Reports
				</button>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<StatCard
					title="Total Revenue"
					value={`$${stats.totalRevenue?.toLocaleString()}`}
					icon={DollarSign}
					color="bg-blue-500"
					trend={12.5}
				/>
				<StatCard
					title="Total Orders"
					value={stats.totalOrders?.toLocaleString()}
					icon={ShoppingCart}
					color="bg-green-500"
					trend={8.2}
				/>
				<StatCard
					title="Total Customers"
					value={stats.totalCustomers?.toLocaleString()}
					icon={Users}
					color="bg-purple-500"
					trend={-2.1}
				/>
				<StatCard
					title="Products Sold"
					value={stats.productsSold?.toLocaleString() || "2,847"}
					icon={Package}
					color="bg-orange-500"
					trend={5.3}
				/>
			</div>

			{/* Charts Row */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Revenue Chart */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-lg font-semibold text-gray-900">
							Revenue Overview
						</h2>
						<div className="flex items-center space-x-2">
							<select className="text-sm border border-gray-200 rounded-md px-3 py-1">
								<option>Last 6 months</option>
								<option>Last year</option>
							</select>
						</div>
					</div>
					<ResponsiveContainer width="100%" height={300}>
						<AreaChart data={monthlyData}>
							<defs>
								<linearGradient
									id="colorRevenue"
									x1="0"
									y1="0"
									x2="0"
									y2="1">
									<stop
										offset="5%"
										stopColor="#3B82F6"
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor="#3B82F6"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="#f0f0f0"
							/>
							<XAxis
								dataKey="month"
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 12, fill: "#6B7280" }}
							/>
							<YAxis
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 12, fill: "#6B7280" }}
							/>
							<Tooltip
								formatter={(value) => [
									`$${value.toLocaleString()}`,
									"Revenue",
								]}
								contentStyle={{
									backgroundColor: "white",
									border: "1px solid #e5e7eb",
									borderRadius: "8px",
									boxShadow:
										"0 4px 6px -1px rgba(0, 0, 0, 0.1)",
								}}
							/>
							<Area
								type="monotone"
								dataKey="revenue"
								stroke="#3B82F6"
								strokeWidth={2}
								fillOpacity={1}
								fill="url(#colorRevenue)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</motion.div>{" "}
				{/* Top Products Enhanced */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-lg font-semibold text-gray-900">
							Top Products
						</h2>
						<button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
							<TrendingUp className="w-4 h-4" />
							View Analytics
						</button>
					</div>

					{/* Product Performance Summary */}
					<div className="grid grid-cols-2 gap-4 mb-6">
						<div className="bg-blue-50 rounded-lg p-3">
							<div className="flex items-center gap-2 mb-1">
								<Package className="w-4 h-4 text-blue-600" />
								<span className="text-sm font-medium text-blue-900">
									Best Seller
								</span>
							</div>
							<p className="text-xs text-blue-700">
								{stats.topProducts?.[0]?.name || "Product A"}
							</p>
						</div>
						<div className="bg-green-50 rounded-lg p-3">
							<div className="flex items-center gap-2 mb-1">
								<DollarSign className="w-4 h-4 text-green-600" />
								<span className="text-sm font-medium text-green-900">
									Top Revenue
								</span>
							</div>
							<p className="text-xs text-green-700">
								$
								{stats.topProducts?.[0]?.revenue?.toLocaleString() ||
									"15,420"}
							</p>
						</div>
					</div>

					{/* Product List */}
					<div className="space-y-4">
						{(stats.topProducts || [])
							.slice(0, 5)
							.map((product, index) => {
								const isTopPerformer = index === 0;
								const trend =
									Math.random() > 0.5 ? "up" : "down";
								const trendValue = (
									Math.random() * 20 +
									5
								).toFixed(1);

								return (
									<div
										key={product.id}
										className={`flex items-center gap-4 p-3 rounded-lg border transition-all hover:shadow-sm ${
											isTopPerformer
												? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
												: "bg-gray-50 border-gray-100 hover:bg-gray-100"
										}`}>
										{/* Product Image */}
										<div className="relative">
											<img
												src={
													product.image ||
													`https://picsum.photos/48/48?random=${product.id}`
												}
												alt={product.name}
												className="w-12 h-12 rounded-lg object-cover"
											/>
											{isTopPerformer && (
												<div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
													<Star className="w-3 h-3 text-white fill-current" />
												</div>
											)}
										</div>

										{/* Product Info */}
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-1">
												<h4 className="font-medium text-gray-900 truncate">
													{product.name}
												</h4>
												{isTopPerformer && (
													<span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
														#1 Seller
													</span>
												)}
											</div>
											<div className="flex items-center gap-4 text-sm text-gray-600">
												<span>
													{product.sales} sold
												</span>
												<span className="flex items-center gap-1">
													$
													{product.revenue?.toLocaleString() ||
														"0"}
													{trend === "up" ? (
														<TrendingUp className="w-3 h-3 text-green-500" />
													) : (
														<TrendingDown className="w-3 h-3 text-red-500" />
													)}
													<span
														className={
															trend === "up"
																? "text-green-600"
																: "text-red-600"
														}>
														{trendValue}%
													</span>
												</span>
											</div>
										</div>

										{/* Stock Status */}
										<div className="text-right">
											<div
												className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
													Math.random() > 0.3
														? "bg-green-100 text-green-800"
														: "bg-yellow-100 text-yellow-800"
												}`}>
												{Math.random() > 0.3
													? "In Stock"
													: "Low Stock"}
											</div>
										</div>

										{/* Action Menu */}
										<button className="p-1 hover:bg-white rounded-md transition-colors">
											<MoreHorizontal className="w-4 h-4 text-gray-400" />
										</button>
									</div>
								);
							})}
					</div>

					{/* View All Products */}
					<div className="mt-6 pt-4 border-t border-gray-100">
						<button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors">
							View All Products →
						</button>
					</div>
				</motion.div>
			</div>

			{/* Daily Sales Chart */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7 }}
				className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-6">
					Daily Sales & Profit
				</h2>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={salesData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
						<XAxis
							dataKey="date"
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: "#6B7280" }}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: "#6B7280" }}
						/>
						<Tooltip
							formatter={(value) => [
								`$${value.toLocaleString()}`,
							]}
							contentStyle={{
								backgroundColor: "white",
								border: "1px solid #e5e7eb",
								borderRadius: "8px",
								boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
							}}
						/>
						<Bar
							dataKey="sales"
							fill="#3B82F6"
							name="Sales"
							radius={[4, 4, 0, 0]}
						/>
						<Bar
							dataKey="profit"
							fill="#10B981"
							name="Profit"
							radius={[4, 4, 0, 0]}
						/>
					</BarChart>{" "}
				</ResponsiveContainer>
			</motion.div>

			{/* Quick Insights & Alerts */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Performance Alert */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
							<AlertTriangle className="w-5 h-5 text-orange-600" />
						</div>
						<div>
							<h3 className="font-semibold text-orange-900">
								Low Stock Alert
							</h3>
							<p className="text-sm text-orange-700">
								3 products need attention
							</p>
						</div>
					</div>
					<div className="space-y-2 mb-4">
						<div className="flex justify-between text-sm">
							<span className="text-orange-800">
								Paracetamol 500mg
							</span>
							<span className="font-medium text-orange-900">
								12 left
							</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-orange-800">Vitamin D3</span>
							<span className="font-medium text-orange-900">
								8 left
							</span>
						</div>
					</div>
					<button className="w-full bg-orange-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-orange-700 transition-colors mt-10">
						Reorder Stock
					</button>
				</motion.div>

				{/* Revenue Goal */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6 }}
					className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
							<TrendingUp className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<h3 className="font-semibold text-blue-900">
								Revenue Goal
							</h3>
							<p className="text-sm text-blue-700">
								Monthly target progress
							</p>
						</div>
					</div>
					<div className="mb-4">
						<div className="flex justify-between text-sm mb-2">
							<span className="text-blue-800">Progress</span>
							<span className="font-medium text-blue-900">
								78% of $50,000
							</span>
						</div>
						<div className="w-full bg-blue-100 rounded-full h-2">
							<div
								className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
								style={{ width: "78%" }}></div>
						</div>
					</div>
					<button className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition-colors mt-12">
						View Details
					</button>
				</motion.div>

				{/* Quick Actions */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7 }}
					className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
							<ShoppingCart className="w-5 h-5 text-green-600" />
						</div>
						<div>
							<h3 className="font-semibold text-green-900">
								Quick Actions
							</h3>
							<p className="text-sm text-green-700">
								Common tasks
							</p>
						</div>
					</div>
					<div className="space-y-3">
						<button className="w-full bg-white border border-green-200 text-green-800 rounded-lg py-2 text-sm font-medium hover:bg-green-50 transition-colors mt-12">
							+ Add New Product
						</button>
						<button className="w-full bg-green-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-green-700 transition-colors">
							💳 Process Payment
						</button>
					</div>
				</motion.div>
			</div>

			{/* Enhanced Recent Orders */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-lg font-semibold text-gray-900">
							Recent Orders
						</h2>
						<p className="text-sm text-gray-600 mt-1">
							Latest customer orders and their status
						</p>
					</div>
					<div className="flex items-center gap-3">
						<select className="text-sm border border-gray-200 rounded-md px-3 py-1">
							<option>All Orders</option>
							<option>Pending</option>
							<option>Completed</option>
							<option>Shipped</option>
						</select>
						<button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
							View all
						</button>
					</div>
				</div>

				{/* Quick Stats */}
				<div className="grid grid-cols-4 gap-4 mb-6">
					<div className="bg-blue-50 rounded-lg p-3 text-center">
						<div className="text-lg font-bold text-blue-900">
							{stats.recentOrders?.filter(
								(o) => o.status === "completed"
							).length || 0}
						</div>
						<div className="text-xs text-blue-700">Completed</div>
					</div>
					<div className="bg-yellow-50 rounded-lg p-3 text-center">
						<div className="text-lg font-bold text-yellow-900">
							{stats.recentOrders?.filter(
								(o) => o.status === "pending"
							).length || 0}
						</div>
						<div className="text-xs text-yellow-700">Pending</div>
					</div>
					<div className="bg-purple-50 rounded-lg p-3 text-center">
						<div className="text-lg font-bold text-purple-900">
							{stats.recentOrders?.filter(
								(o) => o.status === "shipped"
							).length || 0}
						</div>
						<div className="text-xs text-purple-700">Shipped</div>
					</div>
					<div className="bg-green-50 rounded-lg p-3 text-center">
						<div className="text-lg font-bold text-green-900">
							{stats.recentOrders?.filter(
								(o) => o.status === "processing"
							).length || 0}
						</div>
						<div className="text-xs text-green-700">Processing</div>
					</div>
				</div>

				{/* Orders List */}
				<div className="space-y-4">
					{(stats.recentOrders || []).map((order) => {
						const getStatusIcon = (status) => {
							switch (status) {
								case "completed":
									return (
										<CheckCircle className="w-4 h-4 text-green-500" />
									);
								case "pending":
									return (
										<Clock className="w-4 h-4 text-yellow-500" />
									);
								case "shipped":
									return (
										<Truck className="w-4 h-4 text-blue-500" />
									);
								case "processing":
									return (
										<Package className="w-4 h-4 text-purple-500" />
									);
								default:
									return (
										<AlertTriangle className="w-4 h-4 text-gray-500" />
									);
							}
						};

						const getPriorityColor = () => {
							if (order.amount > 500)
								return "border-l-red-400 bg-red-50";
							if (order.amount > 200)
								return "border-l-yellow-400 bg-yellow-50";
							return "border-l-green-400 bg-green-50";
						};

						return (
							<div
								key={order.id}
								className={`border-l-4 rounded-lg p-4 hover:shadow-md transition-all ${getPriorityColor()}`}>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										{/* Customer Avatar */}
										<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
											{order.customer.charAt(
												order.customer.length - 1
											)}
										</div>

										{/* Order Details */}
										<div>
											<div className="flex items-center gap-3 mb-1">
												<span className="font-medium text-gray-900">
													#{order.id}
												</span>
												<span className="text-sm text-gray-600">
													{order.customer}
												</span>
												<div className="flex items-center gap-1">
													{getStatusIcon(
														order.status
													)}
													<span
														className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
															order.status
														)}`}>
														{order.status}
													</span>
												</div>
											</div>
											<div className="flex items-center gap-4 text-sm text-gray-600">
												<span className="font-medium text-gray-900">
													${order.amount}
												</span>
												<span>{order.date}</span>
												<span
													className={`font-medium ${
														order.amount > 500
															? "text-red-600"
															: order.amount > 200
															? "text-yellow-600"
															: "text-green-600"
													}`}>
													{order.amount > 500
														? "High Value"
														: order.amount > 200
														? "Medium Value"
														: "Standard"}
												</span>
											</div>
										</div>
									</div>

									{/* Action Buttons */}
									<div className="flex items-center gap-2">
										{order.status === "pending" && (
											<button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-200 transition-colors">
												Process
											</button>
										)}
										{order.status === "processing" && (
											<button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium hover:bg-purple-200 transition-colors">
												Ship
											</button>
										)}
										<button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors">
											View
										</button>
										<button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
											<MoreHorizontal className="w-4 h-4 text-gray-400" />
										</button>
									</div>
								</div>

								{/* Order Items Preview */}
								{order.amount > 300 && (
									<div className="mt-3 pt-3 border-t border-gray-200">
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<Package className="w-4 h-4" />
											<span>
												{Math.floor(Math.random() * 5) +
													1}{" "}
												items • Estimated delivery:{" "}
												{new Date(
													Date.now() +
														Math.random() *
															7 *
															24 *
															60 *
															60 *
															1000
												).toLocaleDateString()}
											</span>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Load More */}
				<div className="mt-6 pt-4 border-t border-gray-100 text-center">
					<button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
						Load More Orders
					</button>
				</div>
			</motion.div>

			{/* Enhanced Analytics Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.9 }}
				className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Category Performance */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h2 className="text-lg font-semibold text-gray-900">
								Category Performance
							</h2>
							<p className="text-sm text-gray-600 mt-1">
								Sales distribution by product category
							</p>
						</div>
						<PieChartIcon className="w-5 h-5 text-gray-400" />
					</div>
					<ResponsiveContainer width="100%" height={250}>
						<PieChart>
							<Pie
								data={pieData}
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={100}
								paddingAngle={5}
								dataKey="value">
								{pieData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={entry.color}
									/>
								))}
							</Pie>
							<Tooltip
								formatter={(value) => [
									`${value} units`,
									"Sales",
								]}
								contentStyle={{
									backgroundColor: "white",
									border: "1px solid #e5e7eb",
									borderRadius: "8px",
									boxShadow:
										"0 4px 6px -1px rgba(0, 0, 0, 0.1)",
								}}
							/>
						</PieChart>
					</ResponsiveContainer>
					{/* Legend */}
					<div className="grid grid-cols-2 gap-2 mt-4">
						{pieData.map((entry, index) => (
							<div
								key={index}
								className="flex items-center gap-2">
								<div
									className="w-3 h-3 rounded-full"
									style={{
										backgroundColor: entry.color,
									}}></div>
								<span className="text-sm text-gray-600 truncate">
									{entry.name}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Performance Metrics */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h2 className="text-lg font-semibold text-gray-900">
								Performance Metrics
							</h2>
							<p className="text-sm text-gray-600 mt-1">
								Key business indicators
							</p>
						</div>
						<Calendar className="w-5 h-5 text-gray-400" />
					</div>
					<div className="space-y-6">
						{/* Conversion Rate */}
						<div>
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-gray-700">
									Conversion Rate
								</span>
								<span className="text-sm font-semibold text-gray-900">
									{stats.conversionRate || 3.2}%
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-blue-600 h-2 rounded-full"
									style={{
										width: `${
											(stats.conversionRate || 3.2) * 10
										}%`,
									}}></div>
							</div>
						</div>

						{/* Customer Satisfaction */}
						<div>
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-gray-700">
									Customer Satisfaction
								</span>
								<span className="text-sm font-semibold text-gray-900">
									4.8/5
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-green-600 h-2 rounded-full"
									style={{ width: "96%" }}></div>
							</div>
						</div>

						{/* Average Order Value */}
						<div>
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-gray-700">
									Avg. Order Value
								</span>
								<span className="text-sm font-semibold text-gray-900">
									$
									{Math.round(
										(stats.totalRevenue || 485000) /
											(stats.totalOrders || 1847)
									)}
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-purple-600 h-2 rounded-full"
									style={{ width: "73%" }}></div>
							</div>
						</div>

						{/* Inventory Turnover */}
						<div>
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-gray-700">
									Inventory Turnover
								</span>
								<span className="text-sm font-semibold text-gray-900">
									8.2x
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-orange-600 h-2 rounded-full"
									style={{ width: "82%" }}></div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

export default Dashboard;
