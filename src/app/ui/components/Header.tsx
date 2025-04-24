import { Box, Image } from "@chakra-ui/react";

export function Header() {

    return(
    <Box
        bg="white"
        w="100%"
        h="80px"
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <Image
            h="70px"
            src="./logo.png" />

    </Box>
    )
}