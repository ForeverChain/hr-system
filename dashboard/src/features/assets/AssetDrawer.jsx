import React, { useContext, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import useAsset from './useAsset';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
import Title from '@/components/ui/form/others/Title';
import { FormProvider } from '@/components/ui/form/store/useFormCtx';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import AssetDrawerFormEdit from './detail/AssetDrawerFormEdit';
import usePlatform from '../platforms/usePlatform';

export default function AssetDrawer({ id }) {
    const { getAssetDetail } = useAsset();
    const { assetDetail } = useGlobalCtx();
    const { isDrawerOpen } = useContext(SidebarContext);
    const [platformOptions, setPlatformOptions] = useState();
    const { getAllPlatForm } = usePlatform();

    function convertArray(inputArray) {
        const convertedArray = inputArray.map((item) => {
            return {
                label: item.name,
                value: String(item.id),
            };
        });

        return convertedArray.sort((a, b) => {
            return a.value - b.value;
        });
    }

    useEffect(() => {
        if (id) {
            getAssetDetail({ id });
        }
    }, [id]);

    useEffect(() => {
        getAllPlatForm()
            .then((res) => {
                setPlatformOptions(convertArray(res.result));
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <>
            <div className='w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                <Title title='에셋 정보 수정' description='수정할 에셋의 정보를 입력하세요' />
            </div>

            <Scrollbars className='w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200'>
                <FormProvider>
                    {isDrawerOpen && id && assetDetail && (
                        <AssetDrawerFormEdit id={id} selectOptions={platformOptions} />
                    )}
                </FormProvider>
            </Scrollbars>
        </>
    );
}
