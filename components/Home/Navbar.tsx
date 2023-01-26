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
    useColorMode,
} from "@chakra-ui/react"
import { AiOutlineMenu } from "react-icons/ai"
import { Link as ScrollLink } from "react-scroll"
// import { Link as LinkRouter } from "react-router-dom"
import { FDLogo } from "../FDLogo"
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

function Navbar() {
    const bg = useColorModeValue("#ffffffb8", "#1A202Cb8")
    const mbg = useColorModeValue("#ffffff", "#1A202C")

    const mobileNav = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()

    const gradient = useColorModeValue(
        "linear(to-r, blue.400, blue.700)", // light
        "linear(to-r, blue.400, blue.600)" // dark
    )
    const variants = {
        open: { opacity: 1, y: "0%" },
        closed: { opacity: 0, y: "-100%" },
    }

    const [scrollNav, setScrollNav] = React.useState(false)

    const changeNav = () => {
        if (window.scrollY >= 10) {
            setScrollNav(true)
        } else {
            setScrollNav(false)
        }
    }

    React.useEffect(() => {
        window.addEventListener("scroll", changeNav)
    }, [])

    return (
        <chakra.header
            bg={scrollNav ? bg : "transparent"}
            w="full"
            px={{ base: 2, sm: 4 }}
            py={4}
            shadow={scrollNav ? "md" : "none"}
            // display={{ base: "none", md: "block" }}
            position="fixed"
            top="0"
            zIndex="999"
            style={{
                backdropFilter: `${
                    scrollNav ? "saturate(180%) blur(50px)" : "none"
                }`,
                WebkitBackdropFilter: `${
                    scrollNav ? "saturate(180%) blur(50px)" : "none"
                }`,
                borderImage:
                    "linear-gradient(90deg, rgba(1, 218, 124, 0) 2.69%, rgba(175, 174, 184, 0) 2.7%, rgba(175, 174, 184, 0.21) 50.12%, rgba(175, 174, 184, 0) 96.58%)",
                borderImageSlice: 1,
                borderBottomWidth: "1.5px",
                borderBottomStyle: "solid",
                borderBottomColor: "transparent",
                transition: "all 0.1s ease-in-out",
            }}
        >
            <Flex
                alignItems="center"
                justifyContent="space-between"
                mx="auto"
                maxWidth="7xl"
            >
                <ScrollLink
                    to="home"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                        cursor: "pointer",
                    }}
                >
                    <Flex>
                        <FDLogo />
                        <chakra.h1
                            fontSize="xl"
                            ml="2"
                            bgClip="text"
                            bgGradient={gradient}
                            fontWeight="black"
                        >
                            JumpStarterX
                        </chakra.h1>
                    </Flex>
                </ScrollLink>
                <HStack display="flex" alignItems="center" spacing={1}>
                    <HStack
                        spacing={1}
                        mr={1}
                        color="blue.500"
                        display={{ base: "none", md: "inline-flex" }}
                    >
                        <Button
                            variant="ghost"
                            as={ScrollLink}
                            to="features"
                            spy={true}
                            smooth={true}
                            duration={500}
                            offset={-70}
                            cursor="pointer"
                        >
                            Features
                        </Button>
                        <Button
                            variant="ghost"
                            as={ScrollLink}
                            to="pricing"
                            spy={true}
                            smooth={true}
                            duration={500}
                            offset={-70}
                            cursor="pointer"
                        >
                            Pricing
                        </Button>

                        <Button variant="ghost" as={Link} href="/signin">
                            Sign in
                        </Button>
                    </HStack>
                    <Button
                        colorScheme="blue"
                        size="sm"
                        as={Link}
                        href="/signup"
                        variant="outline"
                    >
                        Get Started
                    </Button>
                    <IconButton
                        colorScheme="blue"
                        icon={
                            colorMode === "light" ? (
                                <BsFillMoonFill />
                            ) : (
                                <BsFillSunFill />
                            )
                        }
                        onClick={toggleColorMode}
                        aria-label={""}
                        size="sm"
                        variant="ghost"
                    />
                    <Box display={{ base: "inline-flex", md: "none" }}>
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            aria-label="Open menu"
                            fontSize="20px"
                            colorScheme="blue"
                            variant="ghost"
                            icon={<AiOutlineMenu />}
                            onClick={mobileNav.onOpen}
                        />
                        <AnimatePresence>
                            <VStack
                                pos="absolute"
                                top={0}
                                left={0}
                                right={0}
                                display="flex"
                                opacity={mobileNav.isOpen ? 1 : 0}
                                transition="linear 0.2s"
                                flexDirection="column"
                                p={2}
                                pb={4}
                                bg={mbg}
                                spacing={3}
                                rounded="sm"
                                shadow="sm"
                                as={motion.nav}
                                animate={mobileNav.isOpen ? "open" : "closed"}
                                variants={variants}
                            >
                                <CloseButton
                                    aria-label="Close menu"
                                    onClick={mobileNav.onClose}
                                />

                                <Button
                                    w="full"
                                    variant="ghost"
                                    as={ScrollLink}
                                    to="features"
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    onClick={mobileNav.onClose}
                                    cursor="pointer"
                                >
                                    Features
                                </Button>
                                <Button
                                    w="full"
                                    variant="ghost"
                                    as={ScrollLink}
                                    to="pricing"
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    onClick={mobileNav.onClose}
                                    cursor="pointer"
                                >
                                    Pricing
                                </Button>

                                <Button
                                    w="full"
                                    variant="ghost"
                                    as={Link}
                                    href="/signin"
                                    onClick={mobileNav.onClose}
                                    cursor="pointer"
                                >
                                    Sign in
                                </Button>
                            </VStack>
                        </AnimatePresence>
                    </Box>
                </HStack>
            </Flex>
        </chakra.header>
    )
}
export default Navbar
