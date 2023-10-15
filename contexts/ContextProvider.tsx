import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,

} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { FC, ReactNode, useCallback, useMemo } from "react";

import { WalletModalProvider as ReactUIWalletModalProvider } from "@solana/wallet-adapter-react-ui";

export const WalletContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const network = WalletAdapterNetwork.Mainnet;

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter({ network })
      // new PhantomWalletAdapter({ network })
    ],
    [network]
  );

  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_HELIUS_URL!}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={false}>
        <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
