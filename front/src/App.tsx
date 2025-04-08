import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Custom from "./pages/Custom";
import Product from "./pages/Products";
import Login from "./pages/login";
import SignUp from "./pages/signup";

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
				<Route path={ROUTES.CUSTOM} element={<Custom />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AnimatePresence>
	);
}

function App() {
	return (
		<Router>
			<Layout>
				<AnimatedRoutes />
			</Layout>
		</Router>
	);
}

export default App;
