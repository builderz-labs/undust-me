import { NextPage } from 'next'
import Stepper from '../components/Tour'
import Footer from '../components/Footer'
import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import MyMultiButton2 from '../components/MyMultiButton2';

const Tour: NextPage = () => {
    const [loading, setLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const wallet = useWallet();
    const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
    const [rentBack, setRentBack] = useState(3);

    useEffect(() => {
        const circle = document.getElementById('circle');
        document.addEventListener('mousemove', (e) => {
            if (circle) {
                circle.style.left = e.pageX + 'px';
                circle.style.top = e.pageY + 'px';
            }
        });
    }, []);


    return (
        <>
            {showConfetti && <Confetti />}

            <div className='pt-28 md:pt-40 relative w-full  h-full'>
                <h1 className='text-undust-green'>Wallet Cleaner Tour</h1>
                {wallet.connected ? <Stepper /> : <MyMultiButton2 />}
                <div id="circle" className='text-undust-green blur-sm absolute' style={{ position: 'absolute', zIndex: 1, width: '10px', height: '10px', borderRadius: '50%', pointerEvents: 'none', transition: '0.2s' }}></div>
                <div className='bgBlurReq z-0 pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2' />
                <div className={`${wallet.connected ? "relative" : "fixed"} bottom-0 w-full`}>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Tour