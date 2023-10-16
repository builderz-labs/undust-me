import React, { useEffect, useState } from 'react'
import MyMultiButton from '../MyMultiButton'
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { closeToken } from '@metaplex-foundation/mpl-toolbox';
import { TransactionBuilder, publicKey } from '@metaplex-foundation/umi';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey, AccountInfo, ParsedAccountData, Connection } from '@solana/web3.js';
import { Spin } from 'antd';
import { toast } from 'sonner';

function Stepper1() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const wallet = useWallet();
    const [emptyAccounts, setEmptyAccounts] = useState(0);
    type AccountType = {
        pubkey: PublicKey;
        account: AccountInfo<ParsedAccountData>;
    };
    const [rentBack, setRentBack] = useState(3);
    const [dustScore, dustMessage] = calculateDustScore(emptyAccounts);
    const [memeImage, setMemeImage] = useState("");
    const [emptyAccountsData, setEmptyAccountsData] = useState<AccountType[]>([]);
    const [showConfetti, setShowConfetti] = useState(false);

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
        // console.log(emptyTokenAccounts);
        setEmptyAccounts(emptyTokenAccounts.length);
        setEmptyAccountsData(emptyTokenAccounts);
        setRentBack(rentBackSol);
        setLoading(false);
        setActiveIndex(1);
        return { emptyAccounts: emptyTokenAccounts, rentBack };
    }

    useEffect(() => {
        const [score, message, image] = calculateDustScore(emptyAccounts);
        setMemeImage(image);
    }, [emptyAccounts]);

    function calculateDustScore(emptyAccounts: number): [number, string, string] {
        let score = 0;
        let message = "";
        let image = "";

        if (emptyAccounts === 0) {
            score = 10;
            message = "Congrats, your wallet is as clean as a whistle. Looking sharp!";
            image = "https://media.giphy.com/media/CGQyU8OXBSCZswxOa7/giphy.gif";
        } else if (emptyAccounts <= 10) {
            score = 9;
            message = "Almost perfect, just a quick clean and you’re good to go.";
            image = "https://media.giphy.com/media/n5lsBzVaDm44g87TgG/giphy.gif";
        } else if (emptyAccounts <= 20) {
            score = 8;
            message = "Damn, you’re good! Your wallet is looking fresh. ";
            image = "https://media.giphy.com/media/G0Kh7Km23llbW/giphy.gif";
        } else if (emptyAccounts <= 30) {
            score = 7;
            message = "Damn, you’re good! Your wallet is looking fresh.";
            image = "https://media.giphy.com/media/gL9RxsJoFyou8aS2qd/giphy.gif";
        } else if (emptyAccounts <= 40) {
            score = 6;
            message = "Your wallet has seen better days; time to clean up.";
            image = "https://media.giphy.com/media/3DnDRfZe2ubQc/giphy.gif";
        } else if (emptyAccounts <= 50) {
            score = 5;
            message = "Your wallet is a bit dusty. Time to get the hoover out.";
            image = "https://media.giphy.com/media/l3q2U9kZyGloBvWTK/giphy.gif";
        } else if (emptyAccounts <= 60) {
            score = 4;
            message = "Not bad, but it’s time for a quick scrub. Let’s get started.";
            image = "https://media.giphy.com/media/eEjVeFJ9p8gyt0m3Sa/giphy.gif";
        } else if (emptyAccounts <= 70) {
            score = 3;
            message = "This place hasn’t been cleaned in years! Time to change that.";
            image = "https://media.giphy.com/media/Y3Siwjzlvciv6/giphy.gif";
        } else if (emptyAccounts <= 80) {
            score = 2;
            message = "Woah! It‘s looking a bit messy around here. Let’s fix that for you.";
            image = "https://media.giphy.com/media/3DnDRfZe2ubQc/giphy.gif";
        } else if (emptyAccounts <= 90) {
            score = 1;
            message = "You’ve really let your wallet go. Undust.me is here to save you.";
            image = "https://media.giphy.com/media/3DnDRfZe2ubQc/giphy.gif";
        } else if (emptyAccounts >= 100) {
            score = 0;
            message = "Your wallet is a true masterpiece of mess!";
            image = "https://media.giphy.com/media/hqb9YEyhdFZ6KFI61F/giphy.gif";
        }

        return [score, message, image];
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
        try {
            let txs = await Promise.all(
                splitBuilders.map((builder) => builder.buildWithLatestBlockhash(umi))
            );
            txs = await umi.identity.signAllTransactions(txs);

            const res = await Promise.all(
                txs.map((tx) => umi.rpc.sendTransaction(tx))
            );

            const blockhash = await umi.rpc.getLatestBlockhash();

            await Promise.all(
                res.map((res) =>
                    umi.rpc.confirmTransaction(res, {
                        strategy: {
                            type: "blockhash",
                            blockhash: blockhash.blockhash,
                            lastValidBlockHeight: blockhash.lastValidBlockHeight,
                        },
                        commitment: "confirmed",
                    })
                )
            );

            setShowConfetti(true);
            toast.success("Success! Your wallet is now dust free!");
            setActiveIndex(2);
            setTimeout(() => setShowConfetti(false), 8000);

            // Add this code after the previous line
            // fetch('http://localhost:3000/leaderboard', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         walletId: wallet.publicKey,
            //         closedAccounts: emptyAccounts,
            //     }),
            // });
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        setLoading(false);
    };

    const [rotate, setRotate] = useState(false);

    const rotateStyle = {
        transform: rotate ? "rotate(360deg)" : "rotate(0deg)",
        transition: "transform 2s",
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center p-4'>
            {!wallet.connected && <h2 className='text-white text-center opacity-80 '>Scan your wallet for empty token Accounts and close them with one click.</h2>}
            <div className="myDivider w-full h-0.5 mt-4"></div>
            <div className="w-full mt-2  text-white">
                <div className="w-full mt-4 flex flex-col max-w-md mx-auto items-center justify-center gap-4">
                    {!wallet.connected ? <MyMultiButton /> : null}
                    {wallet.connected && activeIndex === 0 && <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2, delay: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0 } }}
                            className="flex flex-col items-center justify-center gap-4 w-full text-center bg-black bg-opacity-60 backdrop-blur-xl p-4 py-4 md:py-8 -mt-4 md:-mt-10 rounded-lg shadow-lg "
                        >
                            <span className="text-xl max-w-lg mx-auto text-undust-green font-bold">
                                Before you give us a spin:
                            </span>
                            <motion.ol className="text-left flex flex-col items-start justify-center gap-4 text-white opacity-80">
                                <motion.li
                                    className="opacity-30 list-disc list-inside"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 1 }}
                                >
                                    Undust.me safely scans your wallet for open, empty
                                    token accounts
                                </motion.li>
                                <motion.li
                                    className="opacity-30 list-disc list-inside"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 2 }}
                                >
                                    Identifies SOL stored for rent in the accounts
                                </motion.li>
                                <motion.li
                                    className="opacity-30 list-disc list-inside"
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
                            data-tip="Spin it!"
                            className="myFreshButton text-sm break-keep  flex items-center gap-4 justify-center font-bold text-white hover:border hover:border-undust-green  py-[18px] px-[36px] rounded-[120px]  w-full"
                            onClick={() => {
                                fetchTokenAccounts(wallet);
                            }}
                        >
                            {" "}
                            {loading && <Spin />} UnDust Me!
                        </motion.button>
                    </>}
                </div>
            </div>
        </div>
    )
}

export default Stepper1