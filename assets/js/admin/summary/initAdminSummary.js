
import { h, render } from 'preact';
import AdminSummary from './components/AdminSummary.jsx';

export const initializeAdminSummary = () => {
	const rootElement = document.getElementById('admin-summary-root');

	if (!rootElement) {
		return;
	}

	try {
		rootElement.innerHTML = '';
		render(<AdminSummary />, rootElement);
	} catch (error) {
		console.error('Admin Summary: Failed to load component', error);
		rootElement.innerHTML = '<p>Error loading Admin Summary component.</p>';
	}
};

