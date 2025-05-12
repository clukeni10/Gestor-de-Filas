import { DispenserOptionType } from "@/app/types/DispenserOptionType";
import { Box, Text } from "@chakra-ui/react";


interface DispenserOptionProps {
  id: string
  label: string;
  name: string;
    isSelected: boolean;
  onClick?: (option: DispenserOptionType) => void;

}

export default function DispenserOption(props: DispenserOptionProps) {
  const handleClick = () => {
    const option: DispenserOptionType = {
      id: props.id,
      label: props.label,
      nome: props.name,
    };

    props.onClick?.(option);
  };

  return (
    <Box
      bg={props.isSelected ? "yellow.400" : "white"}
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
