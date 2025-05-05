import {
  Box,
  Heading,
  Button,
  Stack,
  Input,
  Text,
  Alert,
} from "@chakra-ui/react";
import SidebarMenu from "../components/SidebarMenu";
import { useState } from "react";
import DialogModal from "../components/DialogModal";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../database/firebase";
import { Field } from "../../../components/ui/field";

export default function AdminUsers() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nome || !email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      // Adicionando usuário ao Firestore
      await addDoc(collection(database, "atendentes"), {
        nome,
        email,
        senha,
        createdAt: new Date(),
        lastLogin: new Date(),
        updatedAt: new Date(),
      });

      alert("Usuário cadastrado com sucesso!");
      setOpen(false);
      setNome("");
      setEmail("");
      setSenha("");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar usuário!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p="5">
      <Box display="grid" gridTemplateColumns="300px 1fr" gap="10">
        <SidebarMenu />

        <Box bg="white" h="90vh" rounded="md" color="#00476f">
          <Heading
            size="3xl"
            fontWeight="bold"
            mb={6}
            textAlign="center"
            color="#00476f"
          >
            Registre novo usuário
          </Heading>

          <Stack gap="10"></Stack>

          <Button
            bg="#00476f"
            fontSize="3xl"
            w="70px"
            h="70px"
            rounded="50%"
            position="absolute"
            bottom="10%"
            right="2%"
            _hover={{ bg: "#005d8e", color: "white" }}
            onClick={() => setOpen(true)}
          >
            +
          </Button>
        </Box>

        <Alert.Root status="info" title="This is the alert title">
          <Alert.Indicator />
          <Alert.Title>Preencha todos os campos!</Alert.Title>
        </Alert.Root>

        <Alert.Root status="success" variant="solid">
          <Alert.Indicator />
          <Alert.Title>Usuário cadastrado com sucesso!</Alert.Title>
        </Alert.Root>

        <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Erro</Alert.Title>
        <Alert.Description>
        Erro ao cadastrar usuário!
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>

        <DialogModal
          open={open}
          onOpenChange={({ open }) => setOpen(open)}
          title="Cadastrar Usuário"
          textButton="Cadastrar"
          footer={
            <Button
              bg="#00476F"
              color="white"
              onClick={handleSubmit}
              loading={loading}
            >
              Cadastrar
            </Button>
          }
        >
          <Box display="flex" flexDirection="column" gap="4">
            <Box>
              <Text mb="1">Nome</Text>
              <Field>
                <Input
                  placeholder="Digite o nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  focusRingColor="#00476F"
                />
              </Field>
            </Box>

            <Box>
              <Text mb="1">Email</Text>
              <Input
                placeholder="Digite o email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focusRingColor="#00476F"
              />
            </Box>

            <Box>
              <Text mb="1">Senha</Text>
              <Input
                placeholder="Digite a senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                focusRingColor="#00476F"
              />
            </Box>
          </Box>
        </DialogModal>
      </Box>
    </Box>
  );
}
