import React, { FC, useState } from "react";
import { motion } from 'framer-motion';
import { SunriseDetails } from './Sunrise/SunriseDetails';
import SunriseDeposit from './Sunrise/SunriseDeposit';

interface SunriseModalProps {
  isSwapModalOpen: boolean;
  setIsSwapModalOpen: (isOpen: boolean) => void;
  rentBack: number;
  setShowConfetti: (show: boolean) => void;
  showConfetti: boolean;
}

const SunriseModal: FC<SunriseModalProps> = ({ isSwapModalOpen, setIsSwapModalOpen, rentBack, setShowConfetti, showConfetti }) => {
  const [selectedMultiplier, setSelectedMultiplier] = useState<number>();
  const [stakeMultiplierActive, setStakeMultiplierActive] = useState(false);
  const [amount, setAmount] = useState(0);
  const [sunriseSuccessModalOpen, setSunriseSuccessModalOpen] = useState(false);

  const handleMultiplierClick = (multiplier: number) => {
    if (selectedMultiplier === multiplier) {
      setSelectedMultiplier(undefined);
      setAmount(0); // Reset amount when multiplier is unselected
    } else {
      setSelectedMultiplier(multiplier);
      setAmount(multiplier * rentBack); // Set amount based on multiplier
    }
  };

  return (
    <>
      {isSwapModalOpen && (
        <div className="w-full h-screen absolute inset-0 z-[99] bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
          <div className="max-w-2xl w-full pb-8 rounded-lg shadow-lg border border-undust-green border-opacity-40 bg-black bg-opacity-90 backdrop-blur-2xl p-4">
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

            <div className="w-full text-start px-4 flex items-center justify-center flex-col gap-4">
              <SunriseDetails />
              <SunriseDeposit setShowConfetti={setShowConfetti} amount={amount} setAmount={setAmount} setSunriseSuccessModalOpen={setSunriseSuccessModalOpen} />

              <h2 className="text-undust-green cursor-pointer flex flex-row items-center justify-center gap-2"
                onClick={() => setStakeMultiplierActive(!stakeMultiplierActive)}
              >
                Eco Stake Multiplier
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${stakeMultiplierActive ? "rotate-0" : "transform rotate-180"} `}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </h2>

              {stakeMultiplierActive &&
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className={`relative z-20  rounded-lg bg-black bg-opacity-20 `}
                >
                  <p className='text-xs mb-4'>You decide which multiplier you want to stake to gSOL with:</p>
                  <div className="w-full my-1 mb-8 flex items-center justify-center  gap-4">
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
                </motion.div>
              }



              {sunriseSuccessModalOpen && <>
                <div className="w-full text-xs top-0 bg-green-400 text-black rounded-lg p-4">
                  Congrats, you successfully deposited & staked {amount.toFixed(2)} SOL! Your gSOL is now available.
                </div>
              </>}

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SunriseModal;