import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
    ChakraProvider,
    CSSReset,
    extendTheme,
    ThemeConfig,
} from "@chakra-ui/react"
import { AuthContextProvider } from "../components/context/AuthContext"
import { useRouter } from "next/router"
import ProtectedRoute from "../components/context/ProtectedRoute"
import { auth } from "../utils/Firebase"
import { useState } from "react"

const config: ThemeConfig = {
    initialColorMode: "system",
    useSystemColorMode: true,
}
export const theme = extendTheme({
    config,
})

const noAuthRequired = [
    "/",
    "/signin",
    "/signup",
    "/password-reset",
    "/404",
    "/pro",
]

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()

    return (
        <ChakraProvider theme={theme}>
            <AuthContextProvider>
                <CSSReset />
                {noAuthRequired.includes(router.pathname) ? (
                    <Component {...pageProps} />
                ) : (
                    <ProtectedRoute>
                        <Component {...pageProps} />
                    </ProtectedRoute>
                )}
            </AuthContextProvider>
        </ChakraProvider>
    )
}
