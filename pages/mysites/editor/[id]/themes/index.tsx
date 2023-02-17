import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Text,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react"
import { doc, updateDoc } from "firebase/firestore"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { UserAuth } from "../../../../../components/context/AuthContext"
import Footer from "../../../../../components/Footer"
import ENavbar from "../../../../../components/Site/Editor/ENavbar"
import { db } from "../../../../../utils/Firebase"

function SiteThemes() {
    const router = useRouter()
    const { id } = router.query

    const { user, getUserData } = UserAuth()
    const [isLoading, setIsLoading] = React.useState(false)
    const [selectedTheme, setSelectedTheme] = React.useState("")

    //get site data
    const [siteData, setSiteData] = React.useState<any>(null)
    React.useEffect(() => {
        user.sites?.filter((site: any) => {
            if (site.id === id) {
                setSiteData(site)
                setSelectedTheme(siteData?.themeColor)
            }
        })
    }, [user.sites, siteData?.themeColor, id])

    console.log("siteData: ", siteData)
    console.log(id)

    const themeOptions = [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "cyan",
        "purple",
        "pink",
        "linkedin",
        "facebook",
        "messenger",
        "whatsapp",
        "twitter",
        "telegram",
    ]

    const updateTheme = async () => {
        setIsLoading(true)
        try {
            const siteDataRef = doc(db, "users", user.uid, "sites", siteData.id)
            await updateDoc(siteDataRef, {
                themeColor: selectedTheme,
            })
            getUserData()
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    return (
        <>
            <Head>
                <title>Themes | JumpStarterX</title>
            </Head>
            <ENavbar themeColor={siteData?.themeColor || "blue"} />
            <Flex as="main" p="4" justifyContent="center">
                <Box textAlign="center" p="10" maxWidth="7xl">
                    <Heading as="h1" size="2xl" mb="4">
                        Select A Theme
                    </Heading>

                    <VStack spacing="4" align="left">
                        <Grid
                            templateColumns={{
                                base: "repeat(2, 1fr)",
                                md: "repeat(3, 1fr)",
                                lg: "repeat(4, 1fr)",
                            }}
                            gap={6}
                        >
                            {themeOptions.map((theme) => (
                                <GridItem
                                    key={theme}
                                    alignItems="center"
                                    p="2"
                                    bg={
                                        selectedTheme === theme
                                            ? `${theme}.500`
                                            : `${theme}.50`
                                    }
                                    _dark={{
                                        bg:
                                            selectedTheme === theme
                                                ? `${theme}.50`
                                                : `${theme}.900`,
                                    }}
                                    cursor="pointer"
                                    onClick={() => setSelectedTheme(theme)}
                                    //add inner border

                                    borderRadius="md"
                                >
                                    <HStack key={theme}>
                                        <Box
                                            w="10"
                                            h="10"
                                            bg={
                                                selectedTheme === theme
                                                    ? `${theme}.300`
                                                    : `${theme}.500`
                                            }
                                            _dark={{
                                                bg:
                                                    selectedTheme === theme
                                                        ? `${theme}.500`
                                                        : `${theme}.500`,
                                            }}
                                            borderRadius="full"
                                        />
                                        <Text
                                            color={
                                                selectedTheme === theme
                                                    ? `${theme}.100`
                                                    : `${theme}.500`
                                            }
                                            _dark={{
                                                color:
                                                    selectedTheme === theme
                                                        ? `${theme}.900`
                                                        : `${theme}.500`,
                                            }}
                                        >
                                            {theme.charAt(0).toUpperCase() +
                                                theme.slice(1)}
                                        </Text>
                                    </HStack>
                                </GridItem>
                            ))}
                        </Grid>
                        <Button
                            onClick={updateTheme}
                            colorScheme={selectedTheme}
                            isLoading={isLoading}
                        >
                            Update to {selectedTheme}
                        </Button>
                    </VStack>
                </Box>
            </Flex>
            <Footer />
        </>
    )
}

export default SiteThemes
