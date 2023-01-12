import React, { useEffect, useState } from "react"
import {
    Box,
    Button,
    chakra,
    Flex,
    FormLabel,
    HStack,
    Icon,
    Input,
    Text,
    useColorModeValue,
    useToast,
    VStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
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
// import Hero7 from '../../../choc-ui/heros/Hero7';
import { FiUploadCloud } from "react-icons/fi"
import { useRouter } from "next/router"

function HeroEditor() {
    const router = useRouter()
    const { id } = router.query

    const value = "3"
    const [heading, setHeading] = useState("Create webites faster")
    const [subheading, setSubheading] = useState("With JumpStarterX")
    const [description, setDescription] = useState(
        "JumpStarterX is a new way to design your website. It is a simple and easy to use tool that allows you to create a beautiful website in just a few minutes."
    )
    const [image, setImage] = useState("/code.png")

    const [themeColor, setThemeColor] = useState("blue")

    const [selectedFile, setSelectedFile] = useState()

    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()
    const {
        isOpen: headingIsOpen,
        onOpen: headingOnOpen,
        onClose: headingOnClose,
    } = useDisclosure()

    const {
        isOpen: subheadingIsOpen,
        onOpen: subheadingOnOpen,
        onClose: subheadingOnClose,
    } = useDisclosure()

    const {
        isOpen: descriptionIsOpen,
        onOpen: descriptionOnOpen,
        onClose: descriptionOnClose,
    } = useDisclosure()

    const {
        isOpen: imageIsOpen,
        onOpen: imageOnOpen,
        onClose: imageOnClose,
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
                    console.log(userSitesElementsData.data()?.themeColor)
                }
                await getThemeColor()

                const getHeroData = async () => {
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
                }
                await getHeroData()
                console.log("getHeroData")
                setIsLoading(false)
            } else {
                // not logged in
            }
        })
    }, [id])

    const updateHeroData = async () => {
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
        })
        var hero = ``
        if (value === "3") {
            hero = `
// Made with JumpStarterX      
import React from 'react';
import { chakra, Box, useColorModeValue, Icon, Image } from '@chakra-ui/react';
import { config } from '../jsx.config';

export default function Hero({ id }) {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box pos="relative" overflow="hidden" bg={bg} id={id}>
      <Box maxW="7xl" mx="auto">
        <Box
          pos="relative"
          pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
          maxW={{ lg: '2xl' }}
          w={{ lg: 'full' }}
          zIndex={1}
          bg={bg}
          border="solid 1px transparent"
        >
          <Icon
            display={{ base: 'none', lg: 'block' }}
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            h="full"
            w={48}
            color={bg}
            transform="translateX(50%)"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </Icon>
          <Box
            mx="auto"
            maxW={{ base: '7xl' }}
            px={{ base: 4, sm: 6, lg: 8 }}
            mt={{ base: 10, sm: 12, md: 16, lg: 20, xl: 28 }}
          >
            <Box
              w="full"
              textAlign={{ sm: 'center', lg: 'left' }}
              justifyContent="center"
              alignItems="center"
            >
              <chakra.h1
                fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
                letterSpacing="tight"
                lineHeight="short"
                fontWeight="extrabold"
                color="gray.900"
                _dark={{ color: 'white' }}
              >
                <chakra.span display={{ base: 'block', xl: 'inline' }}>
                    {config.hero.heading}<br />
                </chakra.span>
                <chakra.span
                  display={{ base: 'block', xl: 'inline' }}
                  color="${themeColor}.600"
                  _dark={{ color: '${themeColor}.400' }}
                >
                    {config.hero.subheading}
                </chakra.span>
              </chakra.h1>
              <chakra.p
                mt={{ base: 3, sm: 5, md: 5 }}
                fontSize={{ sm: 'lg', md: 'xl' }}
                maxW={{ sm: 'xl' }}
                mx={{ sm: 'auto', lg: 0 }}
                color="gray.500"
              >
                {config.hero.description} 
              </chakra.p>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        position={{ lg: 'absolute' }}
        top={{ lg: 0 }}
        bottom={{ lg: 0 }}
        right={{ lg: 0 }}
        w={{ lg: '50%' }}
        border="solid 1px transparent"
      >
        <Image
          h={[56, 72, 96, 'full']}
          w="full"
          fit="cover"
          src={config.hero.image}
          alt=""
          loading="lazy"
        />
      </Box>
    </Box>
  );
};


    `
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
        //     link.download = 'Herobar.jsx';
        //     link.click();
        //   };
        //   xhr.open('GET', url);
        //   xhr.send();
        // };
        // download();

        setIsLoading(false)
        headingOnClose()
        subheadingOnClose()
        descriptionOnClose()
        imageOnClose()
    }
    const bg = useColorModeValue("white", "gray.800")
    if (!isLoading) {
        return (
            <>
                <ENavbar />
                <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }}>
                    <Flex justifyContent="center" alignItems="center">
                        <VStack spacing={2}>
                            <Text fontSize="2xl" fontWeight="bold" mt={4}>
                                Edit Your Hero
                            </Text>
                            <Text fontSize="xl" fontWeight="bold" mb={4}>
                                Hover over the elements and click it to edit
                            </Text>
                        </VStack>
                    </Flex>
                </Box>
                <Box
                    pos="relative"
                    overflow="hidden"
                    bg={bg}
                    border="solid 1px brand.500"
                >
                    <Box maxW="7xl" mx="auto">
                        <Box
                            pos="relative"
                            pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
                            maxW={{ lg: "2xl" }}
                            w={{ lg: "full" }}
                            zIndex={1}
                            bg={bg}
                            border="solid 1px transparent"
                        >
                            <Icon
                                display={{ base: "none", lg: "block" }}
                                position="absolute"
                                right={0}
                                top={0}
                                bottom={0}
                                h="full"
                                w={48}
                                color={bg}
                                transform="translateX(50%)"
                                fill="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <polygon points="50,0 100,0 50,100 0,100" />
                            </Icon>
                            <Box
                                mx="auto"
                                maxW={{ base: "7xl" }}
                                px={{ base: 4, sm: 6, lg: 8 }}
                                mt={{
                                    base: 10,
                                    sm: 12,
                                    md: 16,
                                    lg: 20,
                                    xl: 28,
                                }}
                            >
                                <Box
                                    w="full"
                                    textAlign={{ sm: "center", lg: "left" }}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <chakra.h1
                                        fontSize={{
                                            base: "4xl",
                                            sm: "5xl",
                                            md: "6xl",
                                        }}
                                        letterSpacing="tight"
                                        lineHeight="short"
                                        fontWeight="extrabold"
                                        color="gray.900"
                                        _dark={{ color: "white" }}
                                    >
                                        <chakra.span
                                            display={{
                                                base: "block",
                                                xl: "inline",
                                            }}
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
                                                    <ModalHeader>
                                                        Heading
                                                    </ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <Text>
                                                            Edit your heading
                                                        </Text>
                                                        <Input
                                                            placeholder="Heading"
                                                            value={heading}
                                                            onChange={(e) =>
                                                                setHeading(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button
                                                            onClick={
                                                                headingOnClose
                                                            }
                                                            mr={3}
                                                        >
                                                            Close
                                                        </Button>
                                                        <Button
                                                            onClick={
                                                                updateHeroData
                                                            }
                                                            isLoading={
                                                                isLoading
                                                            }
                                                            colorScheme="blue"
                                                            isDisabled={
                                                                heading === ""
                                                            }
                                                        >
                                                            Update
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                            {heading}

                                            <br />
                                        </chakra.span>
                                        <chakra.span
                                            display={{
                                                base: "block",
                                                xl: "inline",
                                            }}
                                            color={`${themeColor}.600`}
                                            _dark={{
                                                color: `${themeColor}.400`,
                                            }}
                                            onClick={subheadingOnOpen}
                                            style={{
                                                cursor: "pointer",
                                            }}
                                            _hover={{
                                                opacity: 0.5,
                                            }}
                                        >
                                            <Modal
                                                isCentered
                                                isOpen={subheadingIsOpen}
                                                onClose={subheadingOnClose}
                                            >
                                                <ModalOverlay
                                                    bg="blackAlpha.300"
                                                    backdropFilter="blur(10px)"
                                                />
                                                <ModalContent>
                                                    <ModalHeader>
                                                        Subheading
                                                    </ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <Text>
                                                            Edit your subheading
                                                        </Text>
                                                        <Input
                                                            placeholder="Subheading"
                                                            value={subheading}
                                                            onChange={(e) =>
                                                                setSubheading(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button
                                                            onClick={
                                                                subheadingOnClose
                                                            }
                                                            mr={3}
                                                        >
                                                            Close
                                                        </Button>
                                                        <Button
                                                            onClick={
                                                                updateHeroData
                                                            }
                                                            isLoading={
                                                                isLoading
                                                            }
                                                            colorScheme="blue"
                                                            isDisabled={
                                                                subheading ===
                                                                ""
                                                            }
                                                        >
                                                            Update
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                            {subheading}
                                        </chakra.span>
                                    </chakra.h1>
                                    <chakra.p
                                        mt={{ base: 3, sm: 5, md: 5 }}
                                        fontSize={{ sm: "lg", md: "xl" }}
                                        maxW={{ sm: "xl" }}
                                        mx={{ sm: "auto", lg: 0 }}
                                        color="gray.500"
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
                                                <ModalHeader>
                                                    Description
                                                </ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Text>
                                                        Edit your description
                                                    </Text>
                                                    <Textarea
                                                        placeholder="Description"
                                                        value={description}
                                                        onChange={(e) =>
                                                            setDescription(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button
                                                        onClick={
                                                            descriptionOnClose
                                                        }
                                                        mr={3}
                                                    >
                                                        Close
                                                    </Button>
                                                    <Button
                                                        onClick={updateHeroData}
                                                        isLoading={isLoading}
                                                        colorScheme="blue"
                                                        isDisabled={
                                                            description === ""
                                                        }
                                                    >
                                                        Update
                                                    </Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                        {description}
                                    </chakra.p>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        position={{ lg: "absolute" }}
                        top={{ lg: 0 }}
                        bottom={{ lg: 0 }}
                        right={{ lg: 0 }}
                        w={{ lg: "50%" }}
                        border="solid 1px transparent"
                    >
                        <Image
                            h={[56, 72, 96, "full"]}
                            w="full"
                            fit="cover"
                            src={image}
                            alt=""
                            loading="lazy"
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
                                                //accepted file types images
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
                                        onClick={updateHeroData}
                                        isLoading={isLoading}
                                        colorScheme="blue"
                                        isDisabled={selectedFile === ""}
                                    >
                                        Update
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Box>
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

export default HeroEditor
