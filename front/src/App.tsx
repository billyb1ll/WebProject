import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

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
					<Route path="*" element={<NotFound />} />
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/about" element={<About />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
