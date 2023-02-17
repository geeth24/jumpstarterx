import {
    useColorModeValue,
    useDisclosure,
    chakra,
    Flex,
    HStack,
    Box,
    IconButton,
    VStack,
    CloseButton,
    VisuallyHidden,
    Avatar,
    Button,
    useColorMode,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { AiOutlineMenu, AiFillHome, AiFillBell } from "react-icons/ai"
import {
    BsEyeFill,
    BsFillMoonFill,
    BsFillSunFill,
    BsLayersFill,
} from "react-icons/bs"
import { HiCode, HiColorSwatch } from "react-icons/hi"
import { UserAuth } from "../../context/AuthContext"
import { FDLogo } from "../../FDLogo"

function ENavbar(props: any) {
    const bg = useColorModeValue("white", "gray.800")
    const mobileNav = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()

    const router = useRouter()

    const { id } = router.query

    //@ts-ignore
    const { user } = UserAuth()

    return (
        <React.Fragment>
            <chakra.header
                bg={bg}
                w="full"
                px={{
                    base: 2,
                    sm: 4,
                }}
                py={4}
                shadow="md"
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mx="auto"
                >
                    <HStack display="flex" spacing={3} alignItems="center">
                        <Box
                            display={{
                                base: "inline-flex",
                                md: "none",
                            }}
                        >
                            <IconButton
                                display={{
                                    base: "flex",
                                    md: "none",
                                }}
                                aria-label="Open menu"
                                fontSize="20px"
                                color="gray.800"
                                _dark={{
                                    color: "inherit",
                                }}
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
                                    justifySelf="self-start"
                                    onClick={mobileNav.onClose}
                                />
                                <Button
                                    w="full"
                                    variant="ghost"
                                    leftIcon={<AiFillHome />}
                                    as={Link}
                                    href="/mysites/home"
                                >
                                    Home
                                </Button>
                                <Button
                                    w="full"
                                    variant="solid"
                                    colorScheme={props.themeColor}
                                    leftIcon={<BsLayersFill />}
                                    as={Link}
                                    href={"/mysites/editor/" + id}
                                >
                                    Editor
                                </Button>
                                <Button
                                    w="full"
                                    variant="ghost"
                                    leftIcon={<HiCode />}
                                    as={Link}
                                    href="/mysites/integration"
                                >
                                    Integration
                                </Button>
                                <Button
                                    w="full"
                                    variant="solid"
                                    colorScheme={props.themeColor}
                                    leftIcon={<HiColorSwatch />}
                                    as={Link}
                                    href={"/mysites/editor/" + id + "/themes"}
                                >
                                    Themes
                                </Button>
                                <Button
                                    w="full"
                                    variant="ghost"
                                    leftIcon={<BsEyeFill />}
                                    as={Link}
                                    href={"/mysites/editor/" + id + "/preview"}
                                >
                                    Preview
                                </Button>
                            </VStack>
                        </Box>
                        <chakra.a
                            href="/"
                            title="JumpStarterX Home Page"
                            display="flex"
                            alignItems="center"
                        >
                            <FDLogo />
                        </chakra.a>

                        <HStack
                            spacing={3}
                            display={{
                                base: "none",
                                md: "inline-flex",
                            }}
                        >
                            <Button
                                variant="ghost"
                                leftIcon={<AiFillHome />}
                                as={Link}
                                href="/mysites/home"
                            >
                                Home
                            </Button>
                            <Button
                                variant="solid"
                                colorScheme={props.themeColor}
                                leftIcon={<BsLayersFill />}
                                as={Link}
                                href={"/mysites/editor/" + id}
                            >
                                Editor
                            </Button>
                            <Button
                                variant="ghost"
                                leftIcon={<HiCode />}
                                as={Link}
                                href="/mysites/integration"
                            >
                                Integration
                            </Button>
                            <Button
                                variant="solid"
                                colorScheme={props.themeColor}
                                leftIcon={<HiColorSwatch />}
                                as={Link}
                                href={"/mysites/editor/" + id + "/themes"}
                            >
                                Themes
                            </Button>
                            <Button
                                variant="ghost"
                                leftIcon={<BsEyeFill />}
                                as={Link}
                                href={"/mysites/editor/" + id + "/preview"}
                            >
                                Preview
                            </Button>
                        </HStack>
                    </HStack>
                    <HStack
                        spacing={3}
                        display={mobileNav.isOpen ? "none" : "flex"}
                        alignItems="center"
                    >
                        {/* <Button colorScheme={props.themeColor} leftIcon={<BsPlus />}>
              New Wallet
            </Button> */}

                        <chakra.a
                            p={3}
                            color="gray.800"
                            _dark={{
                                color: "inherit",
                            }}
                            rounded="sm"
                            _hover={{
                                color: "gray.800",
                                _dark: {
                                    color: "gray.600",
                                },
                            }}
                        >
                            <AiFillBell />
                            <VisuallyHidden>Notifications</VisuallyHidden>
                        </chakra.a>
                        <IconButton
                            colorScheme={props.themeColor}
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
                        />
                        <Avatar
                            size="sm"
                            name={user.displayName}
                            src={user.photoURL}
                        />
                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    )
}

export default ENavbar
