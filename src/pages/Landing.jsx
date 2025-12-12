import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import Problem from '../sections/Problem';
import Solution from '../sections/Solution';
import Workflow from '../sections/Workflow';
import Features from '../sections/Features';
import Testimonials from '../sections/Testimonials';
import Pricing from '../sections/Pricing';
import CTA from '../sections/CTA';
import SplashScreen from '../components/SplashScreen';

const Landing = () => {
    const [showSplash, setShowSplash] = useState(true);

    return (
        <>
            {showSplash ? (
                <SplashScreen onComplete={() => setShowSplash(false)} />
            ) : (
                <>
                    <Navbar />
                    <main>
                        <Hero />
                        <Problem />
                        <Solution />
                        <Workflow />
                        <Features />
                        <Testimonials />
                        <Pricing />
                        <CTA />
                    </main>
                    <Footer />
                </>
            )}
        </>
    );
};

export default Landing;
