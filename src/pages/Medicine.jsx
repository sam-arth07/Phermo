import { motion } from "framer-motion";
import {
	AlertTriangle,
	Calendar,
	Clock,
	DollarSign,
	Download,
	Edit,
	Eye,
	Filter,
	Hash,
	Package,
	Pill,
	Plus,
	Save,
	Search,
	ShieldCheck,
	Trash2,
	X,
} from "lucide-react";
import { useState } from "react";
import { useNotification } from "../components/NotificationProvider";
import { exportToCSV, formatDataForExport } from "../utils/exportUtils";

function Medicine() {
	const notification = useNotification();
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState("all");
	const [showAddForm, setShowAddForm] = useState(false);
	const [editingMedicine, setEditingMedicine] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		category: "",
		manufacturer: "",
		batchNumber: "",
		expiryDate: "",
		stock: "",
		minStock: "",
		price: "",
		supplier: "",
		description: "",
		dosage: "",
		activeIngredient: "",
	});
	// Sample medicine data - converted to state for CRUD operations
	const [medicines, setMedicines] = useState([
		{
			id: "MED-001",
			name: "Paracetamol 500mg",
			category: "Pain Relief",
			manufacturer: "PharmaCorp",
			batchNumber: "PC2024001",
			expiryDate: "2025-12-15",
			stock: 150,
			minStock: 50,
			price: 12.5,
			supplier: "MediCorp Solutions",
			status: "in_stock",
			lastRestocked: "2024-05-15",
			description: "Effective pain reliever and fever reducer",
			dosage: "500mg",
			activeIngredient: "Paracetamol",
		},
		{
			id: "MED-002",
			name: "Amoxicillin 250mg",
			category: "Antibiotics",
			manufacturer: "BioTech Ltd",
			batchNumber: "BT2024002",
			expiryDate: "2025-08-20",
			stock: 25,
			minStock: 30,
			price: 8.75,
			supplier: "PharmaTech Ltd",
			status: "low_stock",
			lastRestocked: "2024-04-10",
			description: "Broad-spectrum penicillin antibiotic",
			dosage: "250mg",
			activeIngredient: "Amoxicillin",
		},
		{
			id: "MED-003",
			name: "Ibuprofen 400mg",
			category: "Anti-inflammatory",
			manufacturer: "HealthMed Inc",
			batchNumber: "HM2024003",
			expiryDate: "2025-11-30",
			stock: 80,
			minStock: 40,
			price: 15.25,
			supplier: "Global Medicine Inc",
			status: "in_stock",
			lastRestocked: "2024-06-01",
			description: "Non-steroidal anti-inflammatory drug",
			dosage: "400mg",
			activeIngredient: "Ibuprofen",
		},
		{
			id: "MED-004",
			name: "Lisinopril 10mg",
			category: "Cardiovascular",
			manufacturer: "CardioPharm",
			batchNumber: "CP2024004",
			expiryDate: "2024-08-15",
			stock: 60,
			minStock: 25,
			price: 22.0,
			supplier: "HealthCare Distributors",
			status: "expiring_soon",
			lastRestocked: "2024-03-20",
			description: "ACE inhibitor for high blood pressure",
			dosage: "10mg",
			activeIngredient: "Lisinopril",
		},
		{
			id: "MED-005",
			name: "Metformin 500mg",
			category: "Diabetes",
			manufacturer: "DiabetesRx",
			batchNumber: "DR2024005",
			expiryDate: "2026-03-10",
			stock: 0,
			minStock: 35,
			price: 18.5,
			supplier: "Advanced Biotech",
			status: "out_of_stock",
			lastRestocked: "2024-01-15",
			description: "Type 2 diabetes medication",
			dosage: "500mg",
			activeIngredient: "Metformin",
		},
	]);

	// CRUD Functions
	const generateMedicineId = () => {
		const lastId =
			medicines.length > 0
				? Math.max(
						...medicines.map((m) => parseInt(m.id.split("-")[1]))
				  )
				: 0;
		return `MED-${String(lastId + 1).padStart(3, "0")}`;
	};

	const determineStatus = (stock, minStock, expiryDate) => {
		if (stock === 0) return "out_of_stock";
		if (stock <= minStock) return "low_stock";

		const expiry = new Date(expiryDate);
		const today = new Date();
		const daysUntilExpiry = Math.ceil(
			(expiry - today) / (1000 * 60 * 60 * 24)
		);

		if (daysUntilExpiry <= 30) return "expiring_soon";
		return "in_stock";
	};
	const handleAddMedicine = () => {
		if (!formData.name || !formData.category || !formData.manufacturer) {
			notification.error("Please fill in all required fields");
			return;
		}

		const newMedicine = {
			id: generateMedicineId(),
			...formData,
			stock: parseInt(formData.stock) || 0,
			minStock: parseInt(formData.minStock) || 0,
			price: parseFloat(formData.price) || 0,
			status: determineStatus(
				parseInt(formData.stock) || 0,
				parseInt(formData.minStock) || 0,
				formData.expiryDate
			),
			lastRestocked: new Date().toISOString().split("T")[0],
		};

		setMedicines([...medicines, newMedicine]);
		notification.success(`${formData.name} has been added successfully!`);
		resetForm();
	};
	const handleUpdateMedicine = () => {
		if (!formData.name || !formData.category || !formData.manufacturer) {
			notification.error("Please fill in all required fields");
			return;
		}

		const updatedMedicine = {
			...editingMedicine,
			...formData,
			stock: parseInt(formData.stock) || 0,
			minStock: parseInt(formData.minStock) || 0,
			price: parseFloat(formData.price) || 0,
			status: determineStatus(
				parseInt(formData.stock) || 0,
				parseInt(formData.minStock) || 0,
				formData.expiryDate
			),
		};

		setMedicines(
			medicines.map((m) =>
				m.id === editingMedicine.id ? updatedMedicine : m
			)
		);
		notification.success(`${formData.name} has been updated successfully!`);
		resetForm();
	};
	const handleDeleteMedicine = (medicineId) => {
		const medicine = medicines.find((m) => m.id === medicineId);
		if (
			window.confirm(`Are you sure you want to delete ${medicine?.name}?`)
		) {
			setMedicines(medicines.filter((m) => m.id !== medicineId));
			notification.success(
				`${medicine?.name} has been deleted successfully!`
			);
		}
	};

	const handleEditMedicine = (medicine) => {
		setEditingMedicine(medicine);
		setFormData({
			name: medicine.name,
			category: medicine.category,
			manufacturer: medicine.manufacturer,
			batchNumber: medicine.batchNumber,
			expiryDate: medicine.expiryDate,
			stock: medicine.stock.toString(),
			minStock: medicine.minStock.toString(),
			price: medicine.price.toString(),
			supplier: medicine.supplier,
			description: medicine.description || "",
			dosage: medicine.dosage || "",
			activeIngredient: medicine.activeIngredient || "",
		});
		setShowAddForm(true);
	};

	const resetForm = () => {
		setFormData({
			name: "",
			category: "",
			manufacturer: "",
			batchNumber: "",
			expiryDate: "",
			stock: "",
			minStock: "",
			price: "",
			supplier: "",
			description: "",
			dosage: "",
			activeIngredient: "",
		});
		setEditingMedicine(null);
		setShowAddForm(false);
	};

	const categories = [
		"Pain Relief",
		"Antibiotics",
		"Anti-inflammatory",
		"Cardiovascular",
		"Diabetes",
		"Respiratory",
		"Dermatology",
		"Vitamins",
	];

	const filters = [
		{ id: "all", label: "All Medicines", count: medicines.length },
		{
			id: "in_stock",
			label: "In Stock",
			count: medicines.filter((m) => m.status === "in_stock").length,
		},
		{
			id: "low_stock",
			label: "Low Stock",
			count: medicines.filter((m) => m.status === "low_stock").length,
		},
		{
			id: "out_of_stock",
			label: "Out of Stock",
			count: medicines.filter((m) => m.status === "out_of_stock").length,
		},
		{
			id: "expiring_soon",
			label: "Expiring Soon",
			count: medicines.filter((m) => m.status === "expiring_soon").length,
		},
	];

	const getStatusColor = (status) => {
		switch (status) {
			case "in_stock":
				return "bg-green-100 text-green-800 border-green-200";
			case "low_stock":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "out_of_stock":
				return "bg-red-100 text-red-800 border-red-200";
			case "expiring_soon":
				return "bg-orange-100 text-orange-800 border-orange-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const getStatusIcon = (status) => {
		switch (status) {
			case "in_stock":
				return <ShieldCheck className="w-4 h-4" />;
			case "low_stock":
				return <AlertTriangle className="w-4 h-4" />;
			case "out_of_stock":
				return <Package className="w-4 h-4" />;
			case "expiring_soon":
				return <Clock className="w-4 h-4" />;
			default:
				return <Package className="w-4 h-4" />;
		}
	};

	const getCategoryColor = (category) => {
		const colors = {
			"Pain Relief": "bg-blue-100 text-blue-800",
			Antibiotics: "bg-purple-100 text-purple-800",
			"Anti-inflammatory": "bg-green-100 text-green-800",
			Cardiovascular: "bg-red-100 text-red-800",
			Diabetes: "bg-yellow-100 text-yellow-800",
			Respiratory: "bg-indigo-100 text-indigo-800",
			Dermatology: "bg-pink-100 text-pink-800",
			Vitamins: "bg-orange-100 text-orange-800",
		};
		return colors[category] || "bg-gray-100 text-gray-800";
	};

	const filteredMedicines = medicines.filter((medicine) => {
		const matchesFilter =
			activeFilter === "all" || medicine.status === activeFilter;
		const matchesSearch =
			medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			medicine.manufacturer
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			medicine.category.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesFilter && matchesSearch;
	});

	const totalMedicines = medicines.length;
	const lowStockCount = medicines.filter(
		(m) => m.status === "low_stock" || m.status === "out_of_stock"
	).length;
	const expiringCount = medicines.filter(
		(m) => m.status === "expiring_soon"
	).length;
	const totalValue = medicines.reduce(
		(sum, medicine) => sum + medicine.stock * medicine.price,
		0
	);
	const getDaysUntilExpiry = (expiryDate) => {
		const today = new Date();
		const expiry = new Date(expiryDate);
		const diffTime = expiry - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	const handleExport = () => {
		try {
			const exportData = formatDataForExport(filteredMedicines);
			const timestamp = new Date().toISOString().split("T")[0];
			exportToCSV(exportData, `medicine-inventory-${timestamp}.csv`);
			notification.success(
				`Medicine data exported successfully! (${filteredMedicines.length} records)`
			);
		} catch (error) {
			notification.error("Failed to export data. Please try again.");
		}
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
						Medicine Inventory
					</h1>
					<p className="text-gray-600 mt-1">
						Manage your medicine stock and expiry tracking
					</p>
				</div>{" "}
				<button
					onClick={() => setShowAddForm(true)}
					className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 transform hover:scale-105">
					<Plus className="w-5 h-5" />
					Add New Medicine
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
								Total Medicines
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								{totalMedicines}
							</p>
							<p className="text-xs text-blue-600 mt-1">
								{categories.length} categories
							</p>
						</div>
						<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
							<Pill className="w-6 h-6 text-blue-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Stock Alerts
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								{lowStockCount}
							</p>
							<p className="text-xs text-red-600 mt-1">
								Need attention
							</p>
						</div>
						<div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
							<AlertTriangle className="w-6 h-6 text-red-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Expiring Soon
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								{expiringCount}
							</p>
							<p className="text-xs text-orange-600 mt-1">
								Within 60 days
							</p>
						</div>
						<div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
							<Clock className="w-6 h-6 text-orange-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Inventory Value
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">
								${totalValue.toFixed(2)}
							</p>
							<p className="text-xs text-green-600 mt-1">
								Current stock value
							</p>
						</div>
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
							<Package className="w-6 h-6 text-green-600" />
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
							placeholder="Search medicines by name, manufacturer, or category..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					<div className="flex gap-2">
						{" "}
						<button className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
							<Filter className="w-4 h-4" />
							More Filters
						</button>
						<button
							onClick={handleExport}
							className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
							<Download className="w-4 h-4" />
							Export
						</button>
					</div>
				</div>
			</motion.div>

			{/* Medicines Table */}
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
									Medicine
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Category
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Stock
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Price
								</th>
								<th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
									Expiry
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
							{filteredMedicines.map((medicine, index) => (
								<motion.tr
									key={medicine.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.1 * index }}
									className="hover:bg-gray-50 transition-colors">
									<td className="px-6 py-4">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
												<Pill className="w-5 h-5 text-blue-600" />
											</div>
											<div>
												<div className="font-medium text-gray-900">
													{medicine.name}
												</div>
												<div className="text-sm text-gray-500">
													{medicine.manufacturer}
												</div>
												<div className="text-xs text-gray-400">
													Batch:{" "}
													{medicine.batchNumber}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4">
										<span
											className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
												medicine.category
											)}`}>
											{medicine.category}
										</span>
									</td>
									<td className="px-6 py-4">
										<div>
											<div className="font-medium text-gray-900">
												{medicine.stock} units
											</div>
											<div className="text-sm text-gray-500">
												Min: {medicine.minStock}
											</div>
										</div>
									</td>
									<td className="px-6 py-4">
										<span className="font-semibold text-gray-900">
											${medicine.price}
										</span>
									</td>
									<td className="px-6 py-4">
										<div>
											<div className="text-sm text-gray-900">
												{new Date(
													medicine.expiryDate
												).toLocaleDateString()}
											</div>
											<div className="text-xs text-gray-500">
												{getDaysUntilExpiry(
													medicine.expiryDate
												)}{" "}
												days left
											</div>
										</div>
									</td>
									<td className="px-6 py-4">
										<span
											className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
												medicine.status
											)}`}>
											{getStatusIcon(medicine.status)}
											{medicine.status
												.replace("_", " ")
												.replace(/\b\w/g, (l) =>
													l.toUpperCase()
												)}
										</span>
									</td>{" "}
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<button
												title="View Details"
												className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
												<Eye className="w-4 h-4" />
											</button>
											<button
												onClick={() =>
													handleEditMedicine(medicine)
												}
												title="Edit Medicine"
												className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
												<Edit className="w-4 h-4" />
											</button>
											<button
												onClick={() =>
													handleDeleteMedicine(
														medicine.id
													)
												}
												title="Delete Medicine"
												className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
												<Trash2 className="w-4 h-4" />
											</button>
										</div>
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>{" "}
				</div>
			</motion.div>

			{/* Add/Edit Medicine Modal */}
			{showAddForm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-2xl font-bold text-gray-900">
								{editingMedicine
									? "Edit Medicine"
									: "Add New Medicine"}
							</h2>
							<button
								onClick={resetForm}
								className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
								<X className="w-5 h-5 text-gray-500" />
							</button>
						</div>

						<form
							onSubmit={(e) => e.preventDefault()}
							className="space-y-6">
							{/* Basic Information */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<Pill className="w-5 h-5 text-blue-600" />
									Basic Information
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Medicine Name *
										</label>
										<input
											type="text"
											value={formData.name}
											onChange={(e) =>
												setFormData({
													...formData,
													name: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="Enter medicine name"
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Category *
										</label>
										<select
											value={formData.category}
											onChange={(e) =>
												setFormData({
													...formData,
													category: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required>
											<option value="">
												Select category
											</option>
											{categories.map((category) => (
												<option
													key={category}
													value={category}>
													{category}
												</option>
											))}
										</select>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Manufacturer *
										</label>
										<input
											type="text"
											value={formData.manufacturer}
											onChange={(e) =>
												setFormData({
													...formData,
													manufacturer:
														e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="Enter manufacturer name"
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Supplier
										</label>
										<input
											type="text"
											value={formData.supplier}
											onChange={(e) =>
												setFormData({
													...formData,
													supplier: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="Enter supplier name"
										/>
									</div>
								</div>
							</div>

							{/* Medicine Details */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<Hash className="w-5 h-5 text-purple-600" />
									Medicine Details
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Active Ingredient
										</label>
										<input
											type="text"
											value={formData.activeIngredient}
											onChange={(e) =>
												setFormData({
													...formData,
													activeIngredient:
														e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="Enter active ingredient"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Dosage
										</label>
										<input
											type="text"
											value={formData.dosage}
											onChange={(e) =>
												setFormData({
													...formData,
													dosage: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="e.g., 500mg, 10ml"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Batch Number
										</label>
										<input
											type="text"
											value={formData.batchNumber}
											onChange={(e) =>
												setFormData({
													...formData,
													batchNumber: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="Enter batch number"
										/>
									</div>
									<div>
										{" "}
										<label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
											<Calendar className="w-4 h-4" />
											Expiry Date *
										</label>
										<input
											type="date"
											value={formData.expiryDate}
											onChange={(e) =>
												setFormData({
													...formData,
													expiryDate: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
										/>
									</div>
								</div>
								<div className="mt-4">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Description
									</label>
									<textarea
										value={formData.description}
										onChange={(e) =>
											setFormData({
												...formData,
												description: e.target.value,
											})
										}
										rows={3}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Enter medicine description"
									/>
								</div>
							</div>

							{/* Stock & Pricing */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<DollarSign className="w-5 h-5 text-green-600" />
									Stock & Pricing
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Current Stock
										</label>
										<input
											type="number"
											value={formData.stock}
											onChange={(e) =>
												setFormData({
													...formData,
													stock: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="0"
											min="0"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Minimum Stock Level
										</label>
										<input
											type="number"
											value={formData.minStock}
											onChange={(e) =>
												setFormData({
													...formData,
													minStock: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="0"
											min="0"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Price per Unit ($)
										</label>
										<input
											type="number"
											step="0.01"
											value={formData.price}
											onChange={(e) =>
												setFormData({
													...formData,
													price: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="0.00"
											min="0"
										/>
									</div>
								</div>
							</div>

							{/* Form Actions */}
							<div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
								<button
									type="button"
									onClick={resetForm}
									className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
									Cancel
								</button>
								<button
									type="button"
									onClick={
										editingMedicine
											? handleUpdateMedicine
											: handleAddMedicine
									}
									className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
									<Save className="w-4 h-4" />
									{editingMedicine
										? "Update Medicine"
										: "Add Medicine"}
								</button>
							</div>
						</form>
					</motion.div>
				</div>
			)}
		</div>
	);
}

export default Medicine;
