import React from 'react'
import NFTComponent from '../../components/NFTComponent'
import BreadCrumbs from '../../components/BreadCrumbs'

const pages = [
  { name: 'Home', href: '/', current: false },
  { name: 'NFT Burn Tool', href: '/nfts', current: true },
]

function Nfts() {
  return (
    <>
      <BreadCrumbs pages={pages} />
      <NFTComponent />
    </>
  )
}

export default Nfts