import React, { useCallback, useState } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { useNftCtx } from './useNftCtx';
import ExportBtn from '@/components/ui/button/ExportBtn';
import useForm from '@/components/ui/form/store/useForm';
import Select from '@/components/ui/form/elements/select/_choices/simpleSelect/Select';
import InputText from '@/components/ui/form/elements/input/InputText';
import Btn from '@/components/ui/button/Button';
import ResetBtn from '@/components/ui/button/ResetBtn';
import NftServices from './NftServices';
import useNFt from './useNFt';
import { tokenTypeOptions } from '../event/EventsPageTop';
import { useFormCtx } from '@/components/ui/form/store/useFormCtx';

export const tokenTypes = {
    AssetNFT: 'AssetNFT',
    CopyrightNFT: 'CopyrightNFT',
    LicenseNFT: 'LicenseNFT',
};

export const eventTypes = {
    MINTED: 'Minted',
    BURNED: 'Burned',
};

const searchTypeOptions = [
    {
        label: 'tokenId',
        value: 'tokenId',
    },
    {
        label: 'assetTokenId',
        value: 'assetTokenId',
    },
    {
        label: 'owner',
        value: 'owner',
    },
];

function NftPageTop() {
    const {
        nftList,
        setNftList,
        setPagination,
        setAllNftList,
        setIsToggleReset,
        isToggleReset,
        setFilterQueryParams,
    } = useNftCtx();
    const { calcExportNftData } = useNFt();

    const [initialFormState] = useState({
        searchType: { value: 'tokenId', error: null },
        tokenId: { value: null, error: null },
        tokenType: { value: null, error: null },
        eventType: { value: null, error: null },
    });

    const {
        onChange,
        onChangeWithoutEvent,
        onChangeFile,
        formState,
        onError,
        resetFormFields,
        resetFormField,
    } = useForm(initialFormState);

    async function handleFilter(e) {
        e.preventDefault();
        try {
            const queryParams = {};
            if (formState?.searchValue?.value) {
                queryParams['searchType'] = formState?.searchType?.value;
            }
            if (formState?.searchValue?.value) {
                queryParams['searchValue'] = formState?.searchValue?.value;
            }
            if (formState?.tokenType?.value) {
                queryParams['tokenType'] = formState?.tokenType?.value;
            }
            setFilterQueryParams(queryParams);
            const res = await NftServices.getNftList({
                queryParams,
            });

            res &&
                setPagination((prev) => ({
                    ...prev,
                    totalElement: res?.totalItems,
                    itemsPerPage: res?.perPage,
                    currentPage: res?.page,
                }));
            setNftList(res);
        } catch (e) {
            console.error(e);
        }
    }

    const [exportEventData, setExportEventData] = useState(null);

    const generateNftSearchPlaceholder = useCallback(() => {
        switch (formState?.searchType?.value) {
            case 'tokenId': {
                return 'tokenId';
            }
            case 'assetTokenId': {
                return 'assetTokenId';
            }
            case 'owner': {
                return 'owner';
            }
            default:
                return 'tokenId';
        }
    }, [formState]);

    function handleClickExportBtn() {
        if (nftList) {
            NftServices.getAllNft({ perPage: nftList?.totalItems }).then((res) => {
                setAllNftList(res);
                calcExportNftData(res?.items).then((calcedEvents) =>
                    setExportEventData(calcedEvents),
                );
            });
        }
    }

    function handleReset() {
        resetFormFields();
        setIsToggleReset((prev) => !prev);
        setFilterQueryParams(null);
    }

    const exportHeaders = {
        type: '토큰 타입',
        tokenId: '토큰ID',
        assetTokenId: '에셋토큰ID',
        owner: '소유자',
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
                            <Select
                                name='searchType'
                                options={searchTypeOptions}
                                onChange={onChange}
                                placeholder='검색 종류'
                                isReset={isToggleReset}
                            />
                            <InputText
                                name='searchValue'
                                value={formState?.searchValue?.value}
                                onChange={onChange}
                                placeholder={`search event by ${generateNftSearchPlaceholder()}`}
                            />
                            <Select
                                name='tokenType'
                                options={tokenTypeOptions}
                                onChange={onChange}
                                placeholder='토큰 타입'
                                isReset={isToggleReset}
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

export default NftPageTop;
