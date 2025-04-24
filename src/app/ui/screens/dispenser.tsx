import { Box, Text, Flex } from "@chakra-ui/react";
import DispenserOption from "../components/DispenserOption"

export default function Dispenser(){
      return(
      <Box>
            <Box bg="white" h="50px">
                  
            </Box>

            <Text fontSize="3xl" textAlign="center" mt="5">Retire aqui a sua senha</Text>

<Flex 
flexDirection="column"
alignItems="center"
gap="20px"
>
<Box 
            bg="white" 
            w="400px" 
            h="80px"
            rounded="md"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer" 
            >
                  <Text fontSize="5xl"  fontWeight="500"  color="#00476f">A</Text>
            <Text fontSize="2xl"   color="#00476f" >Atendimento Geral</Text>
            </Box>

            <Box 
            bg="white" 
            w="400px" 
            h="80px"
            rounded="md"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer" 
            >
                  <Text fontSize="5xl" fontWeight="500"   color="#00476f">B</Text>
            <Text fontSize="2xl"   color="#00476f" >Marcação de Consulta</Text>
            </Box>

            <Box 
            bg="white" 
            w="400px" 
            h="80px"
            rounded="md"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
             
>
<Text fontSize="5xl" fontWeight="500"   color="#00476f">C</Text>
            <Text fontSize="2xl"   color="#00476f" >Urgências</Text>
            </Box>

            <Box 
            bg="white" 
            w="400px" 
            h="80px"
            rounded="md"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer" 
            >
                  <Text fontSize="5xl" fontWeight="500"   color="#00476f">D</Text>
            <Text fontSize="2xl"   color="#00476f" >Exames </Text>
            </Box>

            <Box 
            bg="white" 
            w="400px" 
            h="80px"
            rounded="md"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer" 
            >

            <Text fontSize="5xl" fontWeight="500"   color="#00476f">E</Text>
            <Text fontSize="2xl"   color="#00476f" >Atendimento Prioritário </Text>
            </Box>
</Flex>
           
           <DispenserOption/>
      </Box>
      )
}