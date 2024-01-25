import React, { Suspense } from 'react';
import NFTComponent from '../../components/NFTComponent';
import BreadCrumbs from '../../components/BreadCrumbs';

const Index: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BreadCrumbs pages={[{ name: 'NFT Burn Tool', href: '/nfts', current: true }]} />
      <NFTComponent />
    </Suspense>
  );
}

export default Index;