import { CircularProgress } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useState, useEffect } from 'react'

interface NFT {
    id: string;
    image: string;
    name: string;
    collection: string;
    // Add other properties as needed
}

function NFTComponent() {
    const wallet = useWallet();
    const [nfts, setNfts] = useState<NFT[]>([]); // State to hold NFTs
    const [loading, setLoading] = useState(false); // State to hold loading status

    useEffect(() => {
        setLoading(true); // Set loading to true when starting fetch
        fetchNFTs();
    }, []);

    const fetchNFTs = async () => {
        // Fetch NFTs from Solana
        const res = await fetch('https://api.devnet.solana.com/'); // Replace with your API endpoint
        const data = await res.json();


        setNfts(data);
        setLoading(false); // Set loading to false when fetch is complete
    }

    return (
        <div className='w-full flex flex-col items-center justify-center gap-4 container mx-auto mt-40 px-4'>
            {loading ? (
                <CircularProgress /> // Show progress bar when loading
            ) : (
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {nfts.map((nft) => (
                        <div key={nft.id} className="flex flex-col items-center justify-center w-full h-full border border-undust-green border-opacity-20 rounded-lg">
                            <div className="flex flex-row items-start justify-between w-full p-4 gap-8">
                                <div className="w-1/2 h-full">
                                    <img src={nft.image} alt={nft.name} className='w-full h-full object-cover' />
                                </div>
                                <div className="flex flex-col justify-start items-start w-full">
                                    <span className="text-2xl text-white">{nft.name}</span>
                                    <span className="text-sm text-undust-green">{nft.collection}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NFTComponent