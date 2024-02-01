'use client'
import React, { useEffect, useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { Card, Col, Row, Spin } from 'antd';
import MyMultiButton from './MyMultiButton';
import GradientLine from './GradientLine';
import Image from 'next/image';
import Draggable from 'react-draggable';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { createSplAssociatedTokenProgram, createSplTokenProgram } from '@metaplex-foundation/mpl-toolbox';
import { publicKey, transactionBuilder } from '@metaplex-foundation/umi';
import { burnV1, findMetadataPda } from '@metaplex-foundation/mpl-token-metadata';
import { toast } from 'sonner';
import { TokenStandard } from 'helius-sdk';

interface Token {
  id: string;
  interface: string;
  content: {
    metadata: {
      name: string;
      image: string;
    };
    links: {
      image: string;
    }
  };
  token_info: {
    supply: number;
    decimals: number;
  }
}

function NftTokenComponent() {
  const wallet = useWallet();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState<Token[]>([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // State to hold checkbox status
  const [buttonLoading, setButtonLoading] = useState(false); // State to hold button loading status

  useEffect(() => {
    if (wallet.connected) {
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_HELIUS_URL || "default_url";
      const body = {
        jsonrpc: "2.0",
        id: "my-id",
        method: "searchAssets",
        params: {
          ownerAddress: wallet.publicKey?.toBase58(),
          tokenType: "all"
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
          const filteredTokens = data.result.items.filter((token: Token) => token.interface === 'FungibleToken');
          setTokens(filteredTokens);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  }, [wallet.connected]);

  console.log(tokens)


  // const handleBurn = async () => {
  //   const umi = createUmi(process.env.NEXT_PUBLIC_HELIUS_URL!);
  //   umi.use(walletAdapterIdentity(wallet));
  //   umi.programs.add(createSplAssociatedTokenProgram());
  //   umi.programs.add(createSplTokenProgram());

  //   setButtonLoading(true);

  //   try {
  //     let tx = transactionBuilder();

  //     for (const token of selectedTokens) {
  //       const tokenStandard =
  //         token.interface === "FungibleToken"
  //           ? TokenStandard.FUNGIBLE
  //           : TokenStandard.NON_FUNGIBLE;

  //       tx = tx.add(
  //         burnV1(umi, {
  //           mint: publicKey(token.id),
  //           tokenStandard,
  //           tokenOwner: umi.identity.publicKey,
  //         })
  //       );
  //     }

  //     const splitBuilders = tx.unsafeSplitByTransactionSize(umi);
  //     let txs = await Promise.all(
  //       splitBuilders.map((builder) => builder.buildWithLatestBlockhash(umi))
  //     );
  //     txs = await umi.identity.signAllTransactions(txs);

  //     const res = await Promise.all(
  //       txs.map((tx) => umi.rpc.sendTransaction(tx))
  //     );

  //     const blockhash = await umi.rpc.getLatestBlockhash();

  //     await Promise.all(
  //       res.map((res) =>
  //         umi.rpc.confirmTransaction(res, {
  //           strategy: {
  //             type: "blockhash",
  //             blockhash: blockhash.blockhash,
  //             lastValidBlockHeight: blockhash.lastValidBlockHeight,
  //           },
  //           commitment: "confirmed",
  //         })
  //       )
  //     );
  //     toast.success("Tokens burned successfully");
  //     setButtonLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setButtonLoading(false);
  //     toast.error("Something went wrong")
  //   }
  // };

  return (
    <>
      {selectedTokens.length > 0 && (
        <>
          <Draggable>
            <div className="w-full shadow-xl cursor-move max-w-md flex flex-col items-center justify-center p-4 px-8 rounded-lg bg-black bg-opacity-80  border border-red-900 border-opacity-50 backdrop-blur-xl fixed bottom-8 z-50 left-1/2 -translate-x-1/2">
              <div className="w-full flex flex-col items-center justify-start gap-2">
                <span className="text-red-500 text-xl uppercase">
                  You are about to burn ({selectedTokens.length}) NFTs!
                </span>

                <div className='w-full flex flex-col items-center justify-between gap-2'>
                  <ul className='w-full h-[100px] overflow-y-scroll bg-red-900 bg-opacity-10 py-2 flex flex-col items-center justify-start gap-2'>
                    {selectedTokens.map((nft) => (
                      <li
                        //  onClick={() => handleBurn(nft, false)} 
                        key={nft.id} className='w-full flex items-center justify-start gap-4 hover:bg-red-900 hover:bg-opacity-10 hover:cursor-not-allowed'>
                        <div className="">
                          <img src={nft.content?.links?.image} alt={nft.content?.metadata.name} width={50} height={50} className='rounded-sm' />
                        </div>
                        <span className="text-white text-[10px] uppercase text-start truncate">
                          {nft.content?.metadata.name}
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
                // onClick={handleBurn}
                className="brandBtnRed !bg-red-300 my-4 w-full uppercase"
                disabled={!isCheckboxChecked} // Disable button when checkbox is not checked
              >
                {buttonLoading && <Spin />} Burn selected (
                {selectedTokens.length}) NFTs
              </button>
            </div>
          </Draggable>
        </>
      )}
      <div className="flex items-center justify-between w-full">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-100 sm:truncate sm:text-3xl sm:tracking-tight">
            Token Burn
          </h2>
          <p className='opacity-30 pb-10'>
            Burn your unwanted Tokens. You can burn multiple Tokens at once.
          </p>
          <div className="w-full overflow-hidden">
            <GradientLine />
          </div>
        </div>
      </div>
      {
        wallet.connected ? <>
          {loading ? (
            <div className="w-full flex items-center justify-center h-[20vh]">
              <Spin />
            </div>
          ) : (
            <Row gutter={8}
              className='overflow-y-scroll h-[76vh] mt-4 w-full '
            >
              {tokens.map(token => (
                <Col span={4}
                  className='w-full'
                  key={token.content.metadata.name}
                >
                  <Card
                    onClick={() => {
                      setSelectedTokens(prevTokens =>
                        prevTokens.includes(token) ? prevTokens.filter(t => t !== token) : [...prevTokens, token]
                      );
                    }}
                    style={{
                      border: selectedTokens.includes(token) ? '1px solid red' : 'none'
                    }}
                    className='cursor-pointer !bg-transparent !text-white hover:bg-red-500 bg-opacity-10 bg-black border border-undust-green border-opacity-20 flex flex-row items-center justify-start '
                  >
                    <Card.Meta
                      className='w-full'
                      // title={token.content.metadata.name}
                      description={
                        <>
                          <div className="w-full mx-auto h-40 flex flex-col items-center justify-center">
                            <img src={token.content.links.image} alt={token.content.metadata.name} height={100} width={100} className='w-full h-full object-cover' />
                          </div>
                          <div className="w-full bg-slate-900 p-1">
                            <p className='w-[90%] overflow-hidden'>{token.content.metadata.name}</p>
                            <p className='text-xs'>{new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(token.token_info.supply / Math.pow(10, token.token_info.decimals))}</p>
                          </div>
                        </>
                      }
                    />

                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </> : <>
          <MyMultiButton />
        </>
      }
    </>
  );
}

export default NftTokenComponent;