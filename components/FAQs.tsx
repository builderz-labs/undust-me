import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Footer from './Footer'

const faqs = [
    {
        question: "What is undust.me?",
        answer:
            "Undust.me is the easiest way to clean up empty token accounts in your wallet and earn and stake your recovered SOL. The project was developed during the Solana HyperDrive Hackathon.",
    },
    {
        question: "Where are you getting the SOL from?",
        answer:
            "Every Solana account incurs a minor storage fee for its creation. By burning a token, we can close the associated account and recover the storage fee. This is the SOL that we return to you.",
    },
    {
        question: "How much SOL can I recover by burning tokens?",
        answer:
            "Most tokens will recover 0.002 SOL. Scam tokens also recover around 0.002 SOL.",
    },
    {
        question: "What does the eco staking option do?",
        answer:
            "When you choose to stake your SOL, the SOL you recovered will be covered to MSOL and staked within your chosen wallet. You will then earn staking rewards on your MSOL.",
    },
    {
        question: "How often should I use the undust.me?",
        answer:
            "It depends how often you use your wallet. If you’re frequently interacting with NFTs and tokens for example, we recommend once fortnightly.",
    },

]

export default function FAQs() {
    return (
        <div className="w-full">
            <div className="mx-auto w-full container px-6 text-white">
                <div className="mx-auto w-full divide-y divide-gray-900/10">
                    <h2 className="text-2xl w-full font-bold leading-10 tracking-tight text-gray-100">Frequently asked questions</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} className="pt-6">
                                {({ open }: any) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-100">
                                                <span className="text-base font-semibold leading-7">{faq.question}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    {open ? (
                                                        <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                    ) : (
                                                        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12 text-left">
                                            <p className="text-base leading-7 text-gray-400">{faq.answer}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
            <div className="my-10">
                <Footer />
            </div>
        </div>
    )
}
