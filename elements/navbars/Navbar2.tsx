import React from "react"

import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    HStack,
    Button,
    useDisclosure,
    VStack,
    IconButton,
    CloseButton,
    Image,
} from "@chakra-ui/react"
import { AiOutlineMenu } from "react-icons/ai"
import { NavbarProps } from "../../typings"

const Navbar2 = (props: NavbarProps) => {
    const bg = useColorModeValue("white", "gray.800")
    const mobileNav = useDisclosure()

    return (
        <React.Fragment>
            <chakra.header
                bg={bg}
                w="full"
                px={{ base: 2, sm: 4 }}
                py={4}
                shadow="md"
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mx="auto"
                >
                    <HStack
                        spacing={1}
                        mr={1}
                        color={`${props.themeColor}.500`}
                        display={{ base: "none", md: "inline-flex" }}
                    >
                        <Button variant="ghost">{props.tab1}</Button>
                        <Button variant="ghost">{props.tab2}</Button>
                        <Button variant="ghost">{props.tab3}</Button>
                    </HStack>
                    <Flex display="flex" alignItems="center" mr={20}>
                        <chakra.a
                            href="/"
                            title="JumpStarterX Home Page"
                            display="flex"
                            alignItems="center"
                        >
                            <Image
                                src={props.logo}
                                alt="logo"
                                width="35px"
                                height="35px"
                            />
                        </chakra.a>
                        <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                            {props.company}
                        </chakra.h1>
                    </Flex>
                    <HStack display="flex" alignItems="center" spacing={1}>
                        <Button colorScheme={`${props.themeColor}`} size="sm">
                            {props.tab4}
                        </Button>
                        <Box display={{ base: "inline-flex", md: "none" }}>
                            <IconButton
                                display={{ base: "flex", md: "none" }}
                                aria-label="Open menu"
                                fontSize="20px"
                                color="gray.800"
                                _dark={{ color: "inherit" }}
                                variant="ghost"
                                icon={<AiOutlineMenu />}
                                onClick={mobileNav.onOpen}
                            />

                            <VStack
                                pos="absolute"
                                top={0}
                                left={0}
                                right={0}
                                display={mobileNav.isOpen ? "flex" : "none"}
                                flexDirection="column"
                                p={2}
                                pb={4}
                                m={2}
                                bg={bg}
                                spacing={3}
                                rounded="sm"
                                shadow="sm"
                            >
                                <CloseButton
                                    aria-label="Close menu"
                                    onClick={mobileNav.onClose}
                                />

                                <Button w="full" variant="ghost">
                                    {props.tab1}
                                </Button>
                                <Button w="full" variant="ghost">
                                    {props.tab2}
                                </Button>
                                <Button w="full" variant="ghost">
                                    {props.tab3}
                                </Button>
                            </VStack>
                        </Box>
                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    )
}
export default Navbar2
