import React, { useState } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { usePlaceCtx } from './usePlaceCtx';
import ExportBtn from '@/components/ui/button/ExportBtn';
import useForm from '@/components/ui/form/store/useForm';
import Select from '@/components/ui/form/elements/select/_choices/simpleSelect/Select';
import InputText from '@/components/ui/form/elements/input/InputText';
import Btn from '@/components/ui/button/Button';
import ResetBtn from '@/components/ui/button/ResetBtn';
import ClaimsServices from './place.service';
import useClaims, { processStatusOptions } from './useClaims';
import useToggleDrawer from '@/common/hooks/useToggleDrawer';

import { usePopupCtx } from '@/common/popup/usePopupCtx';
import { POPUP_TYPES } from '@/common/popup/popupRegistration';
import usePlace from './usePlace';

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

function PlacePageTop() {
    const {
        claimList,
        setClaimList,
        allClaimList,
        setAllClaimList,
        setIsToggleReset,
        setPagination,
        setClaimsListQueryParams,
        exportEventData,
    } = usePlaceCtx();
    const { calcExportClaimData, getClaimsExportData } = useClaims();

    const [initialFormState] = useState({
        searchWord: { value: null, error: null },
        processStatus: { value: null, error: null },
    });

    const { getAllAdminsList, getExportCustomersList, addHr } = usePlace();

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

    const { showPopup, setPopupState } = usePopupCtx();

    const [searchingText, setSearchingText] = useState('');

    function openModal(rowInfo) {
        showPopup(POPUP_TYPES.CREATE_INTERVIEW);
        setPopupState((prev) => ({ ...prev, deletingAdminInfo: rowInfo }));
    }
    function handleSearch(e) {
        e.preventDefault();
        getAllAdminsList(searchingText).then((res) => {
            // setTotalElement(res?.result?.totalElements);
            // setCurrentPage(res?.result?.number + 1);
        });
    }

    function handleClickExportBtn() {
        const queryParams = {};
        if (formState?.searchWord?.value) {
            queryParams['searchWord'] = formState?.searchWord?.value;
        }
        if (formState?.processStatus?.value) {
            queryParams['processStatus'] = formState?.processStatus?.value;
        }
        getClaimsExportData(queryParams);
    }

    const { handleUpdate, serviceId } = useToggleDrawer();

    return (
        <>
            <Card className='min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5'>
                {/* <form className='py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex md:flex-col'>
                        <div className='flex items-center gap-2 w-full'>
                            <Btn onClick={openModal}>Шинээр ярилцлага эхлүүлэх</Btn>
                        </div>

                        
                    </form> */}

                <Card className='min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5'>
                    <CardBody>
                        <form
                            onSubmit={handleSearch}
                            className='py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex'
                        >
                            <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                                <InputText
                                    value={searchingText}
                                    onChange={(e) => setSearchingText(e.target.value)}
                                    placeholder='Ажил горилргчийн нэрээр хайх'
                                />
                                <button className='absolute right-0 top-0 mt-5 mr-1' />
                            </div>
                            <div className='flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                                <div className='w-full mx-1'>
                                    <button
                                        type='button'
                                        className='h-12 w-full bg-emerald-900 rounded-lg text-white'
                                        onClick={(e) => handleUpdate(null)}
                                    >
                                        + Шинэ ажил горилогч нэмэх
                                    </button>
                                </div>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </Card>
        </>
    );
}

export default PlacePageTop;
