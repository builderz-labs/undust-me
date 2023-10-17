import { useWallet } from "@solana/wallet-adapter-react";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { SunriseStakeClient } from '@sunrisestake/client';
import { AnchorProvider } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import BN from 'bn.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useSunrise } from "../contexts/SunriseClientContext";
import { Details } from '@sunrisestake/client';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
} from 'react';
import { printExplorerLink } from '../utils/explorer';


function SwapModal({ isSwapModalOpen, setIsSwapModalOpen, rentBack }: any) {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { client } = useSunrise();
  const [amount, setAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [valid, setValid] = useState(false);
  const [selectedMultiplier, setSelectedMultiplier] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValid(amount > 0 && amount <= maxAmount);
  }, [maxAmount, amount]);

  // calculate the max by looking up the user's SOL balance
  // useEffect(() => {
  //   const getBalance = async () => {
  //     if (!wallet.publicKey) {
  //       return;
  //     }

  //     const balance = await connection.getBalance(wallet.publicKey);
  //     setMaxAmount(balance / LAMPORTS_PER_SOL);
  //   };

  //   getBalance();
  // }, [wallet.publicKey?.toBase58()]);

  const handleDeposit = async () => {
    if (!client) {
      alert('Sunrise client not found');
      return;
    }
    if (!wallet.connected) {
      alert('Connect wallet first');
      return;
    }

    // Multiply the amount by the selectedMultiplier and rentBack
    const multipliedAmount = amount * selectedMultiplier! * rentBack;
    const amountLamports = new BN(multipliedAmount * LAMPORTS_PER_SOL);

    if (amountLamports.gt(new BN(maxAmount * LAMPORTS_PER_SOL))) {
      alert('You do not have enough SOL to deposit this amount');
      return;
    }

    try {
      const tx = await client.deposit(amountLamports);
      const sig = await wallet.sendTransaction(tx, connection);
      printExplorerLink('Deposit sent', sig, connection);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const handleMultiplierClick = (multiplier: number) => {
    if (selectedMultiplier === multiplier) {
      setSelectedMultiplier(null);
    } else {
      setSelectedMultiplier(multiplier);
    }
  };





  return (
    <>
      {isSwapModalOpen && (
        <div className="w-full h-screen absolute inset-0 z-[99] bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
          <div className="max-w-lg w-full h-[40vh] rounded-lg shadow-lg border border-undust-green border-opacity-40 bg-black bg-opacity-90 backdrop-blur-2xl p-4">
            <div className="w-full flex flex-row items-center justify-end">
              <div
                onClick={() => setIsSwapModalOpen(false)}
                className="hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full text-center px-4 flex items-center justify-center flex-col">
              {/* <div className="w-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-undust-green"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                  />
                </svg>
              </div> */}
              <h3 className="text-undust-green">Eco Stake Multiplier</h3>

              <p>You decide which multiplier you want to stake to gSOL with</p>

              <div className="w-full my-4 px-4 flex items-center justify-center mt-10 gap-4">
                {["x1", "x2", "x5", "x10"].map((multiplier, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleMultiplierClick(
                        multiplier === "x1" ? 1 : parseInt(multiplier.slice(1))
                      )
                    }
                    className={`w-12 font-bold h-12 flex bg-undust-green ${selectedMultiplier ===
                      (multiplier === "x1" ? 1 : parseInt(multiplier.slice(1)))
                      ? "bg-opacity-80"
                      : "bg-opacity-10"
                      } border border-white border-opacity-20 text-white items-center justify-center rounded-lg cursor-pointer hover:bg-opacity-60`}
                  >
                    {multiplier}
                  </div>
                ))}
              </div>

              {selectedMultiplier && (
                <button
                  onClick={handleDeposit}
                  className="mt-8 tooltip myFreshButton text-sm break-keep font-bold  flex items-center justify-center gap-4  text-white p-4 rounded-[120px]  w-full"
                >
                  {loading && <Spin />} Stake Now for{" "}
                  {(rentBack * selectedMultiplier).toFixed(2)}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SwapModal;
