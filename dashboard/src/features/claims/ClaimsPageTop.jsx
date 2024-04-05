import React, { useState } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { useClaimsCtx } from './useClaimsCtx';
import ExportBtn from '@/components/ui/button/ExportBtn';
import useForm from '@/components/ui/form/store/useForm';
import Select from '@/components/ui/form/elements/select/_choices/simpleSelect/Select';
import InputText from '@/components/ui/form/elements/input/InputText';
import Btn from '@/components/ui/button/Button';
import ResetBtn from '@/components/ui/button/ResetBtn';
import ClaimsServices from './ClaimsServices';
import useClaims, { processStatusOptions } from '../place/useClaims';

export const tokenTypes = {
    All: '전체 보기',
    AssetNFT: 'AssetNFT',
    CopyrightNFT: 'CopyrightNFT',
    LicenseNFT: 'LicenseNFT',
};

export const eventTypes = {
    MINTED: 'Minted',
    BURNED: 'Burned',
};

function ClaimsPageTop() {
    const {
        claimList,
        setClaimList,
        allClaimList,
        setAllClaimList,
        setIsToggleReset,
        setPagination,
        setClaimsListQueryParams,
        exportEventData,
    } = useClaimsCtx();
    const { calcExportClaimData, getClaimsExportData } = useClaims();

    const [initialFormState] = useState({
        searchWord: { value: null, error: null },
        processStatus: { value: null, error: null },
    });

    const {
        onChange,
        onChangeWithoutEvent,
        onChangeFile,
        formState,
        onError,
        resetFormFields,
        resetFormField,
        setValueField,
    } = useForm(initialFormState);

    async function handleFilter(e) {
        e.preventDefault();
        try {
            const queryParams = {};
            if (formState?.searchWord?.value) {
                queryParams['searchWord'] = formState?.searchWord?.value;
            }
            if (formState?.processStatus?.value) {
                queryParams['processStatus'] = formState?.processStatus?.value;
            }
            setClaimsListQueryParams(queryParams);
            const res = await ClaimsServices.getClaimList(queryParams);
            setPagination((prev) => ({
                ...prev,
                totalElement: res?.result?.totalElements,
                itemsPerPage: res?.result?.size,
                currentPage: 1,
            }));
            setClaimList(res);
        } catch (e) {
            console.error(e);
        }
    }

    function handleClickExportBtn() {
        // if (claimList) {
        //     ClaimsServices.getClaimList({ perPage: claimList?.totalItems }).then((res) => {
        //         setAllClaimList(res);
        //         calcExportClaimData(res?.items).then((calcedEvents) =>
        //             setExportEventData(calcedEvents),
        //         );
        //     });
        // }
        const queryParams = {};
        if (formState?.searchWord?.value) {
            queryParams['searchWord'] = formState?.searchWord?.value;
        }
        if (formState?.processStatus?.value) {
            queryParams['processStatus'] = formState?.processStatus?.value;
        }
        getClaimsExportData(queryParams);
    }

    function handleReset(e) {
        e.preventDefault();
        resetFormField('searchWord');
        setValueField('processStatus', '처리현황');
        setIsToggleReset((prev) => !prev);
    }

    const exportHeaders = {
        id: '신고자 ID',
        reason: '신고유형',
        processStatus: '처리현황',
        description: '신고사유',
        reporterName: '신고자',
        assetId: '에셋ID',
        assetToken: '에셋 토큰',
        assetTitle: '에셋 이름',
    };

    return (
        <>
            <Card className='mb-5 overflow-visible'>
                <CardBody>
                    <ExportBtn
                        onClick={handleClickExportBtn}
                        data={exportEventData}
                        exportHeaders={exportHeaders}
                    />
                </CardBody>
            </Card>
            <Card className='min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5'>
                <CardBody>
                    <form className='py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex md:flex-col'>
                        <div className='flex items-center gap-2 w-full'>
                            <InputText
                                name='searchWord'
                                value={formState?.searchWord?.value}
                                onChange={onChange}
                                placeholder='Search Claim by assetId/claimer'
                            />
                            <Select
                                name='processStatus'
                                options={processStatusOptions}
                                onChange={onChange}
                                placeholder='처리현황'
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

export default ClaimsPageTop;
