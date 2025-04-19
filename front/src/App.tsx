import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import Home from "./pages/customer/Home";
import About from "./pages/customer/About";
import NotFound from "./pages/customer/NotFound";
import Custom from "./pages/customer/Custom";
import Product from "./pages/customer/Products";
import Login from "./pages/customer/login";
import SignUp from "./pages/customer/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import ProductDetail from "./pages/customer/ProductDetail";

import { ROUTES } from "./constants/routes";
import "./App.css";

// AnimatedRoutes component
function AnimatedRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path={ROUTES.HOME} element={<Home />} />
				<Route path={ROUTES.LOGIN} element={<Login />} />
				<Route path={ROUTES.SIGNUP} element={<SignUp />} />
				<Route path={ROUTES.ABOUT} element={<About />} />
				<Route path={ROUTES.PRODUCTS} element={<Product />} />
				<Route path={`${ROUTES.PRODUCTS}/:id`} element={<ProductDetail />} />
				<Route path={ROUTES.CUSTOM} element={<Custom />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AnimatePresence>
	);
}

function App() {
	return (
		<AuthProvider>
			<Router>
				<Layout>
					<AnimatedRoutes />
				</Layout>
			</Router>
		</AuthProvider>
	);
}

export default App;
