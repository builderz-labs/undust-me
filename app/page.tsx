import BreadCrumbs from '../components/BreadCrumbs';
import LoginModal from '../components/LoginModal';
import ToolsGrid from '../components/ToolsGrid';

const Index: React.FC = async () => {

  return (
    <>
      <LoginModal />
      <BreadCrumbs pages={[{ name: 'Home', href: '/', current: true }]} />
      <div className='relative w-full h-full'>
        <div className='w-full h-full flex flex-col justify-start items-center mt-4'>
          <h1 className={`text-undust-green`}>Welcome to Undust-me</h1>
          <p className='text-opacity-50'>
            A collection of tools to help you with your wallet management
          </p>
          <ToolsGrid />
        </div>
      </div>
    </>


  );
};

export default Index;
