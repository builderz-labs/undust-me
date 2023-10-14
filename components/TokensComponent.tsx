
import { CircularProgress } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react'
import TokenItems from './TokenItems';

function TokensComponent() {
    const wallet = useWallet();
    const [tokens, setTokens] = useState([]); // State to hold tokens
    const [loading, setLoading] = useState(false); // State to hold loading status

    useEffect(() => {
        if (wallet.connected) {
            setLoading(true);
            const url = process.env.NEXT_PUBLIC_HELIUS_URL || 'default_url';
            const body = {
                jsonrpc: '2.0',
                id: 'my-id',
                method: 'getTokensByOwner', // Replace with the correct method
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
                    console.log(data);
                    if (data.result) {
                        setTokens(data.result.items);
                    } else {
                        // Handle the case where data.result is undefined
                        // For example, set an error state or provide a default value for tokens
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setLoading(false);
                });
        }
    }, [wallet.connected]);

    return (
        <div className='w-full flex flex-col items-center justify-center gap-4 container mx-auto mt-40 px-4'>
            <h2>Your Tokens</h2>
            {loading ? (
                <CircularProgress /> // Show progress bar when loading
            ) : (
                <div className="w-full">
                    <TokenItems tokens={tokens} />
                </div>
            )}
        </div>
    )
}

export default TokensComponent