'use client'

import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

const tools = [
  {
    name: 'Wallet Cleaner',
    title: 'Close empty token accounts',
    role: 'Tool',
    link: '/',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'NFT Burn',
    title: 'Burn NFTs from your wallet',
    role: 'Tool',
    link: '/nfts',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Token Burn',
    title: 'Burn tokens from your wallet',
    role: 'Tool',
    link: '/tokens',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]

export default function ToolsGrid() {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
      {tools.map((tool) => (
        <li key={tool.link} className="col-span-1 divide-y divide-undust-green rounded-lg border border-undust-green border-opacity-40 shadow !bg-opacity-10 !backdrop-blur-lg" >
          <div className="flex w-full items-start justify-start space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-start justify-start space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-100">{tool.name}</h3>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {tool.role}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500 ">{tool.title}</p>
            </div>
            <Image className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" width={40} height={40} src={tool.imageUrl} alt="" />
          </div>

        </li>
      ))}
    </ul>
  )
}
