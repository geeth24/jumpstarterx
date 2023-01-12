import { Box, Flex, SimpleGrid, Spinner } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { UserAuth } from "../../../components/context/AuthContext"
import Footer from "../../../components/Footer"
import ECard from "../../../components/Site/Editor/ECard"
import ENavbar from "../../../components/Site/Editor/ENavbar"

function Elements() {
    const router = useRouter()
    const { id } = router.query
    const [isLoading, setIsLoading] = React.useState(true)

    const { user } = UserAuth()

    //get site data
    const [siteData, setSiteData] = React.useState<any>(null)
    React.useEffect(() => {
        setIsLoading(true)
        user.sites?.filter((site: any) => {
            if (site.id === id) {
                setSiteData(site)
            }
        })
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [user.sites, id])

    console.log(siteData)

    return (
        <>
            <Head>
                <title>Editor | JumpStarterX</title>
            </Head>
            <ENavbar />
            <Box as="main" p="4">
                <Box textAlign="center" p="10">
                    {isLoading ? (
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            height="100vh"
                        >
                            <Spinner
                                size="xl"
                                thickness="4px"
                                speed="0.65s"
                                color="blue.500"
                            />
                        </Flex>
                    ) : (
                        <SimpleGrid columns={[1, 1, 2, 3]} spacing={12}>
                            <ECard
                                title="Navbar"
                                image="/navbar.svg"
                                id={id}
                                link="navbar"
                                themeColor={siteData?.themeColor || "blue"}
                            />
                            <ECard
                                title="Hero"
                                image="/hero.svg"
                                id={id}
                                link="hero"
                                themeColor={siteData?.themeColor || "blue"}
                            />
                            <ECard
                                title="About"
                                image="/about.svg"
                                id={id}
                                link="about"
                                themeColor={siteData?.themeColor || "blue"}
                            />
                            <ECard
                                title="Portfolio"
                                image="/portfolio.svg"
                                id={id}
                                link="portfolio"
                                themeColor={siteData?.themeColor || "blue"}
                            />
                            <ECard
                                title="Contact"
                                image="/contact.svg"
                                id={id}
                                link="contact"
                                themeColor={siteData?.themeColor || "blue"}
                            />
                            <ECard
                                title="Footer"
                                image="/footer.svg"
                                id={id}
                                link="footer"
                                themeColor={siteData?.themeColor || "blue"}
                            />
                        </SimpleGrid>
                    )}
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Elements
