'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import {
  ChartPieIcon,
  HomeIcon,
  FireIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import MyMultiButton from '../MyMultiButton'
import GradientLine from '../GradientLine'
import Socials from './Socials'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Navigation() {
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Wallet Cleaner', href: '/wallet-cleaner', icon: SparklesIcon },
    { name: 'NFT Burn', href: '/nft-burn', icon: FireIcon },
    { name: 'Token Burn', href: '/token-burn', icon: FireIcon },
    { name: 'Wallet Cleaner Tour', href: '/wallet-cleaner-tour', icon: ChartPieIcon },
    // { name: 'Wallet Cleaner Tour', href: '#', icon: ChartPieIcon, count: 6 },
  ].map(item => ({
    ...item,
    current: item.href === pathname,
  }))

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current ? ' text-white' : 'text-gray-400 hover:text-white',
                    'group flex gap-x-3 p-2 text-sm leading-6 font-semibold '
                  )}

                >
                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  {item.name}
                  {/* {item.count ? (
                      <span
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white bg-opacity-10 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                        aria-hidden="true"
                      >
                        {item.count}
                      </span>
                    ) : null} */}
                </a>
                {
                  item.current ? <GradientLine /> : null
                }

              </li>
            ))}
          </ul>
        </li>
        {/* <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">Your tour</div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <a
                    href={team.href}
                    className={classNames(
                      team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li> */}

        <li className="mt-auto w-[80%] mx-auto ">
          <MyMultiButton />
          <GradientLine />
          <Socials />
          <p className='my-2 text-[10px] mb-4 opacity-30'>powered by builderz.dev</p>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation