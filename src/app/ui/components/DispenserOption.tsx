import { Box, Text } from "@chakra-ui/react";

interface DispenserOptionProps{
label:string
name:string
}


export default function DispenserOption(props: DispenserOptionProps){

      return(
            <Box 
            bg="white" 
            w="400px" 
            h="80px"
            rounded="md"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            cursor="pointer" 
                  >
                        <Box 
                              border="1px solid black"     
                              h="80px"
                              w="100px"
                              >
                        <Text>{props.label}</Text>
                        </Box>
                  <Text>{props.name}</Text>
            </Box>
      )
}