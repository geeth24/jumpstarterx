export var hero1 = `
// Made with JumpStarterX
import React from "react";
import {
  chakra,
  Box,
  useColorModeValue,
  Icon,
  Image,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { config } from "../jsx.config";

export default function Hero({ id }) {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      id={id}
      bgGradient={useColorModeValue(
        "linear(to-t," +
          config.themeColor +
          ".200" +
          ", " +
          config.themeColor +
          ".500)",
        "linear(to-t," +
          config.themeColor +
          ".500" +
          ", " +
          config.themeColor +
          ".800)"
      )}
    >
      <SimpleGrid columns={{ base: 1, lg: 2 }} maxW="7xl">
        <Box maxW="7xl" mx="auto">
          <Box
            pos="relative"
            pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
            maxW={{ lg: "2xl" }}
            w={{ lg: "full" }}
            zIndex={1}
            // bg={bg}
            border="solid 1px transparent"
          >
            <Box
              mx="auto"
              maxW={{ base: "2xl" }}
              px={{ base: 4, sm: 6, lg: 8 }}
              mt={{ base: 10, sm: 12, md: 16, lg: 20, xl: 28 }}
            >
              <Box
                w="full"
                textAlign={{ sm: "center", lg: "left" }}
                justifyContent="center"
                alignItems="center"
              >
                <chakra.h1
                  fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                  letterSpacing="tight"
                  lineHeight="short"
                  fontWeight="extrabold"
                  color="white"
                >
                  <chakra.span display={{ base: "block", xl: "inline" }}>
                    {config.hero.heading}
                    <br />
                  </chakra.span>
                  <chakra.span
                    display={{ base: "block", xl: "inline" }}
                    color={config.themeColor + "700"}
                    _dark={{ color: config.themeColor + "100" }}
                  >
                    {config.hero.subheading}
                  </chakra.span>
                </chakra.h1>
                <chakra.p
                  mt={{ base: 3, sm: 5, md: 5 }}
                  fontSize={{ sm: "lg", md: "xl" }}
                  maxW={{ sm: "xl" }}
                  mx={{ sm: "auto", lg: 0 }}
                  color={useColorModeValue(
                    config.themeColor + ".700",
                    config.themeColor + ".100"
                  )}
                >
                  {config.hero.description}
                </chakra.p>
              </Box>
            </Box>
          </Box>
        </Box>
        <Flex justifyContent="center" alignItems="center">
          <Image
            h={[56, 64, 72, 96]}
            w="full"
            p={{ base: 4, lg: 0 }}
            fit="contain"
            src={config.hero.image}
            alt="Hero Image"
          />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}


`