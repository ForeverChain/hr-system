import React, { useContext, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

//internal import

import Title from '@/components/ui/form/others/Title';
import PlatformDrawerForm from '../forms/PlatformDrawerForm';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import { FormProvider } from '@/components/ui/form/store/useFormCtx';
import PlatformDrawerFormEdit from '../forms/PlatformDrawerFormEdit';
import usePlatform from '../usePlatform';
import { usePlatformCtx } from '../usePlatformCtx';

export default function PlatformDrawer({ id }) {
    const { isDrawerOpen } = useContext(SidebarContext);
    const { getPlatFormDetail } = usePlatform();
    const { platformDetail } = usePlatformCtx();

    useEffect(() => {
        if (id) {
            getPlatFormDetail(id);
        }
    }, [id, isDrawerOpen]);

    return (
        <>
            <div className='w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                {id ? (
                    <Title
                        title='플랫폼 정보 수정'
                        description='수정할 플랫폼의 정보를 입력하세요'
                    />
                ) : (
                    <Title title='플랫폼 추가' description='추가할 플랫폼의 정보를 입력하세요 ' />
                )}
            </div>

            <Scrollbars className='w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200'>
                {isDrawerOpen &&
                    (id && platformDetail ? (
                        <FormProvider>
                            <PlatformDrawerFormEdit id={id} />
                        </FormProvider>
                    ) : (
                        <FormProvider>
                            <PlatformDrawerForm />
                        </FormProvider>
                    ))}
            </Scrollbars>
        </>
    );
}
