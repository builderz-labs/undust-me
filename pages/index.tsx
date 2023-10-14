import "react-toastify/dist/ReactToastify.css";
import MyMultiButton from "../components/MyMultiButton"
import Head from "next/head";
import type { NextPage } from "next";
import { toast } from "react-toastify";
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import MainComponent from '../components/MainComponent';
import { useEffect, useState } from 'react';
import { Spin } from "antd"
import Confetti from 'react-confetti';
import SwapModal from '../components/SwapModal';

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeIndex, setActiveIndex] = useState(2);
  const wallet = useWallet();
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [rentBack, setRentBack] = useState(0);

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
        <title>Undust.me</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="https://cdn.discordapp.com/attachments/1158367321644081153/1162708672225480714/telegram-cloud-photo-size-2-5280632887542140878-y.jpg?ex=653cebd5&is=652a76d5&hm=0f68f364c6147541f8319fdc8e9430e46dfd0627b50567da329130f668818fe2&" />
        <meta property="og:title" content="It's sweep time; tidy your wallet & earn SOL" />
        <meta property="og:description" content="It's sweep time; tidy your wallet & earn SOL" />
        <meta property="og:url" content="https://undust.me" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@builderz__" />
        <meta name="twitter:creator" content="@builderz__" />
        <meta name="twitter:title" content="It's sweep time; tidy your wallet & earn SOL" />
      </Head>

      <div className={`w-full flex md:h-screen flex-col items-start md:items-center justify-center gap-6 relative overflow-hidden`}>

        {showConfetti && <Confetti />}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className={`relative z-20 mt-28  md:mt-18 `}
        >
          <h1 className='text-undust-green'>Undust.me</h1>
          <span className='opacity-80 text-sm md:text-2xl px-4 md:px-0'>The easiest way to tidy up your wallet & earn SOL</span>
        </motion.div>

        <MainComponent loading={loading} setLoading={setLoading} showConfetti={showConfetti} setShowConfetti={setShowConfetti} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setIsSwapModalOpen={setIsSwapModalOpen} rentBack={rentBack} setRentBack={setRentBack} />


        <div className='bgBlurReq z-0 pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2' />
        {<div className="h-[280px]"></div>}
        {<motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          src="/machine-12.webp" alt="machine" className='w-[350px] h-[350px] object-cover md:w-[630px] md:h-[630px] absolute z-0 translate-y-5 md:translate-y-28' />}
        <div id="circle" className='text-undust-green blur-sm absolute ' style={{ position: 'absolute', zIndex: 1, width: '50px', height: '50px', borderRadius: '50%', pointerEvents: 'none', transition: '0.2s' }}></div>
      </div>
      <SwapModal isSwapModalOpen={isSwapModalOpen} setIsSwapModalOpen={setIsSwapModalOpen} rentBack={rentBack} />
    </>
  );
};

export default Home;
