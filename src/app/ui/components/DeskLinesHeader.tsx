import { Box, Text } from "@chakra-ui/react";

export default function DeskLinesHeader() {
    return (
        <Box
            bg="white"
            w="100%"
            h="50px"
            color="#00476F"
            display="flex"
            justifyContent="flex-start"
            gap="50px"
        >
            <Text
                fontSize="3xl"
            >Em Espera</Text>
            <Text
                fontSize="3xl"
            >Em Atendimento</Text>
        </Box>
    )
}