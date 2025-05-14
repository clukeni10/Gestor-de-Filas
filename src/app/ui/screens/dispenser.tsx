import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DispenserOption from "../components/DispenserOption";
import { DispenserOptionType } from "@/app/types/DispenserOptionType";
import { getAllOptions } from "../../database/optionService";
import { useOptionState } from "../../hooks/useOptionState";
import { generateNextTicketNumber, saveTicket } from "../../database/ticketService";
import { useTicketStore } from "../../hooks/useTicketState";
import { useFilaStore } from "../../hooks/useFilaState";

export default function Dispenser() {
  const [time, setTime] = useState<string>("");
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [options, setOptions] = useState<DispenserOptionType[]>([]);

  const generateTicketPVC = useOptionState(state => state.generateTicketPVC);
  const setDateTime = useOptionState(state => state.setDateTime);
  const setSelectedOption = useTicketStore(state => state.setSelectedOption);
  const setTicketNumber = useTicketStore(state => state.setTicketNumber);

  const handleOptionClick = async (option: DispenserOptionType) => {
    setSelectedOptionId(option.id);
    setSelectedOption(option);

    const numero = await generateNextTicketNumber(option.nome);
    setTicketNumber(numero);
    await saveTicket(option, numero);

    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    const data = `${dia}.${mes}.${ano}`;
    const hora = `${horas}:${minutos}`;

    // Adiciona à fila
    useFilaStore.getState().addTicket({
      id: numero,
      operation: option.nome,
      time: hora,
      date: data
    });

    const pdfBytes = await generateTicketPVC(option, numero);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const popup = window.open("", "_blank", "width=350,height=500,left=200,top=200,resizable=no,scrollbars=no");

    if (!popup) {
      alert("O pop-up foi bloqueado. Por favor, permita pop-ups para este site.");
      return;
    }

    popup.document.write(`
      <html>
        <head>
          <title>Bilhete</title>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #fff;
            }
            iframe {
              border: none;
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
          <iframe src="${url}" frameborder="0"></iframe>
        </body>
      </html>
    `);

    setTimeout(() => {
      URL.revokeObjectURL(url);
      popup.close();
    }, 10000);

    setSelectedOptionId(null);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dia = String(now.getDate()).padStart(2, "0");
      const mes = String(now.getMonth() + 1).padStart(2, "0");
      const ano = now.getFullYear();
      const horas = String(now.getHours()).padStart(2, "0");
      const minutos = String(now.getMinutes()).padStart(2, "0");

      const dataHora = `${dia}.${mes}.${ano} - ${horas}:${minutos}`;
      setTime(dataHora);
      setDateTime(dataHora);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [setDateTime]);

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
  }, []);

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
