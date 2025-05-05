import {
  Input,
  VStack,
  Stack,
  Button,
  Box,
  Heading,
  Text,
  Alert,
} from "@chakra-ui/react";
/* import { signInWithEmailAndPassword } from "firebase/auth";
 */import { useState } from "react";
import { useNavigate } from "react-router-dom";
/*import { auth } from "../../database/firebase"
import { useNavigate } from "react-router-dom";*/

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  /*   const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("../adminDashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);

    }
  }; */

  const handleLogin = async () => {
    navigate("../adminDashboard");
  };

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

          <Input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            color="black"
          />

          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color="black"
          />

          <Button bg="#00476F" color="white" onClick={handleLogin}>
            Entrar
          </Button>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Acesso restrito aos administradores
          </Text>
        </VStack>
      </Box>

      <Alert.Root
        status="error"
        w="500px"
        position="absolute"
        top="5%"
        right="3%"
        >
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Dados Incorretos</Alert.Title>
          <Alert.Description>
            Os dados inseridos estão incorrectos. Por favor retifique e tente
            novamente.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    </Stack>
  );
}
