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
            "Undust.me is the easiest way to clean up empty token accounts in your wallet and earn and stake your recovered SOL. The project was developed during the Solana HyperDrive Hackathon.",
    },
    {
        question: "What is undust.me?",
        answer:
            "Undust.me is the easiest way to clean up empty token accounts in your wallet and earn and stake your recovered SOL. The project was developed during the Solana HyperDrive Hackathon.",
    },
    {
        question: "What is undust.me?",
        answer:
            "Undust.me is the easiest way to clean up empty token accounts in your wallet and earn and stake your recovered SOL. The project was developed during the Solana HyperDrive Hackathon.",
    },
    {
        question: "What is undust.me?",
        answer:
            "Undust.me is the easiest way to clean up empty token accounts in your wallet and earn and stake your recovered SOL. The project was developed during the Solana HyperDrive Hackathon.",
    },

]

export default function FAQs() {
    return (
        <div className="w-full">
            <div className="mx-auto w-full max-w-7xl px-6 text-white">
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
            <Footer />
        </div>
    )
}
