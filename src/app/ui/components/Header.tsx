import { Box, Image } from "@chakra-ui/react";

export function Header() {

    return(
    <Box
        bg="white"
        w="100%"
        h="130px"
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <Image
            h="100px"
            src="./logo.png" />

    </Box>
    )
}