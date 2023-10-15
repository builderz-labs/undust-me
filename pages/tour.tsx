import { NextPage } from 'next'
import Stepper from '../components/Tour'

const Tour: NextPage = () => {

    return (
        <div className='mt-40'>
            <h1 className='text-undust-green'>Wallet Cleaner Tour</h1>
            <Stepper />
        </div>
    )
}

export default Tour