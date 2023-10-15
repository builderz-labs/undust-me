import { NextPage } from 'next'
import Stepper from '../components/Tour'

const Tour: NextPage = () => {

    return (
        <div className='pt-28 md:pt-40 relative w-full overflow-hidden h-screen'>
            <h1 className='text-undust-green'>Wallet Cleaner Tour</h1>
            <Stepper />
            <div id="circle" className='text-undust-green blur-sm absolute' style={{ position: 'absolute', zIndex: 1, width: '10px', height: '10px', borderRadius: '50%', pointerEvents: 'none', transition: '0.2s' }}></div>
            <div className='bgBlurReq z-0 pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2' />
        </div>
    )
}

export default Tour