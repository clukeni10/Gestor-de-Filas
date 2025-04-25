import { Box, Text, Flex, Image } from "@chakra-ui/react";
import DispenserOption from "../components/DispenserOption"
import { useState, useEffect } from "react";
//import { useOptionState } from "../../hooks/useOptionState";

export default function Dispenser() {
      const [time, setTime] = useState<string>("");

      useEffect(() => {
            const updateTime = () => {
              const agora = new Date();
              const horas = String(agora.getHours()).padStart(2, "0");
              const minutos = String(agora.getMinutes()).padStart(2, "0");
              setTime(`${horas}:${minutos}`);
            };
        
            updateTime();
        
            const interval = setInterval(updateTime, 1000);    

            return () => clearInterval(interval);
          }, []);

          //const generateTicketPVC = useOptionState(state => state.generateTicketPVC)
            
            return (
                  <Box>

                        <Box bg="white" h="100px">
                              <Flex alignItems="center" justifyContent="space-between">
                                    <Image src="./logo.png" w="300px" ml="5" />

                                    <Text color="#00476F" fontSize="4xl" fontWeight="bold" mr="5">{time}</Text>
                              </Flex>

                        </Box>

                        <Text fontSize="3xl" textAlign="center" mt="8" mb="8">Retire aqui a sua senha</Text>

                        <Flex
                              flexDirection="column"
                              alignItems="center"
                              gap="20px"
                        >
                              <DispenserOption label="A" name="Atendimento Geral" />
                              <DispenserOption label="B" name="Marcação de Consulta" />
                              <DispenserOption label="C" name="Urgências" />
                              <DispenserOption label="D" name="Exames" />
                              <DispenserOption label="E" name="Atendimento Prioritário" />
                        </Flex>


                  </Box>
            )
      }