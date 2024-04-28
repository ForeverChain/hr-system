import React, { useState, useEffect } from 'react';
import MainPopup from '@/common/popup/_partials/MainPopup';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import usePlace from '../usePlace';
import { usePlaceCtx } from '../usePlaceCtx';

export default function RatingPopup() {
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

    const scoreToText = (score) => {
        if (score === 1) {
            return 'Хангалтгүй';
        } else if (score === 2) {
            return 'Дунджаас доогуур';
        } else if (score === 3) {
            return 'Дундаж';
        } else if (score === 4) {
            return 'Сайн';
        } else if (score === 5) {
            return 'Маш сайн';
        } else {
            return ''; // Or handle any other cases if necessary
        }
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

    return (
        <MainPopup
            title='Ярилцлагын үнэлгээний хуудас'
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
                        <span>
                            {popupState?.deletingAdminInfo?.candidateId?.lastName}{' '}
                            {popupState?.deletingAdminInfo?.candidateId?.firstName}
                        </span>
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
                        <span>{popupState?.deletingAdminInfo?.hr?.userName}</span>
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
                        <span>
                            {scoreToText(popupState?.deletingAdminInfo?.resultId[0].talkingSkill)}
                        </span>
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
                        <span>
                            {scoreToText(popupState?.deletingAdminInfo?.resultId[0]?.appearance)}
                        </span>
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
                        <span>
                            {scoreToText(popupState?.deletingAdminInfo?.resultId[0]?.advantage)}
                        </span>
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
                        <span>
                            {scoreToText(popupState?.deletingAdminInfo?.resultId[0]?.disadvantage)}
                        </span>
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
                        <span>
                            {scoreToText(popupState?.deletingAdminInfo?.resultId[0]?.skills)}
                        </span>
                    </div>
                </div>
            </form>
        </MainPopup>
    );
}
