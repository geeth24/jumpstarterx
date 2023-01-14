import React from "react"
import {
    Box,
    Image,
    Link,
    chakra,
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack,
    Text,
    Code,
} from "@chakra-ui/react"

import { FaDownload, FaEdit } from "react-icons/fa"
import saveAs from "file-saver"
import {
    getStorage,
    ref,
    uploadString,
    listAll,
    getMetadata,
    getDownloadURL,
} from "firebase/storage"
import JSZip from "jszip"
import { encode as base64_encode } from "base-64"
import { getDoc, doc } from "firebase/firestore"
import { auth, db } from "../../../utils/Firebase"
import { UserAuth } from "../../context/AuthContext"
// import { downloadFolderAsZipPublic } from "../../../utils/Zip"

const SCard = (props: any) => {
    const { user } = UserAuth()

    //get site data
    const [siteData, setSiteData] = React.useState<any>(null)
    //get site data
    const [navbarData, setNavbarData] = React.useState<any>(null)
    const [heroData, setHeroData] = React.useState<any>(null)
    const [aboutData, setAboutData] = React.useState<any>(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const OverlayOne = () => (
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)

    React.useEffect(() => {
        user.sites?.filter((site: any) => {
            if (site.id === props.id) {
                setSiteData(site)
            }
        })
        const getSiteData = async () => {
            const getNavData = async () => {
                setIsLoading(true)
                // @ts-ignore
                const navbarDataCollectionRef = doc(
                    db,
                    "users",
                    // @ts-ignore
                    auth.currentUser.uid,
                    "sites",
                    props.id,
                    "components",
                    "navbar"
                )
                const navbarDataCollection = await getDoc(
                    navbarDataCollectionRef
                )
                setNavbarData(navbarDataCollection.data())
            }
            await getNavData()
            const getHeroData = async () => {
                // @ts-ignore
                const heroDataCollectionRef = doc(
                    db,
                    "users",
                    // @ts-ignore
                    auth.currentUser.uid,
                    "sites",
                    props.id,
                    "components",
                    "hero"
                )
                const heroDataCollection = await getDoc(heroDataCollectionRef)
                setHeroData(heroDataCollection.data())
            }
            await getHeroData()
            const getAboutData = async () => {
                // @ts-ignore
                const aboutDataCollectionRef = doc(
                    db,
                    "users",
                    // @ts-ignore
                    auth.currentUser.uid,
                    "sites",
                    props.id,
                    "components",
                    "about"
                )
                const aboutDataCollection = await getDoc(aboutDataCollectionRef)
                setAboutData(aboutDataCollection.data())
            }
            await getAboutData()
        }
        getSiteData()
        setIsLoading(false)
    }, [props.id, user.sites])

    const downloadFolderAsZipPublic = async (id: string, title: string) => {
        setIsLoading(true)
        const storage = getStorage()

        var configFile = `
// Made with JumpStarterX      

export const config = {

    logo: "${navbarData?.logo}",
   themeColor: "${siteData?.themeColor}",
   tabs:{
        company: "${navbarData?.company}",
        tab1: "${navbarData?.tab1}",
        tab2: "${navbarData?.tab2}",
        tab3: "${navbarData?.tab3}",
        tab4: "${navbarData?.tab4}",
        tab5: "${navbarData?.tab5}",
   },

   hero:{
        heading: "${heroData?.heading}",
        subheading: "${heroData?.subheading}",
        description: "${heroData?.description}",
        image: "${heroData?.image}",
   },

   about:{
        topLine: "${aboutData?.topLine}",
        heading: "${aboutData?.heading}",
        description: "${aboutData?.description}",
        image: "${aboutData?.image}",
   }    

   

}


`
        var encodedConfig = base64_encode(configFile)
        var configeBase64URL = "data:text/javascript;base64," + encodedConfig

        const configRef = ref(
            storage,
            "users/" +
                // @ts-ignore
                auth.currentUser.uid +
                "/sites/" +
                id +
                "/src/" +
                `jsx.config.js`
        )
        await uploadString(configRef, configeBase64URL, "data_url")

        const zip = new JSZip()
        const folderRef = ref(
            storage,
            "users/" +
                // @ts-ignore
                auth.currentUser.uid +
                "/sites/" +
                id +
                "/public"
        )
        const folder = await listAll(folderRef)
        var publicF = zip.folder("public")
        const promises = folder.items
            .map(async (item) => {
                const file = await getMetadata(item)
                const fileRef = ref(storage, item.fullPath)
                const fileBlob = await getDownloadURL(fileRef).then((url) => {
                    return fetch(url).then((response) => response.blob())
                })

                publicF?.file(file.name, fileBlob)
            })
            .reduce((acc, curr) => acc.then(() => curr), Promise.resolve())
        await promises

        const folderRef2 = ref(
            storage,
            "users/" +
                // @ts-ignore
                auth.currentUser.uid +
                "/sites/" +
                id +
                "/src"
        )
        const folder2 = await listAll(folderRef2)
        var srcF = zip.folder("src")
        const promises2 = folder2.items
            .map(async (item) => {
                const file = await getMetadata(item)
                const fileRef = ref(storage, item.fullPath)
                const fileBlob = await getDownloadURL(fileRef).then((url) => {
                    return fetch(url).then((response) => response.blob())
                })
                // @ts-ignore
                srcF.file(file.name, fileBlob)
            })
            .reduce((acc, curr) => acc.then(() => curr), Promise.resolve())
        await promises2

        const folderRef3 = ref(
            storage,
            "users/" +
                // @ts-ignore
                auth.currentUser.uid +
                "/sites/" +
                id +
                "/package.json"
        )
        const file = await getMetadata(folderRef3)
        const fileRef = ref(storage, folderRef3.fullPath)
        const fileBlob = await getDownloadURL(fileRef).then((url) => {
            return fetch(url).then((response) => response.blob())
        })
        // @ts-ignore
        zip.file(file.name, fileBlob)

        const folderRef4 = ref(
            storage,
            "users/" +
                // @ts-ignore
                auth.currentUser.uid +
                "/sites/" +
                id +
                "/.gitignore"
        )
        const file2 = await getMetadata(folderRef4)
        const fileRef2 = ref(storage, folderRef4.fullPath)
        const fileBlob2 = await getDownloadURL(fileRef2).then((url) => {
            return fetch(url).then((response) => response.blob())
        })
        zip.file(file.name, fileBlob)
        zip.file(file2.name, fileBlob2)
        const folderRef5 = ref(
            storage,
            "users/" +
                // @ts-ignore
                auth.currentUser.uid +
                "/sites/" +
                id +
                "/src" +
                "/components"
        )
        const folder5 = await listAll(folderRef5)
        const promises5 = folder5.items
            .map(async (item) => {
                const file = await getMetadata(item)
                const fileRef = ref(storage, item.fullPath)
                // @ts-ignore
                var com = srcF.folder("components")
                const fileBlob = await getDownloadURL(fileRef).then((url) => {
                    return fetch(url).then((response) => response.blob())
                })
                //@ts-ignore
                com.file(file.name, fileBlob)
            })
            .reduce((acc, curr) => acc.then(() => curr), Promise.resolve())
        await promises5

        // zip.file('package.zip', blob3);
        // zip.file('git.zip', blob4);
        // zip.file('components.zip', blob5);
        const zipBlob = await zip.generateAsync({ type: "blob" })
        saveAs(zipBlob, title + ".zip")
        setIsLoading(false)
    }

    return (
        <Box
            w="xs"
            bg="white"
            _dark={{ bg: "gray.800" }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            mx="auto"
        >
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Download Site</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize="xl" color="gray.400">
                            Download contains all the files of your site. You
                            can use it to host your site on any platform.
                            <br />
                            <br />
                        </Text>
                        <Text fontSize="md" color="gray.400">
                            Open the zip file and run the following command to
                            run the site locally.
                            <br />
                            <Code fontSize="md" color="gray.400">
                                npm run jsx or yarn jsx
                            </Code>
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <VStack spacing="2">
                            <HStack>
                                <Button
                                    onClick={onClose}
                                    colorScheme="blue"
                                    variant="ghost"
                                    mr={3}
                                >
                                    Close
                                </Button>
                                <Button
                                    colorScheme="blue"
                                    isLoading={isLoading}
                                    onClick={() => {
                                        downloadFolderAsZipPublic(
                                            props.id,
                                            props.title
                                        )
                                        onClose()
                                    }}
                                >
                                    Confirm and Download
                                </Button>
                            </HStack>
                        </VStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Image
                w="full"
                h={56}
                fit="contain"
                src="/react.svg"
                alt="avatar"
                rounded="lg"
                overflow="hidden"
                mt={5}
            />

            <Box py={5} textAlign="center">
                <Link
                    display="block"
                    fontSize="2xl"
                    color="gray.800"
                    _dark={{ color: "white" }}
                    fontWeight="bold"
                >
                    {props.title}
                </Link>
                <chakra.span
                    fontSize="sm"
                    color="gray.700"
                    _dark={{ color: "gray.200" }}
                >
                    {props.description}
                </chakra.span>
                <HStack
                    spacing={4}
                    alignItems="center"
                    justifyContent="center"
                    mt={4}
                >
                    <Button
                        colorScheme="blue"
                        rightIcon={<FaEdit />}
                        as="a"
                        href={"/mysites/editor/" + props.id}
                    >
                        Edit
                    </Button>
                    <Button
                        colorScheme="blue"
                        rightIcon={<FaDownload />}
                        onClick={() => {
                            // downloadFolderAsZipPublic(props.id, props.title)
                            onOpen()
                        }}
                        isLoading={isLoading}
                    >
                        Download
                    </Button>
                </HStack>
            </Box>
        </Box>
    )
}

export default SCard
