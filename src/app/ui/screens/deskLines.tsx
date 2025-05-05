import { Box, Stack } from "@chakra-ui/react";
import DeskLinesHeader from "../components/DeskLinesHeader";

export default function DeskLines(){
    return(
        <Box 
            display="grid"
            gridTemplateColumns="300px 500px 200px"
            gridTemplateRows=""
            >
            <DeskLinesHeader/>
            
            <Stack p="5">
                <Box
                    bg="gray.100"
                    w="300px"
                    h="160px"
                    rounded="md"
                ></Box>
                <Box
                    bg="gray.100"
                    w="300px"
                    h="160px"
                    rounded="md"
                ></Box>
                <Box
                    bg="gray.100"
                    w="300px"
                    h="160px"
                    rounded="md"
                ></Box>
                <Box
                    bg="gray.100"
                    w="300px"
                    h="160px"
                    rounded="md"
                ></Box>
                <Box
                    bg="gray.100"
                    w="300px"
                    h="160px"
                    rounded="md"
                ></Box>
            </Stack>

            <Stack p="5">
                <Box
                    bg="gray.100"
                    w="300px"
                    h="160px"
                    rounded="md"
                ></Box>
                <Box
                    bg="gray.100"
                    w="300px"
                    h="160px"
                    rounded="md"
                ></Box>
                <Box
                    bg="gray.100"
                    w="300px"
                    h="160px"
                    rounded="md"
                ></Box>
                <Box
                    bg="gray.100"
                    w="300px"
                    h="160px"
                    rounded="md"
                ></Box>
                <Box
                    bg="gray.100"
                    w="300px"
                    h="160px"
                    rounded="md"
                ></Box>
            </Stack>

        </Box>
    )
}