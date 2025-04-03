import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./constants/routes";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/signup";

function App() {
	return (
		<BrowserRouter>
			<main>
				<Routes>
					<Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route path={ROUTES.PRODUCTS} element={<Products />} />
					<Route path={ROUTES.ABOUT} element={<About />} />
					<Route path={ROUTES.SIGNUP} element={<SignUp />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
