import Head from "next/head"
import Footer from "../components/Footer"
import CTA from "../components/Home/CTA"
import FAQ from "../components/Home/FAQ"
import Features from "../components/Home/Features"
import Hero from "../components/Home/Hero"
import Navbar from "../components/Home/Navbar"
import Pricing from "../components/Home/Pricing"

export default function Home() {
    return (
        <>
            <Head>
                <title>JumpStarterX</title>
            </Head>
            <Navbar />
            <Hero />
            <Features />
            <Pricing />
            {/* <FAQ /> */}
            <CTA />
            <Footer />
        </>
    )
}
