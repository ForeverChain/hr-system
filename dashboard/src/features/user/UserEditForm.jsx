import React, { useEffect, useState } from 'react';
import {
    Card,
    CardBody,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
    Button,
} from '@windmill/react-ui';
import FormRow from '@/components/ui/form/FormRow';
import InputText from '@/components/ui/form/elements/input/InputText';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import useForm from '@/components/ui/form/store/useForm';
import TextArea from '@/components/ui/form/elements/textArea/TextArea';
import CustomerServices from './CustomerServices';
import useUsers from './useUsers';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
import useToggleDrawer from '@/common/hooks/useToggleDrawer';

export default function UserEditForm(props) {
    const { serviceId } = useToggleDrawer();
    const { usersDetail, toggleDrawer, isDrawerOpen, isItInfo } = props;
    const { edittingRowInfo } = useGlobalCtx();
    const { getAllCustomersList, getExportCustomersList, addHr, getHrDetail } = useUsers();
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

    const [newHRData, setNewHRData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        school: '',
        educationDegrees: '',
        educationStartDate: '',
        educationEndDate: '',
        job: '',
        gpa: '',
        courseName: '',
        courseStartDate: '',
        courseEndDate: '',
        acquiredSkill: '',
        companyName: '',
        languageName: '',
        reading: '',
        listening: '',
        writing: '',
        speaking: '',
        company: '',
        role: '',
        workStartDate: '',
        workEndDate: '',
        quitJobReason: '',
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewHRData({
            ...newHRData,
            [name]: value,
        });
    }

    function handleSubmitNewHR(event) {
        event.preventDefault();
        addHr(newHRData);
        // setNewHRData({
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        //     phoneNumber: '',
        //     country: '',
        //     school: '',
        //     educationDegrees: '',
        //     educationStartDate: '',
        //     educationEndDate: '',
        //     job: '',
        //     gpa: '',
        //     courseName: '',
        //     courseStartDate: '',
        //     courseEndDate: '',
        //     acquiredSkill: '',
        //     companyName: '',
        //     languageName: '',
        //     reading: '',
        //     listening: '',
        //     writing: '',
        //     speaking: '',
        //     company: '',
        //     role: '',
        //     workStartDate: '',
        //     workEndDate: '',
        //     quitJobReason: '',
        // });
    }

    console.log(edittingRowInfo);

    useEffect(() => {
        setNewHRData({
            firstName: edittingRowInfo?.firstName || '',
            lastName: edittingRowInfo?.lastName || '',
            email: edittingRowInfo?.email || '',
            phoneNumber: edittingRowInfo?.phoneNumber || '',
            country: edittingRowInfo?.education?.[0]?.country || '',
            school: edittingRowInfo?.education?.[0]?.school || '',
            educationDegrees: edittingRowInfo?.education?.[0]?.educationDegrees || '',
            educationStartDate: edittingRowInfo?.education?.[0]?.educationStartDate || '',
            educationEndDate: edittingRowInfo?.education?.[0]?.educationEndDate || '',
            job: edittingRowInfo?.education?.[0]?.job || '',
            gpa: edittingRowInfo?.education?.[0]?.gpa || '',
            courseName: edittingRowInfo?.course?.[0]?.courseName || '',
            courseStartDate: edittingRowInfo?.course?.[0]?.courseStartDate || '',
            courseEndDate: edittingRowInfo?.course?.[0]?.courseEndDate || '',
            acquiredSkill: edittingRowInfo?.course?.[0]?.acquiredSkill || '',
            companyName: edittingRowInfo?.course?.[0]?.companyName || '',
            languageName: edittingRowInfo?.language?.[0]?.languageName || '',
            reading: edittingRowInfo?.language?.[0]?.reading || '',
            listening: edittingRowInfo?.language?.[0]?.listening || '',
            writing: edittingRowInfo?.language?.[0]?.writing || '',
            speaking: edittingRowInfo?.language?.[0]?.speaking || '',
            company: edittingRowInfo?.workExperiences?.[0]?.company || '',
            role: edittingRowInfo?.workExperiences?.[0]?.role || '',
            workStartDate: edittingRowInfo?.workExperiences?.[0]?.workStartDate || '',
            workEndDate: edittingRowInfo?.workExperiences?.[0]?.workEndDate || '',
            quitJobReason: edittingRowInfo?.workExperiences?.[0]?.quitJobReason || '',
        });
    }, []);

    return (
        <Card className='min-w-0 shadow-xs overflow-visible bg-white dark:bg-gray-800 mb-5'>
            <CardBody>
                <form onSubmit={handleSubmitNewHR}>
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
                                value={newHRData.lastName}
                                onChange={handleInputChange}
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
                                value={newHRData.firstName}
                                onChange={handleInputChange}
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
                                value={newHRData.email}
                                onChange={handleInputChange}
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
                                value={newHRData.phoneNumber}
                                onChange={handleInputChange}
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
                                value={newHRData.country}
                                onChange={handleInputChange}
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
                                value={newHRData.school}
                                onChange={handleInputChange}
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
                                value={newHRData.educationDegrees}
                                onChange={handleInputChange}
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
                                value={newHRData.educationStartDate}
                                onChange={handleInputChange}
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
                                value={newHRData.educationEndDate}
                                onChange={handleInputChange}
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
                                value={newHRData.job}
                                onChange={handleInputChange}
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
                                value={newHRData.gpa}
                                onChange={handleInputChange}
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
                                value={newHRData.courseName}
                                onChange={handleInputChange}
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
                                value={newHRData.courseStartDate}
                                onChange={handleInputChange}
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
                                value={newHRData.courseEndDate}
                                onChange={handleInputChange}
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
                                value={newHRData.acquiredSkill}
                                onChange={handleInputChange}
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
                                value={newHRData.companyName}
                                onChange={handleInputChange}
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
                                value={newHRData.languageName}
                                onChange={handleInputChange}
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
                                value={newHRData.reading}
                                onChange={handleInputChange}
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
                                value={newHRData.listening}
                                onChange={handleInputChange}
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
                                value={newHRData.writing}
                                onChange={handleInputChange}
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
                                value={newHRData.speaking}
                                onChange={handleInputChange}
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
                                value={newHRData.company}
                                onChange={handleInputChange}
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
                                value={newHRData.role}
                                onChange={handleInputChange}
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
                                value={newHRData.workStartDate}
                                onChange={handleInputChange}
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
                                value={newHRData.workEndDate}
                                onChange={handleInputChange}
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
                                value={newHRData.quitJobReason}
                                onChange={handleInputChange}
                                className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            />
                        </div>

                        <div></div>

                        {/* Add more fields as needed */}
                    </div>
                    <div className='mt-4'>
                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Шинэ ажил горилогч нэмэх
                        </button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
