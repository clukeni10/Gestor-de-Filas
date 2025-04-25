import { DispenserOptionType } from "@/app/types/DispenserOptionType";
import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";

interface DispenserOptionProps {
  label: string;
  name: string;
  onClick?: (option: DispenserOptionType) => void;

}

export default function DispenserOption(props: DispenserOptionProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
      setIsSelected(!isSelected);
      
      const option: DispenserOptionType = {
        label: props.label,
        name: props.name,
      };
    
      props.onClick?.(option);
    };
    

  return (
    <Box
      bg={isSelected ? "yellow.400" : "white"}
      w="400px"
      h="80px"
      rounded="md"
      display="flex"
      alignItems="center"
      cursor="pointer"
      onClick={handleClick}
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
      transition="0.2s ease-in-out"
    >
      <Box
        h="100%"
        w="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        pl="2"
      >
        <Text fontSize="5xl" fontWeight="bold" color="#00476F">
          {props.label}
        </Text>
      </Box>

      <Box flex="1" pl="4">
        <Text fontSize="2xl" color="#00476F">
          {props.name}
        </Text>
      </Box>
    </Box>
  );
}
