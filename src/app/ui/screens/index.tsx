import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { JSX } from "react";
import { Header } from "../components/Header";
import Cards from "../components/Cards";
import { IoMdTv } from "react-icons/io";
import SmallerCards from "../components/SmallerCards";
import { FaUser } from "react-icons/fa6";
import { MdDesk } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function HomeScreen(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Stack>
      <Header />

      <Heading fontSize="4xl" display="flex" justifyContent="center" mt="10">
        Escolha o dispositivo
      </Heading>

      <Flex justifyContent="space-evenly" mt="12">
        <Cards title="TV">{<IoMdTv size="200" color="black" />}</Cards>

        <Cards title="Dispensador">{<IoMdTv size="200" color="black" />}</Cards>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mt="10">
        <Box bg="white" width="40%" height="1"></Box>
        <Text fontSize="4xl" fontWeight="bold">
          Ou
        </Text>
        <Box bg="white" width="40%" height="1"></Box>
      </Flex>

      <Flex justifyContent="space-evenly">
        <SmallerCards title="Admin" onClick={() => navigate("/login")}>
          <FaUser size="40" color="black" />
        </SmallerCards>

        <SmallerCards title="Balcão" onClick={() => navigate("/login")}>
          <MdDesk size="40" color="black" />
        </SmallerCards>
      </Flex>
    </Stack>
  );
}
