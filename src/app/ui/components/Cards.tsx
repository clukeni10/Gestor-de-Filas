import { Box, Text } from "@chakra-ui/react";



type Props = {
    title: string
    children: React.ReactNode;

}

export default function Cards({ title, children }: Props) {


    return (
        <Box
            bg="white"
            width="200px"
            height="200px"
            rounded="xl"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                {children}

            </Box>
            <Text
                fontSize="2xl"
                fontWeight="bold"
                color="black"
            >
                {title}
            </Text>
        </Box>
    )
}