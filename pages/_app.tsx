import "../styles/globals.css";

import 'react-toastify/dist/ReactToastify.css'

import AppBar from "../components/AppBar";
import type { AppProps } from "next/app";
import ContextProvider from "../contexts/ContextProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from 'react-toastify';
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useState } from 'react';
import Footer from '../components/Footer';
import { Toaster } from 'sonner';

require("@solana/wallet-adapter-react-ui/styles.css");

function MyApp({ Component, pageProps }: AppProps) {
  // Get OS-level preference for dark mode
  const [isDark, setIsDark] = useState(true);

  return (
    <ContextProvider>
      <CssBaseline enableColorScheme />
      <WalletModalProvider>
        <AppBar isDark={isDark} setIsDark={setIsDark} />
        <Component {...pageProps} />
        {/* Change Notification settings here */}
        <Toaster position='bottom-right' theme='dark' />
        <Footer />
      </WalletModalProvider>
    </ContextProvider>

  );
}

export default MyApp;
