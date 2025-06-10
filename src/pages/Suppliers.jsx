import { motion } from "framer-motion";
import {
	Building,
	Download,
	Edit,
	Eye,
	Filter,
	Mail,
	MapPin,
	Phone,
	Plus,
	Search,
	Star,
	Trash2,
} from "lucide-react";
import { useState } from "react";

function Suppliers() {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState("all");

	// Sample suppliers data
	const suppliers = [
		{
			id: "SUP-001",
			name: "MediCorp Solutions",
			email: "contact@medicorp.com",
			phone: "+1 (555) 123-4567",
			address: "123 Medical Drive, New York, NY 10001",
			rating: 4.8,
			totalOrders: 45,
			totalValue: 125750,
			status: "active",
			joinDate: "2023-01-15",
			category: "pharmaceuticals",
		},
		{
			id: "SUP-002",
			name: "PharmaTech Ltd",
			email: "sales@pharmatech.com",
			phone: "+1 (555) 987-6543",
			address: "456 Science Park, Boston, MA 02101",
			rating: 4.6,
			totalOrders: 32,
			totalValue: 89420,
			status: "active",
			joinDate: "2023-03-22",
			category: "medical_devices",
		},
		{
			id: "SUP-003",
			name: "Global Medicine Inc",
			email: "info@globalmedicine.com",
			phone: "+1 (555) 456-7890",
			address: "789 Healthcare Blvd, Chicago, IL 60601",
			rating: 4.9,
			totalOrders: 67,
			totalValue: 198350,
			status: "active",
			joinDate: "2022-11-08",
			category: "pharmaceuticals",
		},
		{
			id: "SUP-004",
			name: "HealthCare Distributors",
			email: "orders@healthcare-dist.com",
			phone: "+1 (555) 234-5678",
			address: "321 Distribution Way, Dallas, TX 75201",
			rating: 4.3,
			totalOrders: 28,
			totalValue: 67890,
			status: "inactive",
			joinDate: "2023-05-10",
			category: "supplies",
		},
		{
			id: "SUP-005",
			name: "Advanced Biotech",
			email: "partnerships@advancedbio.com",
			phone: "+1 (555) 345-6789",
			address: "654 Innovation Drive, San Francisco, CA 94102",
			rating: 4.7,
			totalOrders: 23,
			totalValue: 156780,
			status: "active",
			joinDate: "2023-07-12",
			category: "pharmaceuticals",
		},
	];

	const filters = [
		{ id: "all", label: "All Suppliers", count: suppliers.length },
		{
			id: "active",
			label: "Active",
			count: suppliers.filter((s) => s.status === "active").length,
		},
		{
			id: "inactive",
			label: "Inactive",
			count: suppliers.filter((s) => s.status === "inactive").length,
		},
		{
			id: "pharmaceuticals",
			label: "Pharmaceuticals",
			count: suppliers.filter((s) => s.category === "pharmaceuticals")
				.length,
		},
	];

	const getStatusColor = (status) => {
		return status === "active"
			? "bg-green-100 text-green-800 border-green-200"
			: "bg-gray-100 text-gray-800 border-gray-200";
	};

	const getCategoryColor = (category) => {
		switch (category) {
			case "pharmaceuticals":
				return "bg-blue-100 text-blue-800";
			case "medical_devices":
				return "bg-purple-100 text-purple-800";
			case "supplies":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const filteredSuppliers = suppliers.filter((supplier) => {
		const matchesFilter =
			activeFilter === "all" ||
			supplier.status === activeFilter ||
			supplier.category === activeFilter;
		const matchesSearch =
			supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesFilter && matchesSearch;
	});

	const totalSuppliers = suppliers.length;
	const activeSuppliers = suppliers.filter(
		(s) => s.status === "active"
	).length;
	const totalValue = suppliers.reduce(
		(sum, supplier) => sum + supplier.totalValue,
		0
	);
	const avgRating =
		suppliers.reduce((sum, supplier) => sum + supplier.rating, 0) /
		suppliers.length;

	const renderStars = (rating) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${
					i < Math.floor(rating)
						? "text-yellow-400 fill-current"
						: "text-gray-300"
				}`}
			/>
		));
	};

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Supplier Management
					</h1>
					<p className="text-gray-600 mt-1">
						Manage your supplier relationships and partnerships
					</p>
				</div>
				<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 transform hover:scale-105">
					<Plus className="w-5 h-5" />
					Add New Supplier
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
								Total Suppliers
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								{totalSuppliers}
							</p>
							<p className="text-xs text-blue-600 mt-1">
								{activeSuppliers} active
							</p>
						</div>
						<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
							<Building className="w-6 h-6 text-blue-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Total Purchase Value
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								${totalValue.toLocaleString()}
							</p>
							<p className="text-xs text-green-600 mt-1">
								+12% this month
							</p>
						</div>
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
							<Star className="w-6 h-6 text-green-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Average Rating
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								{avgRating.toFixed(1)}
							</p>
							<div className="flex items-center gap-1 mt-1">
								{renderStars(avgRating)}
							</div>
						</div>
						<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
							<Star className="w-6 h-6 text-yellow-600" />
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
								{suppliers.reduce(
									(sum, s) => sum + s.totalOrders,
									0
								)}
							</p>
							<p className="text-xs text-purple-600 mt-1">
								Across all suppliers
							</p>
						</div>
						<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
							<Building className="w-6 h-6 text-purple-600" />
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
				{/* Filters */}
				<div className="flex flex-wrap gap-2 mb-6">
					{filters.map((filter) => (
						<button
							key={filter.id}
							onClick={() => setActiveFilter(filter.id)}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
								activeFilter === filter.id
									? "bg-gray-900 text-white"
									: "bg-gray-100 text-gray-600 hover:bg-gray-200"
							}`}>
							{filter.label} ({filter.count})
						</button>
					))}
				</div>

				{/* Search and Actions */}
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="Search suppliers by name or email..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					<div className="flex gap-2">
						<button className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
							<Filter className="w-4 h-4" />
							More Filters
						</button>
						<button className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
							<Download className="w-4 h-4" />
							Export
						</button>
					</div>
				</div>
			</motion.div>

			{/* Suppliers Grid */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{filteredSuppliers.map((supplier, index) => (
					<motion.div
						key={supplier.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 * index }}
						className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-medium transition-all">
						{/* Header */}
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
									<Building className="w-6 h-6 text-white" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-900">
										{supplier.name}
									</h3>
									<p className="text-sm text-gray-500">
										{supplier.id}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<span
									className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
										supplier.status
									)}`}>
									{supplier.status}
								</span>
							</div>
						</div>

						{/* Contact Info */}
						<div className="space-y-2 mb-4">
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Mail className="w-4 h-4" />
								<span>{supplier.email}</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Phone className="w-4 h-4" />
								<span>{supplier.phone}</span>
							</div>
							<div className="flex items-start gap-2 text-sm text-gray-600">
								<MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
								<span>{supplier.address}</span>
							</div>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-2 gap-4 mb-4">
							<div>
								<p className="text-xs text-gray-500">
									Total Orders
								</p>
								<p className="font-semibold text-gray-900">
									{supplier.totalOrders}
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500">
									Total Value
								</p>
								<p className="font-semibold text-gray-900">
									${supplier.totalValue.toLocaleString()}
								</p>
							</div>
						</div>

						{/* Rating and Category */}
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-1">
								{renderStars(supplier.rating)}
								<span className="text-sm text-gray-600 ml-1">
									{supplier.rating}
								</span>
							</div>
							<span
								className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
									supplier.category
								)}`}>
								{supplier.category.replace("_", " ")}
							</span>
						</div>

						{/* Actions */}
						<div className="flex items-center gap-2 pt-4 border-t border-gray-100">
							<button className="flex-1 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2">
								<Eye className="w-4 h-4" />
								View
							</button>
							<button className="flex-1 px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center justify-center gap-2">
								<Edit className="w-4 h-4" />
								Edit
							</button>
							<button className="flex-1 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2">
								<Trash2 className="w-4 h-4" />
								Delete
							</button>
						</div>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}

export default Suppliers;
