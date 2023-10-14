import React from 'react'
import NFT from '../types/NFTs'

function NFTItems({ nfts }: any) {
    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {nfts.map((nft: NFT) => (
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
    )
}

export default NFTItems