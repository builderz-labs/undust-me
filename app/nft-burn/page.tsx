import React, { Suspense } from 'react';
import NFTComponent from '../../components/NFTComponent';
import BreadCrumbs from '../../components/BreadCrumbs';

function NftBurn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BreadCrumbs pages={[{ name: 'NFT Burn Tool', href: '/nfts', current: true }]} />
      <NFTComponent />
    </Suspense>
  );
}

export default NftBurn;