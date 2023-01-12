import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    HStack,
    useToast,
    IconButton,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaGoogle } from "react-icons/fa"
import { UserAuth } from "../../components/context/AuthContext"
import Footer from "../../components/Footer"
import { auth } from "../../utils/Firebase"

function Signin() {
    document.title = "Signin | JumpStarterX"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [googleIsLoading, setGoogleIsLoading] = useState(false)
    const router = useRouter()
    // @ts-ignore
    const { signIn, googleSignIn } = UserAuth()
    const toast = useToast()

    useEffect(() => {
        setIsLoading(true)
        if (auth.currentUser) {
            router.push("/mysites/home")
        }
        setIsLoading(false)
    }, [router])

    const handleSubmit = async () => {
        setIsLoading(true)

        try {
            console.log(email, password)
            await signIn(email, password)
            toast({
                title: "Success",
                description: "Signin successful",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            router.push("/mysites/home")
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
        setIsLoading(false)
    }

    const handleSignInWithPopup = async () => {
        setGoogleIsLoading(true)
        try {
            await googleSignIn()
            toast({
                title: "Success",
                description: "Signin successful",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            router.push("/mysites/home")
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
        setGoogleIsLoading(false)
    }

    return (
        <>
            {" "}
            <Flex
                minH={"80vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Sign in </Heading>
                        <Text fontSize={"lg"} color={"gray.600"}>
                            to view your websites
                        </Text>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"start"}
                                    justify={"space-between"}
                                >
                                    <Checkbox>Remember me</Checkbox>
                                    <Link href="/password-reset">
                                        <Text color={"blue.400"}>
                                            Forgot Password?
                                        </Text>
                                    </Link>
                                </Stack>
                                <Button
                                    loadingText="Signing in..."
                                    size="lg"
                                    colorScheme="blue"
                                    isLoading={isLoading}
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                >
                                    Sign in
                                </Button>
                                <IconButton
                                    onClick={() => handleSignInWithPopup()}
                                    aria-label={""}
                                    size="lg"
                                    colorScheme="blue"
                                    isLoading={googleIsLoading}
                                >
                                    <FaGoogle />
                                </IconButton>
                            </Stack>
                            <HStack pt={6} justifyContent="center">
                                <Text>Don&apos;t have an account?</Text>

                                <Link href="/signup">
                                    <Text color={"blue.400"}>Sign up</Text>
                                </Link>
                            </HStack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <Footer />
        </>
    )
}

export default Signin
