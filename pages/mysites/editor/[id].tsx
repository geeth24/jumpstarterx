import { Box, Flex, Spinner, useMediaQuery, Text } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import Footer from "../../../components/Footer"
import ENavbar from "../../../components/Site/Editor/ENavbar"
import NavEditor from "../../../components/Site/Editor/NavEditor"
import { UserAuth } from "../../../components/context/AuthContext"
import HeroEditor from "../../../components/Site/Editor/HeroEditor"

function Builder() {
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
    const [isLargerThan500] = useMediaQuery("(min-width: 500px)")

    return (
        <>
            <Head>
                <title>Editor | JumpStarterX</title>
            </Head>
            <ENavbar themeColor={siteData?.themeColor || "blue"} />
            <Box
                as="main"
                p="4"
                bg={`${siteData?.themeColor}.50`}
                _dark={{
                    bg: `${siteData?.themeColor}.900`,
                }}
            >
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
                                color={`${siteData?.themeColor || "blue"}.500`}
                            />
                        </Flex>
                    ) : (
                        <>
                            {isLargerThan500 ? (
                                <>
                                    <NavEditor />
                                    <HeroEditor />
                                </>
                            ) : (
                                <>
                                    <Text fontSize="xl" fontWeight="bold">
                                        Please use a larger screen to edit your
                                        site
                                    </Text>
                                </>
                            )}
                        </>
                    )}
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Builder
