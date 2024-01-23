'use client'

import { CubeTransparentIcon, SparklesIcon, FireIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import Image from 'next/image'

const tools = [
  {
    name: 'Wallet Cleaner',
    title: 'Close empty token accounts',
    role: 'Tool',
    link: '/wallet-cleaner',
    telephone: '+1-202-555-0170',
    icon: SparklesIcon,
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'NFT Burn',
    title: 'Burn NFTs from your wallet',
    role: 'Tool',
    link: '/nft-burn',
    telephone: '+1-202-555-0170',
    icon: FireIcon,
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Token Burn',
    title: 'Burn tokens from your wallet',
    role: 'Tool',
    link: '/token-burn',
    telephone: '+1-202-555-0170',
    icon: FireIcon,
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Wallet Cleaner Tour',
    title: 'Take a tour of the wallet cleaner',
    role: 'Tool',
    link: '/wallet-cleaner-tour',
    telephone: '+1-202-555-0170',
    icon: CubeTransparentIcon,
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]

export default function ToolsGrid() {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
      {tools.map((tool, index) => (
        <a href={tool.link} key={tool.link} className={`cursor-pointer hover:bg-white hover:bg-opacity-[0.01] col-span-1 divide-y divide-undust-green rounded-lg border border-undust-green border-opacity-40 shadow !bg-opacity-10 !backdrop-blur-lg ${index === tools.length - 1 ? 'lg:col-span-3' : ''}`} >
          <div className="flex w-full items-start justify-start space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className={`flex items-start ${index === tools.length - 1 ? 'justify-center' : 'justify-start '} space-x-3`}>
                <h3 className={`truncate text-sm font-medium text-gray-100 ${index === tools.length - 1 ? 'text-center items-center' : ''}`}>{tool.name}</h3>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {tool.role}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500 ">{tool.title}</p>
            </div>
            {/* <Image className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" width={40} height={40} src={tool.imageUrl} alt="" /> */}
            <tool.icon className="h-10 w-10 flex-shrink-0 rounded-full " aria-hidden="true" />
          </div>
        </a>
      ))}
    </ul>
  )
}
