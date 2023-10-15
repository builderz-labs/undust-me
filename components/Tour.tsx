import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import { motion } from 'framer-motion';
import MainComponent from './MainComponent';
import Stepper1 from './Stepper/Stepper1';

const steps = [
    {
        title: 'Close Empty Accounts',
        content: <Stepper1 />,
    },
    {
        title: 'Burn NFTs',
        content: 'Second-content',
    },
    {
        title: 'Burn Tokens',
        content: 'Last-content',
    },
];

const Stepper: React.FC = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        // lineHeight: '260px',
        textAlign: 'start',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        // border: `1px dashed `,
        marginTop: 16,
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='w-full !text-undust-green container mx-auto' >
            <div className="px-6 mt-10 md:mt-20">
                <div className="scale-75 -mt-8 -mb-4 -ml-12 md:scale-100 md:mt-0 md:mb-0 md:ml-0">
                    <Steps current={current} items={items} className='!text-undust-green' />
                </div>
                <div style={contentStyle} className='border border-dotted border-opacity-20 p-2 border-undust-green'>{steps[current].content}</div>
                <div style={{ marginTop: 24 }}>
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()} className='bg-undust-green text-black rounded-md py-1 px-4 my-2'>
                            Previous
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()} className='bg-undust-green text-black rounded-md py-1 px-4 my-2'>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')} className='bg-undust-green text-black rounded-md py-1 px-4 my-2'>
                            Done
                        </Button>
                    )}
                </div>
            </div>

        </motion.div>
    );
};

export default Stepper;