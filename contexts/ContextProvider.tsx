import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletProvider
} from "@solana/wallet-adapter-react";
import { FC, ReactNode, useCallback, useMemo } from "react";

import { WalletModalProvider as ReactUIWalletModalProvider } from "@solana/wallet-adapter-react-ui";

export const WalletContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  const network =
    "mainnet-beta";
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [network]
  );

  return (
    <WalletProvider wallets={wallets} onError={onError} autoConnect={false}>
      <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
    </WalletProvider>
  );
};

export default WalletContextProvider;
