import { Alert, Box, Button, Input, Text } from "@chakra-ui/react";
import SidebarMenu from "../components/SidebarMenu";
import DialogModal from "../components/DialogModal";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../database/firebase";

export default function AdminDispenser() {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [label, setLabel] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);



    const handleSubmit = async () => {
        if (!nome || !label) {
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
            return;
        }

        try {
            await addDoc(collection(database, "opções-dispenser"), {
                nome,
                label,
                criadoEm: new Date(),
            });
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 3000);

            setNome("");
            setLabel("");
        } catch (error) {
            console.error("Erro:", error);
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    }

    return (
        <Box p="5">
            <Box display="grid" gridTemplateColumns="300px 1fr" gap="10">
                <SidebarMenu />

                <Box bg="white" h="90vh" rounded="md" color="#00476f">


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
                    <Button
                        bg="#00476f"
                        onClick={handleSubmit}
                    >
                        Cadastrar
                    </Button>


                </Box>

            </DialogModal>
            {showSuccessAlert && (
                <Alert.Root
                    status="success"
                    variant="solid"
                    mt={4}
                    position="absolute"
                    top="50px"
                    right="50px"
                    w="300px"
                    h="50px"
                    

                >
                    <Alert.Indicator />
                    <Alert.Title>Opção cadastrada com sucesso!</Alert.Title>
                </Alert.Root>
            )}

            {showErrorAlert && (
                <Alert.Root
                    status="info"
                    variant="solid"
                    mt={4}
                    position="absolute"
                    top="50px"
                    right="50px"
                    w="250px"
                    h="50px"
                    
                >
                    <Alert.Indicator />
                    <Alert.Title>Preencha todos os campos!</Alert.Title>
                </Alert.Root>
            )}

        </Box>
    )
}

