import { CircularProgress } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useState, useEffect } from 'react'
import MyMultiButton from './MyMultiButton';
import NFT from '../types/NFTs';


function NFTComponent() {
    const wallet = useWallet();
    const [nfts, setNfts] = useState<NFT[]>([]); // State to hold NFTs
    const [loading, setLoading] = useState(false); // State to hold loading status


    useEffect(() => {
        if (wallet.connected) {
            setLoading(true);
            const url = process.env.NEXT_PUBLIC_HELIUS_URL || 'default_url';
            const body = {
                jsonrpc: '2.0',
                id: 'my-id',
                method: 'getAssetsByOwner',
                params: {
                    ownerAddress: wallet.publicKey?.toBase58(),
                    page: 1,
                    limit: 1000
                },
            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then(response => response.json())
                .then(data => {
                    setNfts(data.result.items);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setLoading(false);
                });
        }
    }, [wallet.connected]);

    console.log(nfts)
    return (
        <>
            <div className='w-full flex flex-col items-center justify-center gap-4 container mx-auto mt-40 px-4'>
                {wallet.publicKey ? <>
                    {
                        loading ? (
                            <CircularProgress /> // Show progress bar when loading
                        ) : (
                            <div className="w-full">
                                <h2>Your NFTs</h2>
                                <div className="w-full">
                                    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                                        {nfts.map((nft) => (
                                            <div key={nft.content.metadata.name} className="flex flex-col items-center justify-center w-full h-full border border-undust-green border-opacity-20 rounded-lg">
                                                <div className="flex flex-col items-start justify-between w-full p-4 gap-8">
                                                    <div className="w-full h-full object-cover">
                                                        <img src={nft.content.links.image} alt={nft.content.metadata.name} className='w-full h-[250px] object-cover' />
                                                    </div>
                                                    <div className="flex flex-col justify-start items-start text-left w-full gap-2">
                                                        <span className="text-xl text-white truncate w-[99%]">{nft.content.metadata.name}</span>
                                                        <span className="text-sm text-undust-green"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                </>
                    :
                    <MyMultiButton />}
            </div>
        </>
    )
}

export default NFTComponent