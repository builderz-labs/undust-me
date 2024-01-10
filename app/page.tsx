const Index: React.FC = async () => {

  return (
    <div className='relative w-full h-full'>
      <div className='bgBlurReq z-0 pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2' />

      <div className='w-full h-full flex justify-center items-center '>
        {/* <MainComponent loading={loading} setLoading={setLoading} showConfetti={showConfetti} setShowConfetti={setShowConfetti} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setIsSwapModalOpen={setIsSwapModalOpen} rentBack={rentBack} setRentBack={setRentBack} /> */}

        <div className='bgBlurReq z-0 pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2' />
        {/* 
          <div onClick={() => { }} className="fixed right-8 top-1/2 translate-y-1/2 p-4 py-12 bg-green-500 text-black font-bold">
            Staking
          </div> */}

        {/* x */}
        <div id="circle" className='text-undust-green blur-sm absolute' style={{ position: 'absolute', zIndex: 1, width: '10px', height: '10px', borderRadius: '50%', pointerEvents: 'none', transition: '0.2s' }}></div>
      </div>
    </div>
    // <SunriseModal
    //   isSwapModalOpen={isSwapModalOpen}
    //   setIsSwapModalOpen={setIsSwapModalOpen}
    //   rentBack={rentBack}
    //   setShowConfetti={setShowConfetti}
    //   showConfetti={showConfetti}
    // />




  );
};

export default Index;
