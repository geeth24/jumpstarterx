import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Heading,
} from "@chakra-ui/react"
import React from "react"

function FAQ() {
    return (
        <Box
            bg="#edf3f8"
            _dark={{ bg: "#2c374b" }}
            p={20}
            w="auto"
            justifyContent="center"
            alignItems="center"
            id="faq"
        >
            <Heading as="h2" size="xl" mb={10}>
                Frequently Asked Questions
            </Heading>
            <Box
                maxW="6xl"
                mx="auto"
                px={6}
                bg="#F9FAFB"
                _dark={{ bg: "gray.800" }}
                rounded="lg"
                p={10}
                shadow="xl"
            >
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "blue.500", color: "white" }}
                                rounded="md"
                            >
                                <Box flex="1" textAlign="left">
                                    What is the purpose of this website?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            JumpStarterX is a software that allows you to create
                            a website with React.js & Chakra UI. It
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "blue.500", color: "white" }}
                                rounded="md"
                            >
                                <Box
                                    flex="2"
                                    textAlign="left"
                                    _expanded={{
                                        bg: "blue.500",
                                        color: "white",
                                    }}
                                >
                                    How do I create a website?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            You can create a website with JumpStarterX by
                            clicking on the &quot;Get Started&quot; button.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "blue.500", color: "white" }}
                                rounded="md"
                            >
                                <Box
                                    flex="3"
                                    textAlign="left"
                                    _expanded={{
                                        bg: "blue.500",
                                        color: "white",
                                    }}
                                >
                                    How do I use JumpStarterX?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            JumpStarterX asks you to input some data, so that it
                            can generate a a static React.js website using
                            Chakra UI.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "blue.500", color: "white" }}
                                rounded="md"
                            >
                                <Box
                                    flex="3"
                                    textAlign="left"
                                    _expanded={{
                                        bg: "blue.500",
                                        color: "white",
                                    }}
                                >
                                    How do I get a discount?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Time to time we will offer a discount for our users.
                            We will also send you a discount code to your email,
                            if you have registered.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "blue.500", color: "white" }}
                                rounded="md"
                            >
                                <Box
                                    flex="3"
                                    textAlign="left"
                                    _expanded={{
                                        bg: "blue.500",
                                        color: "white",
                                    }}
                                >
                                    Can I use other Git Clients other than
                                    Github?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Currently, JumpStarterX only supports Github. You
                            can use any Git Client by downloading the file on
                            your own and uploading them youself. We hope to
                            support more Git Clients in the future.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
        </Box>
    )
}

export default FAQ
