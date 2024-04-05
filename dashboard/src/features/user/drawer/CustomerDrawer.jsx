import React, { useContext, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

//internal import

import { Button } from '@windmill/react-ui';
import Title from '@/components/ui/form/others/Title';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import { FormProvider } from '@/components/ui/form/store/useFormCtx';
import UserEditForm from '../UserEditForm';
import { useUsersCtx } from '../useUsersCtx';
import useUsers from '../useUsers';

function CustomerDrawer({ id, isItInfo }) {
    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
    const { usersDetail } = useUsersCtx();
    const { getCustomersDetail } = useUsers();

    // console.log("formState: ", formState);

    // async function getCustomersDetail() {
    //     const res = await await CustomerServices.getCustomerById(id);
    //     return res;
    // }

    useEffect(() => {
        if (id) {
            getCustomersDetail(id);
        }
    }, [id]);

    return (
        <>
            <div className='w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                {isItInfo ? (
                    <Title title={`Users/ ${id}`} />
                ) : (
                    <Title title={`Users/ ${id}/edit`} />
                )}
            </div>
            {isItInfo ? (
                <Scrollbars className='w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200'>
                    <div>
                        <div className='px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full'>
                            <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                                <LabelArea label='이메일' />
                                <div className='col-span-8 sm:col-span-4'>{usersDetail?.email}</div>
                            </div>
                        </div>
                        <div className='px-6 pt-4 flex-grow scrollbar-hide w-full max-h-full'>
                            <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                                <LabelArea label='지갑주소' />
                                <div className='col-span-8 sm:col-span-4'>
                                    {usersDetail?.walletAddress}
                                </div>
                            </div>
                        </div>
                        <div className='px-6 pt-4 flex-grow scrollbar-hide w-full max-h-full'>
                            <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                                <LabelArea label='이름' />
                                <div className='col-span-8 sm:col-span-4'>{usersDetail?.name}</div>
                            </div>
                        </div>
                        <div className='px-6 pt-4 flex-grow scrollbar-hide w-full max-h-full'>
                            <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                                <LabelArea label='전화번호' />
                                <div className='col-span-8 sm:col-span-4'>{usersDetail?.phone}</div>
                            </div>
                        </div>
                        <div className='px-6 pt-4 flex-grow scrollbar-hide w-full max-h-full'>
                            <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                                <LabelArea label='주소' />
                                <div className='col-span-8 sm:col-span-4'>
                                    {usersDetail?.address}
                                </div>
                            </div>
                        </div>
                        <div className='px-6 pt-4 flex-grow scrollbar-hide w-full max-h-full'>
                            <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                                <LabelArea label='자기소개' />
                                <div className='col-span-8 sm:col-span-4'>
                                    {usersDetail?.introduce}
                                </div>
                            </div>
                        </div>

                        <div
                            className='fixed z-10 bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                            style={{ right: !isDrawerOpen && -50 }}
                        >
                            <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                                <Button
                                    onClick={toggleDrawer}
                                    className='h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-700'
                                    layout='outline'
                                >
                                    취소
                                </Button>
                            </div>
                        </div>
                    </div>
                </Scrollbars>
            ) : (
                <FormProvider>
                    <Scrollbars className='w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200'>
                        <UserEditForm
                            usersDetail={usersDetail}
                            toggleDrawer={toggleDrawer}
                            isDrawerOpen={isDrawerOpen}
                            isItInfo={isItInfo}
                        />
                    </Scrollbars>
                </FormProvider>
            )}
        </>
    );
}

export default CustomerDrawer;
