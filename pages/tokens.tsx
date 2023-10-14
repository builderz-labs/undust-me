import { NextPage } from 'next'
import Head from 'next/head'
import TokensComponent from '../components/TokensComponent'

const Tokens: NextPage = () => {

    return (
        <>
            <Head>
                <title>Undust.me</title>
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:image" content="https://cdn.discordapp.com/attachments/1158367321644081153/1162708672225480714/telegram-cloud-photo-size-2-5280632887542140878-y.jpg?ex=653cebd5&is=652a76d5&hm=0f68f364c6147541f8319fdc8e9430e46dfd0627b50567da329130f668818fe2&" />
                <meta property="og:title" content="It's sweep time; tidy your wallet & earn SOL" />
                <meta property="og:description" content="It's sweep time; tidy your wallet & earn SOL" />
                <meta property="og:url" content="https://undust.me" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@builderz__" />
                <meta name="twitter:creator" content="@builderz__" />
                <meta name="twitter:title" content="It's sweep time; tidy your wallet & earn SOL" />
            </Head>

            <TokensComponent />
        </>
    )
}

export default Tokens