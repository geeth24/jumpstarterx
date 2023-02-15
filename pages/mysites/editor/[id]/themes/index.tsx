import { Box, Button, Flex, Heading, Select, VStack } from "@chakra-ui/react"
import { collection, doc, updateDoc } from "firebase/firestore"
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
            <ENavbar />
            <Flex as="main" p="4" justifyContent="center">
                <Box textAlign="center" p="10" maxWidth="7xl">
                    <Heading as="h1" size="2xl" mb="4">
                        Select a theme
                    </Heading>

                    <VStack spacing="4" align="left">
                        <Select
                            placeholder="Select theme"
                            onChange={(e) => setSelectedTheme(e.target.value)}
                            value={selectedTheme}
                        >
                            {themeOptions.map((theme) => (
                                <option key={theme} value={theme}>
                                    {theme}
                                </option>
                            ))}
                        </Select>
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
