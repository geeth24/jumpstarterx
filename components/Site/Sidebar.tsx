import {
    Avatar,
    Box,
    ChakraProps,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    OmitCommonProps,
    useColorMode,
    useDisclosure,
    chakra,
    useColorModeValue,
    Text,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Progress,
    HStack,
    VStack,
    useToast,
    Radio,
    RadioGroup,
} from "@chakra-ui/react"
import { FaBell, FaGem, FaReact, FaRss } from "react-icons/fa"
import { BsFillMoonFill, BsFillSunFill, BsGearFill } from "react-icons/bs"
import { FiMenu, FiSearch } from "react-icons/fi"
import { HiCode } from "react-icons/hi"
import { FaSignOutAlt } from "react-icons/fa"
import { SiNextdotjs } from "react-icons/si"
import { MdHome } from "react-icons/md"
import React from "react"
import { UserAuth } from "../context/AuthContext"
import SHome from "./Sidebar Routes/SHome"
import SNews from "./Sidebar Routes/SNews"
import SIntegrations from "./Sidebar Routes/SIntegrations"
import SSettings from "./Sidebar Routes/SSettings"
import { AddIcon } from "@chakra-ui/icons"
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "../../utils/Firebase"
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage"
import axios from "axios"
import { encode as base64_encode } from "base-64"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"

interface SidebarProps {
    tab: string
}
function Sidebar({ tab }: SidebarProps) {
    const sidebar = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()
    const gradient = useColorModeValue(
        "linear(to-r, blue.400, blue.700)", // light
        "linear(to-r, blue.400, blue.600)" // dark
    )

    const [framework, setFramework] = React.useState("1")

    const router = useRouter()
    // @ts-ignore
    const { user, logout, getUserData } = UserAuth()

    // const { tab } = router.query

    const [searchInput, setSearchInput] = React.useState("")

    var tabBox = <></>

    if (tab === "home") {
        tabBox = (
            <>
                <SHome searchInput={searchInput} />
            </>
        )
    } else if (tab === "news") {
        tabBox = (
            <>
                <SNews />
            </>
        )
    } else if (tab === "integrations") {
        tabBox = (
            <>
                <SIntegrations />
            </>
        )
    } else if (tab === "settings") {
        tabBox = (
            <>
                <SSettings />
            </>
        )
    }
    const OverlayOne = () => (
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)

    const [newSiteTitle, setNewSiteTitle] = React.useState("")

    const [isLoading, setIsLoading] = React.useState(false)

    const [invalid, setInvalid] = React.useState(false)

    const [created, setCreated] = React.useState(false)

    const toast = useToast()

    const [newSiteTempID, setNewSiteTempID] = React.useState("")

    const open = () => {
        router.push(`/mysites/editor/${newSiteTempID}`)
        onClose()
    }

    const createSite = async () => {
        setIsLoading(true)
        //if the input has capital letters or spaces then it is invalid
        if (newSiteTitle.match(/[A-Z]/ || /\s/)) {
            setInvalid(true)
        } else {
            try {
                const newSiteCollectionRef = await addDoc(
                    collection(
                        db,
                        "users",
                        // @ts-ignore
                        auth.currentUser.uid,
                        "sites"
                    ),
                    {
                        title: newSiteTitle,
                        themeColor: "blue",
                    }
                )
                console.log(newSiteCollectionRef.id)
                setNewSiteTempID(newSiteCollectionRef.id)
                await updateDoc(
                    doc(
                        db,
                        "users",
                        // @ts-ignore
                        auth.currentUser.uid,
                        "sites",
                        newSiteCollectionRef.id
                    ),
                    {
                        id: newSiteCollectionRef.id,
                    }
                )
                await setDoc(
                    doc(
                        db,
                        "users",
                        // @ts-ignore
                        auth.currentUser.uid,
                        "sites",
                        newSiteCollectionRef.id,
                        "components",
                        "navbar"
                    ),
                    {
                        company: "JumpStarterX",
                        tab1: "Tab1",
                        tab2: "Tab2",
                        tab3: "Tab3",
                        tab4: "Tab4",
                        tab5: "Tab5",
                        logo: "https://cloud.geethg.com/logo.png",
                        navbarNumber: "3",
                    }
                )
                await setDoc(
                    doc(
                        db,
                        "users",
                        // @ts-ignore
                        auth.currentUser.uid,
                        "sites",
                        newSiteCollectionRef.id,
                        "components",
                        "hero"
                    ),
                    {
                        heading: "Create webites faster",
                        subheading: "With JumpStarterX",
                        description:
                            "JumpStarterX is a new way to design your website. It is a simple and easy to use tool that allows you to create a beautiful website in just a few minutes.",
                        image: "https://cloud.geethg.com/code.png",
                    }
                )
                await setDoc(
                    doc(
                        db,
                        "users",
                        // @ts-ignore
                        auth.currentUser.uid,
                        "sites",
                        newSiteCollectionRef.id,
                        "components",
                        "about"
                    ),
                    {
                        topLine: "About",
                        heading: "React.js Website Builder",
                        description:
                            "JumpStarterX is a new way to design your website. It is a simple and easy to use tool that allows you to create a beautiful website in just a few minutes.",
                        image: "https://cloud.geethg.com/code.png",
                    }
                )
                const publicFiles = async () => {
                    const storage = getStorage()
                    const storageRef = ref(
                        storage,
                        "users/" +
                            // @ts-ignore
                            auth.currentUser.uid +
                            "/sites/" +
                            newSiteCollectionRef.id +
                            "/public/" +
                            "FDLogo.png"
                    )
                    var imageURL = "https://cloud.geethg.com/FDLogo.png"
                    //fetch using axios

                    const response = await axios.get(imageURL, {
                        responseType: "arraybuffer",
                    })
                    const image = response.data

                    const metadata = {
                        contentType: "image/png",
                    }
                    await uploadBytes(storageRef, image, metadata)

                    var index = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/FDLogo.png />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Web site created using JumpStarterX" />
    <meta
      name="theme-color"
      content="#fff"
      media="(prefers-color-scheme: light)"
    />
    <meta
      name="theme-color"
      content="#000"
      media="(prefers-color-scheme: dark)"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>${newSiteTitle}</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

        `

                    var encodedIndex = base64_encode(index)
                    var indexBase64URL = "data:text/html;base64," + encodedIndex

                    const indexRef = ref(
                        storage,
                        "users/" +
                            // @ts-ignore
                            auth.currentUser.uid +
                            "/sites/" +
                            newSiteCollectionRef.id +
                            "/public/" +
                            "index.html"
                    )
                    await uploadString(indexRef, indexBase64URL, "data_url")

                    var manifest = `
{
  "short_name": "${newSiteTitle}",
  "name": "FD ${newSiteTitle}",
  "icons": [
    {
      "src": "FDLogo.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone"
}

`
                    var encodedManifest = base64_encode(manifest)
                    var manifestBase64URL =
                        "data:text/json;base64," + encodedManifest

                    const manifestRef = ref(
                        storage,
                        "users/" +
                            // @ts-ignore
                            auth.currentUser.uid +
                            "/sites/" +
                            newSiteCollectionRef.id +
                            "/public/" +
                            "manifest.json"
                    )
                    await uploadString(
                        manifestRef,
                        manifestBase64URL,
                        "data_url"
                    )

                    var robots = `
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:
        `
                    var encodedRobots = base64_encode(robots)
                    var robotsBase64URL =
                        "data:text/plain;base64," + encodedRobots

                    const robotsRef = ref(
                        storage,
                        "users/" +
                            // @ts-ignore
                            auth.currentUser.uid +
                            "/sites/" +
                            newSiteCollectionRef.id +
                            "/public/" +
                            "robots.txt"
                    )
                    await uploadString(robotsRef, robotsBase64URL, "data_url")

                    var appjsx = `
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import { config } from './jsx.config';


function App() {
  return (
  <>
   <Navbar />
   <Hero id={config.tabs.tab1.toLowerCase()} />
   <About id={config.tabs.tab2.toLowerCase()} />
  </>
  );
}

export default App;

  `
                    var encodedAppjsx = base64_encode(appjsx)
                    var appjsxBase64URL =
                        "data:text/javascript;base64," + encodedAppjsx

                    const appjsxRef = ref(
                        storage,
                        "users/" +
                            // @ts-ignore
                            auth.currentUser.uid +
                            "/sites/" +
                            newSiteCollectionRef.id +
                            "/src/" +
                            "App.jsx"
                    )
                    await uploadString(appjsxRef, appjsxBase64URL, "data_url")

                    var indexcss = `
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

        `
                    var encodedIndexcss = base64_encode(indexcss)
                    var indexcssBase64URL =
                        "data:text/css;base64," + encodedIndexcss

                    const indexcssRef = ref(
                        storage,
                        "users/" +
                            // @ts-ignore
                            auth.currentUser.uid +
                            "/sites/" +
                            newSiteCollectionRef.id +
                            "/src/" +
                            "index.css"
                    )
                    await uploadString(
                        indexcssRef,
                        indexcssBase64URL,
                        "data_url"
                    )

                    var indexjs = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
} from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};
const theme = extendTheme({
  config,
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <App />
    </ChakraProvider>
  </React.StrictMode>
);

`
                    var encodedIndexjs = base64_encode(indexjs)
                    var indexjsBase64URL =
                        "data:text/javascript;base64," + encodedIndexjs

                    const indexjsRef = ref(
                        storage,
                        "users/" +
                            // @ts-ignore
                            auth.currentUser.uid +
                            "/sites/" +
                            newSiteCollectionRef.id +
                            "/src/" +
                            "index.js"
                    )
                    await uploadString(indexjsRef, indexjsBase64URL, "data_url")

                    var packagejson = `
{
  "name": "jsx-${newSiteTitle}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
   "@chakra-ui/react": "^2.4.6",
    "@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.4.3",
    "framer-motion": "^6",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.7.1",
    "react-scripts": "^5.0.1",
    "react-scroll": "^1.8.9",
    "web-vitals": "^3.1.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
    "jsx: "npm install && npm run start"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

`
                    var encodedPackagejson = base64_encode(packagejson)
                    var packagejsonBase64URL =
                        "data:text/json;base64," + encodedPackagejson

                    const packagejsonRef = ref(
                        storage,
                        "users/" +
                            // @ts-ignore
                            auth.currentUser.uid +
                            "/sites/" +
                            newSiteCollectionRef.id +
                            "/package.json"
                    )
                    await uploadString(
                        packagejsonRef,
                        packagejsonBase64URL,
                        "data_url"
                    )

                    var gitignore = `
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
`
                    var encodedGitignore = base64_encode(gitignore)
                    var gitignoreBase64URL =
                        "data:text/plain;base64," + encodedGitignore

                    const gitignoreRef = ref(
                        storage,
                        "users/" +
                            // @ts-ignore
                            auth.currentUser.uid +
                            "/sites/" +
                            newSiteCollectionRef.id +
                            "/.gitignore"
                    )
                    await uploadString(
                        gitignoreRef,
                        gitignoreBase64URL,
                        "data_url"
                    )

                    var configFile = `
// Made with JumpStarterX      

export const config = {

   logo: "", 
   themeColor: "",
   tabs:{
        company: "",
        tab1: "",
        tab2: "",
        tab3: "",
        tab4: "",
        tab5: "",
   },

   hero:{
         heading: "",
        subheading: "",
        description: "",
        image: ""
   },

   about:{
        topLine: "",
        heading: "",
        description: "",
        image: ""
   }    

   

}


`
                    var encodedConfig = base64_encode(configFile)
                    var configeBase64URL =
                        "data:text/javascript;base64," + encodedConfig

                    const configRef = ref(
                        storage,
                        "users/" +
                            // @ts-ignore
                            auth.currentUser.uid +
                            "/sites/" +
                            newSiteCollectionRef.id +
                            "/src/" +
                            `jsx.config.js`
                    )
                    await uploadString(configRef, configeBase64URL, "data_url")
                }

                await publicFiles()

                setIsLoading(false)
                setCreated(true)
                toast({
                    title: "Success!",
                    description: "Your project has been created!",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
                getUserData()
            } catch (error: any) {
                setIsLoading(false)
                toast({
                    title: "Error!",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
        }
        setIsLoading(false)
        // onClose();
    }

    const NavItem = (props: { [x: string]: any; icon: any; children: any }) => {
        const { icon, children, ...rest } = props
        return (
            <Flex
                align="center"
                px="4"
                mx="2"
                rounded="md"
                py="3"
                cursor="pointer"
                color="inherit"
                _dark={{
                    color: "blue.400",
                }}
                _hover={{
                    bg: "blue.100",
                    color: "blue.400",
                }}
                role="group"
                fontWeight="semibold"
                transition=".15s ease"
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="2"
                        boxSize="4"
                        _groupHover={{
                            color: "blue.900",
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        )
    }

    const SidebarContent = (
        props: JSX.IntrinsicAttributes &
            OmitCommonProps<
                React.DetailedHTMLProps<
                    React.HTMLAttributes<HTMLDivElement>,
                    HTMLDivElement
                >,
                keyof ChakraProps
            > &
            ChakraProps & { as?: "div" | undefined }
    ) => (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg="white"
            _dark={{
                bg: "gray.800",
            }}
            borderColor="blackAlpha.300"
            borderRightWidth="1px"
            w="60"
            {...props}
        >
            <Flex px="4" py="5" align="center">
                <Flex align="center" mr="auto">
                    <Image src="/logo.png" alt="logo" width="35" height="35" />
                    <chakra.h1
                        fontSize="xl"
                        ml="2"
                        bgClip="text"
                        bgGradient={gradient}
                        fontWeight="extrabold"
                    >
                        JumpStarterX
                    </chakra.h1>
                </Flex>
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="blue.600"
                aria-label="Main Navigation"
            >
                <Link href="/mysites/home">
                    <NavItem icon={MdHome}>Home</NavItem>
                </Link>
                <Link href="/mysites/news">
                    <NavItem icon={FaRss}>News</NavItem>
                </Link>
                <Link href="/mysites/integrations">
                    <NavItem icon={HiCode}>Integrations</NavItem>
                </Link>
                <Link href="/mysites/settings">
                    <NavItem icon={BsGearFill}>Settings</NavItem>
                </Link>
                <NavItem
                    icon={FaSignOutAlt}
                    onClick={() => {
                        logout()
                        router.push("/")
                    }}
                >
                    Sign Out
                </NavItem>
                <NavItem
                    icon={
                        colorMode === "light" ? BsFillMoonFill : BsFillSunFill
                    }
                    onClick={toggleColorMode}
                >
                    {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                </NavItem>
                <Link href="/pro">
                    <NavItem icon={FaGem}>
                        {" "}
                        {user.pro ? "Pro" : "Get Pro"}
                    </NavItem>
                </Link>
            </Flex>
        </Box>
    )
    return (
        <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="80vh">
            <SidebarContent display={{ base: "none", md: "unset" }} />
            <Drawer
                isOpen={sidebar.isOpen}
                onClose={sidebar.onClose}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
                <Flex
                    as="header"
                    align="center"
                    justify="space-between"
                    w="full"
                    px="4"
                    bg="white"
                    _dark={{ bg: "gray.800" }}
                    borderBottomWidth="1px"
                    borderColor="blackAlpha.300"
                    h="14"
                >
                    <IconButton
                        aria-label="Menu"
                        display={{ base: "inline-flex", md: "none" }}
                        onClick={sidebar.onOpen}
                        icon={<FiMenu />}
                        size="sm"
                    />

                    <InputGroup w="96" display={{ base: "none", md: "flex" }}>
                        <InputLeftElement color="gray.500">
                            <FiSearch />
                        </InputLeftElement>
                        <Input
                            placeholder="Search for your sites..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </InputGroup>

                    <Flex align="center">
                        <Button
                            colorScheme="blue"
                            size="sm"
                            mr="2"
                            rightIcon={<AddIcon />}
                            onClick={() => {
                                setOverlay(<OverlayOne />)
                                onOpen()
                            }}
                            variant="outline"
                        >
                            New Site
                        </Button>
                        <Modal isCentered isOpen={isOpen} onClose={onClose}>
                            {overlay}
                            <ModalContent>
                                <ModalHeader>New Site</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text fontSize="sm" color="gray.400">
                                        Name cannot contain capital letters or
                                        spaces
                                    </Text>
                                    <RadioGroup
                                        onChange={setFramework}
                                        value={framework}
                                    >
                                        <HStack spacing="4">
                                            <Radio value="1">
                                                <Text fontSize="sm">
                                                    <Icon
                                                        as={FaReact}
                                                        mr="2"
                                                        color="#00d9fe"
                                                    />
                                                    React.js
                                                </Text>
                                            </Radio>
                                            <Radio value="2" isDisabled>
                                                <Text fontSize="sm">
                                                    <Icon
                                                        as={SiNextdotjs}
                                                        mr="2"
                                                        color="#000"
                                                    />
                                                    Next.js (Coming Soon)
                                                </Text>
                                            </Radio>
                                        </HStack>
                                    </RadioGroup>
                                    <Input
                                        placeholder="EX: jump-starter-x, builder"
                                        _placeholder={{ color: "blue.200" }}
                                        color="blue.500"
                                        isInvalid={invalid}
                                        errorBorderColor="crimson"
                                        variant="flushed"
                                        value={newSiteTitle}
                                        onChange={(e) => {
                                            setNewSiteTitle(e.target.value)
                                        }}
                                    />

                                    {isLoading ? (
                                        <Progress
                                            size="xs"
                                            isIndeterminate={isLoading}
                                            colorScheme="blue"
                                        />
                                    ) : (
                                        <></>
                                    )}
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
                                            {created ? (
                                                <Button
                                                    colorScheme="blue"
                                                    isLoading={isLoading}
                                                    loadingText="Creating..."
                                                    onClick={() => {
                                                        open()
                                                    }}
                                                >
                                                    Open
                                                </Button>
                                            ) : (
                                                <Button
                                                    colorScheme="blue"
                                                    isLoading={isLoading}
                                                    loadingText="Creating..."
                                                    onClick={() => {
                                                        createSite()
                                                    }}
                                                    isDisabled={
                                                        newSiteTitle.length ===
                                                        0
                                                    }
                                                >
                                                    Create
                                                </Button>
                                            )}
                                        </HStack>
                                        {created ? (
                                            <Text
                                                fontSize="sm"
                                                color="gray.400"
                                            >
                                                Project created successfully.
                                            </Text>
                                        ) : (
                                            <></>
                                        )}
                                    </VStack>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                        <Icon
                            color="gray.500"
                            as={FaBell}
                            cursor="pointer"
                            ml="4"
                        />
                        <Avatar
                            ml="4"
                            size="sm"
                            name={user.displayName}
                            src={user.photoURL}
                            cursor="pointer"
                            referrerPolicy="origin"
                        />
                    </Flex>
                </Flex>
                {tabBox}
            </Box>
        </Box>
    )
}
export default Sidebar
