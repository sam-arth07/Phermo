import {
	Bell,
	ChevronDown,
	FileText,
	HelpCircle,
	Home,
	Menu,
	Package,
	Settings,
	ShoppingCart,
	TrendingUp,
	Users,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

const menuItems = [
	{ text: "Dashboard", icon: Home, path: "/dashboard" },
	{ text: "Purchase", icon: ShoppingCart, path: "/purchase" },
	{ text: "Sale", icon: TrendingUp, path: "/sale" },
	{ text: "Medicine", icon: Package, path: "/medicine", active: true },
];

const otherItems = [
	{ text: "Customer", icon: Users, path: "/customer" },
	{ text: "Suppliers", icon: Users, path: "/suppliers" },
	{ text: "Invoice", icon: FileText, path: "/invoice" },
	{ text: "Orders", icon: ShoppingCart, path: "/orders" },
];

const preferenceItems = [
	{ text: "Sales Report", icon: TrendingUp, path: "/sales-report" },
	{ text: "Help & Support", icon: HelpCircle, path: "/help" },
	{ text: "Settings", icon: Settings, path: "/settings" },
];

function Layout({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [profileDropdown, setProfileDropdown] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	const handleNavigation = (path) => {
		navigate(path);
	};

	const isActive = (path) => location.pathname === path;

	return (
		<div className="flex h-screen bg-gray-50 overflow-hidden">
			{/* Sidebar */}
			<div
				className={`${
					sidebarOpen ? "w-64" : "w-20"
				} bg-white shadow-lg transition-all duration-300 flex flex-col relative`}>
				{/* Logo */}
				<div className="p-6 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
							<Package className="w-5 h-5 text-white" />
						</div>
						{sidebarOpen && (
							<span className="text-xl font-bold text-gray-900">
								Phermo
							</span>
						)}
					</div>
				</div>
				{/* Menu Button */}
				<div className="p-4">
					<button
						onClick={() => setSidebarOpen(!sidebarOpen)}
						className="w-full flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
						<Menu
							className={sidebarOpen ? "w-5 h-5" : "w-full h-5"}
						/>
						{sidebarOpen && <span className="text-sm">MENU</span>}
					</button>
				</div>

				{/* Navigation */}
				<nav className="flex-1 px-4 pb-6 space-y-1 overflow-y-auto">
					{/* Main Menu */}
					{menuItems.map((item) => {
						const Icon = item.icon;
						const active = isActive(item.path);
						return (
							<button
								key={item.text}
								onClick={() => handleNavigation(item.path)}
								className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
									active
										? "bg-gray-900 text-white"
										: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
								}`}>
								<Icon className="w-5 h-5 flex-shrink-0" />
								{sidebarOpen && (
									<span className="text-sm font-medium">
										{item.text}
									</span>
								)}
							</button>
						);
					})}

					{/* Others Section */}
					{sidebarOpen && (
						<div className="pt-6">
							<div className="px-3 mb-3">
								<span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
									Others
								</span>
							</div>
							{otherItems.map((item) => {
								const Icon = item.icon;
								const active = isActive(item.path);
								return (
									<button
										key={item.text}
										onClick={() =>
											handleNavigation(item.path)
										}
										className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
											active
												? "bg-gray-900 text-white"
												: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
										}`}>
										<Icon className="w-5 h-5 flex-shrink-0" />
										<span className="text-sm font-medium">
											{item.text}
										</span>
									</button>
								);
							})}
						</div>
					)}

					{/* Preferences Section */}
					{sidebarOpen && (
						<div className="pt-6">
							<div className="px-3 mb-3">
								<span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
									Preferences
								</span>
							</div>
							{preferenceItems.map((item) => {
								const Icon = item.icon;
								const active = isActive(item.path);
								return (
									<button
										key={item.text}
										onClick={() =>
											handleNavigation(item.path)
										}
										className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
											active
												? "bg-gray-900 text-white"
												: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
										}`}>
										<Icon className="w-5 h-5 flex-shrink-0" />
										<span className="text-sm font-medium">
											{item.text}
										</span>
									</button>
								);
							})}
						</div>
					)}
				</nav>
				{/* Upgrade Section */}
				{sidebarOpen && (
					<div className="p-4">
						<div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white relative overflow-hidden">
							<div className="relative z-10">
								<h3 className="font-semibold text-sm mb-1">
									Upgrade Pro
								</h3>
								<p className="text-xs text-blue-100 mb-3">
									Master your pharmacy with detailed analytics
									and clear pricing.
								</p>
								<button className="bg-white text-blue-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
									Upgrade Now
								</button>
							</div>
							<div className="absolute -right-2 -top-2 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
							<div className="absolute -left-4 -bottom-4 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>
						</div>
					</div>
				)}
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<header className="bg-white border-b border-gray-200 px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<span className="text-2xl">👋</span>
							<span className="text-lg font-medium text-gray-900">
								Hello, {user.firstName}!
							</span>
						</div>

						<div className="flex items-center gap-4">
							{/* Search */}
							<div className="relative">
								<input
									type="text"
									placeholder="Search anything"
									className="w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
								<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</div>
								<div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
									⌘ F
								</div>
							</div>

							{/* Notifications */}
							<button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
								<Bell className="w-5 h-5" />
								<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
							</button>

							{/* Profile */}
							<div className="relative">
								<button
									onClick={() =>
										setProfileDropdown(!profileDropdown)
									}
									className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
									<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
										{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}
									</div>
									<div className="text-left">
										<div className="text-sm font-medium text-gray-900">
											{user.firstName} {user.lastName}
										</div>
										<div className="text-xs text-gray-500">
											{user.email}
										</div>
									</div>
									<ChevronDown className="w-4 h-4 text-gray-400" />
								</button>{" "}
								{profileDropdown && (
									<div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
										<button
											onClick={() => navigate("/profile")}
											className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
											Profile Settings
										</button>
										<button
											onClick={handleLogout}
											className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
											Sign out
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</header>

				{/* Page Content */}
				<main className="flex-1 overflow-auto">{children}</main>
			</div>
		</div>
	);
}

export default Layout;
