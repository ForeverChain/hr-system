import React, { useState } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { useEventCtx } from './useEventCtx';
import ExportBtn from '@/components/ui/button/ExportBtn';
import useForm from '@/components/ui/form/store/useForm';
import Select from '@/components/ui/form/elements/select/_choices/simpleSelect/Select';
import InputText from '@/components/ui/form/elements/input/InputText';
import Btn from '@/components/ui/button/Button';
import ResetBtn from '@/components/ui/button/ResetBtn';
import EventServices from './EventServices';
import useEvent from './useEvent';

export const tokenTypes = {
    AssetNFT: 'AssetNFT',
    CopyrightNFT: 'CopyrightNFT',
    LicenseNFT: 'LicenseNFT',
};

export const eventTypes = {
    MINTED: 'Minted',
    BURNED: 'Burned',
};

export const tokenTypeOptions = [
    {
        label: '전체 보기',
        value: null,
    },
    {
        label: tokenTypes.AssetNFT,
        value: tokenTypes.AssetNFT,
    },
    {
        label: tokenTypes.CopyrightNFT,
        value: tokenTypes.CopyrightNFT,
    },
    {
        label: tokenTypes.LicenseNFT,
        value: tokenTypes.LicenseNFT,
    },
];

export const eventTypeOptions = [
    {
        label: '전체 보기',
        value: null,
    },
    {
        label: eventTypes.MINTED,
        value: eventTypes.MINTED,
    },
    {
        label: eventTypes.BURNED,
        value: eventTypes.BURNED,
    },
];

function EventsPageTop() {
    const {
        eventList,
        setEventList,
        allEventList,
        setAllEventList,
        setIsToggleReset,
        pagination,
        setPagination,
        setFilterQueryParams,
    } = useEventCtx();
    const { calcExportEventData } = useEvent();

    const [initialFormState] = useState({
        tokenId: { value: null, error: null },
        tokenType: { value: null, error: null },
        eventType: { value: null, error: null },
    });

    const { onChange, onChangeWithoutEvent, onChangeFile, formState, onError, resetFormFields } =
        useForm(initialFormState);

    async function handleFilter(e) {
        e.preventDefault();
        try {
            const queryParams = {};
            if (formState?.tokenId?.value) {
                queryParams['tokenId'] = formState?.tokenId?.value;
            }
            if (formState?.tokenType?.value) {
                queryParams['tokenType'] = formState?.tokenType?.value;
            }
            if (formState?.eventType?.value) {
                queryParams['eventType'] = formState?.eventType?.value;
            }
            setFilterQueryParams({
                tokenId: formState?.tokenId?.value,
                tokenType: formState?.tokenType?.value,
                eventType: formState?.eventType?.value,
            });
            const res = await EventServices.getEventList({
                queryParams: {
                    tokenId: formState?.tokenId?.value,
                    tokenType: formState?.tokenType?.value,
                    eventType: formState?.eventType?.value,
                },
            });

            setPagination((prev) => ({
                ...prev,
                totalElement: res?.totalItems,
                itemsPerPage: res?.perPage,
                currentPage: res?.page,
            }));
            setEventList(res);
        } catch (e) {
            console.error(e);
        }
    }

    const [exportEventData, setExportEventData] = useState(null);

    function handleClickExportBtn() {
        if (eventList) {
            EventServices.getAllEvents({ perPage: eventList?.totalItems }).then((res) => {
                setAllEventList(res);
                calcExportEventData(res?.items).then((calcedEvents) =>
                    setExportEventData(calcedEvents),
                );
            });
        }
    }

    function handleReset() {
        resetFormFields();
        setIsToggleReset((prev) => !prev);
    }

    const exportHeaders = {
        type: '토큰 타입',
        tokenId: '토큰 아이디',
        assetTokenId: '트랜잭션 해쉬',
        owner: '블록넘버',
        name: '이벤트 유형',
    };
    return (
        <>
            <Card className='overflow-visible'>
                <CardBody>
                    <ExportBtn
                        onClick={handleClickExportBtn}
                        data={exportEventData}
                        exportHeaders={exportHeaders}
                    />
                </CardBody>
            </Card>
            <Card className='min-w-0 shadow-xs bg-white dark:bg-gray-800 mb-5'>
                <CardBody>
                    <form className='py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex md:flex-col'>
                        <div className='flex items-center gap-2 w-full'>
                            <InputText
                                name='tokenId'
                                value={formState?.tokenId?.value}
                                onChange={onChange}
                                placeholder='search event by tokenId'
                            />
                            <Select
                                name='tokenType'
                                options={tokenTypeOptions}
                                onChange={onChange}
                                defaultValue={tokenTypeOptions[0]}
                            />
                            <Select
                                name='eventType'
                                options={eventTypeOptions}
                                defaultValue={eventTypeOptions[0]}
                                onChange={onChange}
                            />
                            <Btn onClick={handleFilter}>Filter</Btn>
                            <ResetBtn onClick={handleReset}>Reset</ResetBtn>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </>
    );
}

export default EventsPageTop;
