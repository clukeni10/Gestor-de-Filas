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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from "../../database/firebase";

export default function DeskLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch((err) =>
      console.error("Erro ao reproduzir som:", err)
    );
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
      const atendentesRef = collection(database, "atendentes");
      const q = query(atendentesRef, where("email", "==", email));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setShowErrorAlert(true);
        playSound("/sounds/error.wav");
        setLoading(false); // para o loading
        return;
      }

      const doc = snapshot.docs[0];
      const data = doc.data();

      if (data.senha !== password) {
        setShowErrorAlert(true);
        playSound("/sounds/error.wav");
        setLoading(false); // para o loading
        return;
      }

      // Sucesso
      navigate("../deskLines");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setShowErrorAlert(true);
      playSound("/sounds/error.wav");
      setTimeout(() => setShowErrorAlert(false), 3000);
      setLoading(false); // para o loading
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

          <Button
            bg="#00476F"
            color="white"
            onClick={handleLogin}
            loading={loading} // 👈 loading aqui
            loadingText="Entrando..."
          >
            Entrar
          </Button>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Acesso restrito aos atendentes de balcão
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
          p="4"
          borderRadius="md"
          boxShadow="md"
          zIndex={9999}
        >
          <Alert.Title>Erro</Alert.Title>
          <Alert.Description>Preencha os dados corretamente!</Alert.Description>
        </Alert.Root>
      )}
    </Stack>
  );
}
