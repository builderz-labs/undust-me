const Index: React.FC = async () => {

  return (
    <div className='relative w-full h-full'>
      <div className='bgBlurReq z-0 pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2' />

      <div className='w-full h-full flex justify-center items-center '>
        PageContent
      </div>
    </div>
  );
};

export default Index;
