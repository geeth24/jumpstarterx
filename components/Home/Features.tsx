import React from "react"
import { chakra, Box, SimpleGrid, Flex, Icon } from "@chakra-ui/react"
import { motion, Variants } from "framer-motion"

function Features() {
    const variants: Variants = {
        offscreen: {
            opacity: 0,
            y: "-100%",
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

    const Feature = (props: {
        icon:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | React.ReactFragment
            | React.ReactPortal
            | null
            | undefined
        title:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | React.ReactFragment
            | React.ReactPortal
            | null
            | undefined
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
            <Box
                as={motion.div}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                variants={variants}
            >
                <Icon
                    boxSize={12}
                    _light={{ color: "blue.700" }}
                    mb={4}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    {props.icon}
                </Icon>
                <chakra.h3
                    mb={3}
                    fontSize="lg"
                    lineHeight="shorter"
                    fontWeight="bold"
                    _light={{ color: "gray.900" }}
                >
                    {props.title}
                </chakra.h3>
                <chakra.p
                    lineHeight="tall"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                >
                    {props.children}
                </chakra.p>
            </Box>
        )
    }

    return (
        <Flex
            bg="#edf3f8"
            _dark={{ bg: "#2c374b" }}
            p={20}
            w="auto"
            justifyContent="center"
            alignItems="center"
            id="features"
            as={motion.div}
            initial="initial"
            animate="animate"
            variants={{
                initial: {
                    opacity: 0,
                    y: "200%",
                },
                animate: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: "spring",
                        bounce: 0.4,
                        duration: 1,
                        delay: 0.5,
                    },
                },
            }}
        >
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={20}
                px={{ base: 4, lg: 16, xl: 24 }}
                py={20}
                mx="auto"
                bg="white"
                _dark={{ bg: "gray.800" }}
                shadow="xl"
            >
                <Feature
                    title="Generate a static React.js web app quickly"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-11.5 -10.23174 23 20.46348"
                        >
                            <circle cx="0" cy="0" r="2.05" />
                            <g strokeWidth="1" fill="none">
                                <ellipse rx="11" ry="4.2" />
                                <ellipse
                                    rx="11"
                                    ry="4.2"
                                    transform="rotate(60)"
                                />
                                <ellipse
                                    rx="11"
                                    ry="4.2"
                                    transform="rotate(120)"
                                />
                            </g>
                        </svg>
                    }
                >
                    JumpStarterX asks you for information about your project,
                    and then generates a static React.js web app for you.
                </Feature>

                <Feature
                    title="Downloadable or Github"
                    icon={
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                        />
                    }
                >
                    You can download the files for extra customizations or you
                    can upload your files straignt to Github for deployment.
                </Feature>
            </SimpleGrid>
        </Flex>
    )
}

export default Features
