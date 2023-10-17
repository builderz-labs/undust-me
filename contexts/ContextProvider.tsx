import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useMemo } from 'react';

export const network =
  (process.env.NEXT_PUBLIC_NETWORK as WalletAdapterNetwork) ||
  WalletAdapterNetwork.Devnet;

interface IContextProviderProps {
  children: ReactNode;
}

const ContextProvider: FC<IContextProviderProps> = ({ children }) => {
  const endpoint = useMemo(
    () => process.env.NEXT_PUBLIC_HELIUS_URL || clusterApiUrl(network),
    [network],
  );
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export { ContextProvider };
