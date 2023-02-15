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
    Textarea,
} from "@chakra-ui/react"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    uploadString,
} from "firebase/storage"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { FiUploadCloud } from "react-icons/fi"
import { hero1 } from "../../../elements/heros/hero.config"
import { auth, db } from "../../../utils/Firebase"
import { encode as base64_encode } from "base-64"
import Hero1 from "../../../elements/heros/Hero1"

function HeroEditor() {
    const {
        isOpen: HeroEditorIsOpen,
        onOpen: HeroEditorOnOpen,
        onClose: HeroEditorOnClose,
    } = useDisclosure()
    const btnRef = React.useRef<HTMLButtonElement>(null)

    const colorMode = useColorModeValue("#3182ce", "#90CDF4")

    const router = useRouter()
    const { id } = router.query
    const [value, setValue] = React.useState("1")
    const [heroNumber, setHeroNumber] = useState("1")

    const [heading, setHeading] = useState("Create webites faster")
    const [subheading, setSubheading] = useState("With JumpStarterX")
    const [description, setDescription] = useState(
        "JumpStarterX is a new way to design your website. It is a simple and easy to use tool that allows you to create a beautiful website in just a few minutes."
    )
    const [image, setImage] = useState("/code.png")
    const [themeColor, setThemeColor] = useState("blue")

    const [isLoading, setIsLoading] = useState(false)

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
            `users/${auth?.currentUser?.uid}/sites/${id}/images/${e.target.files[0].name}`
        )
        await uploadBytes(storageRef, e.target.files[0])
        await getDownloadURL(storageRef)
            .then((url) => {
                setImage(url)
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
                        "hero"
                    )
                    const userSitesElementsData = await getDoc(
                        userSitesElementsCollection
                    )

                    setHeading(userSitesElementsData.data()?.heading)
                    setSubheading(userSitesElementsData.data()?.subheading)
                    setDescription(userSitesElementsData.data()?.description)
                    setImage(userSitesElementsData.data()?.image)
                    setValue(userSitesElementsData.data()?.heroNumber)
                    setHeroNumber(userSitesElementsData.data()?.heroNumber)
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
            "hero"
        )
        await updateDoc(userSitesElementsCollection, {
            heading: heading,
            subheading: subheading,
            description: description,
            image: image,
            heroNumber: value,
        })
        var hero = ``
        if (value === "1") {
            hero = hero1
        }

        const endcoded = base64_encode(hero)

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
                "/Hero.jsx"
        )

        const upload = async () => {
            setIsLoading(true)
            await uploadString(storageRef, code, "data_url")
            setIsLoading(false)
        }
        await upload()
        setHeroNumber(value)

        setIsLoading(false)
    }

    return (
        <>
            <Drawer
                isOpen={HeroEditorIsOpen}
                placement="right"
                onClose={HeroEditorOnClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Edit Your Hero</DrawerHeader>

                    <DrawerBody>
                        <VStack spacing="10px" align="left">
                            <Image
                                src="/editor/hero/hero1.png"
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
                            <FormLabel mt={4}>Image</FormLabel>
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
                            <FormLabel mt={4}>Heading</FormLabel>
                            <Input
                                placeholder="Heading"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                            />

                            <FormLabel mt={4}>Subheading</FormLabel>
                            <Input
                                placeholder="Subheading"
                                value={subheading}
                                onChange={(e) => setSubheading(e.target.value)}
                            />
                            <FormLabel mt={4}>Description</FormLabel>
                            <Textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            {/* {value !== "2" ? (
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
                            )} */}
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            variant="outline"
                            mr={3}
                            onClick={HeroEditorOnClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                setHeroNumber(value)
                                updateNavData()
                                HeroEditorOnClose()
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
                    <Hero1
                        heading={heading}
                        subheading={subheading}
                        description={description}
                        themeColor={themeColor}
                        image={image}
                    />
                )}

                <IconButton
                    ref={btnRef}
                    colorScheme={themeColor}
                    onClick={HeroEditorOnOpen}
                    icon={<FaEdit />}
                    aria-label="Edit"
                />
            </HStack>
        </>
    )
}

export default HeroEditor
