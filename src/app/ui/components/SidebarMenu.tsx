import { Box, VStack, Text } from "@chakra-ui/react";
 import { FiBarChart2, FiHelpCircle, FiHome, FiLogOut, FiSettings, FiUsers } from "react-icons/fi";
 
import MenuItem from "./MenuItem";
import { HiOutlineQueueList } from "react-icons/hi2";
import { MdMedicalServices } from "react-icons/md";
import { RiTicket2Line } from "react-icons/ri";

export default function SidebarMenu(){
      return(
            <Box
                  bg="#00476f"
                  color="white"
                  w="250px"
                  py={6}
                  px={2}
                  boxShadow="md"
                  position="fixed"
            >
                  <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        textAlign="center"
                        mb="8"
                        letterSpacing="wide"
                        color="white"
                  >
                        Dashboard
                  </Text>
                  <VStack  align="stretch">

                        <MenuItem label="Dashboard" children={<FiHome/>}/>
                        <MenuItem label="Gestão de Usuários" children={<FiUsers />}/>
                        <MenuItem label="Serviços Oferecidos" children={<MdMedicalServices />}/>
                        <MenuItem label="Dispenser de Senhas" children={<RiTicket2Line />}/>
                        <MenuItem label="Filas de Atendimento" children={<HiOutlineQueueList />}/>
                        <MenuItem label="Configurações" children={<FiSettings />}/>
                        <MenuItem label="Relatórios" children={<FiBarChart2 />}/>
                        <MenuItem label="Suporte e Ajuda" children={<FiHelpCircle />}/>
                        <MenuItem label="Sair" children={<FiLogOut />}/>

                  </VStack>

            </Box>
            
      
)
}
