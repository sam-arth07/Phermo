import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component } from "react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		console.error("Error caught by boundary:", error, errorInfo);
	}

	handleRetry = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md w-full text-center">
						<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<AlertTriangle className="w-8 h-8 text-red-600" />
						</div>
						<h2 className="text-xl font-semibold text-gray-900 mb-2">
							Something went wrong
						</h2>
						<p className="text-gray-600 mb-6">
							We're sorry, but something unexpected happened.
							Please try refreshing the page.
						</p>
						<div className="space-y-3">
							<button
								onClick={this.handleRetry}
								className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
								<RefreshCw className="w-4 h-4" />
								Try Again
							</button>
							<button
								onClick={() => window.location.reload()}
								className="w-full border border-gray-300 text-gray-700 rounded-lg py-3 px-4 font-medium hover:bg-gray-50 transition-colors">
								Refresh Page
							</button>
						</div>
						{process.env.NODE_ENV === "development" && (
							<details className="mt-6 text-left">
								<summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
									Error Details
								</summary>
								<pre className="mt-2 text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto">
									{this.state.error?.toString()}
								</pre>
							</details>
						)}
					</motion.div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
