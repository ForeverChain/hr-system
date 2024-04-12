import React, { useState, useEffect } from 'react';
import MainPopup from '@/common/popup/_partials/MainPopup';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import usePlace from '../usePlace';
import { usePlaceCtx } from '../usePlaceCtx';

export default function CreateInterviewPopup() {
    const { hidePopup, hideAllPopups, popupState } = usePopupCtx();
    const { candidateList, hrList } = usePlaceCtx();
    const { getAllCandidateList, getAllHrList } = usePlace();
    const { addInterview } = usePlace();
    const [error, setError] = useState(null);
    const [selectedFruit, setSelectedFruit] = useState('orange');
    const [formData, setFormData] = useState({
        talkingSkill: '',
        appearance: '',
        advantage: '',
        disadvantage: '',
        hrOfficerId: '',
        candidateId: '',
        skills: '',
    });

    useEffect(() => {
        getAllCandidateList().then((res) => {});
        getAllHrList().then((res) => {});
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addInterview(formData)
            .then((res) => {
                if (res.message === 'success') {
                    hideAllPopups();
                }
            })
            .catch((err) => {
                setError('Error adding interview');
            });
    };

    console.log(formData);

    return (
        <MainPopup
            title='Ярилцлага эхлүүлэх'
            footerAction1={hidePopup}
            footerText1='Болих'
            footerAction2={handleSubmit}
            footerText2='Оруулах'
            minWidth={500}
        >
            <form onSubmit={handleSubmit}>
                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label
                            className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                            htmlFor='interviewType'
                        >
                            Ажил горилогч
                        </label>
                    </div>
                    <div className='md:w-2/3'>
                        <select
                            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                            id='candidateId'
                            name='candidateId'
                            value={formData.candidateId}
                            onChange={(e) =>
                                setFormData({ ...formData, candidateId: e.target.value })
                            }
                        >
                            <option value=''>Сонгоорой...</option>
                            {candidateList.map((candidate) => (
                                <option key={candidate._id} value={candidate._id}>
                                    {candidate.lastName} {candidate.firstName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label
                            className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                            htmlFor='hrOfficerId'
                        >
                            Хүний нөөцийн менежер
                        </label>
                    </div>
                    <div className='md:w-2/3'>
                        <select
                            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                            id='hrOfficerId'
                            name='hrOfficerId'
                            value={formData.hrOfficerId}
                            onChange={(e) =>
                                setFormData({ ...formData, hrOfficerId: e.target.value })
                            }
                        >
                            <option value=''>Сонгоорой...</option>
                            {hrList?.map((hr) => (
                                <option key={hr?._id} value={hr?._id}>
                                    {hr?.userName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label
                            className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                            htmlFor='talkingSkill'
                        >
                            Ярианы чадвар
                        </label>
                    </div>
                    <div className='md:w-2/3'>
                        <select
                            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                            id='talkingSkill'
                            name='talkingSkill'
                            value={formData.talkingSkill}
                            onChange={(e) =>
                                setFormData({ ...formData, talkingSkill: e.target.value })
                            }
                        >
                            <option value=''>Сонгоорой...</option>
                            <option value='1'>Хангалтгүй</option>
                            <option value='2'>Дунджаас доогуур</option>
                            <option value='3'>Дундаж</option>
                            <option value='4'>Сайн</option>
                            <option value='5'>Маш сайн</option>
                        </select>
                    </div>
                </div>

                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label
                            className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                            htmlFor='appearance'
                        >
                            Гадаад үзэмж
                        </label>
                    </div>
                    <div className='md:w-2/3'>
                        <select
                            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                            id='appearance'
                            name='appearance'
                            value={formData.appearance}
                            onChange={(e) =>
                                setFormData({ ...formData, appearance: e.target.value })
                            }
                        >
                            <option value=''>Сонгоорой...</option>
                            <option value='1'>Хангалтгүй</option>
                            <option value='2'>Дунджаас доогуур</option>
                            <option value='3'>Дундаж</option>
                            <option value='4'>Сайн</option>
                            <option value='5'>Маш сайн</option>
                        </select>
                    </div>
                </div>

                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label
                            className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                            htmlFor='advantage'
                        >
                            Давуу тал
                        </label>
                    </div>
                    <div className='md:w-2/3'>
                        <select
                            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                            id='advantage'
                            name='advantage'
                            value={formData.advantage}
                            onChange={(e) =>
                                setFormData({ ...formData, advantage: e.target.value })
                            }
                        >
                            <option value=''>Сонгоорой...</option>
                            <option value='1'>Хангалтгүй</option>
                            <option value='2'>Дунджаас доогуур</option>
                            <option value='3'>Дундаж</option>
                            <option value='4'>Сайн</option>
                            <option value='5'>Маш сайн</option>
                        </select>
                    </div>
                </div>
                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label
                            className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                            htmlFor='disadvantage'
                        >
                            Сул тал
                        </label>
                    </div>
                    <div className='md:w-2/3'>
                        <select
                            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                            id='disadvantage'
                            name='disadvantage'
                            value={formData.disadvantage}
                            onChange={(e) =>
                                setFormData({ ...formData, disadvantage: e.target.value })
                            }
                        >
                            <option value=''>Сонгоорой...</option>
                            <option value='1'>Хангалтгүй</option>
                            <option value='2'>Дунджаас доогуур</option>
                            <option value='3'>Дундаж</option>
                            <option value='4'>Сайн</option>
                            <option value='5'>Маш сайн</option>
                        </select>
                    </div>
                </div>
                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label
                            className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                            htmlFor='skills'
                        >
                            Чадварууд
                        </label>
                    </div>
                    <div className='md:w-2/3'>
                        <select
                            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                            id='skills'
                            name='skills'
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        >
                            <option value=''>Сонгоорой...</option>
                            <option value='1'>Хангалтгүй</option>
                            <option value='2'>Дунджаас доогуур</option>
                            <option value='3'>Дундаж</option>
                            <option value='4'>Сайн</option>
                            <option value='5'>Маш сайн</option>
                        </select>
                    </div>
                </div>

                {/* Repeat similar pattern for other input fields */}
            </form>
        </MainPopup>
    );
}
