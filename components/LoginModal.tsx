'use client'

import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';


function LoginModal() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [stepper, setStepper] = useState(0);

  useEffect(() => {
    const agreed = Cookies.get('agreedToTerms');
    if (!agreed) {
      setLoginModalOpen(true);
    }
  }, []);

  const handleAgree = () => {
    Cookies.set('agreedToTerms', 'true', { expires: 365 }); // Set a cookie for 1 year
    setLoginModalOpen(false);
    setTimeout(() => {
      setStepper(stepper + 1);
    }, 4000);
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
  }

  // Animation 

  const controls = useAnimation();
  const control2 = useAnimation();

  const spin = async () => {
    await controls.start({
      rotate: 360,
      transition: { duration: 1 },
    });
    await control2.start({
      rotate: -360,
      transition: { duration: 1 },
    })
    controls.set({ rotate: 0 });
    control2.set({ rotate: 0 });
    setStepper(stepper + 1);
  };

  return (
    <>
      {
        loginModalOpen ? <>
          <motion.div className='w-screen h-screen absolute z-[9999] inset-0 bg-black !bg-opacity-10 backdrop-blur-md flex items-center justify-center px-2'>
            {
              stepper === 0 ? <div className="relative w-[350px] h-[350px] object-cover lg:w-[450px] lg:h-[450px] 2xl:w-[630px] 2xl:h-[630px] ">
                <motion.img
                  transition={{ duration: 2, delay: 0.5 }}
                  src="/machine-12.webp"
                  alt="machine"
                  className={`absolute z-0   top-1/2 -translate-y-1/2 md:-translate-y-1/2 4xl:-translate-y-1/2`}
                />
                <motion.button
                  animate={controls}
                  onClick={spin}
                  onHoverStart={() => controls.start({ rotate: 90 })}
                  onHoverEnd={() => controls.start({ rotate: 0 })}
                  className={`absolute z-10 btn  brandBtn top-1/2 -translate-y-1/2 md:-translate-y-1/2 4xl:-translate-y-1/2`}
                >Spin it!</motion.button>
              </div> : stepper === 1 ? <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-lg card bg-black !bg-opacity-50 backdrop-blur-2xl rounded-md border border-undust-green border-opacity-20 shadow-undust-green shadow-sm flex items-start justify-start gap-4 p-4 md:p-8"
              >
                <h2 className='uppercase text-undust-green my-2'>Disclaimer</h2>
                <div className="">
                  <p className='text-start text-md md:text-lg mb-4'>
                    Welcome to the Undust-Me platform. Our burn tool is designed for the irreversible destruction of your selected tokens. Please be aware of the following:
                  </p>
                  <ul className='list-disc list-inside text-left text-sm md:text-base space-y-2 py-2'>
                    <li>Your use of this site signifies your acceptance of the risks involved.</li>
                    <li>Undust-Me cannot be held accountable for any tokens destroyed through its use.</li>
                    <li>By engaging with our platform, you willingly assume all responsibility for any and all token destruction.</li>
                    <li>Undust-Me disclaims liability for any errors, accidents, misunderstandings, or any other actions resulting in unintended token destruction.</li>
                  </ul>
                </div>

                <div className="flex flex-row items-center justify-center gap-2 text-undust-green py-2" >
                  <input type="checkbox" name="Agree" id="Agree" className='myCheckbox' onChange={handleCheckboxChange} />
                  <label htmlFor="Agree">I agree to the terms and conditions</label>
                </div>

                <button onClick={handleAgree} className='brandBtn w-full' disabled={!isChecked}>Agree & Close</button>
              </motion.div> : null
            }
          </motion.div>
        </> : null
      }
    </>
  )
}

export default LoginModal