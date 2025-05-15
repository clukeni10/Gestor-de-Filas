import {
  Box,
  Heading,
  Button,
  Input,
  Text,
  Table,
  Alert,
} from "@chakra-ui/react";
import SidebarMenu from "../components/SidebarMenu";
import { useState, useEffect } from "react";
import DialogModal from "../components/DialogModal";
import { Field } from "../../../components/ui/field";
import {
  addAtendente,
  editAtendente,
  getAllAtendentes,
  deleteAtendente,
} from "../../database/userService";
import {  auth } from "../../database/firebase"; 
import { AtendenteType } from "@/app/types/AtendenteType";
import { LuPen, LuTrash } from "react-icons/lu";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [atendentes, setAtendentes] = useState<AtendenteType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica o usuário logado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Se não estiver logado, redireciona para "/"
        navigate("/", { replace: true });
      } else {
        setLoading(false); // Usuário está logado, libera a tela
      }
    });

    return () => unsubscribe(); // Cleanup do listener ao desmontar componente
  }, [navigate]);

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch((err) => console.error("Erro ao reproduzir som:", err));
  };

  const handleSubmit = async () => {
    if (!nome || !email || !senha) {
      setShowErrorAlert(true);
      playSound("/sounds/error.wav");
      setTimeout(() => setShowErrorAlert(false), 3000);
      return;
    }

    setLoading(true);

    try {
      if (editandoId) {
        await editAtendente(editandoId, nome, email, senha);
      } else {
        await addAtendente(nome, email, senha);
      }

      await buscarAtendentes();
      setShowSuccessAlert(true);
      playSound("/sounds/confirmation.wav");
      setTimeout(() => setShowSuccessAlert(false), 3000);

      setOpen(false);
      setNome("");
      setEmail("");
      setSenha("");
      setEditandoId(null);
    } catch (error) {
      console.error("Erro:", error);
      setShowErrorAlert(true);
      playSound("/sounds/error.wav");
      setTimeout(() => setShowErrorAlert(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const buscarAtendentes = async () => {
    try {
      const data = await getAllAtendentes();
      setAtendentes(data);
    } catch (error) {
      console.error("Erro ao buscar atendentes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAtendente(id);
      await buscarAtendentes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    buscarAtendentes();
  }, []);

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

          <Box mt="20px" p="2">
            <Table.Root showColumnBorder>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader bg="#00476F" color="white">
                    ID
                  </Table.ColumnHeader>
                  <Table.ColumnHeader bg="#00476F" color="white">
                    Nome
                  </Table.ColumnHeader>
                  <Table.ColumnHeader bg="#00476F" color="white">
                    E-mail
                  </Table.ColumnHeader>
                  <Table.ColumnHeader bg="#00476F" color="white">
                    Senha
                  </Table.ColumnHeader>
                  <Table.ColumnHeader bg="#00476F" color="white">
                    Criado Em
                  </Table.ColumnHeader>
                  <Table.ColumnHeader bg="#00476F" color="white">
                    Atualizado Em
                  </Table.ColumnHeader>
                  <Table.ColumnHeader bg="#00476F" color="white">
                    Último Log
                  </Table.ColumnHeader>
                  <Table.ColumnHeader bg="#00476F" color="white">
                    Ações
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {atendentes.map((atendente, index) => (
                  <Table.Row key={atendente.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{atendente.nome}</Table.Cell>
                    <Table.Cell>{atendente.email}</Table.Cell>
                    <Table.Cell>{atendente.senha}</Table.Cell>
                    <Table.Cell>
                      {atendente.createdAt
                        ? atendente.createdAt.toDate().toLocaleString()
                        : "Data não disponível"}
                    </Table.Cell>
                    <Table.Cell>
                      {atendente.updatedAt
                        ? atendente.updatedAt.toDate().toLocaleString()
                        : "Data não disponível"}
                    </Table.Cell>
                    <Table.Cell>
                      {atendente.lastLogin
                        ? atendente.lastLogin.toDate().toLocaleString()
                        : "Data não disponível"}
                    </Table.Cell>
                    <Table.Cell display="flex" gap="10px">
                      <LuPen
                        size={20}
                        cursor="pointer"
                        color="#3182CE"
                        onClick={() => {
                          setNome(atendente.nome);
                          setEmail(atendente.email);
                          setSenha(atendente.senha);
                          setOpen(true);
                        }}
                      />
                      <LuTrash
                        size={20}
                        cursor="pointer"
                        color="#E53E3E"
                        onClick={() => handleDelete(atendente.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>

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

        {showSuccessAlert && (
          <Alert.Root
            status="success"
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
            <Alert.Title>Usuário cadastrado com sucesso!</Alert.Title>
          </Alert.Root>
        )}

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

        <DialogModal
          open={open}
          onOpenChange={({ open }) => setOpen(open)}
          title="Cadastrar Usuário"
          textButton="Cadastrar"
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
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focusRingColor="#00476F"
              />
            </Box>

            <Box>
              <Text mb="1">Senha</Text>
              <Input
                placeholder="Digite a senha"
                type="text"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                focusRingColor="#00476F"
              />
            </Box>
            <Button
              bg="#00476F"
              color="white"
              onClick={handleSubmit}
              loading={loading}
            >
              Cadastrar
            </Button>
          </Box>
        </DialogModal>
      </Box>
    </Box>
  );
}
