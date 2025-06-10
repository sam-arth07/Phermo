import { motion } from "framer-motion";
import { ArrowLeft, Construction, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UnderConstruction() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="max-w-md w-full text-center">
				{/* Animated Construction Icon */}
				<motion.div
					animate={{
						rotate: [0, -5, 5, -5, 0],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="relative mx-auto mb-8 w-32 h-32">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20"></div>
					<div className="relative w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center">
						<Construction className="w-16 h-16 text-blue-600" />
					</div>

					{/* Floating tools */}
					<motion.div
						animate={{
							y: [-10, 10, -10],
							rotate: [0, 180, 360],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
						<Wrench className="w-4 h-4 text-yellow-800" />
					</motion.div>
				</motion.div>

				{/* Content */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.6 }}>
					<h1 className="text-3xl font-bold text-gray-900 mb-4">
						Page Under Construction
					</h1>
					<p className="text-gray-600 mb-8 leading-relaxed">
						We're working hard to bring you something amazing! This
						page is currently being built with care and attention to
						detail.
					</p>
				</motion.div>

				{/* Features Coming Soon */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.6 }}
					className="bg-white rounded-xl p-6 shadow-soft mb-8">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Coming Soon
					</h3>
					<div className="space-y-3">
						<div className="flex items-center gap-3 text-sm text-gray-600">
							<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
							<span>Advanced analytics and reporting</span>
						</div>
						<div className="flex items-center gap-3 text-sm text-gray-600">
							<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
							<span>Enhanced user management</span>
						</div>
						<div className="flex items-center gap-3 text-sm text-gray-600">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							<span>Real-time notifications</span>
						</div>
					</div>
				</motion.div>

				{/* Action Buttons */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.9, duration: 0.6 }}
					className="flex flex-col sm:flex-row gap-4">
					<button
						onClick={() => navigate("/dashboard")}
						className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
						<ArrowLeft className="w-4 h-4" />
						Back to Dashboard
					</button>
					<button
						onClick={() => navigate("/products")}
						className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
						View Products
					</button>
				</motion.div>

				{/* Progress Indicator */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.2, duration: 0.6 }}
					className="mt-8">
					<div className="text-xs text-gray-500 mb-2">
						Development Progress
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: "75%" }}
							transition={{
								delay: 1.5,
								duration: 1.5,
								ease: "easeOut",
							}}
							className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full relative">
							<div className="absolute right-0 top-0 w-2 h-2 bg-white rounded-full transform translate-x-1/2 -translate-y-0"></div>
						</motion.div>
					</div>
					<div className="text-xs text-gray-500 mt-1">
						75% Complete
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
}

export default UnderConstruction;
