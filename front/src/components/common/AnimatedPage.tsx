import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedPageProps {
	children: ReactNode;
	variants?: Variants;
}

// Default page transition variants
const defaultPageVariants: Variants = {
	initial: {
		opacity: 0,
		y: 20,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.15,
			ease: "easeInOut",
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		transition: {
			duration: 0.15,
			ease: "easeInOut",
		},
	},
};

const AnimatedPage = ({
	children,
	variants = defaultPageVariants,
}: AnimatedPageProps) => {
	return (
		<motion.div
			initial="initial"
			animate="animate"
			exit="exit"
			variants={variants}
			className="animated-page">
			{children}
		</motion.div>
	);
};

export default AnimatedPage;
