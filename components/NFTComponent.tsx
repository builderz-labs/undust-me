import { CircularProgress } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useState, useEffect } from 'react'
import MyMultiButton from './MyMultiButton';
import NFT from '../types/NFTs';
import NFTItem from './NFTItems';
import NFTItems from './NFTItems';


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
                                    <NFTItems nfts={nfts} />
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