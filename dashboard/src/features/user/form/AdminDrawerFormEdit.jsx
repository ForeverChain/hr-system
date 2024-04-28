import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardBody } from '@windmill/react-ui';
import { FiUploadCloud } from 'react-icons/fi';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import InputText from '@/components/ui/form/elements/input/InputText';
import useUsers from '../useUsers';
import useForm from '@/components/ui/form/store/useForm';
import FormRow from '@/components/ui/form/FormRow';
import InputFile from '@/components/ui/form/elements/input/file/InputFile';
import Uploader from '@/components/ui/image-uploader/Uploader';
import InputFileUpload from '@/components/ui/form/elements/input/file/InputFileUpload';
import InputPassword from '@/components/ui/form/elements/input/InputPassword';
import ImageViewer from '@/components/ui/form/elements/input/file/ImageViewer';
import { useUsersCtx } from '../useUsersCtx';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
import { toast } from 'react-toastify';

export default function AdminDrawerFormEdit({ id }) {
    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
    const { updateUser, getAllCustomersList } = useUsers();
    const { edittingRowInfo } = useGlobalCtx();
    const [initialFormData, setInitialFormData] = useState({
        lastName: { value: edittingRowInfo?.lastName || '', error: null },
        firstName: { value: edittingRowInfo?.firstName || '', error: null },
        email: { value: edittingRowInfo?.email || '', error: null },
        phoneNumber: { value: edittingRowInfo?.phoneNumber || '', error: null },
        country: { value: edittingRowInfo?.education[0]?.country || '', error: null },
        school: { value: edittingRowInfo?.education[0]?.school || '', error: null },
        educationDegrees: {
            value: edittingRowInfo?.education[0]?.educationDegrees || '',
            error: null,
        },
        educationStartDate: { value: edittingRowInfo?.education[0]?.startDate || '', error: null },
        educationEndDate: { value: edittingRowInfo?.education[0]?.endDate || '', error: null },
        job: { value: edittingRowInfo?.education[0]?.job || '', error: null },
        gpa: { value: edittingRowInfo?.education[0]?.gpa || '', error: null },
        courseName: { value: edittingRowInfo?.courses[0]?.courseName || '', error: null },
        courseStartDate: { value: edittingRowInfo?.courses[0]?.startDate || '', error: null },
        courseEndDate: { value: edittingRowInfo?.courses[0]?.endDate || '', error: null },
        acquiredSkill: { value: edittingRowInfo?.courses[0]?.acquiredSkill || '', error: null },
        companyName: { value: edittingRowInfo?.courses[0]?.companyName || '', error: null },
        languageName: {
            value: edittingRowInfo?.foreignLanguages[0]?.languageName || '',
            error: null,
        },
        reading: { value: edittingRowInfo?.foreignLanguages[0]?.reading || '', error: null },
        listening: { value: edittingRowInfo?.foreignLanguages[0]?.listening || '', error: null },
        writing: { value: edittingRowInfo?.foreignLanguages[0]?.writing || '', error: null },
        speaking: { value: edittingRowInfo?.foreignLanguages[0]?.speaking || '', error: null },
        company: { value: edittingRowInfo?.workExperiences[0]?.company || '', error: null },
        role: { value: edittingRowInfo?.workExperiences[0]?.role || '', error: null },
        workStartDate: { value: edittingRowInfo?.workExperiences[0]?.startDate || '', error: null },
        workEndDate: { value: edittingRowInfo?.workExperiences[0]?.endDate || '', error: null },
        quitJobReason: {
            value: edittingRowInfo?.workExperiences[0]?.quitJobReason || '',
            error: null,
        },
    });

    const { userDetail } = useUsersCtx();

    const { drawerSubmitLoading, setDrawerSubmitLoading } = useGlobalCtx();
    const { onChange, onError, formState, setValueField } = useForm(initialFormData);

    function submitForm(e) {
        e.preventDefault();
        setDrawerSubmitLoading(true);
        const payload = new FormData();

        // Append form data to the payload
        Object.entries(formState).forEach(([key, form]) => {
            payload.append(key, form.value);
        });

        updateUser(id, payload)
            .then((res) => {
                if (res.status === 'success') {
                    toast('Successfully', { type: 'success' });
                    toggleDrawer();
                    getAllCustomersList();
                }
            })
            .catch((err) => {
                console.error(err);
                // Handle errors, maybe update state to show error message to the user
            })
            .finally(() => {
                setDrawerSubmitLoading(false);
            });
    }

    return (
        <form>
            <div className='px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40'>
                <Card className='min-w-0 shadow-xs overflow-visible bg-white dark:bg-gray-800 mb-5'>
                    <CardBody>
                        <form onSubmit={submitForm}>
                            <div className='grid grid-cols-2 gap-4'>
                                {/* Name Input */}
                                <div>
                                    <label
                                        htmlFor='lastName'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Овог
                                    </label>
                                    <input
                                        type='text'
                                        id='lastName'
                                        name='lastName'
                                        value={formState?.lastName?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='firstName'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Нэр
                                    </label>
                                    <input
                                        type='text'
                                        id='firstName'
                                        name='firstName'
                                        value={formState?.firstName?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Имэйл
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={formState?.email?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Утасны дугаар
                                    </label>
                                    <input
                                        type='text'
                                        id='phoneNumber'
                                        name='phoneNumber'
                                        value={formState?.phoneNumber?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full'>Боловсролын ба мэргэжлийн ур чадвар</div>
                                <div></div>
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Улс
                                    </label>
                                    <input
                                        type='text'
                                        id='country'
                                        name='country'
                                        value={formState?.country?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Сургууль
                                    </label>
                                    <input
                                        type='text'
                                        id='school'
                                        name='school'
                                        value={formState?.school?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Боловсролын зэрэг
                                    </label>
                                    <input
                                        type='text'
                                        id='educationDegrees'
                                        name='educationDegrees'
                                        value={formState?.educationDegrees?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Элссэн огноо
                                    </label>
                                    <input
                                        type='date'
                                        id='educationStartDate'
                                        name='educationStartDate'
                                        value={
                                            formState?.educationStartDate?.value &&
                                            new Date(formState?.educationStartDate?.value)
                                                .toISOString()
                                                .split('T')[0]
                                        }
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Төгссөн огноо
                                    </label>
                                    <input
                                        type='date'
                                        id='educationEndDate'
                                        name='educationEndDate'
                                        value={
                                            formState?.educationEndDate?.value &&
                                            new Date(formState?.educationEndDate?.value)
                                                .toISOString()
                                                .split('T')[0]
                                        }
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Эзэмшсэн мэргэжил
                                    </label>
                                    <input
                                        type='text'
                                        id='job'
                                        name='job'
                                        value={formState?.job?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Голч дүн
                                    </label>
                                    <input
                                        type='text'
                                        id='gpa'
                                        name='gpa'
                                        value={formState?.gpa?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>
                                <div></div>

                                <div className='w-full'>
                                    Мэргэжлээрээ болон бусад чиглэлээр хамрагдаж байсан сургалтууд
                                </div>
                                <div></div>
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Сургалтын нэр
                                    </label>
                                    <input
                                        type='text'
                                        id='courseName'
                                        name='courseName'
                                        value={formState?.courseName?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Эхэлсэн огноо
                                    </label>
                                    <input
                                        type='date'
                                        id='courseStartDate'
                                        name='courseStartDate'
                                        value={formState?.courseStartDate?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Төгссөн огноо
                                    </label>
                                    <input
                                        type='date'
                                        id='courseEndDate'
                                        name='courseEndDate'
                                        value={formState?.courseEndDate?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Эзэмшсэн ур чадвар
                                    </label>
                                    <input
                                        type='text'
                                        id='acquiredSkill'
                                        name='acquiredSkill'
                                        value={formState?.acquiredSkill?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Сургалтын байгууллагын нэр
                                    </label>
                                    <input
                                        type='text'
                                        id='companyName'
                                        name='companyName'
                                        value={formState?.companyName?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div></div>

                                <div className='w-full'>Гадаад хэлний мэдлэг</div>
                                <div></div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Хэл
                                    </label>
                                    <input
                                        type='text'
                                        id='languageName'
                                        name='languageName'
                                        value={formState?.languageName?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Унших
                                    </label>
                                    <input
                                        type='text'
                                        id='reading'
                                        name='reading'
                                        value={formState?.reading?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Сонсох
                                    </label>
                                    <input
                                        type='text'
                                        id='listening'
                                        name='listening'
                                        value={formState?.listening?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Бичих
                                    </label>
                                    <input
                                        type='text'
                                        id='writing'
                                        name='writing'
                                        value={formState?.writing?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Ярих
                                    </label>
                                    <input
                                        type='text'
                                        id='speaking'
                                        name='speaking'
                                        value={formState?.speaking?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div></div>

                                <div className='w-full'>Ажлын туршлага</div>
                                <div></div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Байгууллага
                                    </label>
                                    <input
                                        type='text'
                                        id='company'
                                        name='company'
                                        value={formState?.company?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Албан тушаал
                                    </label>
                                    <input
                                        type='text'
                                        id='role'
                                        name='role'
                                        value={formState?.role?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Орсон огноо
                                    </label>
                                    <input
                                        type='date'
                                        id='workStartDate'
                                        name='workStartDate'
                                        value={
                                            formState?.workStartDate?.value &&
                                            new Date(formState?.workStartDate?.value)
                                                .toISOString()
                                                .split('T')[0]
                                        }
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Гарсан огноо
                                    </label>
                                    <input
                                        type='date'
                                        id='workEndDate'
                                        name='workEndDate'
                                        value={
                                            formState?.workEndDate?.value &&
                                            new Date(formState?.workEndDate?.value)
                                                .toISOString()
                                                .split('T')[0]
                                        }
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Гарсан шалтгаан
                                    </label>
                                    <input
                                        type='text'
                                        id='quitJobReason'
                                        name='quitJobReason'
                                        value={formState?.quitJobReason?.value}
                                        onChange={onChange}
                                        className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                    />
                                </div>

                                <div></div>

                                {/* Add more fields as needed */}
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
            <div
                className='z-10 bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                style={{ right: !isDrawerOpen && -50 }}
            >
                <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                    <Button
                        onClick={toggleDrawer}
                        className='h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-700'
                        layout='outline'
                    >
                        Болих
                    </Button>
                </div>
                <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                    <Button
                        onClick={submitForm}
                        disabled={drawerSubmitLoading}
                        className='w-full h-12'
                    >
                        <span>{drawerSubmitLoading ? '로드 중...' : 'Оруулах'}</span>
                    </Button>
                </div>
            </div>
        </form>
    );
}
