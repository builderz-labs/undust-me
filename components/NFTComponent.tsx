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
import { DAS } from "helius-sdk";
import { toast } from "sonner";
import { Spin } from "antd";

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
            data.result.items.filter(
              (nft: DAS.GetAssetResponse) =>
                nft.compression?.compressed === false
            )
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
    umi.programs.add(createSplAssociatedTokenProgram());
    umi.programs.add(createSplTokenProgram());

    setButtonLoading(true);

    try {
      let tx = transactionBuilder();

      for (const nft of selectedNfts) {        

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
    } catch (error) {
      console.log(error);
      setButtonLoading(false);
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
      <div className="w-full flex flex-col items-center justify-center gap-4 container mx-auto mt-40 px-4">
        {wallet.publicKey ? (
          <>
            {loading ? (
              <CircularProgress /> // Show progress bar when loading
            ) : (
              <div className="w-full">
                <h2>Your NFTs</h2>
                {selectedNfts.length > 0 && (
                  <>
                    <div className="w-full max-w-md mx-auto flex items-center justify-center p-4 px-8 rounded-lg bg-red-500 -bg-opacity-80 backdrop-blur-xl fixed top-20 z-50 left-1/2 -translate-x-1/2">
                      <span>Selected NFTs are marked to get burned!</span>
                    </div>
                  </>
                )}
                <div className="w-full">
                  <NFTItems
                    nfts={nfts}
                    handleSelectNft={handleSelectNft}
                    selectedNfts={selectedNfts}
                  />
                </div>
                {selectedNfts.length > 0 && (
                  <>
                    <div className="w-full max-w-md flex flex-col items-center justify-center p-4 px-8 rounded-lg bg-black bg-opacity-80  border border-undust-green border-opacity-20 backdrop-blur-xl fixed bottom-8 z-50 left-1/2 -translate-x-1/2">
                      <div className="w-full flex flex-col items-center justify-start gap-2">
                        <span className="text-red-500 text-xl">
                          You are about to burn {selectedNfts.length} NFTs
                        </span>
                        <div className="flex flex-row items-center justify-center gap-2">
                          <input
                            type="checkbox"
                            name="confirm"
                            id=""
                            onChange={(e) =>
                              setIsCheckboxChecked(e.target.checked)
                            } // Update checkbox status when it changes
                          />
                          <span className="text-white text-[10px]">
                            I understand that this action is irreversible
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handleBurn}
                        className="tooltip myFreshButton text-sm break-keep font-bold  flex items-center justify-center  text-white p-4 rounded-[120px] mt-8 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!isCheckboxChecked} // Disable button when checkbox is not checked
                      >
                        {buttonLoading && <Spin />} Burn selected (
                        {selectedNfts.length}) NFTs
                      </button>
                    </div>
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
