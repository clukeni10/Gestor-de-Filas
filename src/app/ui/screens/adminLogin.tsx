import {
  Input,
  VStack,
  Stack,
  Button,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function AdminLogin() {
  return (
    <Stack minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="md"
        w={{ base: "90%", md: "400px" }}
      >
        <VStack gap={4} align="stretch">
          <Heading size="lg" textAlign="center" color="black">
            Painel de Administração
          </Heading>

          <Input placeholder="E-mail" type="email" focusRingColor="#00476F" color="black"/>

          <Input placeholder="Senha" type="password" focusRingColor="#00476F" color="black"/>

          <Button bg="#00476F" color="white">
            Entrar
          </Button>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Acesso restrito aos administradores
          </Text>
        </VStack>
      </Box>
    </Stack>
  );
}
