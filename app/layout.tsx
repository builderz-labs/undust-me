import { Toaster } from 'sonner';
import "../styles/globals.css";
import NewSidebar from '../components/Sidebar/NewSidebar';
import ContextProvider from '../contexts/ContextProvider';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { SunriseClientProvider } from '../contexts/SunriseClientContext';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';


require("@solana/wallet-adapter-react-ui/styles.css");

export const metadata = {
  title: 'Undust.me - Wallet Cleaner on Solana',
  description: 'Undust.me is a wallet cleaner on Solana. It allows you to remove unwanted tokens from your wallet, close empty token accounts and burn scam NFTs from your wallet.',
};

export default async function RootLayout({ children }: any) {
  const network = WalletAdapterNetwork.Mainnet;

  return (
    <ContextProvider>
      <SunriseClientProvider network={network} >
        <WalletModalProvider>
          <html lang="en" className='w-full min-h-screen'>
            <body className='w-full h-full flex flex-row items-start justify-start min-h-screen'>
              <NewSidebar />
              <main className={`w-[90%] h-screen`}>
                {children}
              </main>
              <Toaster position="bottom-right" />
            </body>
          </html>
        </WalletModalProvider>
      </SunriseClientProvider >
    </ContextProvider>
  );
}
