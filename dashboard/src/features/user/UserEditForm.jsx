import React, { useEffect, useState } from 'react';
import { Button } from '@windmill/react-ui';
import FormRow from '@/components/ui/form/FormRow';
import InputText from '@/components/ui/form/elements/input/InputText';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import useForm from '@/components/ui/form/store/useForm';
import TextArea from '@/components/ui/form/elements/textArea/TextArea';
import CustomerServices from './CustomerServices';
import useUsers from './useUsers';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';

export default function UserEditForm(props) {
    const { usersDetail, toggleDrawer, isDrawerOpen, isItInfo } = props;
    const { edittingRowInfo } = useGlobalCtx();
    const [initialProfileFormData, setInitialProfileFormData] = useState({
        name: { value: usersDetail?.name, error: null },
        address: { value: usersDetail?.address, error: null },
        phone: { value: usersDetail?.phone, error: null },
        introduction: { value: usersDetail?.introduce, error: null },
    });
    const { updateUser } = useUsers();

    // useEffect(() => {
    //     const initialFormTimer = setTimeout(() => {
    //         if (usersDetail) {
    //             setInitialProfileFormData({
    //                 name: { value: usersDetail?.name, error: null },
    //                 address: { value: usersDetail?.address, error: null },
    //                 phone: { value: usersDetail?.phone, error: null },
    //                 introduction: { value: usersDetail?.introduce, error: null },
    //             });
    //         }
    //     }, 500);
    //     return () => clearTimeout(initialFormTimer);
    // }, []);
    const { onChange, onError, formState } = useForm(initialProfileFormData);

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            name: formState?.name?.value,
            phone: formState?.phone?.value,
            address: formState?.address?.value,
            introduce: formState?.introduction?.value,
        };

        updateUser(usersDetail?.id, payload).then((response) => {
            if (response.message === 'success') {
                toggleDrawer();
            }
        });
    }

    useEffect(() => {
        if (usersDetail) {
            setInitialProfileFormData({
                name: { value: usersDetail?.name, error: null },
                address: { value: usersDetail?.address, error: null },
                phone: { value: usersDetail?.phone, error: null },
                introduction: { value: usersDetail?.introduce, error: null },
            });
        }
    }, [usersDetail]);

    return (
        <form>
            <div className='px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40'>
                <div className='px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full'>
                    <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                        <LabelArea label='이메일' />
                        <div className='col-span-8 sm:col-span-4'>{usersDetail?.email}</div>
                    </div>
                </div>
                <div className='px-6 pt-4 flex-grow scrollbar-hide w-full max-h-full'>
                    <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
                        <LabelArea label='지갑주소' />
                        <div className='col-span-8 sm:col-span-4'>{usersDetail?.walletAddress}</div>
                    </div>
                </div>

                <FormRow
                    errMsg={formState?.name?.error}
                    className=' px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='이름' />
                    <div className='col-span-8 sm:col-span-4'>
                        <InputText
                            name='name'
                            onChange={onChange}
                            value={formState?.name?.value}
                            isValid={Boolean(formState?.name?.error)}
                            placeholder='김부자'
                        />
                    </div>
                </FormRow>

                <FormRow
                    errMsg={formState?.phone?.error}
                    className=' px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='전화번호' />
                    <div className='col-span-8 sm:col-span-4'>
                        <InputText
                            name='phone'
                            onChange={onChange}
                            value={formState?.phone?.value}
                            isValid={Boolean(formState?.phone?.error)}
                            placeholder='01012345678'
                        />
                    </div>
                </FormRow>

                <FormRow
                    errMsg={formState?.address?.error}
                    className=' px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='주소' />
                    <div className='col-span-8 sm:col-span-4'>
                        <InputText
                            name='address'
                            onChange={onChange}
                            value={formState?.address?.value}
                            isValid={Boolean(formState?.address?.error)}
                            placeholder='대한민국 서울특별시 금천구 서부샛길 606, 대성디폴리스A동'
                        />
                    </div>
                </FormRow>

                <FormRow
                    errMsg={formState?.introduction?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='자기소개' />
                    <div className='col-span-8 sm:col-span-4'>
                        <TextArea
                            name='introduction'
                            cols={15}
                            onChange={onChange}
                            placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed nunc ut mi sodales posuere at ac dui. Morbi ac tellus vitae nulla eleifend vehicula in ac justo. Morbi consequat fermentum lacus ut vehicula. Praesent eget tincidunt orci. Morbi in tincidunt risus, non consectetur nibh. Nam ornare est libero, dapibus ullamcorper lorem tempus id. Sed ac nulla id purus accumsan cursus eget ac erat. Suspendisse quis lectus massa.'
                            value={formState?.introduction?.value}
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

                {!isItInfo && (
                    <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                        <Button onClick={handleSubmit} className='w-full h-12'>
                            <span>저장</span>
                        </Button>
                    </div>
                )}
            </div>
        </form>
    );
}
