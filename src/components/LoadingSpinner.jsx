import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "default", message = "Loading..." }) => {
	const sizeClasses = {
		small: "w-4 h-4",
		default: "w-8 h-8",
		large: "w-12 h-12",
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="flex flex-col items-center justify-center p-8">
			<div
				className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
			{message && (
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="mt-4 text-gray-600 text-sm">
					{message}
				</motion.p>
			)}
		</motion.div>
	);
};

export default LoadingSpinner;
