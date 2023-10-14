import { motion } from 'framer-motion'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti';
import { NextPage } from 'next'

const About: NextPage = () => {
    const [loading, setLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const circle = document.getElementById('circle');
        document.addEventListener('mousemove', (e) => {
            if (circle) {
                circle.style.left = e.pageX + 'px';
                circle.style.top = e.pageY + 'px';
            }
        });
    }, []);
    return (
        <>
            <Head>
                <title>About - UnDust.me</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`w-full bg-black bg-opacity-60 border border-undust-green border-opacity-10 backdrop-blur-md flex h-screen flex-col items-center justify-start gap-6 relative overflow-hidden`}>

                {showConfetti && <Confetti />}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className={`relative z-20 mt-32 `}
                >
                    <h1 className='text-undust-green'>Undust.me</h1>
                    <span className='opacity-50 text-2xl '>The easiest way to tidy up your wallet & earn SOL</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="w-full max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between relative z-50 gap-8">
                    <motion.img
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        src="/sam-laundry.webp" alt="laundry" className='w-full h-[320px] object-cover rounded-lg' />

                    <div className='rounded-lg max-w-2xl w-full flex flex-col items-center justify-start text-left gap-8 p-12 my-10 relative z-50 bg-reavers-bg bg-opacity-40 backdrop-blur-xl'>
                        <p>Once upon a time, in a bustling city, lived Samuel Barnes, a meticulous accountant. One rainy day, he passed a run-down building. Inspired, Samuel turned it into a laundromat, “Undust.me” It became known for its cleanliness and welcoming atmosphere.</p>

                        <p>But there was a hidden twist. Unbeknownst to everyone, Sam&apos;s laundromat was not on Earth, but on Solana, the fastest blockchain in the universe. Instead of washing clothes, it cleaned wallets, erasing the stains of outdated tokens. It even returned SOL to customers who paid a visit. Samuel had unknowingly ventured into the world of crypto and found a unique niche.</p>

                        <p>People flocked to “Undust.me to give their wallets a fresh start, and Samuel had found a new passion, combining his love for cleanliness with the exciting world of decentralisation, The unassuming laundromat owner had become a crypto-custodian, and his story became a legend in the world of digital assets.</p>
                    </div>
                </motion.div>

                <div className='bgBlurReq z-0 pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2' />
                {<div className="h-[280px]"></div>}
                {/* {<motion.img src="/machine-12.webp" alt="machine" className='w-[250px] h-[250px] object-cover md:w-[630px] md:h-[630px] absolute z-0' />} */}
                <div id="circle" className='text-undust-green blur-sm absolute ' style={{ position: 'absolute', zIndex: 1, width: '50px', height: '50px', borderRadius: '50%', pointerEvents: 'none', transition: '0.2s' }}></div>
            </div>
        </>
    )
}

export default About;
