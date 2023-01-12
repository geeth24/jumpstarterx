import React from "react"
import {
    chakra,
    Box,
    Stack,
    Image,
    Flex,
    Button,
    Icon,
    useColorModeValue,
} from "@chakra-ui/react"
import { motion, Variants } from "framer-motion"

function CTA() {
    const gradient = useColorModeValue(
        "linear(to-r, blue.400, blue.700)", // light
        "linear(to-r, blue.400, blue.600)" // dark
    )
    const variants: Variants = {
        offscreen: {
            opacity: 0,
            y: "-50%",
        },
        onscreen: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 1,
                delay: 0.5,
            },
        },
    }
    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            _light={{ bg: "white" }}
            px={8}
            py={24}
            mx="auto"
        >
            <Box
                w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
                mx="auto"
                pr={{ md: 20 }}
            >
                <chakra.h2
                    fontSize={{ base: "3xl", sm: "4xl" }}
                    fontWeight="extrabold"
                    lineHeight="shorter"
                    color="blue.600"
                    _dark={{ color: "white" }}
                    mb={6}
                >
                    <chakra.span display="block">Ready to dive in?</chakra.span>
                    <chakra.span
                        display="block"
                        color="black"
                        _dark={{ color: "gray.500" }}
                        as={motion.div}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.8 }}
                        variants={variants}
                    >
                        Create your first website with{" "}
                        <chakra.span
                            bgClip="text"
                            bgGradient={gradient}
                            as={motion.div}
                            initial="initial"
                            animate="animate"
                            variants={{
                                initial: {
                                    opacity: 0,
                                    y: "-5%",
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: "1",
                                        ease: "easeInOut",
                                        delay: 0.5,
                                    },
                                },
                            }}
                        >
                            JumpStarterX
                        </chakra.span>{" "}
                        today.
                    </chakra.span>
                </chakra.h2>
                <chakra.p
                    mb={6}
                    fontSize={{ base: "lg", md: "xl" }}
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                    as={motion.div}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    variants={variants}
                >
                    JumpStarterX is a software that allows you to create a
                    website with React.js & Chakra UI faster than ever.
                </chakra.p>
                <Stack
                    direction={{ base: "column", sm: "row" }}
                    mb={{ base: 4, md: 8 }}
                    spacing={2}
                >
                    <Box
                        display="inline-flex"
                        rounded="md"
                        shadow="md"
                        as={motion.div}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.8 }}
                        variants={variants}
                    >
                        <Button
                            as="a"
                            variant="solid"
                            colorScheme="blue"
                            display="inline-flex"
                            alignItems="center"
                            justifyContent="center"
                            w={{ base: "full", sm: "auto" }}
                            mb={{ base: 2, sm: 0 }}
                            size="lg"
                            cursor="pointer"
                        >
                            Get Started
                            <Icon
                                boxSize={4}
                                ml={1}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </Icon>
                        </Button>
                    </Box>
                </Stack>
            </Box>
            <Box w={{ base: "full", md: 10 / 12 }} mx="auto" textAlign="center">
                <Image
                    w="full"
                    rounded="lg"
                    shadow="2xl"
                    src="/building.svg"
                    alt="Illustration of a person working in a website."
                    as={motion.img}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    variants={variants}
                />
            </Box>
        </Flex>
    )
}

export default CTA
