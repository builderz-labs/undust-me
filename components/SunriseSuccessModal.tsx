import React from 'react'

interface ISunriseDepositProps {
    setShowConfetti: (value: boolean) => void;
    amount: number;
    setAmount: (value: number) => void; // Add this line
    setSunriseSuccessModalOpen: (value: boolean) => void;
}

const SunriseSuccessModal: React.FC<ISunriseDepositProps> = ({ setSunriseSuccessModalOpen }) => {
    return (
        <>
            {sunriseSuccessModalOpen && <>
                Sunrise
            </>}
        </>
    )
}

export default SunriseSuccessModal