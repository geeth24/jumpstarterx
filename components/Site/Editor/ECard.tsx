import { Flex, Box, chakra } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"

function ECard(props: any) {
    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            w="sm"
            mx="auto"
        >
            <Box
                bg={props.themeColor + ".300"}
                h={64}
                w="full"
                rounded="lg"
                shadow="2xl"
                bgSize="contain"
                bgPos="center"
                style={{
                    backgroundImage: "url(" + props.image + ")",
                    backgroundRepeat: "no-repeat",
                }}
            />

            <Box
                w={{
                    base: 56,
                    md: 64,
                }}
                bg="white"
                _dark={{
                    bg: `${props.themeColor}.800`,
                }}
                mt={-10}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
            >
                <chakra.h3
                    py={2}
                    textAlign="center"
                    fontWeight="bold"
                    textTransform="uppercase"
                    color={props.themeColor + ".800"}
                    _dark={{
                        color: "white",
                    }}
                    letterSpacing={1}
                >
                    {props.title}
                </chakra.h3>

                <Flex
                    alignItems="center"
                    justifyContent="center"
                    py={2}
                    px={3}
                    bg={props.themeColor + ".200"}
                    _dark={{
                        bg: `${props.themeColor}.700`,
                    }}
                >
                    {/* <chakra.span
            fontWeight="bold"
            color="blue.800"
            _dark={{
              color: 'blue.200',
            }}
          >
            $129
          </chakra.span> */}
                    <chakra.button
                        bg={props.themeColor + ".800"}
                        fontSize="xs"
                        fontWeight="bold"
                        color="white"
                        px={2}
                        py={1}
                        rounded="lg"
                        textTransform="uppercase"
                        _hover={{
                            bg: `${props.themeColor}.700`,
                            _dark: {
                                bg: `${props.themeColor}.600`,
                            },
                        }}
                        _focus={{
                            bg: `${props.themeColor}.700`,
                            _dark: {
                                bg: `${props.themeColor}.600`,
                            },
                            outline: "none",
                        }}
                        as={Link}
                        href={`/mysites/editor/${props.id}/${props.link}`}
                    >
                        Edit Component
                    </chakra.button>
                </Flex>
            </Box>
        </Flex>
    )
}

export default ECard
