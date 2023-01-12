import React, { useEffect, useState } from "react"
import {
    Box,
    Button,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react"
import Navbar1 from "../../../elements/navbars/Navbar1"
import Navbar2 from "../../../elements/navbars/Navbar2"
import Navbar3 from "../../../elements/navbars/Navbar3"

import {
    navbar1,
    navbar2,
    navbar3,
} from "../../../elements/navbars/navbar.config"

import { auth, db } from "../../../utils/Firebase"
import { doc, getDoc, updateDoc } from "@firebase/firestore"
import { encode as base64_encode } from "base-64"
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
    uploadString,
} from "firebase/storage"
import ENavbar from "./ENavbar"
// import { fdLogo } from "../../FDLogo"

import { useRouter } from "next/router"
import { FiUploadCloud } from "react-icons/fi"
function NavEditor() {
    const router = useRouter()
    const { id } = router.query

    const [value, setValue] = React.useState("3")
    const [navbarNumber, setNavbarNumber] = useState("3")

    const [company, setCompany] = useState("Company")
    const [tab1, setTab1] = React.useState("Tab 1")
    const [tab2, setTab2] = React.useState("Tab 2")
    const [tab3, setTab3] = React.useState("Tab 3")
    const [tab4, setTab4] = React.useState("Tab 4")
    const [tab5, setTab5] = React.useState("Tab 5")

    const [themeColor, setThemeColor] = useState("blue")

    const [isLoading, setIsLoading] = useState(false)

    const [logo, setLogo] = useState("/logo.png")
    const [selectedFile, setSelectedFile] = useState()
    const toast = useToast()
    const [uploaded, setUploaded] = useState(true)

    const handleChangeFile = async (e: any) => {
        setUploaded(false)
        setSelectedFile(e.target.files[0])
        console.log(e.target.files[0]?.name)
        var fileExtension = e.target.files[0]?.name.split(".").pop()
        console.log(fileExtension)
        const storage = getStorage()
        const storageRef = ref(
            storage,
            `users/${auth?.currentUser?.uid}/sites/${id}/images/logo.${fileExtension}`
        )
        await uploadBytes(storageRef, e.target.files[0])
        await getDownloadURL(storageRef)
            .then((url) => {
                setLogo(url)
            })
            .catch((error) => {
                // Handle any errors
            })
        toast({
            position: "bottom",
            description: "File Uploaded",
            status: "success",
            duration: 3000,
            isClosable: true,
        })

        setUploaded(true)
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(async (authObj) => {
            unsub()
            if (authObj) {
                // @ts-ignore

                const getThemeColor = async () => {
                    setIsLoading(true)
                    // @ts-ignore
                    const userSitesElementsCollection = doc(
                        db,
                        "users",
                        // @ts-ignore
                        auth.currentUser.uid,
                        "sites",
                        id
                    )
                    const userSitesElementsData = await getDoc(
                        userSitesElementsCollection
                    )
                    setThemeColor(userSitesElementsData.data()?.themeColor)
                }
                await getThemeColor()

                const getNavData = async () => {
                    setIsLoading(true)
                    // @ts-ignore
                    const userSitesElementsCollection = doc(
                        db,
                        "users",
                        // @ts-ignore
                        auth.currentUser.uid,
                        "sites",
                        id,
                        "components",
                        "navbar"
                    )
                    const userSitesElementsData = await getDoc(
                        userSitesElementsCollection
                    )

                    setCompany(userSitesElementsData.data()?.company)
                    setTab1(userSitesElementsData.data()?.tab1)
                    setTab2(userSitesElementsData.data()?.tab2)
                    setTab3(userSitesElementsData.data()?.tab3)
                    setTab4(userSitesElementsData.data()?.tab4)
                    setTab5(userSitesElementsData.data()?.tab5)
                    setLogo(userSitesElementsData.data()?.logo)
                    setValue(userSitesElementsData.data()?.navbarNumber)
                    setNavbarNumber(userSitesElementsData.data()?.navbarNumber)
                }
                await getNavData()
                console.log("getNavData")
                setIsLoading(false)
            } else {
                // not logged in
            }
        })
    }, [id])

    const updateNavData = async () => {
        setIsLoading(true)
        // @ts-ignore
        const userSitesElementsCollection = doc(
            db,
            "users",
            // @ts-ignore
            auth.currentUser.uid,
            "sites",
            id,
            "components",
            "navbar"
        )
        await updateDoc(userSitesElementsCollection, {
            company: company,
            tab1: tab1,
            tab2: tab2,
            tab3: tab3,
            tab4: tab4,
            tab5: tab5,
            logo: logo,
            navbarNumber: value,
        })
        var navbar = ``
        if (value === "1") {
            navbar = navbar1
        } else if (value === "2") {
            navbar = navbar2
        } else if (value === "3") {
            navbar = navbar3
        }

        const endcoded = base64_encode(navbar)

        var code = "data:text/javascript;base64," + endcoded
        const storage = getStorage()
        const storageRef = ref(
            storage,
            "users/" +
                // @ts-ignore

                auth.currentUser.uid +
                "/sites/" +
                id +
                "/src" +
                "/components" +
                "/Navbar.jsx"
        )

        const upload = async () => {
            setIsLoading(true)
            await uploadString(storageRef, code, "data_url")
            setIsLoading(false)
        }
        await upload()
        setNavbarNumber(value)

        // const download = async () => {
        //   setIsLoading(true);
        //   await downloadString(storageRef);
        //   setIsLoading(false);
        // };
        // const downloadString = async (ref: StorageReference) => {
        //   const url = await getDownloadURL(ref);
        //   const xhr = new XMLHttpRequest();
        //   xhr.responseType = 'blob';
        //   xhr.onload = (_event) => {
        //     const blob = xhr.response;
        //     const url = window.URL.createObjectURL(blob);
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.download = 'Navbar.jsx';
        //     link.click();
        //   };
        //   xhr.open('GET', url);
        //   xhr.send();
        // };
        // download();

        setIsLoading(false)
    }

    return (
        <>
            <ENavbar />
            <Text fontSize="2xl" fontWeight="bold" mb={4} align="center" mt={5}>
                Navbar Preview
            </Text>
            {value === "1" && (
                <Navbar1
                    company={company}
                    tab1={tab1}
                    tab2={tab2}
                    tab3={tab3}
                    tab4={tab4}
                    tab5={tab5}
                    themeColor={themeColor}
                    logo={logo}
                />
            )}
            {value === "2" && (
                <Navbar2
                    company={company}
                    tab1={tab1}
                    tab2={tab2}
                    tab3={tab3}
                    tab4={tab4}
                    tab5={tab5}
                    themeColor={themeColor}
                    logo={logo}
                />
            )}
            {value === "3" && (
                <Navbar3
                    company={company}
                    tab1={tab1}
                    tab2={tab2}
                    tab3={tab3}
                    tab4={tab4}
                    tab5={tab5}
                    themeColor={themeColor}
                    logo={logo}
                />
            )}

            <Box
                as="section"
                bg="gray.50"
                _dark={{ bg: "gray.700" }}
                minH="80vh"
            >
                <Grid templateColumns="repeat(12, 1fr)" gap={6} py={12}>
                    <GridItem colSpan={{ base: 12, md: 6 }}>
                        <VStack spacing={8}>
                            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                                Edit Your Navigation Bar
                            </Text>

                            <Box
                                bg="blue.300"
                                h={64}
                                w="sm"
                                rounded="lg"
                                shadow="2xl"
                                bgSize="contain"
                                bgPos="center"
                                style={{
                                    backgroundImage: `url("/navbar.svg")`,
                                    backgroundRepeat: "no-repeat",
                                }}
                            />
                        </VStack>
                    </GridItem>
                    <GridItem colSpan={{ base: 12, md: 6 }}>
                        <VStack spacing={4} align="left" w="sm">
                            <VStack spacing={4} align="center" w="sm">
                                <RadioGroup onChange={setValue} value={value}>
                                    <HStack spacing={4}>
                                        <Radio value="1">Navbar 1</Radio>
                                        <Radio value="2">Navbar 2</Radio>
                                        <Radio value="3">Navbar 3</Radio>
                                    </HStack>
                                </RadioGroup>
                                <Text fontSize="sm" fontWeight="bold" mb={4}>
                                    Current Navbar: {navbarNumber}
                                </Text>
                            </VStack>
                            <HStack spacing={4} align="top">
                                <Box>
                                    <FormLabel mt={4}>Brand Name</FormLabel>
                                    <Input
                                        placeholder="Brand Name"
                                        value={company}
                                        onChange={(e) =>
                                            setCompany(e.target.value)
                                        }
                                    />

                                    <FormLabel mt={4}>Tab 1</FormLabel>
                                    <Input
                                        placeholder="Tab 1"
                                        value={tab1}
                                        onChange={(e) =>
                                            setTab1(e.target.value)
                                        }
                                    />
                                    <FormLabel mt={4}>Tab 2</FormLabel>
                                    <Input
                                        placeholder="Tab 2"
                                        value={tab2}
                                        onChange={(e) =>
                                            setTab2(e.target.value)
                                        }
                                    />
                                    <FormLabel mt={4}>Tab 3</FormLabel>
                                    <Input
                                        placeholder="Tab 3"
                                        value={tab3}
                                        onChange={(e) =>
                                            setTab3(e.target.value)
                                        }
                                    />
                                </Box>
                                <Box>
                                    <FormLabel mt={4}>Tab 4</FormLabel>
                                    <Input
                                        placeholder="Tab 4"
                                        value={tab4}
                                        onChange={(e) =>
                                            setTab4(e.target.value)
                                        }
                                    />
                                    {value !== "2" ? (
                                        <>
                                            <FormLabel mt={4}>Tab 5</FormLabel>
                                            <Input
                                                placeholder="Tab 5"
                                                value={tab5}
                                                onChange={(e) =>
                                                    setTab5(e.target.value)
                                                }
                                            />
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    <FormLabel mt={4}>Logo</FormLabel>
                                    <FormLabel
                                        onChange={handleChangeFile}
                                        cursor="pointer"
                                        shadow="md"
                                        borderWidth="1px"
                                        p={4}
                                        rounded="md"
                                    >
                                        <HStack spacing={4}>
                                            <FiUploadCloud />
                                            <Text fontSize="sm">
                                                Upload Image
                                            </Text>
                                        </HStack>
                                        <Input
                                            type="file"
                                            style={{
                                                display: "none",
                                            }}
                                            // @ts-ignore
                                            name={selectedFile?.name}
                                            //accepted file types images
                                            accept="image/*"
                                        />
                                        <Text fontSize="sm">
                                            {/* @ts-ignore */}
                                            {selectedFile?.name}
                                        </Text>
                                    </FormLabel>
                                </Box>
                            </HStack>

                            <Button
                                onClick={updateNavData}
                                isLoading={isLoading}
                                colorScheme="blue"
                                isDisabled={!uploaded}
                            >
                                Update
                            </Button>
                        </VStack>
                    </GridItem>
                </Grid>
            </Box>
        </>
    )
}

export default NavEditor
