import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormLabel,
    HStack,
    IconButton,
    Input,
    useColorModeValue,
    useDisclosure,
    VStack,
    Text,
    useToast,
} from "@chakra-ui/react"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { FiUploadCloud } from "react-icons/fi"
import Navbar1 from "../../../elements/navbars/Navbar1"
import Navbar2 from "../../../elements/navbars/Navbar2"
import Navbar3 from "../../../elements/navbars/Navbar3"
import { auth, db } from "../../../utils/Firebase"

function NavEditor() {
    const {
        isOpen: NavEditorIsOpen,
        onOpen: NavEditorOnOpen,
        onClose: NavEditorOnClose,
    } = useDisclosure()
    const btnRef = React.useRef<HTMLButtonElement>(null)

    const colorMode = useColorModeValue("#3182ce", "#90CDF4")

    const router = useRouter()
    const { id } = router.query
    const [value, setValue] = React.useState("3")
    const [navbarNumber, setNavbarNumber] = useState("3")

    const [company, setCompany] = useState("")
    const [tab1, setTab1] = React.useState("")
    const [tab2, setTab2] = React.useState("")
    const [tab3, setTab3] = React.useState("")
    const [tab4, setTab4] = React.useState("")
    const [tab5, setTab5] = React.useState("")

    const [themeColor, setThemeColor] = useState("blue")

    const [isLoading, setIsLoading] = useState(false)

    const [logo, setLogo] = useState("")
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
        const storage = getStorage()
        const navbarComponent = ref(
            storage,
            "components/" + "/navbars" + `/navbar${value}` + "/Navbar.jsx"
        )
        const navbarDestination = ref(
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

        const copy = async () => {
            setIsLoading(true)

            //copy the file
            await getDownloadURL(navbarComponent)
                .then((url) => {
                    return fetch(url)
                })
                //make response a blob
                .then((r) => r.blob())
                //put the blob
                .then((blobFile) => {
                    uploadBytes(navbarDestination, blobFile)
                })

            setIsLoading(false)
        }
        await copy()
        setNavbarNumber(value)

        setIsLoading(false)
    }

    return (
        <>
            <Drawer
                isOpen={NavEditorIsOpen}
                placement="right"
                onClose={NavEditorOnClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Edit Your Navbar</DrawerHeader>

                    <DrawerBody>
                        <VStack spacing="10px" align="left">
                            <Image
                                src="/editor/navbar/navbar1.png"
                                width={300}
                                height={100}
                                alt={""}
                                style={{
                                    cursor: "pointer",
                                    border:
                                        value === "1"
                                            ? `2px solid ${colorMode}`
                                            : "none",
                                    borderRadius: "5px",
                                    opacity: value === "1" ? 1 : 0.5,
                                }}
                                onClick={() => setValue("1")}
                            />
                            <Image
                                src="/editor/navbar/navbar2.png"
                                width={300}
                                height={100}
                                alt={""}
                                style={{
                                    cursor: "pointer",
                                    border:
                                        value === "2"
                                            ? `2px solid ${colorMode}`
                                            : "none",
                                    borderRadius: "5px",
                                    opacity: value === "2" ? 1 : 0.5,
                                }}
                                onClick={() => setValue("2")}
                            />
                            <Image
                                src="/editor/navbar/navbar3.png"
                                width={300}
                                height={100}
                                alt={""}
                                style={{
                                    cursor: "pointer",
                                    border:
                                        value === "3"
                                            ? `2px solid ${colorMode}`
                                            : "none",
                                    borderRadius: "5px",
                                    opacity: value === "3" ? 1 : 0.5,
                                }}
                                onClick={() => setValue("3")}
                            />

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
                                    <Text fontSize="sm">Upload Image</Text>
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
                            <FormLabel mt={4}>Brand Name</FormLabel>
                            <Input
                                placeholder="Brand Name"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />

                            <FormLabel mt={4}>Tab 1</FormLabel>
                            <Input
                                placeholder="Tab 1"
                                value={tab1}
                                onChange={(e) => setTab1(e.target.value)}
                            />
                            <FormLabel mt={4}>Tab 2</FormLabel>
                            <Input
                                placeholder="Tab 2"
                                value={tab2}
                                onChange={(e) => setTab2(e.target.value)}
                            />
                            <FormLabel mt={4}>Tab 3</FormLabel>
                            <Input
                                placeholder="Tab 3"
                                value={tab3}
                                onChange={(e) => setTab3(e.target.value)}
                            />
                            <FormLabel mt={4}>Tab 4</FormLabel>
                            <Input
                                placeholder="Tab 4"
                                value={tab4}
                                onChange={(e) => setTab4(e.target.value)}
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
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            variant="outline"
                            mr={3}
                            onClick={NavEditorOnClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                setNavbarNumber(value)
                                updateNavData()
                                NavEditorOnClose()
                            }}
                            isLoading={isLoading}
                            isDisabled={!uploaded}
                        >
                            Save
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <HStack spacing="10px">
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
                <IconButton
                    ref={btnRef}
                    colorScheme={themeColor}
                    onClick={NavEditorOnOpen}
                    icon={<FaEdit />}
                    aria-label="Edit"
                />
            </HStack>
        </>
    )
}

export default NavEditor
