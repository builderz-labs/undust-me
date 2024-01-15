

import React from 'react';

import '../styles/globals.css';


// TODO: Change to other toast provider
import ContextProvider from '../contexts/ContextProvider';
import { SunriseClientProvider } from '../contexts/SunriseClientContext';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

// Providers

/**
 *
 * @param Children --> This will be the rendered component in the current page
 * @returns --> A wrapper of providers such as Session, WalletContext around the Children param
 */
type LayoutWrapperProps = {
  children: React.ReactNode;
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const network = WalletAdapterNetwork.Mainnet;

  return (
    <ContextProvider>
      {/* <WalletModalProvider> */}
      <SunriseClientProvider network={network} >
        {children}
      </SunriseClientProvider >
      {/* </WalletModalProvider> */}
    </ContextProvider>

  );
};

export default LayoutWrapper;
