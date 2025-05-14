/* import { useFilaStore } from "../../hooks/useFilaState";
 */import { fetchTicketsAgrupados, Ticket } from "../../database/ticketService";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function TV() {
    const [time, setTime] = useState<string>("");
    const [filaPorLetra, setFilaPorLetra] = useState<{ [letra: string]: Ticket[] }>({});
    /*  const fila = useFilaStore((state) => state.fila);
     const [atendimento, setAtendimento] = useState<string>("");
     const [consultas, setConsultas] = useState<string>("");
     const [exames, setExames] = useState<string>("");
     const [urgencias, setUrgencias] = useState<string>("");
     const [informacoes, setInformacoes] = useState<string>(""); */

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
        const carregarFila = async () => {
            const resultado = await fetchTicketsAgrupados();
            setFilaPorLetra(resultado);
        };

        carregarFila();

        // Atualizar a cada X segundos (ex: 5s)
        const interval = setInterval(carregarFila, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            p="5"
            display="grid"
            gridTemplateColumns="400px 1fr"
            gap="10"
        >
            <Box
                bg="white"
                w="400px"
                h="750px"
                rounded="md"
                p="5"
                color="#00476F"
            >
                <Flex
                    justifyContent="space-between"
                >
                    <Image
                        src="/logo.png"
                        w="200px"
                    ></Image>
                    <Text
                        fontSize="4xl"
                        fontWeight="500"
                    >{time}</Text>
                </Flex>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                >
                    <Text
                        fontSize="5xl"
                        fontWeight="500"
                        textAlign="center"
                        mt="10"
                    >Senha</Text>
                    <Box
                        border="3px solid #00476F"
                        w="300px"
                        h="200px"
                        rounded="md"
                        mt="10"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text
                            fontSize="8xl"
                            fontWeight="400"
                        >19</Text>
                    </Box>
                </Flex>

                <Flex
                    flexDirection="column"
                    alignItems="center"
                    mt="16"
                >
                    <Text
                        fontSize="3xl"
                        fontWeight="bold"
                    >Por favor dirija-se a</Text>
                </Flex>
                <Flex
                    alignItems="center"
                    justifyContent="space-evenly"
                    mt="10"

                >
                    <Text
                        fontSize="4xl"
                        fontWeight="bold"
                    >Mesa</Text>

                    <Text
                        fontSize="6xl"
                        fontWeight="bold"
                    >A</Text>
                </Flex>




            </Box>

            <Box
                bg=" #0474A5"
                position="relative"
                h="750px"
                rounded="md"
                zIndex={1} // Garante que fique acima de elementos com zIndex menores
            >
                {/* Linha vertical */}
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    height="90%"
                    width="1px"
                    bg="white"
                ></Box>

                {/* Linha horizontal */}
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="90%"
                    height="1px"
                    bg="white"
                ></Box>

                {/* Quadrante Superior Esquerdo */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    width="50%"
                    height="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Flex flexDirection="column" alignItems="center">
                        <Text color="white" fontSize="4xl">Atendimento Geral</Text>

                        <Text fontSize="8xl" fontWeight="bold">
                            {filaPorLetra["A"]?.length
                                ? `${filaPorLetra["A"].at(-1)?.numero.charAt(0)} ${filaPorLetra["A"].at(-1)?.numero.slice(1)}`
                                : "--"}
                        </Text>
                    </Flex>
                </Box>

                {/* Quadrante Superior Direito */}
                <Box
                    position="absolute"
                    top="0"
                    left="50%"
                    width="50%"
                    height="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >

                    <Flex flexDirection="column" alignItems="center">
                        <Text color="white" fontSize="4xl">Marcação de Consultas</Text>

                        <Text fontSize="8xl" fontWeight="bold">
                            {filaPorLetra["B"]?.length
                                ? `${filaPorLetra["B"].at(-1)?.numero.charAt(0)} ${filaPorLetra["B"].at(-1)?.numero.slice(1)}`
                                : "--"}
                        </Text>
                    </Flex>
                </Box>

                {/* Quadrante Inferior Esquerdo */}
                <Box
                    position="absolute"
                    top="50%"
                    left="0"
                    width="50%"
                    height="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >

                    <Flex flexDirection="column" alignItems="center">
                        <Text color="white" fontSize="4xl">Urgências</Text>

                        <Text fontSize="8xl" fontWeight="bold">
                            {filaPorLetra["C"]?.length
                                ? `${filaPorLetra["C"].at(-1)?.numero.charAt(0)} ${filaPorLetra["C"].at(-1)?.numero.slice(1)}`
                                : "--"}
                        </Text>
                    </Flex>
                </Box>

                {/* Quadrante Inferior Direito */}
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    width="50%"
                    height="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >

                    <Flex flexDirection="column" alignItems="center">
                        <Text color="white" fontSize="4xl">Exames</Text>

                        <Text fontSize="8xl" fontWeight="bold">
                            {filaPorLetra["D"]?.length
                                ? `${filaPorLetra["D"].at(-1)?.numero.charAt(0)} ${filaPorLetra["D"].at(-1)?.numero.slice(1)}`
                                : "--"}
                        </Text>
                    </Flex>
                </Box>
            </Box>

            <Text gridColumn="1 / -1" fontSize="5xl" textAlign="center">Aguarde a sua vez com atenção ao visor.</Text>
        </Box>

    )
}