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
                    <link rel="apple-touch-icon" href="/logo.png" />
                    <meta property="og:title" content="JumpStarterX" />
                    <meta
                        name="image"
                        property="og:image"
                        content="/logo.jpg"
                    />
                    <meta name="author" content="Geeth Gunnampalli" />
                    <meta
                        property="og:description"
                        content="JumpStarterX is a responsive Next.js application that helps developers or students get a jump start on their projects by providing templated responsive React.js and Chakra UI websites."
                    />
                    <meta
                        property="og:url"
                        content="https://jumpstarterx.com"
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
