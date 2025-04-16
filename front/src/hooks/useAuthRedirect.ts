import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/constants/routes";

/**
 * Custom hook to handle redirects after login based on user role
 */
export function useAuthRedirect() {
	const navigate = useNavigate();
	const { isAdmin, isCustomer } = useAuth();

	/**
	 * Redirect user based on their role
	 * @param defaultPath - Default redirect path if no role-specific path is defined
	 */
	const redirectAfterLogin = (defaultPath = ROUTES.HOME) => {
		// Add a small delay to ensure auth state is updated
		setTimeout(() => {
			if (isAdmin) {
				// Redirect admin users to the admin dashboard
				navigate(ROUTES.ADMIN_DASHBOARD);
			} else if (isCustomer) {
				navigate(defaultPath);
			} else {
				// If role is not recognized, go to default path
				navigate(defaultPath);
			}
		}, 100);
	};

	return { redirectAfterLogin };
}
