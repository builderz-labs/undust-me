import { motion } from 'framer-motion';
import BreadCrumbs from '../../components/BreadCrumbs';
import LoginModal from '../../components/LoginModal';
import Tour from '../../components/Tour';


const Index: React.FC = async () => {

  return (
    <>
      <BreadCrumbs pages={[{ name: 'Wallet Cleaner Tour', href: '/wallet-cleaner-tour', current: true }]} />
      <div className='relative w-full h-full'>
        <div className='w-full h-full flex flex-col justify-start items-center mt-4'>
          <Tour />
        </div>
        <div className="my-4 w-full flex items-center justify-center">
          <div className="w-10 h-10">
            <motion.img
              transition={{ duration: 2, delay: 0.5 }}
              src="/machine-12.webp"
              alt="machine"
              className={`w-full h-full`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;