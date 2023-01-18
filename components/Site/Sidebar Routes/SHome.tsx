import { Box, Flex, Heading, Image, SimpleGrid, VStack } from "@chakra-ui/react"
import React from "react"
import { UserAuth } from "../../context/AuthContext"
import SCard from "./SCard"

interface SHomeProps {
    searchInput: string
}

function SHome({ searchInput }: SHomeProps) {
    // @ts-ignore
    const { user, isLoading, getUserData } = UserAuth()

    //get user data only once
    // React.useEffect(() => {
    //     getUserData()
    // })

    return (
        <>
            <Box as="main" p="4">
                <Box textAlign="left" p="10">
                    <Heading as="h1" size="2xl">
                        My Sites{" "}
                        {isLoading ? (
                            <Heading as="span">Loading...</Heading>
                        ) : null}
                    </Heading>
                </Box>
                {user.sites?.length === 0 ? (
                    <Flex justifyContent="center" alignItems="center">
                        <VStack spacing={4}>
                            <Image src="/empty.svg" alt="empty" w="300px" />
                            <Heading as="h2" size="md">
                                You have no sites yet. Create one now!
                            </Heading>
                        </VStack>
                    </Flex>
                ) : null}
                <SimpleGrid columns={[1, 1, 2, 3]} spacing={12}>
                    {user.sites
                        ?.filter((site: any) => {
                            if (searchInput === "") {
                                return site
                            } else if (
                                site.title
                                    .toLowerCase()
                                    .includes(searchInput.toLowerCase())
                            ) {
                                return site
                            }
                            return null
                        })
                        ?.map((site: any, index: any) => (
                            <SCard
                                key={index}
                                id={site.id}
                                title={site.title}
                            />
                        ))}
                </SimpleGrid>
            </Box>
        </>
    )
}

export default SHome
