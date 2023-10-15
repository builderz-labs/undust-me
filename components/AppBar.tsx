
import { Logo } from "./Logo";
import React from "react";
import ThemeSwitcherComponent from "./ThemeSwitcher";
import Toolbar from "@mui/material/Toolbar";
import MyMultiButton from './MyMultiButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Drawer from './Drawer';
import { useWallet } from '@solana/wallet-adapter-react';

export default function PrimarySearchAppBar({ setTheme, setIsDark, isDark }: any) {
  const wallet = useWallet();
  const router = useRouter();

  const isActive = (route: string) => router.pathname === route;


  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      className='absolute top-0 left-0 w-full flex flex-col items-center justify-center gap-2 z-50'>
      <nav className='w-full flex flex-row items-center justify-between gap-2 container mx-auto my-6 md:my-10 mb-0 mt-2 px-0 md:px-4'>
        <Link
          href='/'
          className='pl-4 md:pl-0 pb-4 flex flex-row items-center justify-center gap-2 text-undust-green text-lg md:text-3xl font-bold'>
          {/* <Logo /> */}
          Undust.me
        </Link>
        <div className='hidden md:flex flex-row items-center justify-center gap-16'>
          <Link href='/' className={`border-b border-b-transparent pb-4 hover:border-b-undust-green transition-all duration-300 ease-in-out hover:text-undust-green ${isActive('/') ? 'active-link' : ''}`}>
            Home
          </Link>
          <Link href='/about' className={`border-b border-b-transparent pb-4 hover:border-b-undust-green transition-all duration-300 ease-in-out hover:text-undust-green ${isActive('/about') ? 'active-link' : ''}`}>
            About
          </Link>
          <Link href='/faq' className={`border-b border-b-transparent pb-4 hover:border-b-undust-green transition-all duration-300 ease-in-out hover:text-undust-green ${isActive('/faq') ? 'active-link' : ''}`}>
            FAQs
          </Link>
        </div>
        <div className='pb-4 flex flex-row items-center justify-center gap-2 -pr-2 md:pr-0'>
          {<div className="hidden md:flex">
            <MyMultiButton />
          </div>}
          <div className='flex md:hidden -mrl2'><Drawer /></div>
        </div>
      </nav>
    </motion.header>
  );
}
