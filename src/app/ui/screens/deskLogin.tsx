import {
  Input,
  VStack,
  Stack,
  Button,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
/* import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/firebase" */
import { useState } from "react";
/* 
import { useNavigate } from "react-router-dom"; */




export default function DeskLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
/*   const navigate = useNavigate() */


  /* const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("../desk");
    } catch (error) {
      console.error("Erro ao fazer login:", error);

    }
  }; */

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
            Painel do Balcão
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

          <Button bg="#00476F" color="white" /* onClick={handleLogin} */ >
            Entrar
          </Button>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Acesso restrito aos atendentes de balcão
          </Text>
        </VStack>
      </Box>
    </Stack>
  );
}
