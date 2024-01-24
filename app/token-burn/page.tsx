import React, { Suspense } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';
import NftTokenComponent from '../../components/NftTokenComponent';

const Index: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BreadCrumbs pages={[{ name: 'Token Burn', href: '/token-burn', current: true }]} />
      <div className='relative w-full h-full'>
        <div className='w-full h-full flex flex-col justify-start items-center mt-4'>
          <NftTokenComponent />
        </div>
      </div>
    </Suspense>
  );
};

export default Index;