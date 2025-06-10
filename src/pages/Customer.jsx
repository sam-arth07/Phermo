import { motion } from "framer-motion";
import { 
	Calendar, 
	Mail, 
	MapPin, 
	Phone, 
	Plus, 
	Search, 
	User,
	Filter,
	Download,
	Eye,
	Edit,
	Trash2,
	CreditCard,
	ShoppingBag
} from "lucide-react";
import { useState } from "react";

function Customer() {
	const [searchTerm, setSearchTerm] = useState('');
	const [activeFilter, setActiveFilter] = useState('all');

	// Sample customers data
	const customers = [
		{
			id: 'CUST-001',
			name: 'John Doe',
			email: 'john.doe@email.com',
			phone: '+1 (555) 123-4567',
			address: '123 Main Street, New York, NY 10001',
			joinDate: '2024-01-15',
			totalPurchases: 15,
			totalSpent: 1247.50,
			lastPurchase: '2024-06-10',
			status: 'active',
			loyaltyPoints: 125
		},
		{
			id: 'CUST-002',
			name: 'Sarah Johnson',
			email: 'sarah.j@email.com',
			phone: '+1 (555) 987-6543',
			address: '456 Oak Avenue, Boston, MA 02101',
			joinDate: '2024-02-22',
			totalPurchases: 8,
			totalSpent: 689.25,
			lastPurchase: '2024-06-09',
			status: 'active',
			loyaltyPoints: 68
		},
		{
			id: 'CUST-003',
			name: 'Mike Wilson',
			email: 'mike.wilson@email.com',
			phone: '+1 (555) 456-7890',
			address: '789 Pine Road, Chicago, IL 60601',
			joinDate: '2023-11-08',
			totalPurchases: 23,
			totalSpent: 2156.75,
			lastPurchase: '2024-06-08',
			status: 'vip',
			loyaltyPoints: 215
		},
		{
			id: 'CUST-004',
			name: 'Emily Davis',
			email: 'emily.davis@email.com',
			phone: '+1 (555) 234-5678',
			address: '321 Elm Street, Dallas, TX 75201',
			joinDate: '2024-03-10',
			totalPurchases: 5,
			totalSpent: 324.80,
			lastPurchase: '2024-05-28',
			status: 'inactive',
			loyaltyPoints: 32
		},
		{
			id: 'CUST-005',
			name: 'David Brown',
			email: 'david.brown@email.com',
			phone: '+1 (555) 345-6789',
			address: '654 Maple Drive, San Francisco, CA 94102',
			joinDate: '2024-04-12',
			totalPurchases: 12,
			totalSpent: 967.90,
			lastPurchase: '2024-06-07',
			status: 'active',
			loyaltyPoints: 96
		}
	];

	const filters = [
		{ id: 'all', label: 'All Customers', count: customers.length },
		{ id: 'active', label: 'Active', count: customers.filter(c => c.status === 'active').length },
		{ id: 'vip', label: 'VIP', count: customers.filter(c => c.status === 'vip').length },
		{ id: 'inactive', label: 'Inactive', count: customers.filter(c => c.status === 'inactive').length }
	];

	const getStatusColor = (status) => {
		switch (status) {
			case 'active': return 'bg-green-100 text-green-800 border-green-200';
			case 'vip': return 'bg-purple-100 text-purple-800 border-purple-200';
			case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
			default: return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	const filteredCustomers = customers.filter(customer => {
		const matchesFilter = activeFilter === 'all' || customer.status === activeFilter;
		const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		                     customer.email.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesFilter && matchesSearch;
	});

	const totalCustomers = customers.length;
	const activeCustomers = customers.filter(c => c.status === 'active' || c.status === 'vip').length;
	const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
	const avgSpent = totalRevenue / customers.length;

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
					<p className="text-gray-600 mt-1">Manage your customer relationships and profiles</p>
				</div>
				<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 transform hover:scale-105">
					<Plus className="w-5 h-5" />
					Add New Customer
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
							<p className="text-sm font-medium text-gray-600">Total Customers</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">{totalCustomers}</p>
							<p className="text-xs text-blue-600 mt-1">{activeCustomers} active</p>
						</div>
						<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
							<User className="w-6 h-6 text-blue-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">Total Revenue</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">${totalRevenue.toFixed(2)}</p>
							<p className="text-xs text-green-600 mt-1">+8% this month</p>
						</div>
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
							<CreditCard className="w-6 h-6 text-green-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">Avg. Spent</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">${avgSpent.toFixed(2)}</p>
							<p className="text-xs text-purple-600 mt-1">Per customer</p>
						</div>
						<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
							<ShoppingBag className="w-6 h-6 text-purple-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">VIP Customers</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">{customers.filter(c => c.status === 'vip').length}</p>
							<p className="text-xs text-yellow-600 mt-1">Premium members</p>
						</div>
						<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
							<User className="w-6 h-6 text-yellow-600" />
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
									? 'bg-gray-900 text-white'
									: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
							placeholder="Search customers by name or email..."
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

			{/* Customers Grid */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{filteredCustomers.map((customer, index) => (
					<motion.div
						key={customer.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 * index }}
						className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-medium transition-all">
						
						{/* Header */}
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
									{customer.name.split(' ').map(n => n[0]).join('')}
								</div>
								<div>
									<h3 className="font-semibold text-gray-900">{customer.name}</h3>
									<p className="text-sm text-gray-500">{customer.id}</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
									{customer.status.toUpperCase()}
								</span>
							</div>
						</div>

						{/* Contact Info */}
						<div className="space-y-2 mb-4">
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Mail className="w-4 h-4" />
								<span>{customer.email}</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Phone className="w-4 h-4" />
								<span>{customer.phone}</span>
							</div>
							<div className="flex items-start gap-2 text-sm text-gray-600">
								<MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
								<span>{customer.address}</span>
							</div>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-2 gap-4 mb-4">
							<div>
								<p className="text-xs text-gray-500">Total Purchases</p>
								<p className="font-semibold text-gray-900">{customer.totalPurchases}</p>
							</div>
							<div>
								<p className="text-xs text-gray-500">Total Spent</p>
								<p className="font-semibold text-gray-900">${customer.totalSpent}</p>
							</div>
						</div>

						{/* Additional Info */}
						<div className="flex items-center justify-between mb-4 text-sm">
							<div>
								<p className="text-gray-500">Loyalty Points</p>
								<p className="font-semibold text-purple-600">{customer.loyaltyPoints} pts</p>
							</div>
							<div className="text-right">
								<p className="text-gray-500">Last Purchase</p>
								<p className="font-semibold text-gray-900">{new Date(customer.lastPurchase).toLocaleDateString()}</p>
							</div>
						</div>

						{/* Join Date */}
						<div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
							<Calendar className="w-4 h-4" />
							<span>Joined {new Date(customer.joinDate).toLocaleDateString()}</span>
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

export default Customer;

