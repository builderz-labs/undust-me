import BreadCrumbs from '../components/BreadCrumbs';
import LoginModal from '../components/LoginModal';

const Index: React.FC = async () => {

  return (
    <>
      <LoginModal />
      <BreadCrumbs pages={[{ name: 'Home', href: '/', current: true }]} />
      <div className='relative w-full h-full'>
        <div className='w-full h-full flex justify-center items-center '>

        </div>
      </div>
    </>


  );
};

export default Index;
