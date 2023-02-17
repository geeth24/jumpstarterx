import Head from "next/head"
import React from "react"
import Sidebar from "../../../components/Site/Sidebar"

function MySitesHome() {
    return (
        <>
            <Head>
                <title>My Sites | JumpStarterX</title>
            </Head>
            <Sidebar tab="home" />
        </>
    )
}

export default MySitesHome
