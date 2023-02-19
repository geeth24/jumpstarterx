import { SVGProps } from "react"
import {
    Container,
    Box,
    chakra,
    Text,
    SimpleGrid,
    Flex,
    Link,
    useColorModeValue,
} from "@chakra-ui/react"
import { FaDownload, FaReact } from "react-icons/fa"
import { SiOpenai } from "react-icons/si"

interface IFeature {
    heading: string
    content: string
    icon: SVGProps<SVGElement>
}

const features: IFeature[] = [
    {
        heading: "React.js",
        content:
            "HTML, CSS, and JavaScript are great, but React.js is the modern way to build websites. Fully made using React.js, Chakra UI, and JavaScript. No jQuery, no Bootstrap.",
        icon: <FaReact size={36} color="white" />,
    },
    {
        heading: "Downloadable",
        content:
            "We know using wix.com or squarespace.com is easy, but you can't download your site. With JumpStarterX, you can download your site and host it anywhere.",
        icon: <FaDownload size={36} color="white" />,
    },
    {
        heading: "OpenAI API",
        content:
            "No ideas for your section texts? No problem. Soon you can use the OpenAI API to generate text for your sections. You can also use the API to generate text for your blog posts.",
        icon: <SiOpenai size={36} color="white" />,
    },
]

const Features = () => {
    return (
        <Container maxW="6xl" p={{ base: 5, md: 10 }}>
            <chakra.h3
                fontSize="4xl"
                fontWeight="bold"
                mb={20}
                textAlign="center"
            >
                Everything your app needs and more
            </chakra.h3>
            <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3 }}
                placeItems="center"
                spacing={10}
                mb={4}
            >
                {features.map((feature, index) => (
                    <Box
                        key={index}
                        bg={useColorModeValue("gray.100", "gray.700")}
                        p={6}
                        rounded="lg"
                        textAlign="center"
                        pos="relative"
                    >
                        <Flex
                            p={2}
                            w="max-content"
                            color="white"
                            bgGradient="linear(to-br, blue.500, blue.300)"
                            rounded="md"
                            marginInline="auto"
                            pos="absolute"
                            left={0}
                            right={0}
                            top="-1.5rem"
                            boxShadow="lg"
                        >
                            {/*@ts-ignore */}
                            {feature.icon}
                        </Flex>
                        <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
                            {feature.heading}
                        </chakra.h3>
                        <Text fontSize="md" mt={4}>
                            {feature.content}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Container>
    )
}

export default Features
