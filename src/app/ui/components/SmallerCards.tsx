import { Box, Text } from "@chakra-ui/react";

type Props = {
    title: string
    children: React.ReactNode
    onClick: () => void
    
}
export default function SmallerCards({ title, children,  onClick }: Props) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt="10"
            onClick={onClick}
            cursor="pointer"
            
        >
            <Box
                bg="white"
                width="80px"
                height="80px"
                rounded="xl"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                
            >
                {children}
            </Box>
            <Text fontSize="3xl" fontWeight="bold">{title}</Text>
        </Box>

    )
}