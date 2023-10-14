import { CircularProgress } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useState, useEffect } from 'react'
import MyMultiButton from './MyMultiButton';
import NFT from '../types/NFTs';
import NFTItems from './NFTItems';


function NFTComponent() {
	const wallet = useWallet();
	const [nfts, setNfts] = useState<NFT[]>([]); // State to hold NFTs
	const [loading, setLoading] = useState(false); // State to hold loading status
	const [selectedNfts, setSelectedNfts] = useState<NFT[]>([]); // State to hold selected NFTs
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // State to hold checkbox status

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

	// console.log(nfts)


	const handleSelectNft = (nft: NFT, isSelected: boolean) => {
		if (isSelected) {
			setSelectedNfts(prev => [...prev, nft]);
		} else {
			setSelectedNfts(prev => prev.filter(item => item.content.metadata.name !== nft.content.metadata.name));
		}
	};

	console.log(selectedNfts)


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
								{selectedNfts.length > 0 && <>
									<div className="w-full max-w-md mx-auto flex items-center justify-center p-4 px-8 rounded-lg bg-red-500 -bg-opacity-80 backdrop-blur-xl fixed top-20 z-50 left-1/2 -translate-x-1/2">
										<span>Selected NFTs are marked to get burned!</span>
									</div>
								</>}
								<div className="w-full">
									<NFTItems nfts={nfts} handleSelectNft={handleSelectNft} selectedNfts={selectedNfts} />
								</div>
								{selectedNfts.length > 0 && <>
									<div className="w-full max-w-md flex flex-col items-center justify-center p-4 px-8 rounded-lg bg-black bg-opacity-80  border border-undust-green border-opacity-20 backdrop-blur-xl fixed bottom-8 z-50 left-1/2 -translate-x-1/2">
										<div className="w-full flex flex-col items-center justify-start gap-2">
											<span className="text-red-500 text-xl">You are about to burn {selectedNfts.length} NFTs</span>
											<div className="flex flex-row items-center justify-center gap-2">
												<input
													type="checkbox"
													name="confirm"
													id=""
													onChange={(e) => setIsCheckboxChecked(e.target.checked)} // Update checkbox status when it changes
												/>
												<span className="text-white text-[10px]">I understand that this action is irreversible</span>
											</div>
										</div>
										<button
											onClick={() => { }}
											className="tooltip myFreshButton text-sm break-keep font-bold  flex items-center justify-center  text-white p-4 rounded-[120px] mt-8 w-full disabled:opacity-50 disabled:cursor-not-allowed"
											disabled={!isCheckboxChecked} // Disable button when checkbox is not checked
										>
											Burn selected ({selectedNfts.length}) NFTs
										</button>
									</div>
								</>}
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