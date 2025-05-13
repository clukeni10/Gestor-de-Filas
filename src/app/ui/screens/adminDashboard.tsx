import { Box, Flex, Text } from "@chakra-ui/react";
import SidebarMenu from "../components/SidebarMenu";
import { FaUser } from "react-icons/fa6";
import { database } from "../../database/firebase"; // ajuste o caminho conforme necessário
import { collection, getCountFromServer } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RiTicket2Line } from "react-icons/ri";

export default function AdminDashboard() {
  const [atendentesCount, setAtendentesCount] = useState<number | null>(null);
  const [opcoesCount, setOpcoesCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchAtendentesCount = async () => {
      try {
        const coll = collection(database, "atendentes"); // Use o database diretamente
        const snapshot = await getCountFromServer(coll);
        setAtendentesCount(snapshot.data().count);
      } catch (error) {
        console.error("Erro ao buscar atendentes:", error);
        setAtendentesCount(0); // ou exiba uma mensagem de erro
      }
    };

    const fetchOpcoesCount = async () => {
      try {
        const coll = collection(database, "opções-dispenser");
        const snapshot = await getCountFromServer(coll);
        setOpcoesCount(snapshot.data().count);
      } catch (error) {
        console.error("Erro ao buscar opções:", error);
        setOpcoesCount(0);
      }
    }


    fetchOpcoesCount();
    fetchAtendentesCount();
  }, []);


  return (
    <Box p="5">
      <Box display="grid" gridTemplateColumns="300px 1fr" gap="10">
        <SidebarMenu />

        <Box bg="white" h="90vh" rounded="md" color="#00476f">
          <Flex gap="20px" justifyContent="space-evenly" mt="10">
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
              <Text fontSize="2xl" mt="5">
                {atendentesCount === null ? "Carregando..." : `${atendentesCount} `}
              </Text>
              <Text fontSize="2xl">Atendentes</Text>
            </Box>

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
              <RiTicket2Line size="100" />
              <Text fontSize="2xl" mt="5">
                {opcoesCount === null ? "Carregando" : `${opcoesCount} `}
                <Text fontSize="2xl">Opções no Dispensador</Text>
              </Text>
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
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
