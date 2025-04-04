import { Breadcrumb } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import React from "react";

const Breadcrumbs = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Get all path segments
	const pathnames = location.pathname.split("/").filter((x) => x);

	// Filter out all pages after "custom"
	const filteredPathnames = pathnames.filter((item, index) => {
		// If the current path is after "custom", filter it out
		if (index > 0 && pathnames[index - 1] === "custom") {
			return false;
		}
		return true;
	});

	return (
		<Breadcrumb.Root
			variant="plain"
			width={"100%"}
			maxW="container.2xl"
			height={{ base: "50px", md: "95px" }}
			display="flex"
			justifyContent="start"
			wordWrap={"break-word"}
			bg="#E8DDD8"
			py={2}
			px={4}>
			<Breadcrumb.List display="flex" alignItems="center">
				<Breadcrumb.Item>
					<Link to={"/"} onClick={() => navigate("/")} style={{ color: "#9A6E5A" }}>
						Home
					</Link>
				</Breadcrumb.Item>

				{filteredPathnames.map((value, index) => {
					const to = `/${filteredPathnames.slice(0, index + 1).join("/")}`;
					return (
						<React.Fragment key={`fragment-${to}`}>
							<Breadcrumb.Separator key={`sep-${to}`} mx={2}>
								<AiOutlineRight size={14} />
							</Breadcrumb.Separator>
							<Breadcrumb.Item key={to}>
								<Link
									to={to}
									onClick={() => navigate(to)}
									style={{ textTransform: "capitalize", color: "#9A6E5A" }}>
									{value}
								</Link>
							</Breadcrumb.Item>
						</React.Fragment>
					);
				})}
			</Breadcrumb.List>
		</Breadcrumb.Root>
	);
};

export default Breadcrumbs;
