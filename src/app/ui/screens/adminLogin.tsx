import { Input, VStack, Button, Box} from "@chakra-ui/react";
import DialogModal from "../components/DialogModal";

interface AdminLogin {
  open: boolean;
  onOpenChange: (e: { open: boolean }) => void;
}

export default function AdminLogin(props: AdminLogin) {
  const { open, onOpenChange } = props;

  return (
    <DialogModal
      title="Login Admin"
      open={open}
      onOpenChange={(e) => onOpenChange({ open: e.open })}
      footer={
        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => console.log("Login clicado")}
          mt={4}
        >
        </Button>
      }
    >
      <Box
        bg="white" 
      >
        <VStack>
          <Input
            placeholder="E-mail"
            type="email"
            bg="gray.100"
            borderColor="gray.300"
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px #00476F",
            }}
          />
          <Input
            placeholder="Senha"
            type="password"
            bg="gray.100"
            borderColor="gray.300"
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px #00476F",
            }}
          />
        </VStack>

      </Box>
    </DialogModal>
  );
}
