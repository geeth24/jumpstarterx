import { Box, Flex, Spinner, useToast } from "@chakra-ui/react"
import { doc, getDoc, updateDoc } from "@firebase/firestore"
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    uploadString,
} from "firebase/storage"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Footer from "../../../components/Footer"
import ENavbar from "../../../components/Site/Editor/ENavbar"
import {
    navbar1,
    navbar2,
    navbar3,
} from "../../../elements/navbars/navbar.config"
import { auth, db } from "../../../utils/Firebase"
import { encode as base64_encode } from "base-64"
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

    return (
        <>
            <Head>
                <title>Editor | JumpStarterX</title>
            </Head>
            <ENavbar />
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
                                color="blue.500"
                            />
                        </Flex>
                    ) : (
                        <>
                            <NavEditor />
                            <HeroEditor />
                        </>
                    )}
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Builder
