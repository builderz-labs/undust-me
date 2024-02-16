'use client'
import { CircularProgress } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState, useEffect } from "react";
import MyMultiButton from "./MyMultiButton";
import NFTItems from "./NFTItems";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey, transactionBuilder } from "@metaplex-foundation/umi";
import {
  createSplAssociatedTokenProgram,
  createSplTokenProgram,
} from "@metaplex-foundation/mpl-toolbox";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  burnV1,
  findMetadataPda,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { DAS } from "helius-sdk";
import { toast } from "sonner";
import { Spin, List } from "antd";
import Draggable from 'react-draggable';
import GradientLine from './GradientLine';
import { getAssetWithProof, burn, createMplBubblegumProgram, mplBubblegum } from '@metaplex-foundation/mpl-bubblegum';
import { PublicKey } from '@solana/web3.js'; // Ensure you import PublicKey from the correct package


function NFTComponent() {
  const wallet = useWallet();
  const [nfts, setNfts] = useState<DAS.GetAssetResponse[]>([]); // State to hold NFTs
  const [loading, setLoading] = useState(false); // State to hold loading status
  const [buttonLoading, setButtonLoading] = useState(false); // State to hold button loading status
  const [selectedNfts, setSelectedNfts] = useState<DAS.GetAssetResponse[]>([]); // State to hold selected NFTs
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // State to hold checkbox status

  useEffect(() => {
    if (wallet.connected) {
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_HELIUS_URL || "default_url";
      const body = {
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAssetsByOwner",
        params: {
          ownerAddress: wallet.publicKey?.toBase58(),
          page: 1,
          limit: 1000,
        },
      };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          setNfts(
            data.result.items // No need to filter by compression status
          );
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  }, [wallet.connected]);


  const handleBurn = async () => {
    const umi = createUmi(process.env.NEXT_PUBLIC_HELIUS_URL!);
    umi.use(walletAdapterIdentity(wallet));
    umi.use(mplBubblegum());
    umi.programs.add(createSplAssociatedTokenProgram());
    umi.programs.add(createSplTokenProgram());
    umi.programs.add(createMplBubblegumProgram())

    setButtonLoading(true);



    try {
      let tx = transactionBuilder();

      for (const nft of selectedNfts) {

        if (nft.compression?.compressed) {
          // Convert string ID to PublicKey
          const assetPublicKey = publicKey(nft.id);
          // Fetch the asset with its proof
          const assetWithProof = await getAssetWithProof(umi, assetPublicKey);
          // Burn the cNFT
          tx = tx.add(
            burn(umi, {
              ...assetWithProof,
              leafOwner: umi.identity.publicKey,
            })
          );
        } else {
          let collectionMetadata = null;
          const collection = nft.grouping?.length && nft.grouping[0].group_value;

          if (collection) {
            collectionMetadata = findMetadataPda(umi, { mint: publicKey(collection) })
          }

          const tokenStandard =
            nft.interface === "ProgrammableNFT"
              ? TokenStandard.ProgrammableNonFungible
              : TokenStandard.NonFungible;

          tx = tx.add(
            burnV1(umi, {
              mint: publicKey(nft.id),
              tokenStandard,
              tokenOwner: umi.identity.publicKey,
              collectionMetadata: collectionMetadata || undefined,
            })
          );
        }

        const splitBuilders = tx.unsafeSplitByTransactionSize(umi);
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

        toast.success("NFTs burned successfully");
        setButtonLoading(false);

      }


    } catch (error) {
      console.log(error);
      setButtonLoading(false);
      toast.error("Error burning cNFT - too large to burn in one transaction. Please try burning fewer cNFTs at once.")
    }
  };

  const handleSelectNft = (nft: DAS.GetAssetResponse, isSelected: boolean) => {
    if (isSelected) {
      setSelectedNfts((prev) => [...prev, nft]);
    } else {
      setSelectedNfts((prev) =>
        prev.filter(
          (item) => item.content?.metadata.name !== nft.content?.metadata.name
        )
      );
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-4 container mx-auto mt-4 px-4">

        <div className="flex items-center justify-between w-full">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-100 sm:truncate sm:text-3xl sm:tracking-tight">
              Burn NFTs
            </h2>
            <p className='opacity-30 pb-10'>
              Burn your unwanted NFTs. You can burn multiple NFTs at once.
            </p>
            <div className="w-full overflow-hidden"><GradientLine /></div>
          </div>

        </div>

        {wallet.publicKey ? (
          <>
            {loading ? (
              <CircularProgress /> // Show progress bar when loading
            ) : (
              <div className="w-full">
                {/* {selectedNfts.length > 0 && (
                  <>
                    <div className="w-full max-w-md mx-auto flex items-center justify-center p-4 px-8 rounded-lg bg-red-500 -bg-opacity-80 backdrop-blur-xl fixed top-20 z-50 left-1/2 -translate-x-1/2">
                      <span>Selected NFTs are marked to get burned!</span>
                    </div>
                  </>
                )} */}
                <div className="w-full">
                  <NFTItems
                    nfts={nfts}
                    handleSelectNft={handleSelectNft}
                    selectedNfts={selectedNfts}
                  />
                </div>
                {selectedNfts.length > 0 && (
                  <>
                    <Draggable>
                      <div className="w-full shadow-xl cursor-move max-w-md flex flex-col items-center justify-center p-4 px-8 rounded-lg bg-black bg-opacity-80  border border-red-900 border-opacity-50 backdrop-blur-xl fixed bottom-8 z-50 left-1/2 -translate-x-1/2">
                        <div className="w-full flex flex-col items-center justify-start gap-4">
                          <span className="text-red-500 text-md md:text-xl uppercase animate-pulse">
                            You are about to burn ({selectedNfts.length}) Tokens!
                          </span>

                          <div className='w-full flex flex-col items-center justify-between gap-2 px-2'>
                            <ul className='w-full h-[100px] overflow-y-scroll bg-red-900 bg-opacity-10 border border-red-500 border-opacity-10 py-2 flex flex-col items-center justify-start gap-2'>
                              {selectedNfts.map((nft) => (
                                <li
                                  onClick={() => handleSelectNft(nft, false)}
                                  key={nft.id} className='w-full flex items-center justify-start gap-4 hover:bg-red-900 hover:bg-opacity-10 hover:cursor-not-allowed px-4'>
                                  <div className="border border-red-900 rounded-sm">
                                    <img src={nft.content?.links?.image} alt={nft.content?.metadata.name} width={50} height={50} className='rounded-sm' />
                                  </div>
                                  <span className="text-white text-base uppercase text-start truncate">
                                    {nft.content?.metadata.name} ({nft.content?.metadata.symbol})
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-row items-center justify-center gap-2 pt-2">
                            <input
                              type="checkbox"
                              name="confirm"
                              id=""
                              onChange={(e) =>
                                setIsCheckboxChecked(e.target.checked)
                              } // Update checkbox status when it changes
                            />
                            <span className="text-white text-[10px] uppercase">
                              I understand that this action is irreversible
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={handleBurn}
                          className="brandBtnRed !bg-red-300 my-4 w-full uppercase"
                          disabled={!isCheckboxChecked} // Disable button when checkbox is not checked
                        >
                          {buttonLoading && <Spin />} Burn selected (
                          {selectedNfts.length}) Tokens
                        </button>
                      </div>
                    </Draggable>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <MyMultiButton />
        )}
      </div>
    </>
  );
}

export default NFTComponent;
