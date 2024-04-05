import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@windmill/react-ui';
import { FiUploadCloud } from 'react-icons/fi';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import InputText from '@/components/ui/form/elements/input/InputText';
import useAdmins from '../useAdmins';
import useForm from '@/components/ui/form/store/useForm';
import FormRow from '@/components/ui/form/FormRow';
import InputFile from '@/components/ui/form/elements/input/file/InputFile';
import Uploader from '@/components/ui/image-uploader/Uploader';
import InputFileUpload from '@/components/ui/form/elements/input/file/InputFileUpload';
import InputPassword from '@/components/ui/form/elements/input/InputPassword';
import ImageViewer from '@/components/ui/form/elements/input/file/ImageViewer';
import { useAdminCtx } from '../useAdminCtx';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';

const initialFormData = {
    image: { value: null, error: null },
    name: { value: null, error: null },
    email: { value: null, error: null },
    password: { value: null, error: null },
};

export default function AdminDrawerForm({ id }) {
    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
    const { addAdmin, getAllAdminsList } = useAdmins();
    const { drawerSubmitLoading, setDrawerSubmitLoading } = useGlobalCtx();

    const { onChange, onError, formState, setValueField } = useForm(initialFormData);

    function submitForm(e) {
        e.preventDefault();
        setDrawerSubmitLoading(true);
        const payload = new FormData();

        payload.append('name', formState?.name?.value);
        payload.append('email', formState?.email?.value);
        payload.append('password', formState?.password?.value);
        payload.append('image', formState?.image?.value);

        addAdmin(payload)
            .then((res) => {
                if (res.message === 'success') {
                    toggleDrawer();
                    getAllAdminsList();
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setDrawerSubmitLoading(false);
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
                            value={formState?.image?.value}
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
                            placeholder='이름'
                        />
                    </div>
                </FormRow>
                <FormRow
                    errMsg={formState?.email?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='이메일' />
                    <div className='col-span-8 sm:col-span-4'>
                        <InputText
                            name='email'
                            onChange={onChange}
                            value={formState?.email?.value}
                            isValid={Boolean(formState?.email?.error)}
                            placeholder='이메일'
                        />
                    </div>
                </FormRow>
                <FormRow
                    errMsg={formState?.password?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='비밀번호' />
                    <div className='col-span-8 sm:col-span-4'>
                        <InputPassword
                            name='password'
                            onChange={onChange}
                            value={formState?.password?.value}
                            isValid={Boolean(formState?.password?.error)}
                            placeholder='비밀번호'
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
                        disabled={drawerSubmitLoading}
                        className='w-full h-12'
                    >
                        <span>{drawerSubmitLoading ? '로드 중...' : '추가'}</span>
                    </Button>
                </div>
            </div>
        </form>
    );
}
