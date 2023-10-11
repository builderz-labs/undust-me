import { motion } from 'framer-motion'
import React, { useState } from 'react'
import MyMultiButton from './MyMultiButton'
import { useWallet } from '@solana/wallet-adapter-react';
import { AccountInfo, Connection, ParsedAccountData, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, closeAccount } from '@solana/spl-token';
import { toast } from 'sonner';
import {
    closeToken,
    createSplAssociatedTokenProgram,
    createSplTokenProgram,
    fetchAllMintByOwner,
    fetchAllTokenByOwner,
} from "@metaplex-foundation/mpl-toolbox";
import {
    TransactionBuilder,
    createSignerFromKeypair,
    keypairIdentity,
    publicKey,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import base58 from 'bs58';


function MainComponent({ loading, setLoading, showConfetti, setShowConfetti }: { loading: boolean, setLoading: any, showConfetti: boolean, setShowConfetti: any }) {
    const wallet = useWallet();
    const [activeIndex, setActiveIndex] = useState(0);
    const [emptyAccounts, setEmptyAccounts] = useState(0)
    const [rentBack, setRentBack] = useState(0)
    const [emptyAccountList, setEmptyAccountList] = useState([]);
    type AccountType = { pubkey: PublicKey; account: AccountInfo<ParsedAccountData>; };

    const [emptyAccountsData, setEmptyAccountsData] = useState<AccountType[]>([]);

    const connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_URL!);

    async function fetchTokenAccounts(wallet: any) {
        setLoading(true)
        setActiveIndex(0)
        const publicKey = new PublicKey(wallet.publicKey);
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID });
        const emptyTokenAccounts = tokenAccounts.value.filter(account => account.account.data.parsed.info.tokenAmount.uiAmount === 0);
        const rentBack = emptyTokenAccounts.reduce((total, account) => total + account.account.lamports, 0);
        const rentBackSol = rentBack / 1_000_000_000; // Convert lamports to SOL
        console.log(emptyTokenAccounts)
        setEmptyAccounts(emptyTokenAccounts.length)
        setEmptyAccountsData(emptyTokenAccounts)
        setRentBack(rentBackSol)
        setLoading(false)
        setActiveIndex(1)
        return { emptyAccounts: emptyTokenAccounts, rentBack };
    }

    // async function closeEmptyAccounts(emptyAccounts: any[], wallet: any, connection: Connection) {
    //     setLoading(true)
    //     if (!wallet || !wallet.publicKey || typeof wallet.signTransaction !== 'function') {
    //         throw new Error('Invalid wallet object');
    //     }
    //     const publicKey = new PublicKey(wallet.publicKey);
    //     for (let account of emptyAccounts) {
    //         try {
    //             const accountPublicKey = new PublicKey(account.pubkey);
    //             await closeAccount(connection, wallet, accountPublicKey, publicKey, publicKey);
    //             console.log("Closed account", accountPublicKey.toBase58())
    //         } catch (error) {
    //             console.error(`Failed to close account ${account.pubkey}:`, error);
    //             toast.error(`Failed to close account ${account.pubkey}`)
    //         }
    //     }
    //     setShowConfetti(true);
    //     setLoading(false)
    //     setActiveIndex(2);
    //     setTimeout(() => setShowConfetti(false), 3000);
    // }

    const closeEmptyAccounts = async () => {
        const umi = createUmi(
            process.env.NEXT_PUBLIC_HELIUS_URL!,
        );

        setLoading(true)


        // keypair for the wallet

        // Set up UMI
        umi.use(walletAdapterIdentity(wallet));
        // umi.programs.add(createSplAssociatedTokenProgram());
        // umi.programs.add(createSplTokenProgram());

        // const atas = await fetchAllMintByOwner(umi, umi.identity.publicKey);
        // console.log(atas)
        let tx = new TransactionBuilder()

        for (const ata of emptyAccountsData) {
            if (Number(ata.account.data.parsed.info.tokenAmount.uiAmount === 0)) {
                console.log(ata)
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
        console.log(splitBuilders)
        const txs = await Promise.all(splitBuilders.map((builder) => builder.buildWithLatestBlockhash(umi)));
        await umi.identity.signAllTransactions(txs);

        const res = await Promise.all(txs.map((tx) => umi.rpc.sendTransaction(tx)));
        console.log(res.map((sig) => base58.encode(sig)))

        setShowConfetti(true);
        setLoading(false)
        setActiveIndex(2);
        setTimeout(() => setShowConfetti(false), 3000);
    };


    return (
        <div className=''>
            <div className="w-full px-4">
                {activeIndex === 0 ?
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2, delay: 1 }}
                            className=' border-undust-green border-opacity-20 rounded-lg  max-w-2xl w-full flex flex-col items-center justify-center gap-8 p-12 backdrop-blur-xl my-10'>
                            {wallet.connected ? <>
                                <button
                                    className="myFreshButton text-sm break-keep  flex items-center justify-center font-bold text-white  py-[18px] px-[36px] rounded-[120px]  w-full"
                                    onClick={() => { fetchTokenAccounts(wallet) }}>Search for SOL</button>
                            </> : <>
                                <span className='text-lg font-bold max-w-md mx-auto'>Connect Your Wallet to start searching for empty token accounts in your wallet.</span>
                                <MyMultiButton />
                            </>
                            }
                        </motion.div>
                    </>
                    : activeIndex === 1 ?
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2, delay: 1 }}
                            className='border border-undust-green border-opacity-20 rounded-lg min-h-[250px] max-w-2xl w-full flex flex-col items-center justify-center gap-8 p-12 backdrop-blur-xl my-10'>
                            <div className='flex flex-col items-center justify-center gap-4 '>
                                <span>We have found empty Token Accounts</span>
                                <div className='w-full flex flex-col items-center justify-between gap-4'>
                                    <span className='text-undust-green text-3xl md:text-5xl'>{rentBack.toLocaleString()} <span>SOL</span> </span>
                                    <span className='text-undust-green text-sm -mt-4'>({emptyAccounts} accounts)</span>
                                </div>

                                <div className='w-full flex flex-row items-center justify-between gap-4'>
                                    <span>And Can Give You Back Rent Cost</span>
                                </div>

                                <button
                                    onClick={() => { closeEmptyAccounts() }}
                                    className="mt-8 myFreshButton text-sm break-keep font-bold flex items-center justify-center  text-white  py-[18px] px-[36px] rounded-[120px]  w-full">
                                    Gib {rentBack.toLocaleString()} SOL !
                                </button>
                            </div>
                        </motion.div>
                        :
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2, delay: 1 }}
                            className='border border-undust-green border-opacity-20 rounded-lg  max-w-2xl w-full flex flex-col items-center justify-center gap-8 p-12 backdrop-blur-xl my-10'>
                            <div className='flex flex-col items-center justify-center gap-2'>
                                {/* Add your content for step 2 here */}
                                <span className='text-undust-green text-3xl md:text-5xl'>{rentBack.toLocaleString()} <span>SOL</span> </span>
                                <span>Congrats, your wallet is now Dust Free!</span>
                                <button className="mt-8 myFreshButton text-sm break-keep font-bold  flex items-center justify-center  text-white  py-[18px] px-[36px] rounded-[120px]  w-full">
                                    Share on Twitter!
                                </button>
                            </div>
                        </motion.div>
                }
            </div>
        </div>
    )
}

export default MainComponent