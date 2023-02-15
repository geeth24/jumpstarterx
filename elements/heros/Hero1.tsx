// Made with JumpStarterX
import React from "react"
import {
    chakra,
    Box,
    useColorModeValue,
    Icon,
    Image,
    Flex,
    SimpleGrid,
} from "@chakra-ui/react"
import { HeroProps } from "../../typings"

export default function Hero1(props: HeroProps) {
    const bg = useColorModeValue("white", "gray.800")

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            bgGradient={useColorModeValue(
                `linear(to-t, ${props.themeColor}.200, ${props.themeColor}.500)`,
                `linear(to-t, ${props.themeColor}.500, ${props.themeColor}.800)`
            )}
            w="full"
        >
            <SimpleGrid columns={{ base: 1, lg: 2 }} maxW="7xl">
                <Box maxW="7xl" mx="auto">
                    <Box
                        pos="relative"
                        pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
                        maxW={{ lg: "2xl" }}
                        w={{ lg: "full" }}
                        zIndex={1}
                        // bg={bg}
                        border="solid 1px transparent"
                    >
                        <Box
                            mx="auto"
                            maxW={{ base: "2xl" }}
                            px={{ base: 4, sm: 6, lg: 8 }}
                            mt={{ base: 10, sm: 12, md: 16, lg: 20, xl: 28 }}
                        >
                            <Box
                                w="full"
                                textAlign={{ sm: "center", lg: "left" }}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <chakra.h1
                                    fontSize={{
                                        base: "4xl",
                                        sm: "5xl",
                                        md: "6xl",
                                    }}
                                    letterSpacing="tight"
                                    lineHeight="short"
                                    fontWeight="extrabold"
                                    color="white"
                                >
                                    <chakra.span
                                        display={{
                                            base: "block",
                                            xl: "inline",
                                        }}
                                    >
                                        {props.heading}
                                        <br />
                                    </chakra.span>
                                    <chakra.span
                                        display={{
                                            base: "block",
                                            xl: "inline",
                                        }}
                                        color={`${props.themeColor}.700`}
                                        _dark={{
                                            color: `${props.themeColor}.100`,
                                        }}
                                    >
                                        {props.subheading}
                                    </chakra.span>
                                </chakra.h1>
                                <chakra.p
                                    mt={{ base: 3, sm: 5, md: 5 }}
                                    fontSize={{ sm: "lg", md: "xl" }}
                                    maxW={{ sm: "xl" }}
                                    mx={{ sm: "auto", lg: 0 }}
                                    color={useColorModeValue(
                                        `${props.themeColor}.700`,
                                        `${props.themeColor}.100`
                                    )}
                                >
                                    {props.description}
                                </chakra.p>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Flex justifyContent="center" alignItems="center">
                    <Image
                        h={[56, 64, 72, 96]}
                        w="full"
                        p={{ base: 4, lg: 0 }}
                        fit="contain"
                        src={props.image}
                        alt="Hero Image"
                    />
                </Flex>
            </SimpleGrid>
        </Flex>
    )
}
