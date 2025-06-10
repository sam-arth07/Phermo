import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error(
			"useNotification must be used within NotificationProvider"
		);
	}
	return context;
};

export function NotificationProvider({ children }) {
	const [notifications, setNotifications] = useState([]);

	const addNotification = (message, type = "info", duration = 5000) => {
		const id = Date.now();
		const notification = { id, message, type, duration };

		setNotifications((prev) => [...prev, notification]);

		if (duration > 0) {
			setTimeout(() => {
				removeNotification(id);
			}, duration);
		}

		return id;
	};

	const removeNotification = (id) => {
		setNotifications((prev) => prev.filter((notif) => notif.id !== id));
	};

	const value = {
		notifications,
		addNotification,
		removeNotification,
		success: (message, duration) =>
			addNotification(message, "success", duration),
		error: (message, duration) =>
			addNotification(message, "error", duration),
		warning: (message, duration) =>
			addNotification(message, "warning", duration),
		info: (message, duration) => addNotification(message, "info", duration),
	};

	return (
		<NotificationContext.Provider value={value}>
			{children}
			<NotificationContainer />
		</NotificationContext.Provider>
	);
}

function NotificationContainer() {
	const { notifications, removeNotification } = useNotification();

	const getIcon = (type) => {
		switch (type) {
			case "success":
				return <CheckCircle className="w-5 h-5" />;
			case "error":
				return <XCircle className="w-5 h-5" />;
			case "warning":
				return <AlertCircle className="w-5 h-5" />;
			default:
				return <Info className="w-5 h-5" />;
		}
	};

	const getStyles = (type) => {
		switch (type) {
			case "success":
				return "bg-green-50 border-green-200 text-green-800";
			case "error":
				return "bg-red-50 border-red-200 text-red-800";
			case "warning":
				return "bg-yellow-50 border-yellow-200 text-yellow-800";
			default:
				return "bg-blue-50 border-blue-200 text-blue-800";
		}
	};

	return (
		<div className="fixed top-4 right-4 z-50 space-y-2">
			<AnimatePresence>
				{notifications.map((notification) => (
					<motion.div
						key={notification.id}
						initial={{ opacity: 0, x: 300, scale: 0.8 }}
						animate={{ opacity: 1, x: 0, scale: 1 }}
						exit={{ opacity: 0, x: 300, scale: 0.8 }}
						transition={{ duration: 0.3 }}
						className={`max-w-sm w-full border rounded-lg p-4 shadow-lg ${getStyles(
							notification.type
						)}`}>
						<div className="flex items-start gap-3">
							<div className="flex-shrink-0">
								{getIcon(notification.type)}
							</div>
							<div className="flex-1">
								<p className="text-sm font-medium">
									{notification.message}
								</p>
							</div>
							<button
								onClick={() =>
									removeNotification(notification.id)
								}
								className="flex-shrink-0 hover:opacity-70 transition-opacity">
								<X className="w-4 h-4" />
							</button>
						</div>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
