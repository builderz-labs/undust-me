import BreadCrumbs from '../../components/BreadCrumbs';
import LoginModal from '../../components/LoginModal';
import ToolsGrid from '../../components/ToolsGrid';
import Tour from '../../components/Tour';


const Index: React.FC = async () => {

  return (
    <>
      <BreadCrumbs pages={[{ name: 'Token Burn', href: '/token-burn', current: true }]} />
      <div className='relative w-full h-full'>
        <div className='w-full h-full flex flex-col justify-start items-center mt-4'>

        </div>
      </div>
    </>
  );
};

export default Index;