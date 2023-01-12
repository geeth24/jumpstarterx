export var navbar1 = `
// Made with JumpStarterX
import React from 'react';

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  useColorMode,
  Image,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-scroll';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

import { config } from '../jsx.config';



export default function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex alignItems="center">
            <chakra.a
              href="/"
              title="JumpStarterX Home Page"
              display="flex"
              alignItems="center"
            >
               <Image
                 src={config.logo}
                 alt="logo"
                 width="35px"
                 height="35px"
                 />
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              {config.tabs.company}
            </chakra.h1>
          </Flex>
            <HStack
              spacing={1}
              mr={1}
              color={config.themeColor + '.500'}
              display={{ base: 'none', md: 'inline-flex' }}
            >
              <Button
                variant="ghost"
                as={Link}
                cursor="pointer"
                to={config.tabs.tab1.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                colorScheme={config.themeColor}
              >
                {config.tabs.tab1}
              </Button>
              <Button
                variant="ghost"
                as={Link}
                cursor="pointer"
                to={config.tabs.tab2.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                colorScheme={config.themeColor}
              >
                {config.tabs.tab2}
              </Button>
              <Button
                variant="ghost"
                as={Link}
                to={config.tabs.tab3.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                colorScheme={config.themeColor}                
              >
                {config.tabs.tab3}
              </Button>
              <Button
                variant="ghost"
                as={Link}
                cursor="pointer"
                to={config.tabs.tab4.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                colorScheme={config.themeColor}
              >
                {config.tabs.tab4}
              </Button>
            </HStack>
          <HStack display="flex" alignItems="center" spacing={1}>
          
            <Button
              colorScheme={config.themeColor}
              size="sm"
              as={Link}
              cursor="pointer"
              to={config.tabs.tab5.toLowerCase()}
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
            >
              {config.tabs.tab5}
            </Button>
            <IconButton
              colorScheme={config.themeColor}
              icon={
                colorMode === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />
              }
              onClick={toggleColorMode}
              aria-label={''}
              size="sm"
            />
            <Box display={{ base: 'inline-flex', md: 'none' }}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: 'inherit' }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                <Button
                  w="full"
                  variant="ghost"
                  as={Link}
                  cursor="pointer"
                  to={config.tabs.tab1.toLowerCase()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  {config.tabs.tab1}
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  as={Link}
                  cursor="pointer"
                  to={config.tabs.tab2.toLowerCase()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  {config.tabs.tab2}
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  as={Link}
                  cursor="pointer"
                  to={config.tabs.tab3.toLowerCase()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  {config.tabs.tab3}
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  as={Link}
                  cursor="pointer"
                  to={config.tabs.tab4.toLowerCase()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  {config.tabs.tab4}
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
`
export var navbar2 = `

// Made with JumpStarterX
import React from 'react';

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  useColorMode,
  Image,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-scroll';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

import { config } from '../jsx.config';



export default function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
         
            <HStack
              spacing={1}
              mr={1}
              color={config.themeColor + '.500'}
              display={{ base: 'none', md: 'inline-flex' }}
              maxWidth="2xs"
            >
              <Button
                variant="ghost"
                as={Link}
                cursor="pointer"
                to={config.tabs.tab1.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
              >
                {config.tabs.tab1}
              </Button>
              <Button
                variant="ghost"
                as={Link}
                cursor="pointer"
                to={config.tabs.tab2.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
              >
                {config.tabs.tab2}
              </Button>
              <Button
                variant="ghost"
                as={Link}
                to={config.tabs.tab3.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
              >
                {config.tabs.tab3}
              </Button>
             
            </HStack>
             <Flex alignItems="center" mr={20} >
            <chakra.a
              href="/"
              title="JumpStarterX Home Page"
              display="flex"
              alignItems="center"
            >
               <Image
                 src={config.logo}
                 alt="logo"
                 width="35px"
                 height="35px"
                 />
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              {config.tabs.company}
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
          
            <Button
              colorScheme={config.themeColor}
              size="sm"
              as={Link}
              cursor="pointer"
              to={config.tabs.tab4.toLowerCase()}
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
            >
              {config.tabs.tab4}
            </Button>
            <IconButton
              colorScheme={config.themeColor}
              icon={
                colorMode === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />
              }
              onClick={toggleColorMode}
              aria-label={''}
              size="sm"
            />
            <Box display={{ base: 'inline-flex', md: 'none' }}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: 'inherit' }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                <Button
                  w="full"
                  variant="ghost"
                  as={Link}
                  cursor="pointer"
                  to={config.tabs.tab1.toLowerCase()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  {config.tabs.tab1}
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  as={Link}
                  cursor="pointer"
                  to={config.tabs.tab2.toLowerCase()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  {config.tabs.tab2}
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  as={Link}
                  cursor="pointer"
                  to={config.tabs.tab3.toLowerCase()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  {config.tabs.tab3}
                </Button>
               
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}

`

export var navbar3 = `
// Made with JumpStarterX
import React from 'react';

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  useColorMode,
  Image,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-scroll';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

import { config } from '../jsx.config';



export default function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex alignItems="center">
            <chakra.a
              href="/"
              title="JumpStarterX Home Page"
              display="flex"
              alignItems="center"
            >
               <Image
                 src={config.logo}
                 alt="logo"
                 width="35px"
                 height="35px"
                 />
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              {config.tabs.company}
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color={config.themeColor + '.500'}
              display={{ base: 'none', md: 'inline-flex' }}
            >
              <Button
                variant="ghost"
                as={Link}
                cursor="pointer"
                to={config.tabs.tab1.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
              >
                {config.tabs.tab1}
              </Button>
              <Button
                variant="ghost"
                as={Link}
                cursor="pointer"
                to={config.tabs.tab2.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
              >
                {config.tabs.tab2}
              </Button>
              <Button
                variant="ghost"
                as={Link}
                to={config.tabs.tab3.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
              >
                {config.tabs.tab3}
              </Button>
              <Button
                variant="ghost"
                as={Link}
                cursor="pointer"
                to={config.tabs.tab4.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
              >
                {config.tabs.tab4}
              </Button>
            </HStack>
            <Button
              colorScheme={config.themeColor}
              size="sm"
              as={Link}
              cursor="pointer"
              to={config.tabs.tab5.toLowerCase()}
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
            >
              {config.tabs.tab5}
            </Button>
            <IconButton
              colorScheme={config.themeColor}
              icon={
                colorMode === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />
              }
              onClick={toggleColorMode}
              aria-label={''}
              size="sm"
            />
            <Box display={{ base: 'inline-flex', md: 'none' }}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: 'inherit' }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                <Button
                  w="full"
                  variant="ghost"
                  as={Link}
                  cursor="pointer"
                  to={config.tabs.tab1.toLowerCase()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  {config.tabs.tab1}
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  as={Link}
                  cursor="pointer"
                  to={config.tabs.tab2.toLowerCase()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  {config.tabs.tab2}
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  as={Link}
                  cursor="pointer"
                  to={config.tabs.tab3.toLowerCase()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  {config.tabs.tab3}
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  as={Link}
                  cursor="pointer"
                  to={config.tabs.tab4.toLowerCase()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  {config.tabs.tab4}
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
`
