import { Alert, Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import SidebarMenu from "../components/SidebarMenu";
import DialogModal from "../components/DialogModal";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "../../database/firebase";
import { LuPen, LuTrash } from "react-icons/lu";


interface DispenserOption {
    id: string
    nome: string
    label: string
    criadoEm: Date;
}

export default function AdminDispenser() {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [label, setLabel] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const playSound = (url: string) => {
        const audio = new Audio(url);
        audio.play().catch(err => console.error("Erro ao reproduzir som:", err));
    };

    const handleSubmit = async () => {
        if (!nome || !label) {
            setShowErrorAlert(true);
            playSound("/sounds/error.wav");
            setTimeout(() => setShowErrorAlert(false), 3000);
            return;
        }

        try {
            // Adiciona a nova opção ao banco de dados
            await addDoc(collection(database, "opções-dispenser"), {
                nome,
                label,
                criadoEm: new Date(),
            });

            // Atualiza as opções
            await buscarOpcoes(); // Aqui estamos recarregando as opções

            // Exibe o alerta de sucesso
            setShowSuccessAlert(true);
            playSound("/sounds/confirmation.wav");
            setTimeout(() => setShowSuccessAlert(false), 3000);

            // Limpa os campos
            setNome("");
            setLabel("");
        } catch (error) {
            console.error("Erro:", error);
            setShowErrorAlert(true);
            playSound("/sounds/error.wav");
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    };


    const [opcoes, setOpcoes] = useState<DispenserOption[]>([]);
    const [loading, setLoading] = useState(true);

    const buscarOpcoes = async () => {
        try {
            const snapshot = await getDocs(collection(database, "opções-dispenser"));
            console.log("Documentos:", snapshot.docs);
            const lista: DispenserOption[] = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    nome: data.nome,
                    label: data.label,
                    criadoEm: data.criadoEm?.toDate?.() || new Date(), // Evita erro se criadoEm estiver ausente
                };
            });

            console.log("Lista formatada:", lista);

            setOpcoes(lista);
        } catch (error) {
            console.error("Erro ao buscar opções:", error);
        } finally {
            setLoading(false);
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
                            {opcoes.map(opcao => (
                                <Box
                                    key={opcao.id}
                                    bg="white"
                                    borderRadius="md"
                                    p={5}
                                    w="250px"
                                    h="150px"
                                    shadow="md"

                                >
                                    <Text>
                                        <Text as="span" fontWeight="bold">Nome:</Text> {opcao.nome}
                                    </Text>
                                    <Text>
                                        <Text as="span" fontWeight="bold">Label:</Text> {opcao.label}
                                    </Text>


                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        mt="50px"
                                    >
                                        <LuPen
                                            cursor="pointer"
                                        />
                                        <LuTrash
                                            color="red"
                                            cursor="pointer"

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
                right="2%"
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
