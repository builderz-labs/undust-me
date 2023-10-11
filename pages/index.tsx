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

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = () => {
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
        <title>Builderz Solana dApp Scaffold</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='w-full flex h-screen flex-col items-center justify-center gp-2 relative'>

        {showConfetti && <Confetti />}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className=''
        >
          <h1 className='text-undust-green'>UnDust.me</h1>
          <span className='opacity-50 text-2xl'>Your Easy To Use Solana Wallet Cleaner</span>
        </motion.div>

        <MainComponent loading={loading} setLoading={setLoading} showConfetti={showConfetti} setShowConfetti={setShowConfetti} />


        <div className='bgBlurReq z-0 pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2' />
        {/* <div id="circle" className='text-undust-green blur-sm' style={{ position: 'absolute', zIndex: 1, width: '50px', height: '50px', borderRadius: '50%', pointerEvents: 'none', transition: '0.2s' }}></div> */}

      </div>
    </>
  );
};

export default Home;
