'use client'

import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function MyMultiButton2() {

  return (
    <div className=" relative z-[999]">
      <WalletMultiButtonDynamic className='myFreshButton  text-sm break-keep  flex items-center gap-4 justify-center font-bold py-[18px] px-[36px] rounded-[120px]  w-full' />
    </div>
  );
}
