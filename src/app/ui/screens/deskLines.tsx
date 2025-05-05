import { Box, Center, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaUndo } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

export default function DeskLines() {
  // Queue data
  const [queueData] = useState([
    { id: "A", name: "Atendimento Geral", waiting: 20, current: 19 },
    { id: "B", name: "Marcação de Consultas", waiting: 5, current: 4 },
    { id: "C", name: "Urgências", waiting: 76, current: 75 },
    { id: "D", name: "Exames", waiting: 26, current: 25 },
    { id: "P", name: "Atendimento Prioritário", waiting: 5, current: 4 },
  ]);

  return (
    <Box 
        w="100%"
        mx="auto" 
        overflow="hidden"
        
    >
      
    
      {/* Header */}
      <Grid
        templateColumns="1fr 1fr"
        bg="white"
        color="#00476F"
        h="50px"
        p={2}
        fontWeight="bold"
      >
        <Center as="div">
          <Text fontSize="lg">Em Espera</Text>
        </Center>
        <Center as="div">
          <Text fontSize="lg">Em Atendimento</Text>
        </Center>
      </Grid>

      {/* Queue Items */}
      {queueData.map((queue) => (
        <Grid
          key={queue.id}
          templateColumns="1fr 1fr 100px 100px"
          gap={2}
          my={2}
          p="2"
        >
          {/* Waiting */}
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
                {queue.id}
              </Text>
              <Text fontSize="4xl" fontWeight="bold" color="teal.700">
                {queue.waiting}
              </Text>
            </Flex>
          </GridItem>

          {/* Currently being served */}
          <GridItem>
            <Flex
              bg="white"
              p={2}
              borderRadius="md"
              direction="column"
              alignItems="space-around"
              border="1px solid"
              borderColor="teal.600"
            >
              <Text fontSize="lg" fontWeight="medium" color="teal.700" textAlign="center">
                {queue.name}
              </Text>
              <Flex justifyContent="space-around">
                <Text fontSize="4xl" fontWeight="bold" color="teal.700">
                  {queue.id}
                </Text>
                <Text fontSize="4xl" fontWeight="bold" color="teal.700">
                  {queue.current}
                </Text>
              </Flex>
            </Flex>
          </GridItem>

          {/* Navigation buttons */}
          <GridItem>
            <Center
              bg="gray.200"
              h="100%"
              borderRadius="md"
              color="#00476f"
              _hover={{ bg: "#005d8e", cursor: "pointer", color:"white" }}
            >
              <FaArrowRight size={30} />
            </Center>
          </GridItem>

          <GridItem>
            <Center
              bg="gray.200"
              h="100%"
              borderRadius="md"
              color="red.500"
              _hover={{ bg: "red.500", cursor: "pointer", color:"white" }}
            >
              <FaUndo size={30} />
            </Center>
          </GridItem>
        </Grid>
      ))}
    </Box>
  );
}
