import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Custom from "./pages/Custom";
import Product from "./pages/Products";
import "./App.css";

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/products" element={<Product />} />
					<Route path="/pricing" element={<Pricing />} />
					<Route path="/custom" element={<Custom />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
