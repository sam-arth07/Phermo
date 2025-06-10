import { Provider, useSelector } from "react-redux";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { NotificationProvider } from "./components/NotificationProvider";
import Customer from "./pages/Customer.jsx";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Medicine from "./pages/Medicine";
import Profile from "./pages/Profile";
import Purchase from "./pages/Purchase";
import Sale from "./pages/Sale";
import Suppliers from "./pages/Suppliers";
import UnderConstruction from "./pages/UnderConstruction";
import { store } from "./store";

// Protected Route Component
function ProtectedRoute({ children }) {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	return isAuthenticated ? children : <Navigate to="/login" />;
}

// Public Route Component
function PublicRoute({ children }) {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	return !isAuthenticated ? children : <Navigate to="/dashboard" />;
}

function AppContent() {
	return (
		<ErrorBoundary>
			<Router>
				<div className="App">
					<Routes>
						<Route
							path="/login"
							element={
								<PublicRoute>
									<Login />
								</PublicRoute>
							}
						/>
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Layout>
										<Dashboard />
									</Layout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/medicine"
							element={
								<ProtectedRoute>
									<Layout>
										<Medicine />
									</Layout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/purchase"
							element={
								<ProtectedRoute>
									<Layout>
										<Purchase />
									</Layout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/sale"
							element={
								<ProtectedRoute>
									<Layout>
										<Sale />
									</Layout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/suppliers"
							element={
								<ProtectedRoute>
									<Layout>
										<Suppliers />
									</Layout>
								</ProtectedRoute>
							}
						/>
						{/* Customer page */}
						<Route
							path="/customer"
							element={
								<ProtectedRoute>
									<Layout>
										<Customer />
									</Layout>
								</ProtectedRoute>
							}
						/>
						{/* Profile page */}
						<Route
							path="/profile"
							element={
								<ProtectedRoute>
									<Layout>
										<Profile />
									</Layout>
								</ProtectedRoute>
							}
						/>
						{/* Under Construction pages */}
						<Route
							path="/invoice"
							element={
								<ProtectedRoute>
									<Layout>
										<UnderConstruction />
									</Layout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/orders"
							element={
								<ProtectedRoute>
									<Layout>
										<UnderConstruction />
									</Layout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/sales-report"
							element={
								<ProtectedRoute>
									<Layout>
										<UnderConstruction />
									</Layout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/help"
							element={
								<ProtectedRoute>
									<Layout>
										<UnderConstruction />
									</Layout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/settings"
							element={
								<ProtectedRoute>
									<Layout>
										<UnderConstruction />
									</Layout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/"
							element={<Navigate to="/dashboard" />}
						/>
						{/* Catch all route for 404 */}
						<Route
							path="*"
							element={
								<ProtectedRoute>
									<Layout>
										<UnderConstruction />
									</Layout>
								</ProtectedRoute>
							}
						/>
					</Routes>
				</div>
			</Router>
		</ErrorBoundary>
	);
}

function App() {
	return (
		<Provider store={store}>
			<ErrorBoundary>
				<NotificationProvider>
					<AppContent />
				</NotificationProvider>
			</ErrorBoundary>
		</Provider>
	);
}

export default App;
