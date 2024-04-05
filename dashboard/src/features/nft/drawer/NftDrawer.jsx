import React, { useContext, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

//internal import
import { Button } from '@windmill/react-ui';
import Title from '@/components/ui/form/others/Title';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';

function NftDrawer({ nft }) {
    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);

    return (
        <Scrollbars className='w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200'>
            <div className='w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                NFT 정보
            </div>
            <div>
                <div className='px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full'>
                    <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                        <LabelArea label='토큰 타입' />
                        <div className='col-span-8 sm:col-span-4'>{nft?.type}</div>
                    </div>
                </div>
                <div className='px-6 pt-4 flex-grow scrollbar-hide w-full max-h-full'>
                    <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                        <LabelArea label='에셋토큰ID' />
                        <div className='col-span-8 sm:col-span-4'>{nft?.assetTokenId}</div>
                    </div>
                </div>
                <div className='px-6 pt-4 flex-grow scrollbar-hide w-full max-h-full'>
                    <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                        <LabelArea label='토큰ID' />
                        <div className='col-span-8 sm:col-span-4'>{nft?.tokenId}</div>
                    </div>
                </div>
                <div className='px-6 pt-4 flex-grow scrollbar-hide w-full max-h-full'>
                    <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                        <LabelArea label='소유자' />
                        <div className='col-span-8 sm:col-span-4'>{nft?.owner}</div>
                    </div>
                </div>
                <div className='px-6 pt-4 flex-grow scrollbar-hide w-full max-h-full'>
                    <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                        <LabelArea label='토큰정보' />
                        <div className='col-span-8 sm:col-span-4 whitespace-pre'>
                            {JSON.stringify(nft?.tokenInfo, null, 4)}
                        </div>
                    </div>
                </div>
            </div>
        </Scrollbars>
    );
}

export default NftDrawer;
