import { Box, Text, Flex, Image } from "@chakra-ui/react";
import DispenserOption from "../components/DispenserOption";
import { useState, useEffect } from "react";
import { DispenserOptionType } from "@/app/types/DispenserOptionType";
import { getAllOptions } from "../../database/optionService";
//import { useOptionState } from "../../hooks/useOptionState";

export default function Dispenser() {
  const [time, setTime] = useState<string>("");
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [options, setOptions] = useState<DispenserOptionType[]>([]);

  const handleOptionClick = (option: DispenserOptionType) => {
    setSelectedOptionId(option.id);
    // aqui pode chamar generateTicketPDF, abrir window, etc.
  };

  useEffect(() => {
    const updateTime = () => {
      const agora = new Date();
      const horas = String(agora.getHours()).padStart(2, "0");
      const minutos = String(agora.getMinutes()).padStart(2, "0");
      setTime(`${horas}:${minutos}`);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await getAllOptions();
        setOptions(fetchedOptions);
      } catch (error) {
        console.error("Erro ao buscar as opções:", error);
      }
    };

    fetchOptions();
  }, [setOptions]);

  /*  const ticketWindow= window.open(
            "https://www.exemplo.com", // URL ou path local
            "_blank",                  // alvo: "_blank" = nova aba/janela
            "width=800,height=600"     // especificações da janela
      ); */

  //const generateTicketPVC = useOptionState(state => state.generateTicketPVC)

  return (
    <Box>
      <Box bg="white" h="100px">
        <Flex alignItems="center" justifyContent="space-between">
          <Image src="./logo.png" w="300px" ml="5" />

          <Text color="#00476F" fontSize="4xl" fontWeight="bold" mr="5">
            {time}
          </Text>
        </Flex>
      </Box>

      <Text fontSize="3xl" textAlign="center" mt="8" mb="8">
        Retire aqui a sua senha
      </Text>

      <Flex flexDirection="column" alignItems="center" gap="20px">
        {options.map((opt) => (
          <DispenserOption
            key={opt.id}
            id={opt.id}
            label={opt.label}
            name={opt.nome}
            isSelected={selectedOptionId === opt.id}
            onClick={handleOptionClick}
          />
        ))}
      </Flex>
    </Box>
  );
}
