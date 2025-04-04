import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/layout/nav";

import Custom from "./pages/Custom";

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<main>
				<Routes>
					<Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route path={ROUTES.PRODUCTS} element={<Products />} />
					<Route path={ROUTES.ABOUT} element={<About />} />
					<Route path={ROUTES.SIGNUP} element={<SignUp />} />
					<Route path={ROUTES.LOGIN} element={<Login />} />
					<Route path={ROUTES.CUSTOM} element={<Custom />}/>
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
