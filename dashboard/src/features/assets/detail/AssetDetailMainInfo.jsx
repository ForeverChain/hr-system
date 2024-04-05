import React from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';

export default function AssetDetailMainInfo() {
    const { assetDetail } = useGlobalCtx();

    return (
        <Card className='min-w-0 shadow-xs bg-white dark:bg-gray-800 mb-5'>
            <CardBody className='flex gap-3'>
                <div>
                    <img
                        src={assetDetail?.thumbnailUrl}
                        alt='Asset_picture'
                        width='500'
                        height='500'
                        className=' aspect-square'
                    />
                </div>
                <div className='flex justify-between w-full'>
                    <div className='w-1/2 flex flex-col gap-3 border-r'>
                        <h3>
                            <span className=' w-24 font-bold'>이름:</span>
                            {assetDetail?.title}
                        </h3>
                        <div className='flex'>
                            <span className=' w-24 font-bold'>이용조건:</span>
                            <span className='text-gray-500 font-medium flex gap-2 items-center'>
                                {assetDetail?.termsOfUse?.commercialAllowed && (
                                    <span className=' bg-cyan-400 text-white text-sm rounded-xl text-center px-2'>
                                        수익화가능
                                    </span>
                                )}
                                {assetDetail?.termsOfUse?.resaleAllowed && (
                                    <span className=' bg-emerald-400 text-white text-sm rounded-xl text-center px-2'>
                                        재판매가능
                                    </span>
                                )}
                            </span>
                        </div>
                        <div className='flex '>
                            <span className=' w-24 font-bold'>등록자:</span>
                            <span className='text-gray-500 font-medium'>
                                {assetDetail?.creators[0]?.name}
                            </span>
                        </div>
                        <div className='flex'>
                            <span className=' w-24 font-bold'>플랫폼:</span>
                            <span className='text-gray-500 font-medium'>
                                {assetDetail?.platform?.name}
                            </span>
                        </div>
                        <div className='flex'>
                            <span className='w-[100px] font-bold'>태그:</span>
                            <div className=' flex flex-wrap gap-2'>
                                {(assetDetail?.tags || [])
                                    ?.sort((a, b) => a.name.localeCompare(b.name))
                                    ?.map((tag) => (
                                        <span
                                            key={'fdsafe' + tag.name}
                                            className=' text-white bg-slate-500 rounded-xl px-2 py-1 h-6 text-center text-sm items-center flex'
                                        >
                                            {tag?.name}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 ml-2'>
                        <h3>설명:</h3>
                        <div>{assetDetail?.description}</div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
