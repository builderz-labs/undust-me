import "../styles/globals.css";

import 'react-toastify/dist/ReactToastify.css'

import AppBar from "../components/AppBar";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from 'react-toastify';
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useState } from 'react';
import Footer from '../components/Footer';
import { Toaster } from 'sonner';
import { SunriseClientProvider } from '../contexts/SunriseClientContext';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ContextProvider } from '../contexts/ContextProvider';

require("@solana/wallet-adapter-react-ui/styles.css");

function MyApp({ Component, pageProps }: AppProps) {
  // Get OS-level preference for dark mode
  const [isDark, setIsDark] = useState(true);

  const network = WalletAdapterNetwork.Mainnet;

  return (
    <ContextProvider>
      <SunriseClientProvider network={network} >
        <CssBaseline enableColorScheme />
        <WalletModalProvider>
          <AppBar isDark={isDark} setIsDark={setIsDark} />
          <Component {...pageProps} />
          {/* Change Notification settings here */}
          <Toaster position='bottom-right' theme='dark' />

        </WalletModalProvider>
      </SunriseClientProvider >
    </ContextProvider>

  );
}

export default MyApp;
