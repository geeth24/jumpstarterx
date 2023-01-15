import React from "react"
import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    Text,
    Stack,
    SimpleGrid,
    Icon,
    Button,
} from "@chakra-ui/react"
import { motion } from "framer-motion"

function Pricing() {
    const topBg = useColorModeValue("gray.100", "gray.700")
    const bottomBg = useColorModeValue("white", "gray.800")
    const Feature = (props: {
        children:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | React.ReactFragment
            | React.ReactPortal
            | null
            | undefined
    }) => {
        return (
            <Flex
                align="center"
                as={motion.div}
                viewport={{ once: true, amount: 0.8 }}
            >
                <Flex shrink={0}>
                    <Icon
                        boxSize={5}
                        mt={1}
                        mr={2}
                        color="blue.500"
                        _dark={{ color: "blue.300" }}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </Icon>
                </Flex>
                <Box ml={4}>
                    <chakra.span
                        mt={2}
                        color="gray.500"
                        _dark={{ color: "gray.400" }}
                    >
                        {props.children}
                    </chakra.span>
                </Box>
            </Flex>
        )
    }

    return (
        <Flex
            boxSize="full"
            //   bg="#F9FAFB"
            //   _dark={{ bg: 'gray.600' }}
            p={10}
            alignItems="center"
            justifyContent="center"
            id="pricing"
        >
            <Box
                mx="auto"
                textAlign={{ base: "left", md: "center" }}
                rounded="md"
                shadow="base"
                w="full"
                bg={bottomBg}
            >
                <Box pt={20} rounded="md" bg={topBg}>
                    <Box w="full" px={[10, 4]} mx="auto">
                        {/* <Text
              mb={2}
              fontSize="5xl"
              fontWeight="bold"
              lineHeight="tight"
              bgGradient="linear(to-r, blue.300, blue.600)"
              bgClip="text"
            >j
              Pricing
            </Text> */}
                    </Box>
                    <Box
                        bgGradient={`linear(to-b, ${topBg} 50%, ${bottomBg} 50%)`}
                    >
                        <Flex
                            rounded="md"
                            mx={6}
                            bg={bottomBg}
                            shadow="xl"
                            mb="100px"
                            textAlign="left"
                            direction={{ base: "column", lg: "row" }}
                        >
                            <Stack spacing={8} p="45px" flex="0.7">
                                <Text
                                    fontSize="3xl"
                                    fontWeight="bold"
                                    lineHeight="tight"
                                >
                                    Free for Life
                                </Text>
                                <chakra.p
                                    fontSize={["sm", "md"]}
                                    color="gray.600"
                                    _dark={{ color: "gray.400" }}
                                >
                                    JumpStarterX Free comes with React.js, for
                                    any other framwork you can buy the
                                    JumpStarterX Pro for Next.js soon.
                                </chakra.p>
                                <Flex align="center">
                                    <Text
                                        fontFamily="body"
                                        whiteSpace="nowrap"
                                        fontWeight="semibold"
                                        textTransform="uppercase"
                                        color="blue.400"
                                    >
                                        What&apos;s included
                                    </Text>
                                    <Flex
                                        ml="15px"
                                        w="full"
                                        borderTopWidth="1px"
                                        h="3px"
                                        borderTopColor={topBg}
                                    />
                                </Flex>
                                <SimpleGrid columns={[1, 2, 1, 2]} spacingY={4}>
                                    <Feature>Downloadable</Feature>
                                    <Feature>Editing Tutorials</Feature>
                                    <Feature>Discord Support</Feature>
                                </SimpleGrid>
                            </Stack>
                            <Stack
                                p="45px"
                                flex="0.3"
                                justify="center"
                                align="center"
                                bg="#F9FAFB"
                                _dark={{ bg: "gray.900" }}
                                borderRightRadius="md"
                            >
                                <Text fontSize="xl" fontWeight="semibold">
                                    No framework
                                </Text>
                                <Flex
                                    align="center"
                                    fontSize="5xl"
                                    fontWeight={["bold", "extrabold"]}
                                    lineHeight="tight"
                                >
                                    Free
                                </Flex>
                                <Stack spacing={6}>
                                    <Button w="300px" colorScheme="blue" py={6}>
                                        Get Started
                                    </Button>
                                </Stack>
                            </Stack>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Flex>
    )
}

export default Pricing
