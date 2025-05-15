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
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../database/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch((err) => console.error("Erro ao reproduzir som:", err));
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setShowErrorAlert(true);
      playSound("/sounds/error.wav");
      setTimeout(() => setShowErrorAlert(false), 3000);
      return;
    }

    setLoading(true); // inicia o loading

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/adminDashboard");
      // Não precisa setLoading(false) aqui pois ao navegar o componente será desmontado
    } catch {
      console.error("Erro ao fazer login:");
      setShowErrorAlert(true);
      playSound("/sounds/error.wav");
      setLoading(false); // para o loading no erro
      setTimeout(() => setShowErrorAlert(false), 3000);
    }
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

          <Button
            bg="#00476F"
            color="white"
            onClick={handleLogin}
            loading={loading}    // 👈 loading no botão
            loadingText="Entrando..."
          >
            Entrar
          </Button>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Acesso restrito aos administradores
          </Text>
        </VStack>
      </Box>

      {showErrorAlert && (
        <Alert.Root
          status="error"
          variant="solid"
          position="fixed"
          bottom="20px"
          right="20px"
          w="auto"
          h="auto"
          p="4"
          rounded="md"
          boxShadow="md"
          zIndex={9999}
        >
          <Alert.Indicator />
          <Alert.Title>Preencha todos os campos!</Alert.Title>
        </Alert.Root>
      )}
    </Stack>
  );
}
