import BreadCrumbs from '../../components/BreadCrumbs';
import Tour from '../../components/Tour';
import { Suspense } from 'react';


const Index: React.FC = async () => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BreadCrumbs pages={[{ name: 'Wallet Cleaner Tour', href: '/wallet-cleaner-tour', current: true }]} />
        <div className='relative w-full h-full'>
          <div className='w-full h-full flex flex-col justify-start items-center mt-4'>
            <Tour />
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Index;