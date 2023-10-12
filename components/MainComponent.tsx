import { motion } from 'framer-motion';
import React, { useState } from 'react';
import MyMultiButton from './MyMultiButton';
import { useWallet } from '@solana/wallet-adapter-react';
import {
    AccountInfo,
    Connection,
    ParsedAccountData,
    PublicKey,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { closeToken } from '@metaplex-foundation/mpl-toolbox';
import { TransactionBuilder, publicKey } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import base58 from 'bs58';
import { Spin } from 'antd';
import MyMultiButton2 from './MyMultiButton2';
import { toast } from 'sonner';

function MainComponent({
    loading,
    setLoading,
    showConfetti,
    setShowConfetti,
    activeIndex,
    setActiveIndex,
}: {
    loading: boolean;
    setLoading: any;
    showConfetti: boolean;
    setShowConfetti: any;
    activeIndex: number;
    setActiveIndex: any;
}) {
    const wallet = useWallet();
    const [emptyAccounts, setEmptyAccounts] = useState(0);
    const [rentBack, setRentBack] = useState(0);
    type AccountType = {
        pubkey: PublicKey;
        account: AccountInfo<ParsedAccountData>;
    };
    const [dustScore, dustMessage] = calculateDustScore(emptyAccounts);

    const [emptyAccountsData, setEmptyAccountsData] = useState<AccountType[]>([]);

    const connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_URL!);

    async function fetchTokenAccounts(wallet: any) {
        setLoading(true);
        setActiveIndex(0);
        const publicKey = new PublicKey(wallet.publicKey);
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
            publicKey,
            { programId: TOKEN_PROGRAM_ID }
        );
        const emptyTokenAccounts = tokenAccounts.value.filter(
            (account) => account.account.data.parsed.info.tokenAmount.uiAmount === 0
        );
        const rentBack = emptyTokenAccounts.reduce(
            (total, account) => total + account.account.lamports,
            0
        );
        const rentBackSol = rentBack / 1_000_000_000; // Convert lamports to SOL
        console.log(emptyTokenAccounts);
        setEmptyAccounts(emptyTokenAccounts.length);
        setEmptyAccountsData(emptyTokenAccounts);
        setRentBack(rentBackSol);
        setLoading(false);
        setActiveIndex(1);
        return { emptyAccounts: emptyTokenAccounts, rentBack };
    }

    function calculateDustScore(emptyAccounts: number): [number, string] {
        let score = 0;
        let message = '';

        if (emptyAccounts === 0) {
            score = 10;
            message = "It's pretty clean around here. Your parents would be proud!";
        } else if (emptyAccounts <= 10) {
            score = 9;
            message = 'Not bad, but some spring cleaning is needed. Time to tidy up!';
        } else if (emptyAccounts <= 20) {
            score = 8;
            message = 'Not bad, but some spring cleaning is needed. Time to tidy up!';
        } else if (emptyAccounts <= 30) {
            score = 7;
            message = 'Not bad, but some spring cleaning is needed. Time to tidy up!';
        } else if (emptyAccounts <= 40) {
            score = 6;
            message = 'Not bad, but some spring cleaning is needed. Time to tidy up!';
        } else if (emptyAccounts <= 50) {
            score = 5;
            message = 'Not bad, but some spring cleaning is needed. Time to tidy up!';
        } else if (emptyAccounts <= 60) {
            score = 4;
            message = 'Not bad, but some spring cleaning is needed. Time to tidy up!';
        } else if (emptyAccounts <= 70) {
            score = 3;
            message = 'Not bad, but some spring cleaning is needed. Time to tidy up!';
        } else if (emptyAccounts <= 80) {
            score = 2;
            message = 'Not bad, but some spring cleaning is needed. Time to tidy up!';
        } else if (emptyAccounts <= 90) {
            score = 1;
            message = 'Not bad, but some spring cleaning is needed. Time to tidy up!';
        } else if (emptyAccounts >= 100) {
            score = 0;
            message =
                'Damn son, your account is looking dusty ASF! Let‘s help you clean that mess up...';
        }

        return [score, message];
    }

    const closeEmptyAccounts = async () => {
        const umi = createUmi(process.env.NEXT_PUBLIC_HELIUS_URL!);
        setLoading(true);

        // Set up UMI
        umi.use(walletAdapterIdentity(wallet));
        let tx = new TransactionBuilder();

        for (const ata of emptyAccountsData) {
            if (Number(ata.account.data.parsed.info.tokenAmount.uiAmount === 0)) {
                console.log(ata);
                const account = publicKey(ata.pubkey.toBase58());
                const destination = publicKey(umi.identity);

                tx = tx.add(
                    closeToken(umi, {
                        account,
                        destination,
                        owner: umi.identity,
                    })
                );
            }
        }

        const splitBuilders = tx.unsafeSplitByTransactionSize(umi);
        // console.log(splitBuilders);
        const txs = await Promise.all(
            splitBuilders.map((builder) => builder.buildWithLatestBlockhash(umi))
        );
        await umi.identity.signAllTransactions(txs);

        const res = await Promise.all(txs.map((tx) => umi.rpc.sendTransaction(tx)));
        // console.log(res.map((sig) => base58.encode(sig)));

        setShowConfetti(true);
        toast.success("Success! Your wallet is now dust free!")
        setLoading(false);
        setActiveIndex(2);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    const [rotate, setRotate] = useState(false);

    const rotateStyle = {
        transform: rotate ? 'rotate(360deg)' : 'rotate(0deg)',
        transition: 'transform 2s',
    };

    return (
        <>
            {/* {activeIndex === 0 && <img src="/machine-12.webp" alt="machine" className='w-[250px] h-[250px] md:w-[50px] md:h-[850px] object-cover mx-auto -mt-24 -mb-8' />} */}
            <div className={`relative z-10  ${activeIndex === 1 ? 'mt-0 md:mt-10' : ''}`}>

                <div className='w-full px-4'>
                    {activeIndex === 0 ? (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2, delay: 1 }}
                                className=' border-undust-green border-opacity-20 rounded-lg  max-w-2xl w-full flex flex-col items-center justify-center gap-8 p-2 md:p-12 my-2 md:my-10  '
                            >
                                {wallet.connected ? (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 2, delay: 1 }}
                                            exit={{ opacity: 0, transition: { duration: 2 } }}
                                            className='flex flex-col items-center justify-center gap-4 w-full text-center bg-black bg-opacity-60 backdrop-blur-xl p-4 py-4 md:py-8 -mt-4 md:-mt-10 rounded-lg shadow-lg '
                                        >
                                            <span className='text-xl max-w-lg mx-auto text-undust-green font-bold underline '>
                                                Before you give us a spin!
                                            </span>
                                            <motion.ol className='text-left flex flex-col items-start justify-center gap-4 text-white opacity-80'>
                                                <motion.li
                                                    className='opacity-30 list-disc list-inside'
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 1, delay: 1 }}
                                                >
                                                    Undust.me safely scans your wallet for open, empty
                                                    token accounts
                                                </motion.li>
                                                <motion.li
                                                    className='opacity-30 list-disc list-inside'
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 1, delay: 2 }}
                                                >
                                                    Identifies SOL stored for rent in the accounts
                                                </motion.li>
                                                <motion.li
                                                    className='opacity-30 list-disc list-inside'
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 1, delay: 3 }}
                                                >
                                                    Closes accounts, returning stored SOL to your wallet
                                                </motion.li>
                                            </motion.ol>
                                        </motion.div>
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 2, delay: 4 }}
                                            exit={{ opacity: 0, transition: { duration: 3 } }}
                                            className='myFreshButton text-sm break-keep  flex items-center gap-4 justify-center font-bold text-white hover:border hover:border-undust-green  py-[18px] px-[36px] rounded-[120px]  w-full'
                                            onClick={() => {
                                                fetchTokenAccounts(wallet);
                                            }}
                                        >
                                            {' '}
                                            {loading && <Spin />} UnDust Me!
                                        </motion.button>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className='mt-14 md:mt-28'
                                            style={rotateStyle}
                                            onClick={() => setRotate(!rotate)}
                                        >
                                            {' '}
                                            <MyMultiButton2 />
                                        </div>
                                    </>
                                )}

                            </motion.div>
                        </>
                    ) : activeIndex === 1 ? (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2, delay: 1 }}
                                className='border border-undust-green border-opacity-20 rounded-lg min-h-[250px] max-w-2xl w-full flex flex-col items-center justify-center gap-8 p-6 md:p-12 mt-6 md:mt-0 bg-black bg-opacity-60 backdrop-blur-xl '
                            >
                                <div className='flex flex-col items-center justify-center gap-4 '>
                                    <div className='w-full flex flex-col items-center justify-between gap-4'>
                                        <span className='text-undust-green text-3xl md:text-5xl font-bold'>
                                            {rentBack.toLocaleString()} <span>SOL</span>{' '}
                                        </span>
                                        <span className='-mt-4 uppercase text-sm'>
                                            ({emptyAccounts} accounts)
                                        </span>
                                        <span className='text-undust-green text-lg'>{dustMessage}</span>
                                        <span className='uppercase text-xs'>Dust Score: {dustScore}/10</span>
                                    </div>

                                </div>

                            </motion.div>
                            <div className='w-full flex flex-row items-center justify-center gap-2'>
                                <button
                                    onClick={() => {
                                        setActiveIndex(0);
                                    }}
                                    className='mt-8 myFreshButton text-sm break-keep font-bold  flex items-center justify-center  text-white p-4 rounded-[120px]  w-16'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => {
                                        if (emptyAccounts > 0) {
                                            closeEmptyAccounts();
                                        } else {
                                            const tweetText =
                                                'I just cleaned my wallet with UnDust.me and recovered ' +
                                                rentBack.toLocaleString() +
                                                ' SOL! My Dust Score is ' + dustScore + '/10';
                                            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                                tweetText
                                            )}`;
                                            window.open(url, '_blank');
                                        }
                                    }}
                                    disabled={loading}
                                    className='mt-8 myFreshButton text-sm break-keep font-bold flex items-center justify-center disabled:!bg-opacity-40 disabled:cursor-not-allowed hover:border hover:border-undust-green text-white  py-[18px] px-[36px] rounded-[120px]  w-full'
                                >
                                    {loading && <Spin />}{' '}
                                    {emptyAccounts === 0
                                        ? 'Share on Twitter!'
                                        : 'Close Empty Accounts'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2, delay: 1 }}
                            className='border border-undust-green border-opacity-20 rounded-lg  max-w-2xl w-full flex flex-col items-center justify-center gap-8 p-12 backdrop-blur-xl my-10'
                        >
                            <div className='flex flex-col items-center justify-center gap-2'>
                                {/* Add your content for step 2 here */}
                                <span className='text-undust-green text-3xl md:text-5xl'>
                                    {rentBack.toLocaleString()} <span>SOL</span>{' '}
                                </span>
                                <span>Congrats, your wallet is now Dust Free!</span>
                                <div className='flex flex-row items-center justify-center gap-2'>
                                    <button
                                        onClick={() => {
                                            setActiveIndex(0);
                                        }}
                                        className='mt-8 myFreshButton text-sm break-keep font-bold  flex items-center justify-center  text-white p-4 rounded-[120px]  w-16'
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='w-6 h-6'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        className='mt-8 myFreshButton text-sm break-keep font-bold  flex items-center justify-center  text-white  py-[18px] px-[36px] rounded-[120px]  w-full'
                                        onClick={() => {
                                            const tweetText =
                                                'I just cleaned my wallet with UnDust.me and recovered ' +
                                                rentBack.toLocaleString() +
                                                ' SOL! My Dust Score is ' + dustScore + '/10';
                                            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                                tweetText
                                            )}`;
                                            window.open(url, '_blank');
                                        }}
                                    >
                                        Share on Twitter!
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MainComponent;
