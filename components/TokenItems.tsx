import React from 'react'

function TokenItems({ tokens }: any) {
    return (
        <div>
            {tokens.map((token: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; symbol: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }, index: React.Key | null | undefined) => (
                <div key={index} className='w-full border border-undust-green border-opacity-20'>
                    <h2>{token.name}</h2>
                    <p>{token.symbol}</p>
                </div>
            ))}
        </div>
    )
}

export default TokenItems