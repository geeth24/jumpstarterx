import React, { useEffect, useState } from "react"
import {
    Box,
    Button,
    chakra,
    Flex,
    FormLabel,
    HStack,
    Input,
    SimpleGrid,
    Text,
    useToast,
    VStack,
    Image,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    Spinner,
} from "@chakra-ui/react"

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
// import codeLogo from "../../../images/code.png"
import { FiUploadCloud } from "react-icons/fi"
import { useRouter } from "next/router"
// import CTA1 from '../../../choc-ui/cta/CTA1';

function AboutEditor() {
    // const { id } = useParams()
    const router = useRouter()
    const { id } = router.query

    const value = "3"
    const [topLine, setTopLine] = useState("Create webites faster")
    const [heading, setHeading] = useState("Create webites faster")
    const [description, setDescription] = useState(
        "JumpStarterX is a new way to design your website. It is a simple and easy to use tool that allows you to create a beautiful website in just a few minutes."
    )
    const [image, setImage] = useState("/code.png")

    const [selectedFile, setSelectedFile] = useState()

    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()

    const {
        isOpen: imageIsOpen,
        onOpen: imageOnOpen,
        onClose: imageOnClose,
    } = useDisclosure()

    const {
        isOpen: topLineIsOpen,
        onOpen: topLineOnOpen,
        onClose: topLineOnClose,
    } = useDisclosure()

    const {
        isOpen: headingIsOpen,
        onOpen: headingOnOpen,
        onClose: headingOnClose,
    } = useDisclosure()

    const {
        isOpen: descriptionIsOpen,
        onOpen: descriptionOnOpen,
        onClose: descriptionOnClose,
    } = useDisclosure()

    const handleChangeFile = async (e: any) => {
        setSelectedFile(e.target.files[0])
        console.log(e.target.files[0]?.name)
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

        // setUploaded(true);
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(async (authObj) => {
            unsub()
            if (authObj) {
                // @ts-ignore

                const getAboutData = async () => {
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
                        "about"
                    )
                    const userSitesElementsData = await getDoc(
                        userSitesElementsCollection
                    )
                    setTopLine(userSitesElementsData.data()?.topLine)
                    setHeading(userSitesElementsData.data()?.heading)
                    setDescription(userSitesElementsData.data()?.description)
                    setImage(userSitesElementsData.data()?.image)
                }
                await getAboutData()
                console.log("getAboutData")
                setIsLoading(false)
            } else {
                // not logged in
            }
        })
    }, [id])

    const updateAboutData = async () => {
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
            "about"
        )
        await updateDoc(userSitesElementsCollection, {
            heading: heading,
            topLine: topLine,
            description: description,
            image: image,
        })
        var about = ``
        if (value === "3") {
            about = `
// Made with JumpStarterX      
import { chakra, Flex, SimpleGrid, Image } from '@chakra-ui/react';

export default function About({ id }) {
  const topLine = '${topLine}';
  const heading = '${heading}';
  const description = '${description}';
  const image = '${image}';

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} id={id}>
      <Flex bg="blue.400">
        <Image
          src={image}
          alt={heading}
          fit="cover"
          w="full"
          h={{ base: 64, md: 'full' }}
          bg="blue.400"
          loading="lazy"
          opacity={0.4}
        />
      </Flex>
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, md: 8, lg: 20 }}
        py={24}
        zIndex={3}
      >
        <chakra.span
          color="blue.600"
          _dark={{ color: 'gray.300' }}
          fontSize="lg"
          textTransform="uppercase"
          fontWeight="extrabold"
        >
          {topLine}
        </chakra.span>
        <chakra.h1
          mb={4}
          fontSize={{ base: '4xl', md: '4xl', lg: '5xl' }}
          fontWeight="bold"
          color="blue.600"
          _dark={{ color: 'gray.300' }}
          lineHeight="shorter"
          textShadow="2px 0 currentcolor"
        >
          {heading}
        </chakra.h1>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="md"
          color="blue.600"
          _dark={{ color: 'gray.400' }}
          letterSpacing="wider"
        >
          {description}
        </chakra.p>
      </Flex>
    </SimpleGrid>
  );
}


    `
        }

        const endcoded = base64_encode(about)

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
                "/About.jsx"
        )

        const upload = async () => {
            setIsLoading(true)
            await uploadString(storageRef, code, "data_url")
            setIsLoading(false)
        }
        await upload()

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
        //     link.download = 'Aboutbar.jsx';
        //     link.click();
        //   };
        //   xhr.open('GET', url);
        //   xhr.send();
        // };
        // download();

        setIsLoading(false)
        topLineOnClose()
        headingOnClose()
        descriptionOnClose()
        imageOnClose()
    }

    if (!isLoading) {
        return (
            <>
                <ENavbar />
                <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }}>
                    <Flex justifyContent="center" alignItems="center">
                        <VStack spacing={2}>
                            <Text fontSize="2xl" fontWeight="bold" mt={4}>
                                Edit Your About Section
                            </Text>
                            <Text fontSize="xl" fontWeight="bold" mb={4}>
                                Hover over the elements and click it to edit
                            </Text>
                        </VStack>
                    </Flex>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0}>
                    <Flex bg="blue.400">
                        <Image
                            src={image}
                            alt={heading}
                            fit="cover"
                            w="full"
                            h={{ base: 64, md: "full" }}
                            bg="blue.400"
                            loading="lazy"
                            opacity={0.4}
                            onClick={imageOnOpen}
                            style={{
                                cursor: "pointer",
                            }}
                            _hover={{
                                opacity: 0.5,
                            }}
                        />
                        <Modal
                            isCentered
                            isOpen={imageIsOpen}
                            onClose={imageOnClose}
                        >
                            <ModalOverlay
                                bg="blackAlpha.300"
                                backdropFilter="blur(10px)"
                            />
                            <ModalContent>
                                <ModalHeader>Image</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text>Edit your image</Text>

                                    <VStack spacing={4} align="center">
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
                                                accept="image/*"
                                            />
                                            <Text fontSize="sm">
                                                {/* @ts-ignore */}
                                                {selectedFile?.name}
                                            </Text>
                                        </FormLabel>
                                    </VStack>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={imageOnClose} mr={3}>
                                        Close
                                    </Button>
                                    <Button
                                        onClick={updateAboutData}
                                        isLoading={isLoading}
                                        colorScheme="blue"
                                        isDisabled={selectedFile === ""}
                                    >
                                        Update
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Flex>
                    <Flex
                        direction="column"
                        alignItems="start"
                        justifyContent="center"
                        px={{ base: 4, md: 8, lg: 20 }}
                        py={24}
                        zIndex={3}
                    >
                        <chakra.span
                            color="blue.600"
                            _dark={{ color: "gray.300" }}
                            fontSize="lg"
                            textTransform="uppercase"
                            fontWeight="extrabold"
                            onClick={topLineOnOpen}
                            style={{
                                cursor: "pointer",
                            }}
                            _hover={{
                                opacity: 0.5,
                            }}
                        >
                            <Modal
                                isCentered
                                isOpen={topLineIsOpen}
                                onClose={topLineOnClose}
                            >
                                <ModalOverlay
                                    bg="blackAlpha.300"
                                    backdropFilter="blur(10px)"
                                />
                                <ModalContent>
                                    <ModalHeader>Top Line</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Text>Edit your top line</Text>

                                        <Input
                                            placeholder="Top Line"
                                            value={topLine}
                                            onChange={(e) =>
                                                setTopLine(e.target.value)
                                            }
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={topLineOnClose} mr={3}>
                                            Close
                                        </Button>
                                        <Button
                                            onClick={updateAboutData}
                                            isLoading={isLoading}
                                            colorScheme="blue"
                                            isDisabled={topLine === ""}
                                        >
                                            Update
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            {topLine}
                        </chakra.span>
                        <chakra.h1
                            mb={4}
                            fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
                            fontWeight="bold"
                            color="blue.600"
                            _dark={{ color: "gray.300" }}
                            lineHeight="shorter"
                            textShadow="2px 0 currentcolor"
                            onClick={headingOnOpen}
                            style={{
                                cursor: "pointer",
                            }}
                            _hover={{
                                opacity: 0.5,
                            }}
                        >
                            <Modal
                                isCentered
                                isOpen={headingIsOpen}
                                onClose={headingOnClose}
                            >
                                <ModalOverlay
                                    bg="blackAlpha.300"
                                    backdropFilter="blur(10px)"
                                />
                                <ModalContent>
                                    <ModalHeader>Heading</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Text>Edit your heading</Text>

                                        <Input
                                            placeholder="Heading"
                                            value={heading}
                                            onChange={(e) =>
                                                setHeading(e.target.value)
                                            }
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={headingOnClose} mr={3}>
                                            Close
                                        </Button>
                                        <Button
                                            onClick={updateAboutData}
                                            isLoading={isLoading}
                                            colorScheme="blue"
                                            isDisabled={heading === ""}
                                        >
                                            Update
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            {heading}
                        </chakra.h1>
                        <chakra.p
                            pr={{ base: 0, lg: 16 }}
                            mb={4}
                            fontSize="md"
                            color="blue.600"
                            _dark={{ color: "gray.400" }}
                            letterSpacing="wider"
                            onClick={descriptionOnOpen}
                            style={{
                                cursor: "pointer",
                            }}
                            _hover={{
                                opacity: 0.5,
                            }}
                        >
                            <Modal
                                isCentered
                                isOpen={descriptionIsOpen}
                                onClose={descriptionOnClose}
                            >
                                <ModalOverlay
                                    bg="blackAlpha.300"
                                    backdropFilter="blur(10px)"
                                />
                                <ModalContent>
                                    <ModalHeader>Description</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Text>Edit your description</Text>

                                        <Textarea
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            onClick={descriptionOnClose}
                                            mr={3}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            onClick={updateAboutData}
                                            isLoading={isLoading}
                                            colorScheme="blue"
                                            isDisabled={description === ""}
                                        >
                                            Update
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            {description}
                        </chakra.p>
                    </Flex>
                </SimpleGrid>
            </>
        )
    } else {
        return (
            <>
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
            </>
        )
    }
}

export default AboutEditor
