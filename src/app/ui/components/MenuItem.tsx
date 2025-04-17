import { Flex, Text } from "@chakra-ui/react";

interface MenuItemProps {
  children: React.ReactNode;
  label: string;
}

export default function MenuItem(props: MenuItemProps) {
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      gap="4 "
      cursor="pointer"
      _hover={{ bg: "#005d8e", color: "white" }}
      transition="0.2s"
      borderRadius="md"
    >
      {props.children}
      <Text>{props.label}</Text>
    </Flex>
  );
}
