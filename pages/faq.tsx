import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti';
import FAQs from '../components/FAQs';

const FAQ: NextPage = () => {
    const [loading, setLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const wallet = useWallet();

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
                <title>FAQ - UnDust.me</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`w-full flex h-screen flex-col items-center justify-start gap-6 relative overflow-hidden`}>

                {showConfetti && <Confetti />}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className={`relative z-20 mt-32`}
                >
                    <h1 className='text-undust-green'>Undust.me</h1>
                    <span className='opacity-50 text-2xl '>The easiest way to tidy up your wallet & earn SOL</span>
                </motion.div>

                <div className='border-undust-green border-opacity-20 rounded-lg max-w-2xl w-full flex flex-col items-center justify-center gap-8  p-12 py-6  my-10 relative z-50 bg-black bg-opacity-20 backdrop-blur-md'>
                    <FAQs />
                </div>

                <div className='bgBlurReq z-0 pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2' />
                {<div className="h-[280px]"></div>}
                {<motion.img src="/machine-12.webp" alt="machine" className='w-[250px] h-[250px] object-cover md:w-[630px] md:h-[630px] absolute z-0 -bottom-1/2' />}
                <div id="circle" className='text-undust-green blur-sm absolute ' style={{ position: 'absolute', zIndex: 1, width: '50px', height: '50px', borderRadius: '50%', pointerEvents: 'none', transition: '0.2s' }}></div>
            </div>
        </>
    )
}

export default FAQ;