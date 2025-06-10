import { motion } from "framer-motion";
import { Camera, Mail, MapPin, Phone, Save, User } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/slices/authSlice";

function Profile() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		email: user?.email || "",
		phone: user?.phone || "",
		location: user?.location || "",
		bio: user?.bio || "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateProfile(formData));
		setIsEditing(false);
	};

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="bg-white rounded-xl shadow-sm border border-gray-100">
				{/* Header */}
				<div className="p-6 border-b border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								Profile Settings
							</h1>
							<p className="text-gray-600 mt-1">
								Manage your account information and preferences
							</p>
						</div>
						<button
							onClick={() => setIsEditing(!isEditing)}
							className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
							{isEditing ? "Cancel" : "Edit Profile"}
						</button>
					</div>
				</div>

				{/* Profile Content */}
				<div className="p-6">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Avatar Section */}
						<div className="lg:col-span-1">
							<div className="text-center">
								<div className="relative inline-block">
									<div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto">
										{user?.firstName?.charAt(0) || "U"}
									</div>
									{isEditing && (
										<button className="absolute bottom-0 right-0 w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
											<Camera className="w-5 h-5 text-gray-600" />
										</button>
									)}
								</div>
								<h2 className="text-xl font-semibold text-gray-900 mt-4">
									{user?.firstName} {user?.lastName}
								</h2>
								<p className="text-gray-600">{user?.email}</p>
							</div>
						</div>

						{/* Form Section */}
						<div className="lg:col-span-2">
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Personal Information */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
										<User className="w-5 h-5 text-blue-600" />
										Personal Information
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												First Name
											</label>
											<input
												type="text"
												name="firstName"
												value={formData.firstName}
												onChange={handleInputChange}
												disabled={!isEditing}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Last Name
											</label>
											<input
												type="text"
												name="lastName"
												value={formData.lastName}
												onChange={handleInputChange}
												disabled={!isEditing}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
											/>
										</div>
									</div>
								</div>

								{/* Contact Information */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
										<Mail className="w-5 h-5 text-green-600" />
										Contact Information
									</h3>
									<div className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Email Address
											</label>
											<input
												type="email"
												name="email"
												value={formData.email}
												onChange={handleInputChange}
												disabled={!isEditing}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
											/>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Phone Number
												</label>
												<div className="relative">
													<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
													<input
														type="tel"
														name="phone"
														value={formData.phone}
														onChange={
															handleInputChange
														}
														disabled={!isEditing}
														placeholder="+1 (555) 123-4567"
														className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
													/>
												</div>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Location
												</label>
												<div className="relative">
													<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
													<input
														type="text"
														name="location"
														value={
															formData.location
														}
														onChange={
															handleInputChange
														}
														disabled={!isEditing}
														placeholder="City, Country"
														className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Bio */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Bio
									</label>
									<textarea
										name="bio"
										value={formData.bio}
										onChange={handleInputChange}
										disabled={!isEditing}
										rows={4}
										placeholder="Tell us about yourself..."
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
									/>
								</div>

								{/* Save Button */}
								{isEditing && (
									<div className="flex justify-end">
										<button
											type="submit"
											className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
											<Save className="w-4 h-4" />
											Save Changes
										</button>
									</div>
								)}
							</form>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

export default Profile;
