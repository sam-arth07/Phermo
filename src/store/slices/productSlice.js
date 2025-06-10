import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dummyjson.com";

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async ({ skip = 0, limit = 30, search = "" }, { rejectWithValue }) => {
		try {
			let url = search
				? `${API_URL}/products/search?q=${search}&limit=${limit}&skip=${skip}`
				: `${API_URL}/products?limit=${limit}&skip=${skip}`;

			const response = await axios.get(url);
			return response.data;
		} catch (error) {
			return rejectWithValue("Failed to fetch products");
		}
	}
);

export const addProduct = createAsyncThunk(
	"products/addProduct",
	async (productData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_URL}/products/add`,
				productData
			);
			return response.data;
		} catch (error) {
			return rejectWithValue("Failed to add product");
		}
	}
);

export const updateProduct = createAsyncThunk(
	"products/updateProduct",
	async ({ id, ...productData }, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${API_URL}/products/${id}`,
				productData
			);
			return response.data;
		} catch (error) {
			return rejectWithValue("Failed to update product");
		}
	}
);

export const deleteProduct = createAsyncThunk(
	"products/deleteProduct",
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`${API_URL}/products/${id}`);
			return { id, ...response.data };
		} catch (error) {
			return rejectWithValue("Failed to delete product");
		}
	}
);

export const fetchCategories = createAsyncThunk(
	"products/fetchCategories",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/products/categories`);
			return response.data;
		} catch (error) {
			return rejectWithValue("Failed to fetch categories");
		}
	}
);

const productSlice = createSlice({
	name: "products",
	initialState: {
		items: [],
		categories: [],
		total: 0,
		isLoading: false,
		error: null,
		searchTerm: "",
		selectedCategory: "all",
		currentPage: 1,
		itemsPerPage: 12,
	},
	reducers: {
		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
			state.currentPage = 1;
		},
		setSelectedCategory: (state, action) => {
			state.selectedCategory = action.payload;
			state.currentPage = 1;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
		resetProducts: (state) => {
			state.items = [];
			state.total = 0;
			state.currentPage = 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = action.payload.products;
				state.total = action.payload.total;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.categories = action.payload;
			})
			.addCase(addProduct.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items.unshift(action.payload);
				state.total += 1;
			})
			.addCase(addProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(updateProduct.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.items.findIndex(
					(item) => item.id === action.payload.id
				);
				if (index !== -1) {
					state.items[index] = action.payload;
				}
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(deleteProduct.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = state.items.filter(
					(item) => item.id !== action.payload.id
				);
				state.total -= 1;
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const {
	setSearchTerm,
	setSelectedCategory,
	setCurrentPage,
	clearError,
	resetProducts,
} = productSlice.actions;

export default productSlice.reducer;
