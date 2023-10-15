import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import MyMultiButton from "./MyMultiButton";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  AccountInfo,
  Connection,
  ParsedAccountData,
  PublicKey,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { closeToken } from "@metaplex-foundation/mpl-toolbox";
import { TransactionBuilder, publicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { Spin } from "antd";
import MyMultiButton2 from "./MyMultiButton2";
import { toast } from "sonner";
import Image from "next/image";

function MainComponent({
  loading,
  setLoading,
  setShowConfetti,
  activeIndex,
  setActiveIndex,
  setIsSwapModalOpen,
  rentBack,
  setRentBack,
}: {
  loading: boolean;
  setLoading: any;
  showConfetti: boolean;
  setShowConfetti: any;
  activeIndex: number;
  setActiveIndex: any;
  setIsSwapModalOpen: any;
  rentBack: number;
  setRentBack: any;
}) {
  const wallet = useWallet();
  const [emptyAccounts, setEmptyAccounts] = useState(0);
  type AccountType = {
    pubkey: PublicKey;
    account: AccountInfo<ParsedAccountData>;
  };
  const [dustScore, dustMessage] = calculateDustScore(emptyAccounts);
  const [memeImage, setMemeImage] = useState("");
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
    <>
      {/* {activeIndex === 0 && <img src="/machine-12.webp" alt="machine" className='w-[250px] h-[250px] md:w-[50px] md:h-[850px] object-cover mx-auto -mt-24 -mb-8' />} */}
      <div
        className={`relative z-10 w-full mb-[240px] ${activeIndex === 1 ? "mt-0 " : ""
          }`}
      >
        <div className="w-full px-4 ">
          {activeIndex === 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2.5 }}
                className=" border-undust-green border-opacity-20 rounded-lg  max-w-2xl mx-auto w-full flex flex-col items-center justify-center gap-8 p-2 md:p-12 my-2 md:my-10  "
              >
                {wallet.connected ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2, delay: 3.5 }}
                      className="mt-14  w-full flex items-center justify-center max-w-md p-4"
                      style={rotateStyle}
                      onClick={() => setRotate(!rotate)}
                    >
                      {" "}
                      <MyMultiButton2 />
                    </motion.div>
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
                className="border border-undust-green mx-auto border-opacity-20 rounded-lg min-h-[250px] max-w-2xl w-full flex flex-col items-start md:items-center justify-center gap-8 p-6 md:p-12 mt-8 bg-black bg-opacity-60 backdrop-blur-xl "
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mx-auto">
                  <div className="w-full flex flex-col items-center justify-between gap-4">
                    <span className="text-undust-green text-3xl md:text-5xl font-bold">
                      {rentBack.toLocaleString()} <span>SOL</span>{" "}
                    </span>
                    <span className="-mt-4 uppercase text-sm">
                      ({emptyAccounts} accounts)
                    </span>
                    <span className="text-undust-green text-lg">
                      {dustMessage}
                    </span>
                    <span className="uppercase text-lg">
                      Dust Score: {dustScore}/10
                    </span>
                  </div>
                  <Image
                    src={memeImage}
                    alt=""
                    width={300}
                    height={250}
                    className="object-cover w-full h-full md:w-1/2 md:h-1/2 rounded-sm"
                  />
                </div>
              </motion.div>
              <div className="w-full flex flex-row items-center justify-center gap-2 max-w-md mx-auto">
                <button
                  onClick={() => {
                    setActiveIndex(0);
                  }}
                  data-tip="Go back to the start"
                  className="mt-8 tooltip myFreshButton text-sm break-keep font-bold  flex items-center justify-center  text-white p-4 rounded-[120px]  w-16"
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
                      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    if (emptyAccounts === 0) {
                      let tweetText = "";
                      if (emptyAccounts === 0) {
                        tweetText =
                          "I just scored a perfect 10/10 on my wallet. How clean is your wallet? Find out and earn SOL by using Undust.me - #cleanAf #solana";
                      } else {
                        tweetText =
                          "I just cleaned my wallet with UnDust.me and recovered " +
                          rentBack.toLocaleString() +
                          " SOL! My score is " +
                          dustScore +
                          "/10. Can you beat me? Undust.me - #cleanAf #solana";

                      }
                      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        tweetText
                      )}`;
                      window.open(url, "_blank");
                    } else {
                      closeEmptyAccounts();
                    }
                  }}
                  disabled={loading}
                  className="mt-8 myFreshButton text-sm break-keep font-bold flex items-center justify-center disabled:!bg-opacity-40 disabled:cursor-not-allowed hover:border hover:border-undust-green text-white  py-[18px] px-[36px] rounded-[120px]  w-full"
                >
                  {loading && <Spin />}{" "}
                  {emptyAccounts === 0
                    ? "Share on Twitter!"
                    : "Close Empty Accounts"}
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-center items-start md:items-center mt-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className="border border-undust-green border-opacity-20 rounded-lg  max-w-2xl mx-auto w-full flex flex-col items-start md:items-center justify-center gap-8 p-12 backdrop-blur-xl my-10"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  {/* Add your content for step 2 here */}
                  <span className="text-undust-green text-3xl md:text-5xl">
                    {rentBack.toLocaleString()} <span>SOL</span>{" "}
                  </span>
                  <span>Oh boy, you made it. Your wallet is dust free 🧼</span>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setActiveIndex(0);
                      }}
                      data-tip="Go back to the start"
                      className="mt-8 tooltip myFreshButton text-sm break-keep font-bold  flex items-center justify-center  text-white p-4 rounded-[120px]  w-16"
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
                          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                        />
                      </svg>
                    </button>
                    <button
                      className="mt-8 myFreshButton text-sm break-keep font-bold  flex items-center justify-center  text-white  py-[18px] px-[36px] rounded-[120px]  w-full"
                      onClick={() => {
                        let tweetText = "";
                        if (emptyAccounts === 0) {
                          tweetText =
                            "I just scored a perfect 10/10 on my wallet. How clean is your wallet? Find out and earn SOL by using Undust.me - #cleanAf #solana ";
                        } else {
                          tweetText =
                            "I just cleaned my wallet with Undust.me and recovered " +
                            rentBack.toLocaleString() +
                            " SOL! My score is " +
                            dustScore +
                            "/10. Can you beat me? Undust.me - #cleanAf #solana";
                        }
                        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          tweetText
                        )}`;
                        window.open(url, "_blank");
                      }}
                    >
                      Share on Twitter!
                    </button>
                    <button
                      onClick={() => {
                        setIsSwapModalOpen((prev: any) => !prev);
                      }}
                      data-tip={"Swap SOL to mSOL and help the environment"}
                      className="mt-8 tooltip myFreshButton text-sm break-keep font-bold  flex items-center justify-center  text-white p-4 rounded-[120px]  w-16"
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
                          d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MainComponent;
