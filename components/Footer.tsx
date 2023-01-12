import {
    Box,
    chakra,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    VisuallyHidden,
    Input,
    IconButton,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react"
import { ReactNode } from "react"
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa"
import { BiMailSend } from "react-icons/bi"

// import { Link as LinkR } from "react-router-dom"
import { FDLogo } from "./FDLogo"

const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode
    label: string
    href: string
}) => {
    return (
        <chakra.button
            bg={useColorModeValue("blackAlpha.100", "whibluepha.100")}
            rounded={"full"}
            w={8}
            h={8}
            cursor={"pointer"}
            as={"a"}
            href={href}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"background 0.3s ease"}
            _hover={{
                bg: useColorModeValue("blackAlpha.200", "whibluepha.200"),
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    )
}

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
            {children}
        </Text>
    )
}

function Footer() {
    const gradient = useColorModeValue(
        "linear(to-r, blue.400, blue.700)", // light
        "linear(to-r, blue.400, blue.600)" // dark
    )
    return (
        <Box
            bg={useColorModeValue("#edf3f8", "#151b25")}
            color={useColorModeValue("gray.700", "gray.200")}
        >
            <Container as={Stack} maxW={"6xl"} py={10}>
                <SimpleGrid
                    templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
                    spacing={8}
                >
                    <Stack spacing={6}>
                        <Link href="/">
                            <Box>
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
                            </Box>
                        </Link>
                        <Text fontSize={"sm"}>
                            © 2022 JumpStarterX. All rights reserved
                        </Text>
                        <Stack direction={"row"} spacing={6}>
                            <SocialButton label={"Twitter"} href={"#"}>
                                <FaTwitter />
                            </SocialButton>
                            <SocialButton label={"Instagram"} href={"#"}>
                                <FaInstagram />
                            </SocialButton>
                            <SocialButton label={"Github"} href={"#"}>
                                <FaGithub />
                            </SocialButton>
                        </Stack>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <ListHeader>Company</ListHeader>
                        <Link href={"#"}>About us</Link>
                        <Link href={"#"}>Contact us</Link>
                        <Link href={"#"}>Pricing</Link>
                        <Link href={"#"}>Testimonials</Link>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <ListHeader>Support</ListHeader>
                        <Link href={"#"}>Help Center</Link>
                        <Link href={"#"}>Terms of Service</Link>
                        <Link href={"#"}>Legal</Link>
                        <Link href={"#"}>Privacy Policy</Link>
                        <Link href={"#"}>Status</Link>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <ListHeader>Stay up to date</ListHeader>
                        <Stack direction={"row"}>
                            <Input
                                placeholder={"Your email address"}
                                bg={useColorModeValue(
                                    "blackAlpha.100",
                                    "whibluepha.100"
                                )}
                                border={0}
                                _focus={{
                                    bg: "whibluepha.300",
                                }}
                            />
                            <IconButton
                                bg={useColorModeValue("blue.500", "blue.600")}
                                color={"white"}
                                _hover={{
                                    bg: useColorModeValue(
                                        "blue.600",
                                        "blue.700"
                                    ),
                                }}
                                aria-label="Subscribe"
                                icon={<BiMailSend />}
                            />
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    )
}

export default Footer
