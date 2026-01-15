const COMPONENTS = [
	{ name: "PriceTable.js", import: () => import("./components/PriceTable.js") },
	{ name: "GoogleMaps.js", import: () => import("./components/GoogleMaps.js") },
];

const loadComponents = async () => {
	const loadPromises = COMPONENTS.map((component) => {
		return component
			.import()
			.then((module) => { })
			.catch((error) => {
				console.error(
					`[componentLoader] Failed to load component ${component.name}:`,
					error
				);
			});
	});

	await Promise.all(loadPromises);
};

const initializeComponentLoader = async () => {
	try {
		await loadComponents();
	} catch (error) {
		console.error(
			"[componentLoader] Component loader initialization error:",
			error
		);
	}
};

export { initializeComponentLoader, loadComponents };
