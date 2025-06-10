import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { clearError, login, signup } from "../store/slices/authSlice";

const loginSchema = yup.object({
	username: yup.string().required("Username is required"),
	password: yup
		.string()
		.min(4, "Password must be at least 4 characters")
		.required("Password is required"),
});

const signupSchema = yup.object({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match")
		.required("Confirm password is required"),
});

function Login() {
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, error } = useSelector((state) => state.auth);

	// Clear errors when component unmounts
	useEffect(() => {
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	const loginForm = useForm({
		resolver: yupResolver(loginSchema),
		defaultValues: {
			username: "emilys",
			password: "emilyspass",
		},
	});

	const signupForm = useForm({
		resolver: yupResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const handleModeChange = (loginMode) => {
		setIsLoginMode(loginMode);
		dispatch(clearError());
		loginForm.reset();
		signupForm.reset();
	};

	const handleLoginSubmit = async (data) => {
		try {
			await dispatch(login(data)).unwrap();
			navigate("/dashboard");
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	const handleSignupSubmit = async (data) => {
		try {
			await dispatch(signup(data)).unwrap();
			navigate("/dashboard");
		} catch (error) {
			console.error("Signup failed:", error);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
				<div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
				<div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
			</div>

			{/* Main Container */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md">
				{/* Logo */}
				<div className="text-center mb-8">
					<div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<span className="text-2xl font-bold text-white">P</span>
					</div>
					<h1 className="text-2xl font-bold text-gray-900 mb-2">
						Welcome to Phermo
					</h1>
					<p className="text-gray-600">
						Your pharmacy management solution
					</p>
				</div>
				{/* Tab Buttons */}
				<div className="flex bg-gray-100 rounded-lg p-1 mb-6">
					<button
						onClick={() => handleModeChange(true)}
						className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
							isLoginMode
								? "bg-white text-gray-900 shadow-sm"
								: "text-gray-600 hover:text-gray-900"
						}`}>
						Sign In
					</button>
					<button
						onClick={() => handleModeChange(false)}
						className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
							!isLoginMode
								? "bg-white text-gray-900 shadow-sm"
								: "text-gray-600 hover:text-gray-900"
						}`}>
						Sign Up
					</button>
				</div>
				{/* Error Alert */}
				<AnimatePresence>
					{error && (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
							{error}
						</motion.div>
					)}
				</AnimatePresence>
				{/* Demo Credentials */}
				{isLoginMode && (
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
						<h3 className="text-sm font-medium text-blue-800 mb-2">
							Demo Credentials
						</h3>
						<div className="text-sm text-blue-700">
							<p>
								Username:{" "}
								<span className="font-mono">emilys</span>
							</p>
							<p>
								Password:{" "}
								<span className="font-mono">emilyspass</span>
							</p>
						</div>
					</div>
				)}
				{/* Forms */}
				<AnimatePresence mode="wait">
					{isLoginMode ? (
						<motion.form
							key="login"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							transition={{ duration: 0.3 }}
							onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
							className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Username
								</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<input
										{...loginForm.register("username")}
										type="text"
										className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="Enter your username"
									/>
								</div>
								{loginForm.formState.errors.username && (
									<p className="text-red-500 text-sm mt-1">
										{
											loginForm.formState.errors.username
												.message
										}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<input
										{...loginForm.register("password")}
										type={
											showPassword ? "text" : "password"
										}
										className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="Enter your password"
									/>
									<button
										type="button"
										onClick={() =>
											setShowPassword(!showPassword)
										}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
										{showPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>
								{loginForm.formState.errors.password && (
									<p className="text-red-500 text-sm mt-1">
										{
											loginForm.formState.errors.password
												.message
										}
									</p>
								)}
							</div>

							<button
								type="submit"
								disabled={isLoading}
								className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
								{isLoading ? (
									<div className="flex items-center justify-center">
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
										Signing In...
									</div>
								) : (
									"Sign In"
								)}
							</button>
						</motion.form>
					) : (
						<motion.form
							key="signup"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.3 }}
							onSubmit={signupForm.handleSubmit(
								handleSignupSubmit
							)}
							className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Full Name
								</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<input
										{...signupForm.register("name")}
										type="text"
										className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="Enter your full name"
									/>
								</div>
								{signupForm.formState.errors.name && (
									<p className="text-red-500 text-sm mt-1">
										{
											signupForm.formState.errors.name
												.message
										}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Email
								</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<input
										{...signupForm.register("email")}
										type="email"
										className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="Enter your email"
									/>
								</div>
								{signupForm.formState.errors.email && (
									<p className="text-red-500 text-sm mt-1">
										{
											signupForm.formState.errors.email
												.message
										}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<input
										{...signupForm.register("password")}
										type={
											showPassword ? "text" : "password"
										}
										className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="Enter your password"
									/>
									<button
										type="button"
										onClick={() =>
											setShowPassword(!showPassword)
										}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
										{showPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>
								{signupForm.formState.errors.password && (
									<p className="text-red-500 text-sm mt-1">
										{
											signupForm.formState.errors.password
												.message
										}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Confirm Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<input
										{...signupForm.register(
											"confirmPassword"
										)}
										type={
											showConfirmPassword
												? "text"
												: "password"
										}
										className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="Confirm your password"
									/>
									<button
										type="button"
										onClick={() =>
											setShowConfirmPassword(
												!showConfirmPassword
											)
										}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
										{showConfirmPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>
								{signupForm.formState.errors
									.confirmPassword && (
									<p className="text-red-500 text-sm mt-1">
										{
											signupForm.formState.errors
												.confirmPassword.message
										}
									</p>
								)}
							</div>

							<button
								type="submit"
								disabled={isLoading}
								className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
								{isLoading ? (
									<div className="flex items-center justify-center">
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
										Creating Account...
									</div>
								) : (
									"Create Account"
								)}
							</button>
						</motion.form>
					)}
				</AnimatePresence>{" "}
			</motion.div>

			{/* Custom CSS for animations */}
			<style jsx>{`
				@keyframes blob {
					0% {
						transform: translate(0px, 0px) scale(1);
					}
					33% {
						transform: translate(30px, -50px) scale(1.1);
					}
					66% {
						transform: translate(-20px, 20px) scale(0.9);
					}
					100% {
						transform: translate(0px, 0px) scale(1);
					}
				}
				.animate-blob {
					animation: blob 7s infinite;
				}
				.animation-delay-2000 {
					animation-delay: 2s;
				}
				.animation-delay-4000 {
					animation-delay: 4s;
				}
			`}</style>
		</div>
	);
}

export default Login;
