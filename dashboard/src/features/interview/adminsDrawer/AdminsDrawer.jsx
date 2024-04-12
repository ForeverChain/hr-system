import React, { useContext, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

//internal import

import { Button } from '@windmill/react-ui';
import Title from '@/components/ui/form/others/Title';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import { FormProvider } from '@/components/ui/form/store/useFormCtx';
import usePlace from '../usePlace';
import { usePlaceCtx } from '../usePlaceCtx';
import AdminDrawerForm from '../form/AdminDrawerForm';
import AdminDrawerFormEdit from '../form/AdminDrawerFormEdit';

function AdminsDrawer({ id }) {
    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
    const { getAdminDetail } = usePlace();
    const { adminDetail } = usePlaceCtx();

    useEffect(() => {
        if (id) {
            getAdminDetail(id);
        }
    }, [id]);

    return (
        <>
            <div className='w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                {id ? <Title title='Админ засварлах' /> : <Title title='Шинэ ярилцлага нэмэх' />}
            </div>
            <Scrollbars className='w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200'>
                <FormProvider>
                    {isDrawerOpen &&
                        (id && adminDetail ? (
                            <AdminDrawerFormEdit id={id} />
                        ) : (
                            <AdminDrawerForm id={id} />
                        ))}
                </FormProvider>
            </Scrollbars>
        </>
    );
}

export default AdminsDrawer;
