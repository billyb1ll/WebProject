import { Container, Heading, Text, Box, Icon } from "@chakra-ui/react";
import ChocolateConfigurator from "../components/features/chocolateCustomizer/ChocolateConfigurator";
import Breadcrumbs from "@/components/layout/Breadcrumb";

import { FaGift } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { GiChocolateBar } from "react-icons/gi";

export default function Custom() {
	return (
		<>
			<Breadcrumbs />
			<Container maxW="container.xl" py={10}>
				<Heading as="h1" size="xl" mb={2} color="#604538">
					Custom Chocolate Creator
				</Heading>

				<Text fontSize="lg" mb={8} color="#604538">
					Create your perfect chocolate in 5 easy steps!
				</Text>

				<Box mb={16}>
					<ChocolateConfigurator />
				</Box>

				<Box mt={16} textAlign="center"  gap={6} mb={10}>
					<Heading as="h2" size="lg" mb={6} color="#604538">
						How It Works
					</Heading>

					<Text fontSize="md" maxW="800px" mx="auto" mb={8}>
						Our custom chocolate creation process allows you to design chocolate
						that's uniquely yours. Follow the simple steps to create your masterpiece.
					</Text>

					<Box
						display="flex"
						flexDirection={{ base: "column", md: "row" }}
						gap={6}
						justifyContent="center"
						mb={10}>
						<Box p={6} textAlign="center" maxW="200px" mx="auto">
							<Icon as={GiChocolateBar} boxSize={10} color="#604538" mb={4} />
							<Heading as="h3" size="sm" color="#604538" mb={2}>
								Pick Your Chocolate
							</Heading>
							<Text fontSize="sm">
								Choose from dark, milk, or white chocolate bases
							</Text>
						</Box>

						<Box p={6} textAlign="center" maxW="200px" mx="auto">
							<Icon as={FaGift} boxSize={10} color="#604538" mb={4} />
							<Heading as="h3" size="sm" color="#604538" mb={2}>
								Customize
							</Heading>
							<Text fontSize="sm">Add toppings, select shape and packaging</Text>
						</Box>

						<Box p={6} textAlign="center" maxW="200px" mx="auto">
							<Icon as={MdMessage} boxSize={10} color="#604538" mb={4} />
							<Heading as="h3" size="sm" color="#604538" mb={2}>
								Personalize
							</Heading>
							<Text fontSize="sm">Add a special message to make it truly unique</Text>
						</Box>
					</Box>
				</Box>
			</Container>
		</>
	);
}
