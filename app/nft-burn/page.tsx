import React from 'react'
import NFTComponent from '../../components/NFTComponent'
import BreadCrumbs from '../../components/BreadCrumbs'

function NftBurn() {
  return (
    <>
      <BreadCrumbs pages={[{ name: 'NFT Burn Tool', href: '/nfts', current: true }]} />
      <NFTComponent />
    </>
  )
}

export default NftBurn