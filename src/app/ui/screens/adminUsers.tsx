import {
  Box,
  Heading,
  Button,
  Input,
  Text,

} from "@chakra-ui/react";
import SidebarMenu from "../components/SidebarMenu";
import { useState, useEffect } from "react";
import DialogModal from "../components/DialogModal";
import { Field } from "../../../components/ui/field";
import { addAtendente, editAtendente, getAllAtendentes, deleteAtendente } from "../../database/userService";
import { AtendenteType } from "@/app/types/AtendenteType";
import { LuPen, LuTrash } from "react-icons/lu";



export default function AdminUsers() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [atendentes, setAtendentes] = useState<AtendenteType[]>([]);

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch((err) => console.error("Erro ao reproduzir som:", err));
  };
  

  const handleSubmit = async () => {
    if (!nome || !email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      // Adicionando usuário ao Firestore
      await addAtendente(nome, email, senha);

      alert("Usuário cadastrado com sucesso!");
      setOpen(false);
      setNome("");
      setEmail("");
      setSenha("");
    } catch (error) {
      console.log(error)
      alert("Erro ao cadastrar usuário!");
    } finally {
      setLoading(false)
    }

  };


  const buscarAtendentes = async () => {
    try {
      const data = await getAllAtendentes();
      setAtendentes(data);
    } catch (error) {
      console.error("Erro ao buscar atendentes:", error);
    }
  };



  const apagarAtendentes = async () => {
    try{
    await deleteAtendente(id);
    await buscarAtendentes();
      
    } catch(error){
      console.log(error); 
    }
  }

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

          <Box
            display="flex"
            justifyContent="space-evenly"
            flexWrap="wrap"
            gap="40px"
            mt="20px"
          >

            {atendentes.map((atendente) => (
             <Box
             key={atendente.id}
             bg="white"
             borderRadius="2xl"
             p={5}
             w="260px"
             minH="200px"
             shadow="lg"
             transition="all 0.2s"
             _hover={{ shadow: "xl", transform: "scale(1.02)" }}
           >
             <Text fontWeight="bold" fontSize="lg" color="gray.700" mb={2}>
               {atendente.nome}
             </Text>
             <Text fontSize="sm" color="gray.600" mb={1}>
               <Text as="span" fontWeight="semibold">Email:</Text> {atendente.email}
             </Text>
             <Text fontSize="sm" color="gray.600">
               <Text as="span" fontWeight="semibold">Último login:</Text>{" "}
               {atendente.lastLogin
                 ? atendente.lastLogin.toDate().toLocaleString()
                 : "Nunca"}
             </Text>
           
             <Box
               display="flex"
               justifyContent="flex-end"
               alignItems="center"
               gap="4"
               mt="6"
             >
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
                 
                 // onClick={() => handleDelete(atendente.id)}
               />
             </Box>
           </Box>
           
            ))}
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

        {/*  <Alert.Root status="info" title="This is the alert title">
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
    </Alert.Root> */}

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
    </Box >
  );
}
