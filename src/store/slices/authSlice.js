import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dummyjson.com";

export const login = createAsyncThunk(
	"auth/login",
	async ({ username, password }, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${API_URL}/auth/login`, {
				username,
				password,
				expiresInMins: 30,
			});

			const { token, ...user } = response.data;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));

			return { user, token };
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Login failed"
			);
		}
	}
);

export const signup = createAsyncThunk(
	"auth/signup",
	async ({ email, password, name }, { rejectWithValue }) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const user = {
				id: Date.now(),
				email,
				firstName: name.split(" ")[0] || name,
				lastName: name.split(" ")[1] || "",
				username: email,
				image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
			};

			const token = "mock-jwt-token-" + Date.now();
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("token", token);

			return { user, token };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const refreshAuth = createAsyncThunk(
	"auth/refresh",
	async (_, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) throw new Error("No token found");

			const response = await axios.get(`${API_URL}/auth/me`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			return response.data;
		} catch (error) {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			return rejectWithValue("Session expired");
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: JSON.parse(localStorage.getItem("user")) || null,
		token: localStorage.getItem("token") || null,
		isLoading: false,
		error: null,
		isAuthenticated: !!localStorage.getItem("token"),
	},
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
			localStorage.removeItem("user");
			localStorage.removeItem("token");
		},
		clearError: (state) => {
			state.error = null;
		},
		updateProfile: (state, action) => {
			state.user = { ...state.user, ...action.payload };
			localStorage.setItem("user", JSON.stringify(state.user));
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isAuthenticated = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.isAuthenticated = false;
			})
			.addCase(signup.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isAuthenticated = true;
			})
			.addCase(signup.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(refreshAuth.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(refreshAuth.rejected, (state) => {
				state.user = null;
				state.token = null;
				state.isAuthenticated = false;
			});
	},
});

export const { logout, clearError, updateProfile } = authSlice.actions;
export default authSlice.reducer;
