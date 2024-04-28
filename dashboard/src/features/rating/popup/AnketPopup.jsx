import React, { useState, useEffect } from 'react';
import MainPopup from '@/common/popup/_partials/MainPopup';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import usePlace from '../usePlace';
import { usePlaceCtx } from '../usePlaceCtx';

export default function AnketPopUp() {
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

    console.log(popupState?.deletingAdminInfo?.candidateId?.workExperiences?.[0]);

    return (
        <MainPopup
            title='Ярилцлага эхлүүлэх'
            footerAction1={hidePopup}
            footerText1='Болих'
            footerAction2={handleSubmit}
            footerText2='Оруулах'
            minWidth={500}
        >
            <form>
                <div className='grid grid-cols-2 gap-4'>
                    {/* Name Input */}
                    <div>
                        <details>
                            <summary>Овог</summary>
                            <p>{popupState?.deletingAdminInfo?.candidateId?.lastName}</p>
                        </details>
                    </div>

                    <div>
                        <details>
                            <summary>Нэр</summary>
                            <p>{popupState?.deletingAdminInfo?.candidateId?.firstName}</p>
                        </details>
                    </div>

                    {/* Email Input */}
                    <div>
                        <details>
                            <summary>Имэйл</summary>
                            <p>{popupState?.deletingAdminInfo?.candidateId?.email}</p>
                        </details>
                    </div>

                    <div>
                        <details>
                            <summary>Утасны дугаар</summary>
                            <p>{popupState?.deletingAdminInfo?.candidateId?.phoneNumber}</p>
                        </details>
                    </div>

                    {/* Country Input */}
                    <div>
                        <details>
                            <summary>Улс</summary>
                            <p>
                                {
                                    popupState?.deletingAdminInfo?.candidateId?.education?.[0]
                                        ?.country
                                }
                            </p>
                        </details>
                    </div>

                    <div>
                        <details>
                            <summary>Сургууль</summary>
                            <p>
                                {popupState?.deletingAdminInfo?.candidateId?.education?.[0]?.school}
                            </p>
                        </details>
                    </div>

                    <div>
                        <details>
                            <summary>Боловсролын зэрэг</summary>
                            <p>
                                {
                                    popupState?.deletingAdminInfo?.candidateId?.education?.[0]
                                        ?.educationDegrees
                                }
                            </p>
                        </details>
                    </div>

                    <div>
                        <details>
                            <summary>Элссэн огноо</summary>
                            <p>
                                {
                                    new Date(
                                        popupState?.deletingAdminInfo?.candidateId?.education?.[0]?.startDate,
                                    )
                                        .toISOString()
                                        .split('T')[0]
                                }
                            </p>
                        </details>
                    </div>

                    <div>
                        <details>
                            <summary>Төгссөн огноо</summary>
                            <p>
                                {
                                    new Date(
                                        popupState?.deletingAdminInfo?.candidateId?.education?.[0]?.endDate,
                                    )
                                        .toISOString()
                                        .split('T')[0]
                                }
                            </p>
                        </details>
                    </div>

                    <div>
                        <details>
                            <summary>Эзэмшсэн мэргэжил</summary>
                            <p>{popupState?.deletingAdminInfo?.candidateId?.education?.[0]?.job}</p>
                        </details>
                    </div>

                    <div>
                        <details>
                            <summary>Голч дүн</summary>
                            <p>{popupState?.deletingAdminInfo?.candidateId?.education?.[0]?.gpa}</p>
                        </details>
                    </div>

                    <div>
                        <details>
                            <summary>
                                Мэргэжлээрээ болон бусад чиглэлээр хамрагдаж байсан сургалтууд
                            </summary>
                            <p>
                                <strong>Сургалтын нэр:</strong>{' '}
                                {
                                    popupState?.deletingAdminInfo?.candidateId?.courses?.[0]
                                        ?.courseName
                                }
                                <br />
                                <strong>Эхэлсэн огноо:</strong>{' '}
                                {
                                    new Date(
                                        popupState?.deletingAdminInfo?.candidateId?.courses?.[0]?.startDate,
                                    )
                                        .toISOString()
                                        .split('T')[0]
                                }
                                <br />
                                <strong>Төгссөн огноо:</strong>{' '}
                                {
                                    new Date(
                                        popupState?.deletingAdminInfo?.candidateId?.courses?.[0]?.endDate,
                                    )
                                        .toISOString()
                                        .split('T')[0]
                                }
                                <br />
                                <strong>Эзэмшсэн ур чадвар:</strong>{' '}
                                {
                                    popupState?.deletingAdminInfo?.candidateId?.courses?.[0]
                                        ?.acquiredSkill
                                }
                                <br />
                                <strong>Сургалтын байгууллагын нэр:</strong>{' '}
                                {
                                    popupState?.deletingAdminInfo?.candidateId?.courses?.[0]
                                        ?.companyName
                                }
                            </p>
                        </details>
                    </div>

                    <div>
                        <details>
                            <summary>Гадаад хэлний мэдлэг</summary>
                            <p>
                                <strong>Хэл:</strong>{' '}
                                {
                                    popupState?.deletingAdminInfo?.candidateId
                                        ?.foreignLanguages?.[0]?.languageName
                                }
                                <br />
                                <strong>Унших:</strong>{' '}
                                {
                                    popupState?.deletingAdminInfo?.candidateId
                                        ?.foreignLanguages?.[0]?.reading
                                }
                                <br />
                                <strong>Сонсох:</strong>{' '}
                                {
                                    popupState?.deletingAdminInfo?.candidateId
                                        ?.foreignLanguages?.[0]?.listening
                                }
                                <br />
                                <strong>Бичих:</strong>{' '}
                                {
                                    popupState?.deletingAdminInfo?.candidateId
                                        ?.foreignLanguages?.[0]?.writing
                                }
                                <br />
                                <strong>Ярих:</strong>{' '}
                                {
                                    popupState?.deletingAdminInfo?.candidateId
                                        ?.foreignLanguages?.[0]?.speaking
                                }
                            </p>
                        </details>
                    </div>

                    <div>
                        <details>
                            <summary>Ажлын туршлага</summary>
                            <p>
                                <strong>Байгууллага:</strong>{' '}
                                {
                                    popupState?.deletingAdminInfo?.candidateId?.workExperiences?.[0]
                                        ?.company
                                }
                                <br />
                                <strong>Албан тушаал:</strong>{' '}
                                {
                                    popupState?.deletingAdminInfo?.candidateId?.workExperiences?.[0]
                                        ?.role
                                }
                                <br />
                                <strong>Орсон огноо:</strong>{' '}
                                {
                                    new Date(
                                        popupState?.deletingAdminInfo?.candidateId?.workExperiences?.[0]?.startDate,
                                    )
                                        .toISOString()
                                        .split('T')[0]
                                }
                                <br />
                                <strong>Гарсан огноо:</strong>{' '}
                                {
                                    new Date(
                                        popupState?.deletingAdminInfo?.candidateId?.workExperiences?.[0]?.endDate,
                                    )
                                        .toISOString()
                                        .split('T')[0]
                                }
                                <br />
                                <strong>Гарсан шалтгаан:</strong>{' '}
                                {
                                    popupState?.deletingAdminInfo?.candidateId?.workExperiences?.[0]
                                        ?.quitJobReason
                                }
                            </p>
                        </details>
                    </div>

                    {/* Add more fields as needed */}
                </div>
            </form>
        </MainPopup>
    );
}
