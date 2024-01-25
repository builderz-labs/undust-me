'use client'
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  FireIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { Logo } from '../Logo'
import Link from 'next/link'
import Image from 'next/image'
import GradientLine from '../GradientLine';
import MyMultiButton from '../MyMultiButton';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import HorizontalLine from '../HorizontalLine'



const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
  // { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false, count: 5 },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname()
  // const searchParams = useSearchParams()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Wallet Cleaner', href: '/wallet-cleaner', icon: SparklesIcon },
    { name: 'NFT Burn', href: '/nft-burn', icon: FireIcon },
    { name: 'Token Burn', href: '/token-burn', icon: FireIcon },
    { name: 'Wallet Cleaner Tour', href: '/wallet-cleaner-tour', icon: ChartPieIcon },
    // { name: 'Wallet Cleaner Tour', href: '#', icon: ChartPieIcon, count: 6 },
  ].map(item => ({
    ...item,
    current: item.href === pathname,
  }))

  const socials = [
    {
      name: 'Website',
      href: 'https://builderz.dev',
      icon: require('../../public/images/website.svg')
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/builderz__',
      icon: require('../../public/images/twitter.svg')
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/86956078/admin/feed/posts/',
      icon: require('../../public/images/linkedin.svg')
    },
    {
      name: 'Github',
      href: 'https://github.com/builderz-labs',
      icon: require('../../public/images/github.svg')
    },
  ]




  return (
    <div className="hidden md:flex grow flex-col gap-y-5 overflow-y-auto  px-6 sm:max-w-xs w-full  h-screen relative">
      <div className="flex h-16 shrink-0 items-center w-full">
        <Logo />
      </div>
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
            <div className="socials flex flex-row w-full justify-around items-center mt-auto mb-2 pt-4">
              <Link href='https://builderz.dev' target='_blank' className="tooltip  flex items-center justify-center hover:scale-110 duration-300 transition-all ease-in-out" data-tip="Website">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </Link>
              <Link href='https://twitter.com/builderz__' target='_blank' className="tooltip  flex items-center justify-center hover:scale-110 duration-300 transition-all ease-in-out" data-tip="Twitter">
                <svg width="20" height="22" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='fill-slate-50'>
                  <path d="M0.0535329 0L8.54748 13.1183L0 23.7842H1.92385L9.40732 14.4459L15.4535 23.7842H22L13.028 9.9281L20.984 0H19.0601L12.1685 8.60014L6.6 0H0.0535329ZM2.88263 1.6367H5.89005L19.1705 22.1475H16.1631L2.88263 1.6367Z" fill="white" />
                </svg>
              </Link>
              <Link href='https://www.linkedin.com/company/86956078/admin/feed/posts/' target='_blank' className="tooltip flex items-center justify-center hover:scale-110 duration-300 transition-all ease-in-out" data-tip="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px" className='fill-slate-50'>    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" /></svg>            </Link>
              <Link href='https://github.com/builderz-labs' target='_blank' className="tooltip  flex items-center justify-center hover:scale-110 duration-300 transition-all ease-in-out" data-tip="Github">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-slate-50"><path fill-rule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path></svg>
              </Link>
            </div>
            <p className='my-2 text-[10px] mb-4 opacity-30'>powered by builderz.dev</p>
          </li>
        </ul>
      </nav>
    </div>
  )
}
