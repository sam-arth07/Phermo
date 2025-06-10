import { motion } from "framer-motion";
import {
	Calendar,
	CreditCard,
	DollarSign,
	Download,
	Edit,
	Eye,
	Filter,
	Plus,
	Receipt,
	Search,
	TrendingUp,
	User,
} from "lucide-react";
import { useState } from "react";

function Sale() {
	const [activeTab, setActiveTab] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");

	// Sample sales data
	const sales = [
		{
			id: "SALE-001",
			customer: "John Doe",
			date: "2024-06-10",
			total: 247.5,
			items: 5,
			paymentMethod: "card",
			status: "completed",
			receipt: "RCP-2024-001",
		},
		{
			id: "SALE-002",
			customer: "Sarah Johnson",
			date: "2024-06-10",
			total: 89.25,
			items: 3,
			paymentMethod: "cash",
			status: "completed",
			receipt: "RCP-2024-002",
		},
		{
			id: "SALE-003",
			customer: "Mike Wilson",
			date: "2024-06-09",
			total: 156.75,
			items: 7,
			paymentMethod: "card",
			status: "refunded",
			receipt: "RCP-2024-003",
		},
		{
			id: "SALE-004",
			customer: "Emily Davis",
			date: "2024-06-09",
			total: 324.8,
			items: 12,
			paymentMethod: "insurance",
			status: "pending",
			receipt: "RCP-2024-004",
		},
		{
			id: "SALE-005",
			customer: "David Brown",
			date: "2024-06-08",
			total: 67.9,
			items: 2,
			paymentMethod: "cash",
			status: "completed",
			receipt: "RCP-2024-005",
		},
	];

	const tabs = [
		{ id: "all", label: "All Sales", count: sales.length },
		{
			id: "completed",
			label: "Completed",
			count: sales.filter((s) => s.status === "completed").length,
		},
		{
			id: "pending",
			label: "Pending",
			count: sales.filter((s) => s.status === "pending").length,
		},
		{
			id: "refunded",
			label: "Refunded",
			count: sales.filter((s) => s.status === "refunded").length,
		},
	];

	const getStatusColor = (status) => {
		switch (status) {
			case "completed":
				return "bg-green-100 text-green-800 border-green-200";
			case "pending":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "refunded":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const getPaymentMethodIcon = (method) => {
		switch (method) {
			case "card":
				return <CreditCard className="w-4 h-4" />;
			case "cash":
				return <DollarSign className="w-4 h-4" />;
			case "insurance":
				return <Receipt className="w-4 h-4" />;
			default:
				return <DollarSign className="w-4 h-4" />;
		}
	};

	const filteredSales = sales.filter((sale) => {
		const matchesTab = activeTab === "all" || sale.status === activeTab;
		const matchesSearch =
			sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
			sale.id.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesTab && matchesSearch;
	});

	const totalRevenue = sales
		.filter((s) => s.status === "completed")
		.reduce((sum, sale) => sum + sale.total, 0);
	const todaysSales = sales.filter(
		(s) => s.date === "2024-06-10" && s.status === "completed"
	);
	const todaysRevenue = todaysSales.reduce(
		(sum, sale) => sum + sale.total,
		0
	);

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Sales Management
					</h1>
					<p className="text-gray-600 mt-1">
						Track and manage all your sales transactions
					</p>
				</div>
				<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 transform hover:scale-105">
					<Plus className="w-5 h-5" />
					New Sale
				</button>
			</motion.div>

			{/* Stats Cards */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Today's Revenue
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								${todaysRevenue.toFixed(2)}
							</p>
							<p className="text-xs text-green-600 mt-1">
								+18% from yesterday
							</p>
						</div>
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
							<DollarSign className="w-6 h-6 text-green-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Today's Sales
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								{todaysSales.length}
							</p>
							<p className="text-xs text-blue-600 mt-1">
								{sales
									.filter((s) => s.date === "2024-06-10")
									.reduce((sum, s) => sum + s.items, 0)}{" "}
								items sold
							</p>
						</div>
						<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
							<Receipt className="w-6 h-6 text-blue-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Total Revenue
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								${totalRevenue.toFixed(2)}
							</p>
							<p className="text-xs text-purple-600 mt-1">
								This month
							</p>
						</div>
						<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
							<TrendingUp className="w-6 h-6 text-purple-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Customers
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								{new Set(sales.map((s) => s.customer)).size}
							</p>
							<p className="text-xs text-orange-600 mt-1">
								Unique customers
							</p>
						</div>
						<div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
							<User className="w-6 h-6 text-orange-600" />
						</div>
					</div>
				</div>
			</motion.div>

			{/* Filters and Search */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
				{/* Tabs */}
				<div className="flex flex-wrap gap-2 mb-6">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
								activeTab === tab.id
									? "bg-gray-900 text-white"
									: "bg-gray-100 text-gray-600 hover:bg-gray-200"
							}`}>
							{tab.label} ({tab.count})
						</button>
					))}
				</div>

				{/* Search and Filters */}
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="Search sales by customer or ID..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					<div className="flex gap-2">
						<button className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
							<Filter className="w-4 h-4" />
							Filter
						</button>
						<button className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
							<Download className="w-4 h-4" />
							Export
						</button>
					</div>
				</div>
			</motion.div>

			{/* Sales Table */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50 border-b border-gray-100">
							<tr>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Sale ID
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Customer
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Date
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Items
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Total
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Payment
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Status
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{filteredSales.map((sale, index) => (
								<motion.tr
									key={sale.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.1 * index }}
									className="hover:bg-gray-50 transition-colors">
									<td className="px-6 py-4">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
												<Receipt className="w-5 h-5 text-blue-600" />
											</div>
											<div>
												<div className="font-medium text-gray-900">
													{sale.id}
												</div>
												<div className="text-sm text-gray-500">
													{sale.receipt}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
												<User className="w-4 h-4 text-gray-600" />
											</div>
											<div className="font-medium text-gray-900">
												{sale.customer}
											</div>
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2 text-gray-600">
											<Calendar className="w-4 h-4" />
											{new Date(
												sale.date
											).toLocaleDateString()}
										</div>
									</td>
									<td className="px-6 py-4">
										<span className="text-gray-900">
											{sale.items} items
										</span>
									</td>
									<td className="px-6 py-4">
										<span className="font-semibold text-gray-900">
											${sale.total.toFixed(2)}
										</span>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											{getPaymentMethodIcon(
												sale.paymentMethod
											)}
											<span className="text-sm text-gray-600 capitalize">
												{sale.paymentMethod}
											</span>
										</div>
									</td>
									<td className="px-6 py-4">
										<span
											className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
												sale.status
											)}`}>
											{sale.status
												.charAt(0)
												.toUpperCase() +
												sale.status.slice(1)}
										</span>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
												<Eye className="w-4 h-4" />
											</button>
											<button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
												<Download className="w-4 h-4" />
											</button>
											<button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
												<Edit className="w-4 h-4" />
											</button>
										</div>
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>
		</div>
	);
}

export default Sale;
