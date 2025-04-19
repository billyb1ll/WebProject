import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import {
	authService,
	User,
	ValidationError,
} from "../services/api/authService";
import { toaster } from "@/components/ui/toaster";

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isAdmin: boolean;
	isCustomer: boolean;
	isLoading: boolean;
	unifiedLogin: (identifier: string, password: string) => Promise<void>;
	signup: (
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) => Promise<void>;
	validateSignup: (
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) => Promise<ValidationError[]>;
	logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component for auth context
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Check if user is already authenticated on mount
	useEffect(() => {
		const checkAuth = () => {
			try {
				const currentUser = authService.getCurrentUser();
				setUser(currentUser);
			} catch (error) {
				console.error("Failed to load authenticated user:", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	// Unified Login function for both customers and admins
	const unifiedLogin = async (
		identifier: string,
		password: string
	): Promise<void> => {
		try {
			setIsLoading(true);
			const user = await authService.unifiedLogin(identifier, password);
			setUser(user);
			const welcomeMessage =
				user.role === "admin" ? "Welcome back, Admin!" : "Welcome back!";
			toaster.create({
				title: "Success",
				description: welcomeMessage,
				type: "success",
				duration: 3000,
			});
		} catch (error) {
			console.error("Login failed:", error);
			toaster.create({
				title: "Error",
				description: error instanceof Error ? error.message : "Login failed",
				type: "error",
				duration: 3000,
			});
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	// Validate signup data
	const validateSignup = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string
	): Promise<ValidationError[]> => {
		try {
			return await authService.validateSignup({
				firstName,
				lastName,
				email,
				password,
			});
		} catch (error) {
			console.error("Validation failed:", error);
			toaster.create({
				title: "Error",
				description: error instanceof Error ? error.message : "Validation failed",
				type: "error",
				duration: 3000,
			});
			return [];
		}
	};

	// Signup function
	const signup = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string
	): Promise<void> => {
		try {
			setIsLoading(true);
			const user = await authService.signup({
				firstName,
				lastName,
				email,
				password,
			});
			setUser(user);
			toaster.create({
				title: "Success",
				description: "Your account has been created!",
				type: "success",
				duration: 3000,
			});
		} catch (error) {
			console.error("Signup failed:", error);
			toaster.create({
				title: "Error",
				description: error instanceof Error ? error.message : "Registration failed",
				type: "error",
				duration: 3000,
			});
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	// Logout function
	const logout = (): void => {
		authService.logout();
		setUser(null);
		toaster.create({
			title: "Success",
			description: "You have been logged out",
			type: "info",
			duration: 3000,
		});
	};

	// User role values
	const isAdmin = !!user && user.role === "admin";
	const isCustomer = !!user && user.role === "customer";

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isAdmin,
				isCustomer,
				isLoading,
				unifiedLogin,
				signup,
				validateSignup,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
