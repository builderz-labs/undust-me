import { FC, useEffect, useState } from 'react';
import { Card, CardBody, Stack, Button, Input } from '@chakra-ui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import BN from 'bn.js';
import { useSunrise } from '../../contexts/SunriseClientContext';
import { printExplorerLink } from '../../utils/explorer';
import { toast } from 'sonner';

interface SunriseDepositProps {
  setShowConfetti: (value: boolean) => void;
  amount: number;
  setAmount: (value: number) => void; // Add this line
}

const SunriseDeposit: React.FC<SunriseDepositProps> = ({ setShowConfetti, amount, setAmount }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { client } = useSunrise();
  const [maxAmount, setMaxAmount] = useState(0);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(amount > 0 && amount <= maxAmount);
  }, [maxAmount, amount]);

  // set the input value to the amount
  useEffect(() => {
    if (amount === 0) {
      setAmount(amount);
    }
  }, [amount]);

  // calculate the max by looking up the user's SOL balance
  useEffect(() => {
    const getBalance = async () => {
      if (!wallet.publicKey) {
        return;
      }

      const balance = await connection.getBalance(wallet.publicKey);
      setMaxAmount(balance / LAMPORTS_PER_SOL);
    };

    getBalance();
  }, [wallet.publicKey?.toBase58()]);

  const handleDeposit = async () => {
    console.log("--click")
    if (!client) {
      alert('Sunrise client not found');
      return;
    }
    if (!wallet.connected) {
      alert('Connect wallet first');
      return;
    }
    console.log('sss')
    const amountLamports = new BN(amount * LAMPORTS_PER_SOL);

    if (amountLamports.gt(new BN(maxAmount * LAMPORTS_PER_SOL))) {
      alert('You do not have enough SOL to deposit this amount');
      return;
    }

    try {
      const tx = await client.deposit(amountLamports);
      const sig = await wallet.sendTransaction(tx, connection);
      printExplorerLink('Deposit sent', sig, connection);
      toast.success('Deposit sent');
      setShowConfetti(true);
      // timeout confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  console.log(amount, "AmountDeposit")

  return (
    <Card backgroundColor="rgba(255, 255, 255, 0.05)">
      <CardBody>
        <div className='w-full flex flex-row items-center justify-between gap-4'>
          <input
            value={amount.toFixed(6)} // bind amount state to input value
            className='w-full h-10 px-4 bg-slate-700 bg-opacity-40 rounded-lg text-white font-bold hover:bg-opacity-80 transition-all duration-300 ease-in-out'
            onChange={e => setAmount(Number(e.target.value))}
            placeholder="Enter deposit SOL amount"
          />
          <button
            disabled={!valid}
            onClick={handleDeposit}
            className='relative z-[99] h-10 px-4 bg-undust-green rounded-lg text-black font-bold hover:bg-opacity-80 transition-all duration-300 ease-in-out'
          >
            Deposit
          </button>
        </div>
      </CardBody>
    </Card>
  );
};


export default SunriseDeposit;
