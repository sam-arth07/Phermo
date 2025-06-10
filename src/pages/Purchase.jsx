import { motion } from "framer-motion";
import {
	Calendar,
	DollarSign,
	Download,
	Eye,
	FileText,
	Filter,
	Package,
	Plus,
	Search,
	Truck,
	User,
} from "lucide-react";
import { useState } from "react";

function Purchase() {
	const [activeTab, setActiveTab] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");

	// Sample purchase data
	const purchases = [
		{
			id: "PUR-001",
			supplier: "MediCorp Solutions",
			date: "2024-06-10",
			total: 15750,
			items: 25,
			status: "completed",
			invoice: "INV-2024-001",
		},
		{
			id: "PUR-002",
			supplier: "PharmaTech Ltd",
			date: "2024-06-09",
			total: 8420,
			items: 12,
			status: "pending",
			invoice: "INV-2024-002",
		},
		{
			id: "PUR-003",
			supplier: "Global Medicine Inc",
			date: "2024-06-08",
			total: 22350,
			items: 35,
			status: "completed",
			invoice: "INV-2024-003",
		},
		{
			id: "PUR-004",
			supplier: "HealthCare Distributors",
			date: "2024-06-07",
			total: 12150,
			items: 18,
			status: "cancelled",
			invoice: "INV-2024-004",
		},
	];

	const tabs = [
		{ id: "all", label: "All Purchases", count: purchases.length },
		{
			id: "completed",
			label: "Completed",
			count: purchases.filter((p) => p.status === "completed").length,
		},
		{
			id: "pending",
			label: "Pending",
			count: purchases.filter((p) => p.status === "pending").length,
		},
		{
			id: "cancelled",
			label: "Cancelled",
			count: purchases.filter((p) => p.status === "cancelled").length,
		},
	];

	const getStatusColor = (status) => {
		switch (status) {
			case "completed":
				return "bg-green-100 text-green-800 border-green-200";
			case "pending":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "cancelled":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const filteredPurchases = purchases.filter((purchase) => {
		const matchesTab = activeTab === "all" || purchase.status === activeTab;
		const matchesSearch =
			purchase.supplier
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			purchase.id.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesTab && matchesSearch;
	});

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Purchase Management
					</h1>
					<p className="text-gray-600 mt-1">
						Track and manage all your purchase orders
					</p>
				</div>
				<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 transform hover:scale-105">
					<Plus className="w-5 h-5" />
					New Purchase Order
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
								Total Purchases
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								$58,670
							</p>
							<p className="text-xs text-green-600 mt-1">
								+12% from last month
							</p>
						</div>
						<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
							<DollarSign className="w-6 h-6 text-blue-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Total Orders
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								{purchases.length}
							</p>
							<p className="text-xs text-green-600 mt-1">
								+3 this week
							</p>
						</div>
						<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
							<Package className="w-6 h-6 text-purple-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Pending Orders
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								{
									purchases.filter(
										(p) => p.status === "pending"
									).length
								}
							</p>
							<p className="text-xs text-yellow-600 mt-1">
								Needs attention
							</p>
						</div>
						<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
							<Truck className="w-6 h-6 text-yellow-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Suppliers
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								8
							</p>
							<p className="text-xs text-blue-600 mt-1">
								Active partnerships
							</p>
						</div>
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
							<User className="w-6 h-6 text-green-600" />
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
							placeholder="Search purchases by supplier or ID..."
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

			{/* Purchase Orders Table */}
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
									Purchase ID
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Supplier
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
									Status
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{filteredPurchases.map((purchase, index) => (
								<motion.tr
									key={purchase.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.1 * index }}
									className="hover:bg-gray-50 transition-colors">
									<td className="px-6 py-4">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
												<FileText className="w-5 h-5 text-blue-600" />
											</div>
											<div>
												<div className="font-medium text-gray-900">
													{purchase.id}
												</div>
												<div className="text-sm text-gray-500">
													{purchase.invoice}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="font-medium text-gray-900">
											{purchase.supplier}
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2 text-gray-600">
											<Calendar className="w-4 h-4" />
											{new Date(
												purchase.date
											).toLocaleDateString()}
										</div>
									</td>
									<td className="px-6 py-4">
										<span className="text-gray-900">
											{purchase.items} items
										</span>
									</td>
									<td className="px-6 py-4">
										<span className="font-semibold text-gray-900">
											${purchase.total.toLocaleString()}
										</span>
									</td>
									<td className="px-6 py-4">
										<span
											className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
												purchase.status
											)}`}>
											{purchase.status
												.charAt(0)
												.toUpperCase() +
												purchase.status.slice(1)}
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

export default Purchase;
