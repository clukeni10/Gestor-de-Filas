// src/app/components/DeskLines.tsx
import { Box, Center, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUndo } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { database } from "../../database/firebase";
import { TicketType } from "../../types/TicketType"; // ✅ Importando o tipo centralizado

type DispenserOption = {
  id: string;
  label: string;
  nome: string;
};

export default function DeskLines() {
  const [opcoes, setOpcoes] = useState<DispenserOption[]>([]);
  const [tickets, setTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    const fetchOpcoes = async () => {
      const snapshot = await getDocs(collection(database, "opções-dispenser"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DispenserOption[];
      setOpcoes(data);
    };

    const fetchTickets = async () => {
      const q = query(
        collection(database, "tickets"),
        where("status", "in", ["pendente", "atendendo"]),
        orderBy("createdAt", "asc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TicketType[];
      setTickets(data);
    };

    fetchOpcoes();
    fetchTickets();
  }, []);

  const updateStatus = async (
    id: string,
    status: "pendente" | "atendendo" | "finalizado"
  ) => {
    const ref = doc(database, "tickets", id);
    await updateDoc(ref, { status });
  };

  const handleNext = async (label: string) => {
    const fila = tickets.filter((t) => t.label === label);
    const atual = fila.find((t) => t.status === "atendendo");
    const proximo = fila.find((t) => t.status === "pendente");

    if (atual) await updateStatus(atual.id, "finalizado");
    if (proximo) await updateStatus(proximo.id, "atendendo");

    refreshTickets();
  };

  const handleBack = async (label: string) => {
    const atual = tickets.find(
      (t) => t.label === label && t.status === "atendendo"
    );
    if (atual) {
      await updateStatus(atual.id, "pendente");
      refreshTickets();
    }
  };

  const refreshTickets = async () => {
    const q = query(
      collection(database, "tickets"),
      where("status", "in", ["pendente", "atendendo"]),
      orderBy("createdAt", "asc")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TicketType[];
    setTickets(data);
  };

  return (
    <Box w="100%" mx="auto" overflow="hidden">
      <Grid
        templateColumns="1fr 1fr 200px"
        bg="white"
        color="#00476F"
        h="50px"
        p={2}
        fontWeight="bold"
      >
        <Center>
          <Text fontSize="lg">Em Espera</Text>
        </Center>
        <Center>
          <Text fontSize="lg">Em Atendimento</Text>
        </Center>
        <Center>
          <Text fontSize="lg">Ações</Text>
        </Center>
      </Grid>

      {opcoes.map((opcao) => {
        const fila = tickets.filter((t) => t.label === opcao.label);
        const esperando = fila.filter((t) => t.status === "pendente").length;
        const atual = fila.find((t) => t.status === "atendendo");

        return (
          <Grid
            key={opcao.label}
            templateColumns="1fr 1fr 100px 100px"
            gap={2}
            my={2}
            p="2"
          >
            {/* Em espera */}
            <GridItem>
              <Flex
                bg="gray.200"
                p={5}
                borderRadius="md"
                justifyContent="space-evenly"
                alignItems="center"
                border="1px solid"
                borderColor="teal.600"
              >
                <Text fontSize="4xl" fontWeight="bold" color="teal.700">
                  {opcao.label}
                </Text>
                <Text fontSize="4xl" fontWeight="bold" color="teal.700">
                  {esperando}
                </Text>
              </Flex>
            </GridItem>

            {/* Em atendimento */}
            <GridItem>
              <Flex
                bg="white"
                p={2}
                borderRadius="md"
                direction="column"
                border="1px solid"
                borderColor="teal.600"
              >
                <Text
                  fontSize="lg"
                  fontWeight="medium"
                  color="teal.700"
                  textAlign="center"
                >
                  {opcao.nome}
                </Text>
                <Flex justifyContent="space-around">
                  <Text fontSize="4xl" fontWeight="bold" color="teal.700">
                    {opcao.label}
                  </Text>
                  <Text fontSize="4xl" fontWeight="bold" color="teal.700">
                    {atual ? fila.indexOf(atual) + 1 : "--"}
                  </Text>
                </Flex>
              </Flex>
            </GridItem>

            {/* Próximo */}
            <GridItem>
              <Center
                bg="gray.200"
                h="100%"
                borderRadius="md"
                color="#00476f"
                _hover={{ bg: "#005d8e", cursor: "pointer", color: "white" }}
                onClick={() => handleNext(opcao.label)}
              >
                <FaArrowRight size={30} />
              </Center>
            </GridItem>

            {/* Voltar */}
            <GridItem>
              <Center
                bg="gray.200"
                h="100%"
                borderRadius="md"
                color="red.500"
                _hover={{ bg: "red.500", cursor: "pointer", color: "white" }}
                onClick={() => handleBack(opcao.label)}
              >
                <FaUndo size={30} />
              </Center>
            </GridItem>
          </Grid>
        );
      })}
    </Box>
  );
}
