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
    VStack,
} from "@chakra-ui/react"
import { HeroProps } from "../../typings"

export default function Hero2(props: HeroProps) {
    const bg = useColorModeValue("white", "gray.800")

    return (
        <Box
            px={8}
            py={20}
            bgGradient={useColorModeValue(
                "linear(to-b," +
                    props.themeColor +
                    ".200" +
                    ", " +
                    props.themeColor +
                    ".500)",
                "linear(to-b," +
                    props.themeColor +
                    ".500" +
                    ", " +
                    props.themeColor +
                    ".800)"
            )}
            w="full"
        >
            <Flex
                justifyContent="center"
                alignItems="center"
                direction="column"
            >
                <Box mx="auto">
                    <Box
                        pb={{ base: 10, md: 16 }}
                        w={{ lg: "full" }}
                        zIndex={1}
                        // bg={bg}
                        border="solid 1px transparent"
                    >
                        <Box mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
                            <Box w="full">
                                <VStack
                                    textAlign={{ base: "left", md: "center" }}
                                    spacing={{ base: 5, md: 8 }}
                                >
                                    <chakra.h1
                                        fontSize={{
                                            base: "3xl",
                                            sm: "4xl",
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
                                            color={useColorModeValue(
                                                props.themeColor + ".700",
                                                props.themeColor + ".100"
                                            )}
                                        >
                                            {props.subheading}
                                        </chakra.span>
                                    </chakra.h1>
                                    <chakra.p
                                        mt={{ base: 3, sm: 5, md: 5 }}
                                        fontSize={{ sm: "lg", md: "xl" }}
                                        maxW={{ sm: "5xl" }}
                                        mx={{ sm: "auto", lg: 0 }}
                                        color={useColorModeValue(
                                            props.themeColor + ".700",
                                            props.themeColor + ".100"
                                        )}
                                    >
                                        {props.description}
                                    </chakra.p>
                                </VStack>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    w={{ base: "full", md: 10 / 12 }}
                    mx="auto"
                    textAlign="center"
                >
                    <Image
                        w="full"
                        rounded="lg"
                        shadow="2xl"
                        src={props.image}
                        alt="Hero Image"
                    />
                </Box>
            </Flex>
        </Box>
    )
}
