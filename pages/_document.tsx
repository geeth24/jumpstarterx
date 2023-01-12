// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from "next/document"
import { theme } from "./_app"

export default class Document extends NextDocument {

    render() {
        return (
            <Html lang="en">
                <Head>
                   
                    <link rel="icon" href="/logo.png" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Proxima+Nova:wght@300;400;500;600;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    {/* 👇 Here's the script */}
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
