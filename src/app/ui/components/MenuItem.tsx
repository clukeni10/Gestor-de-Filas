import { Flex, Text } from "@chakra-ui/react";

interface MenuItemProps {
  children: React.ReactNode;
  label: string;
  onClick?: () => void; // <- aqui está a correção
}

export default function MenuItem({ children, label, onClick }: MenuItemProps) {
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      gap="10px"
      cursor="pointer"
      _hover={{ bg: "#005d8e", color: "white" }}
      transition="0.5s"
      borderRadius="md"
      onClick={onClick} // <- você pode usar aqui
    >
      {children}
      <Text>{label}</Text>
    </Flex>
  );
}
