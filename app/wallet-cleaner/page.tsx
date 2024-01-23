'use client'

import Head from "next/head";
import type { NextPage } from "next";
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import MainComponent from '../../components/MainComponent';
import SunriseModal from '../../components/SunriseModal';
import BreadCrumbs from '../../components/BreadCrumbs';
import LoginModal from '../../components/LoginModal';


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
      <BreadCrumbs pages={[{ name: 'Wallet Cleaner', href: '/wallet-cleaner', current: true }]} />
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
          {/* 
          <div onClick={() => { }} className="fixed right-8 top-1/2 translate-y-1/2 p-4 py-12 bg-green-500 text-black font-bold">
            Staking
          </div> */}

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
      />

    </>
  );
};

export default Home;
