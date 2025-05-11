import { Alert, Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import SidebarMenu from "../components/SidebarMenu";
import DialogModal from "../components/DialogModal";
import { useEffect, useState } from "react";
import { LuPen, LuTrash } from "react-icons/lu";
import { addOption, getAllOptions, editOption, deleteOption } from "../../database/optionService";
import { DispenserOptionType } from "@/app/types/DispenserOptionType";



export default function AdminDispenser() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [label, setLabel] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [opcoes, setOpcoes] = useState<DispenserOptionType[]>([]);

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch((err) => console.error("Erro ao reproduzir som:", err));
  };

 const handleSubmit = async () => {
  if (!nome || !label) {
    setShowErrorAlert(true);
    playSound("/sounds/error.wav");
    setTimeout(() => setShowErrorAlert(false), 3000);
    return;
  }

  try {
    if (editandoId) {
      await editOption(editandoId, nome, label);
    } else {
      await addOption(nome, label);
    }

    await buscarOpcoes();
    setShowSuccessAlert(true);
    playSound("/sounds/confirmation.wav");
    setTimeout(() => setShowSuccessAlert(false), 3000);

    setNome("");
    setLabel("");
    setEditandoId(null);
    setOpen(false);
  } catch (error) {
    console.error("Erro:", error);
    setShowErrorAlert(true);
    playSound("/sounds/error.wav");
    setTimeout(() => setShowErrorAlert(false), 3000);
  }
};


 

 const buscarOpcoes = async () => {
  try {
    const lista = await getAllOptions();
    setOpcoes(lista);
  } catch (error) {
    console.error("Erro ao buscar opções:", error);
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id: string) => {
  try {
    await deleteOption(id);
    await buscarOpcoes();
  } catch (error) {
    console.error("Erro ao apagar opção:", error);
  }
};


  useEffect(() => {
    buscarOpcoes();
  }, []);

  return (
    <Box p="5">
      <Box display="grid" gridTemplateColumns="300px 1fr" gap="10">
        <SidebarMenu />
        <Box bg="white" h="90vh" rounded="md" color="#00476f">
          <Heading textAlign="center">Opções Cadastradas</Heading>

          {loading ? (
            <Text>Carregando opções...</Text>
          ) : opcoes.length === 0 ? (
            <Text>Nenhuma opção cadastrada.</Text>
          ) : (
            <Box
              display="flex"
              justifyContent="space-evenly"
              flexWrap="wrap"
              gap="40px"
              mt="20px"
            >
              {opcoes.map((opcao) => (
                <Box
                  key={opcao.id}
                  bg="white"
                  borderRadius="md"
                  p={5}
                  w="200px"
                  h="130px"
                  shadow="md"
                >
                  <Text>
                    <Text as="span" fontWeight="bold">
                      Nome:
                    </Text>{" "}
                    {opcao.nome}
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="bold">
                      Label:
                    </Text>{" "}
                    {opcao.label}
                  </Text>

                  <Box display="flex" justifyContent="space-between" mt="10px">
                    <LuPen
                      cursor="pointer"
                      onClick={() => {
                        setNome(opcao.nome);
                        setLabel(opcao.label);
                        setEditandoId(opcao.id);
                        setOpen(true);
                      }}
                    />
                    <LuTrash
                      color="red"
                      cursor="pointer"
                      onClick={() => handleDelete(opcao.id)}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <Button
        bg="#00476f"
        fontSize="3xl"
        w="70px"
        h="70px"
        rounded="50%"
        position="absolute"
        bottom="10%"
        right="3%"
        _hover={{ bg: "#005d8e", color: "white" }}
        onClick={() => setOpen(true)}
      >
        +
      </Button>

      <DialogModal
        open={open}
        onOpenChange={({ open }) => setOpen(open)}
        title="Cadastrar Opção"
        textButton="Cadastrar"
      >
        <Box display="flex" flexDirection="column" gap="4">
          <Box>
            <Text mb="1">Nome</Text>
            <Input
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              focusRingColor="#00476F"
            />
          </Box>

          <Box>
            <Text mb="1">Label</Text>
            <Input
              placeholder="Digite o label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              focusRingColor="#00476F"
            />
          </Box>
          <Button bg="#00476f" onClick={handleSubmit}>
            Cadastrar
          </Button>
        </Box>
      </DialogModal>

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
          <Alert.Title>Opção cadastrada com sucesso!</Alert.Title>
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
    </Box>
  );
}
