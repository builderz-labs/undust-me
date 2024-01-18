import React, { useState } from "react";
import { DAS } from "helius-sdk";
import Image from "next/image"

function NFTStepperItems({ nfts, handleSelectNft, selectedNfts }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nfts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(nfts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-start h-[70vh] overflow-y-scroll">
        {nfts.map((nft: DAS.GetAssetResponse) => {
          const isSelected = selectedNfts.some(
            (selectedNft: { id: string }) => selectedNft.id === nft.id
          );

          return (
            <>
              <div
                onClick={() => handleSelectNft(nft, !isSelected)}
                key={nft.id}
                className={`relative flex flex-col items-center justify-center w-full h-full border border-undust-green border-opacity-20 rounded-lg ${isSelected ? "!text-red-500" : "text-white"
                  }`}
              >
                {isSelected && (
                  <div className="absolute h-[70vh] top-8 right-8 z-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-12 h-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                      />
                    </svg>
                  </div>
                )}
                <div className="flex flex-col items-start justify-between w-full p-4 gap-8">
                  <div className="w-full h-full object-cover">
                    <Image
                      src={nft.content?.files?.length && nft.content?.files[0].uri || "public/machine-1.webp"}
                      alt={nft.content?.metadata.name && nft.content?.metadata.name || "NFT Image"}
                      width={500}
                      height={500}
                      className="w-full h-[250px] object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start text-left w-full gap-2 font-bold">
                    <span
                      className={`text-xl truncate w-[99%] ${isSelected ? "text-red-500" : "text-white"
                        }`}
                    >
                      {nft.content?.metadata.name}
                    </span>
                    <span
                      className={`text-sm ${isSelected ? "text-undust-green" : "text-white"
                        }`}
                    ></span>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="pagination my-10 w-full flex items-center justify-center gap-4">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default NFTStepperItems;
