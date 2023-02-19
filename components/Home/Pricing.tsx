import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    List,
    ListIcon,
    ListItem,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"
import { FaCheckCircle } from "react-icons/fa"

const options1 = [
    { id: 1, desc: "3 Templates of each component" },
    { id: 2, desc: "Downloadable code" },
]
const options2 = [
    { id: 1, desc: "6 Templates of each component" },
    { id: 2, desc: "Downloadable code" },
    { id: 3, desc: "GitHub integration" },
    { id: 4, desc: "OpenAI API" },
]
interface PackageTierProps {
    title: string
    options: Array<{ id: number; desc: string }>
    typePlan: string
    checked?: boolean
}
const PackageTier = ({
    title,
    options,
    typePlan,
    checked = false,
}: PackageTierProps) => {
    const colorTextLight = checked ? "white" : "blue.600"
    const bgColorLight = checked ? "blue.400" : "blue.100"

    const colorTextDark = checked ? "white" : "blue.500"
    const bgColorDark = checked ? "blue.400" : "blue.100"

    return (
        <Stack
            p={3}
            py={3}
            justifyContent={{
                base: "flex-start",
                md: "space-around",
            }}
            direction={{
                base: "column",
                md: "row",
            }}
            alignItems={{ md: "center" }}
        >
            <Heading size={"md"}>{title}</Heading>
            <List spacing={3} textAlign="start">
                {options.map((desc, id) => (
                    <ListItem key={desc.id}>
                        <ListIcon as={FaCheckCircle} color="green.500" />
                        {desc.desc}
                    </ListItem>
                ))}
            </List>
            <Heading size={"xl"}>{typePlan}</Heading>
            <Stack>
                <Button
                    size="md"
                    color={useColorModeValue(colorTextLight, colorTextDark)}
                    bgColor={useColorModeValue(bgColorLight, bgColorDark)}
                >
                    Get Started
                </Button>
            </Stack>
        </Stack>
    )
}
const ThreeTierPricingHorizontal = () => {
    return (
        <Box
            py={6}
            px={5}
            bg="gray.100"
            _dark={{ bg: "gray.700" }}
            id="pricing"
        >
            <Flex direction="column" align="center">
                <Stack
                    spacing={4}
                    width={"100%"}
                    direction={"column"}
                    maxWidth="container.xl"
                >
                    <Stack
                        p={5}
                        alignItems={"center"}
                        justifyContent={{
                            base: "flex-start",
                            md: "space-around",
                        }}
                        direction={{
                            base: "column",
                            md: "row",
                        }}
                    >
                        <Stack
                            width={{
                                base: "100%",
                                md: "40%",
                            }}
                            textAlign={"left"}
                        >
                            <Heading size={"lg"}>
                                Choose The Plan That Fits{" "}
                                <Text color="blue.400">Your Needs</Text>
                            </Heading>
                        </Stack>
                        <Stack
                            width={{
                                base: "100%",
                                md: "60%",
                            }}
                        >
                            <Text textAlign={"left"}>
                                JumpStarterX offers 2 plans to choose from. One
                                focuses on Hackers and the other on Developers.
                                Both plans are affordable and offer a lot of
                                value.
                            </Text>
                        </Stack>
                    </Stack>
                    <Divider />
                    <PackageTier
                        title={"Starter"}
                        typePlan="Free Forever"
                        options={options1}
                    />
                    <Divider />
                    <PackageTier
                        title={"JSX Pro"}
                        checked={true}
                        typePlan="$9.99/month"
                        options={options2}
                    />
                    <Divider />
                </Stack>
            </Flex>
        </Box>
    )
}

export default ThreeTierPricingHorizontal
