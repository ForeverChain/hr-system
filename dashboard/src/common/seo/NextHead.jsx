/**
 * @createdBy Phill Anderson 2022/11/15
 */
import React from 'react';
import Head from 'next/head';

function NextHead(props) {
    const { title, keyword, desc } = props;
    return (
        <Head>
            <title>{title} | Metaverse assets platform</title>
            <link rel='icon' href='/favicon.png' />
            <meta name='description' content={desc} />
            <meta name='keyword' content={keyword} />
        </Head>
    );
}
NextHead.defaultProps = {
    title: 'Metaverse assets platform',
    keyword:
        'bitcoin, blockchain, crypto, crypto collectibles, crypto makretplace, cryptocurrency, digital items, market, nft, nft marketplace, nft next js, NFT react, non-fungible tokens, virtual asset, wallet',
    desc: "The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.",
};

export default NextHead;
