import { Box, Flex, Text } from "@chakra-ui/react";
import SidebarMenu from "../components/SidebarMenu";
import { FaUser } from "react-icons/fa6";



export default function AdminDashboard() {

    return (
        <Box p="5">
            <Box
                display="grid"
                gridTemplateColumns="300px 1fr"
                gap="10"
            >
                <SidebarMenu />

                <Box
                    bg="white"
                    h="90vh"
                    rounded="md"
                    color="#00476f"
                >
                    <Flex
                        gap="20px"
                        justifyContent="space-evenly"
                        mt="10"
                    >
                        <Box
                            bg="whiteAlpha.700"
                            borderRadius="md"
                            p={5}
                            w="250px"
                            h="250px"
                            shadow="md"
                            _hover={{ bg: "gray.100", cursor: "pointer" }}
                            transition="0.3s"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <FaUser size="100" />
                            <Text fontSize="2xl" mt="5">X Usuários</Text>
                        </Box>

                        <Box
                            bg="white"
                            borderRadius="md"
                            p={5}
                            w="250px"
                            h="250px"
                            shadow="md"
                            _hover={{ bg: "gray.100", cursor: "pointer" }}
                            transition="0.3s"
                        ></Box>

                        <Box
                            bg="white"
                            borderRadius="md"
                            p={5}
                            w="250px"
                            h="250px"
                            shadow="md"
                            _hover={{ bg: "gray.100", cursor: "pointer" }}
                            transition="0.3s"
                        ></Box>
                    </Flex>
                </Box>
            </Box>
        </Box>


    )
}