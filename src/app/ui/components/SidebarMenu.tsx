import { Box, VStack, Text, Flex } from "@chakra-ui/react";
import { FiHelpCircle, FiHome, FiLogOut, FiSettings, FiUsers } from "react-icons/fi";
import MenuItem from "./MenuItem";
import { HiOutlineQueueList } from "react-icons/hi2";
import { RiTicket2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function SidebarMenu() {
  const navigate = useNavigate();

  
  return (
    <Box
      bg="white"
      height="100%"
      color="#00476f"
      h="90vh"
      py={6}
      px={4}
      boxShadow="md"
      rounded="md"
    >
      <Flex direction="column" align="center" mb={8}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          mb="4"
          letterSpacing="wide"
          color="#00476f"
        >
          Dashboard
        </Text>

        {/* Seção de usuário logado */}
        <Flex align="center" gap="12px">
          <Box
            borderRadius="full"
            w="10px"
            h="10px"
            bg="green.500"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
          />
          <Text fontSize="lg" color="#00476f" fontWeight="semibold">
            João Silva
          </Text>
        </Flex>
      </Flex>

      {/* Linha azul separadora */}
      <Box borderBottom="2px" borderColor="#00476f" mb="6" />

      <VStack align="stretch">
        <MenuItem label="Dashboard" children={<FiHome />} onClick={() => navigate("/adminDashboard")} />
        <MenuItem label="Gestão de Usuários" children={<FiUsers />} onClick={() => navigate("/adminUsers")}/>
        <MenuItem label="Dispenser de Senhas" children={<RiTicket2Line />} />
        <MenuItem label="Filas de Atendimento" children={<HiOutlineQueueList />} />
        <MenuItem label="Configurações" children={<FiSettings />} />
        <MenuItem label="Suporte e Ajuda" children={<FiHelpCircle />} />
        <MenuItem label="Sair" children={<FiLogOut />} />
      </VStack>
    </Box>
  );
}