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
import Footer from '../components/Footer';
import SunriseModal from '../components/SunriseModal';
import YardIcon from '@mui/icons-material/Yard';

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wallet = useWallet();
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [rentBack, setRentBack] = useState(3);

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
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:image" content="https://i.imgur.com/JzXGBrj.png" />
        <meta property="twitter:image" content="https://i.imgur.com/JzXGBrj.png" />
        <meta property="og:title" content="It's sweep time; tidy your wallet & earn SOL" />
        <meta property="og:description" content="It's sweep time; tidy your wallet & earn SOL" />
        <meta property="og:url" content="https://undust.me" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@builderz__" />
        <meta name="twitter:creator" content="@builderz__" />
        <meta name="twitter:title" content="It's sweep time; tidy your wallet & earn SOL" />
      </Head>

      <div className={`w-full flex h-full md:h-screen flex-col items-center justify-start gap-6 relative overflow-hidden pt-0  `}>

        {showConfetti && <Confetti />}

        <div className="w-full relative flex flex-col items-center justify-center z-50">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className={`relative z-20 mt-24  px-8`}
          >
            <h1 className='text-undust-green'>Undust.me</h1>
            <span className='opacity-50 text-lg md:text-2xl '>The easiest way to tidy up your wallet & earn SOL</span>
          </motion.div>

          <MainComponent loading={loading} setLoading={setLoading} showConfetti={showConfetti} setShowConfetti={setShowConfetti} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setIsSwapModalOpen={setIsSwapModalOpen} rentBack={rentBack} setRentBack={setRentBack} />

          <div className='bgBlurReq z-0 pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2' />

          {activeIndex >= 1 && <div className="h-[280px]"></div>}
          {!wallet.connected && <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            src="/machine-12.webp" alt="machine" className={`w-[350px] h-[350px] object-cover lg:w-[450px] lg:h-[450px] 2xl:w-[630px] 2xl:h-[630px] absolute z-0   top-1/2 -translate-y-[10%] md:-translate-y-[35%] 4xl:-translate-y-[25%]`} />}
          <div id="circle" className='text-undust-green blur-sm absolute' style={{ position: 'absolute', zIndex: 1, width: '10px', height: '10px', borderRadius: '50%', pointerEvents: 'none', transition: '0.2s' }}></div>
        </div>
      </div>
      <SunriseModal
        isSwapModalOpen={isSwapModalOpen}
        setIsSwapModalOpen={setIsSwapModalOpen}
        rentBack={rentBack}
        setShowConfetti={setShowConfetti}
        showConfetti={showConfetti}
      />      <div className="w-full relative md:fixed -bottom-8">
        <Footer />
      </div>
    </>
  );
};

export default Home;
