// Export utilities for data download functionality
export const exportToCSV = (data, filename = "data.csv") => {
	if (!data || data.length === 0) {
		throw new Error("No data to export");
	}

	// Get headers from the first object
	const headers = Object.keys(data[0]);

	// Create CSV content
	const csvContent = [
		headers.join(","), // Header row
		...data.map((row) =>
			headers
				.map((header) => {
					const value = row[header];
					// Handle values that contain commas, quotes, or newlines
					if (
						typeof value === "string" &&
						(value.includes(",") ||
							value.includes('"') ||
							value.includes("\n"))
					) {
						return `"${value.replace(/"/g, '""')}"`;
					}
					return value;
				})
				.join(",")
		),
	].join("\n");

	// Create and trigger download
	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);

	link.setAttribute("href", url);
	link.setAttribute("download", filename);
	link.style.visibility = "hidden";

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	// Clean up the URL object
	URL.revokeObjectURL(url);
};

export const exportToJSON = (data, filename = "data.json") => {
	if (!data) {
		throw new Error("No data to export");
	}

	const jsonContent = JSON.stringify(data, null, 2);
	const blob = new Blob([jsonContent], {
		type: "application/json;charset=utf-8;",
	});
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);

	link.setAttribute("href", url);
	link.setAttribute("download", filename);
	link.style.visibility = "hidden";

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	URL.revokeObjectURL(url);
};

export const formatDataForExport = (medicines) => {
	return medicines.map((medicine) => ({
		ID: medicine.id,
		Name: medicine.name,
		Category: medicine.category,
		Manufacturer: medicine.manufacturer,
		"Batch Number": medicine.batchNumber,
		"Expiry Date": medicine.expiryDate,
		"Current Stock": medicine.stock,
		"Minimum Stock": medicine.minStock,
		"Price ($)": medicine.price,
		Supplier: medicine.supplier,
		Status: medicine.status.replace("_", " ").toUpperCase(),
		"Last Restocked": medicine.lastRestocked,
		Dosage: medicine.dosage,
		"Active Ingredient": medicine.activeIngredient,
		Description: medicine.description,
	}));
};
