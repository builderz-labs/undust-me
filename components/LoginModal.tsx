'use client'

import { motion } from 'framer-motion';
import React, { useState } from 'react'

function LoginModal() {
  const [loginModalOpen, setLoginModalOpen] = useState(true);
  const [isChecked, setIsChecked] = useState(false); // New state for checkbox

  const handleAgree = () => {
    setLoginModalOpen(false)
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
  }

  return (
    <>
      {
        loginModalOpen ? <>
          <motion.div className='w-screen h-screen absolute z-[9999] inset-0 bg-black bg-opacity-10 backdrop-blur-md flex items-center justify-center'>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full container card bg-black bg-opacity-80 backdrop-blur-xl rounded-md border border-undust-green border-opacity-20 shadow-undust-green shadow-sm p-4 flex items-start justify-start gap-4 px-8"
            >
              <h2 className='uppercase text-undust-green'>Disclaimer</h2>
              <div className="">
                <p className='text-start text-lg mb-4'>
                  Welcome to the Undust-Me platform. Our burn tool is designed for the irreversible destruction of your selected tokens. Please be aware of the following:
                </p>
                <ul className='list-disc list-inside text-left text-base space-y-2 py-2'>
                  <li>Your use of this site signifies your acceptance of the risks involved.</li>
                  <li>Undust-Me cannot be held accountable for any tokens destroyed through its use.</li>
                  <li>By engaging with our platform, you willingly assume all responsibility for any and all token destruction.</li>
                  <li>Undust-Me disclaims liability for any errors, accidents, misunderstandings, or any other actions resulting in unintended token destruction.</li>
                </ul>
              </div>

              <div className="flex flex-row items-center justify-center gap-2">
                <input type="checkbox" name="Agree" id="Agree" onChange={handleCheckboxChange} />
                <label htmlFor="Agree">I agree to the terms and conditions</label>
              </div>

              <button onClick={handleAgree} className='brandBtn' disabled={!isChecked}>Agree & Close</button>
            </motion.div>
          </motion.div>
        </> : null
      }
    </>
  )
}

export default LoginModal