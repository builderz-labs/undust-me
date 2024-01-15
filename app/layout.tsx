import { Toaster } from 'sonner';
import "../styles/globals.css";
import NewSidebar from '../components/Sidebar/NewSidebar';
import ContextProvider from '../contexts/ContextProvider';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import LayoutWrapper from './LayoutWrapper';
import AppBar from '../components/Sidebar/AppBar';


require("@solana/wallet-adapter-react-ui/styles.css");

export const metadata = {
  title: 'Undust.me - Wallet Cleaner on Solana',
  description: 'Undust.me is a wallet cleaner on Solana. It allows you to remove unwanted tokens from your wallet, close empty token accounts and burn scam NFTs from your wallet.',
};

export default async function RootLayout({ children }: any) {

  return (
    <LayoutWrapper>
      <html lang="en" className='w-full min-h-screen'>
        <body className='relative w-full h-full flex flex-row items-start justify-start min-h-screen overflow-hidden'>
          <div className='bgBlurReq z-0 pointer-events-none absolute right-0 translate-x-[30%] bottom-0' />
          {/* <div id="circle" className='text-undust-green blur-sm absolute' style={{ position: 'absolute', zIndex: 1, width: '10px', height: '10px', borderRadius: '50%', pointerEvents: 'none', transition: '0.2s' }}></div> */}
          <AppBar />
          <NewSidebar />
          <main className={`w-auto lg:w-[90%] h-screen`}>
            {children}
          </main>
          <Toaster position="bottom-right" />
        </body>
      </html>
    </LayoutWrapper>
  );
}
