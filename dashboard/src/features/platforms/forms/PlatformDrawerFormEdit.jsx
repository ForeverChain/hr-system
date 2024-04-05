import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@windmill/react-ui';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import InputText from '@/components/ui/form/elements/input/InputText';
import useForm from '@/components/ui/form/store/useForm';
import FormRow from '@/components/ui/form/FormRow';
import InputFileUpload from '@/components/ui/form/elements/input/file/InputFileUpload';
import TextArea from '@/components/ui/form/elements/textArea/TextArea';
import usePlatform from '../usePlatform';
import { usePlatformCtx } from '../usePlatformCtx';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';

export default function PlatformDrawerFormEdit({ id }) {
    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
    const { updatePlatform } = usePlatform();
    const { platformDetail } = usePlatformCtx();
    const { edittingRowInfo } = useGlobalCtx();
    const [initialFormData, setInitialFormData] = useState({
        image: { value: edittingRowInfo?.image?.url, error: null },
        name: { value: edittingRowInfo?.name, error: null },
        description: { value: edittingRowInfo?.description, error: null },
    });

    // useEffect(() => {
    //     const initialFormTimer = setTimeout(() => {
    //         if (platformDetail && id) {
    //             setInitialFormData({
    //                 image: { value: platformDetail?.image?.url, error: null },
    //                 name: { value: platformDetail?.name, error: null },
    //                 description: { value: platformDetail?.description, error: null },
    //             });
    //         }
    //     }, 500);
    //     return () => clearTimeout(initialFormTimer);
    // }, [id]);

    const { onChange, onError, formState, setValueField } = useForm(initialFormData);

    function submitForm(e) {
        e.preventDefault();
        const payload = new FormData();

        formState?.name?.value && payload.append('name', formState?.name?.value);
        formState?.description?.value &&
            payload.append('description', formState?.description?.value);
        if (typeof formState?.image?.value === 'object' && formState?.image?.value) {
            payload.append('image', formState?.image?.value);
        } else if (formState?.image?.value == null) {
            payload.append('imgDeleted', true);
        }

        updatePlatform(id, payload)
            .then((res) => {
                if (res.message === 'success') {
                    toggleDrawer();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <form>
            <div className='px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40'>
                <FormRow
                    errMsg={formState?.name?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='이미지' />
                    <div className='col-span-8 sm:col-span-4'>
                        <InputFileUpload
                            idName='adminFileUpload'
                            onChange={setValueField}
                            isValid={Boolean(formState?.image?.error)}
                            name='image'
                            value={platformDetail?.image?.url}
                        />
                    </div>
                </FormRow>
                <FormRow
                    errMsg={formState?.name?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='이름' />
                    <div className='col-span-8 sm:col-span-4'>
                        <InputText
                            name='name'
                            onChange={onChange}
                            value={formState?.name?.value}
                            isValid={Boolean(formState?.name?.error)}
                            placeholder='플랫폼 이름'
                        />
                    </div>
                </FormRow>
                <FormRow
                    errMsg={formState?.email?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='설명' />
                    <div className='col-span-8 sm:col-span-4'>
                        <TextArea
                            name='description'
                            onChange={onChange}
                            value={formState?.description?.value}
                            isValid={Boolean(formState?.description?.error)}
                            placeholder='플랫폼 설명.'
                        />
                    </div>
                </FormRow>
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
                <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                    <Button
                        onClick={submitForm}
                        className='w-full h-12'
                        disabled={!formState?.name?.value}
                    >
                        <span>수정</span>
                    </Button>
                </div>
            </div>
        </form>
    );
}
