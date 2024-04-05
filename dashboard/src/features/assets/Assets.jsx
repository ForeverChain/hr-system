import React, { useEffect, useState } from 'react';
import {
    Card,
    Button,
    CardBody,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
} from '@windmill/react-ui';
import AssetDrawer from './AssetDrawer';
import MainDrawer from '@/components/layout/drawer/MainDrawer';
import PageTitle from '@/components/ui/Typography/PageTitle';
import InputText from '@/components/ui/form/elements/input/InputText';
import Select from '@/components/ui/form/elements/select/_choices/simpleSelect/Select';
import Btn from '@/components/ui/button/Button';
import ResetBtn from '@/components/ui/button/ResetBtn';
import useForm from '@/components/ui/form/store/useForm';
import { useAssetsCtx } from './useAssetCtx';
import useAsset from './useAsset';
import NotFound from '@/components/ui/table/NotFound';
import PlatformTable from '../platforms/PlatformTable';
import TablePagination from '@/components/ui/pagination/TablePagination';
import CheckBox from '@/components/ui/form/others/CheckBox';
import AssetTable from './AssetTable';
import useToggleDrawer from '@/common/hooks/useToggleDrawer';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import { POPUP_TYPES } from '@/common/popup/popupRegistration';
import ExportBtn from '@/components/ui/button/ExportBtn';
import useSelect from '@/components/ui/form/elements/select/useSelect';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';

// const selectOptions = [
//     {
//         label: '전체 보기',
//         value: '',
//     },
//     {
//         label: 'Unity',
//         value: '1',
//     },
//     {
//         label: 'Unreal',
//         value: '2',
//     },
//     {
//         label: 'WebXR',
//         value: '3',
//     },
// ];

const selectOptions1 = [
    {
        label: '전체 보기',
        value: '',
    },
    {
        label: '재판매가능',
        value: 'resaleAllowed',
    },
    {
        label: '수익화가능',
        value: 'commercialAllowed',
    },
    {
        label: '재판매/수익화가능',
        value: 'ALL',
    },
];

export default function Assets() {
    const { getAllAssetList, getPlatforms, getAssetExportData } = useAsset();
    const [initialFormState] = useState({
        search: { value: '', error: null },
        platform: { value: '', error: null },
        termsofuse: { value: '', error: null },
    });
    const {
        assetsList,
        currentPage,
        setCurrentPage,
        totalElement,
        itemPerPage,
        exportAssetData,
        setIsToggleReset,
        isToggleReset,
    } = useAssetsCtx();
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const { serviceId } = useToggleDrawer();
    const { showPopup, setPopupState } = usePopupCtx();
    const { platformList } = useGlobalCtx();
    const [platformOptions, setPlatformOptions] = useState([]);
    const exportHeaders = {
        id: '아이디',
        type: '플랫폼',
        title: '제목',
        thumbnailUrl: '썸네일URL',
        createdDate: '발행 일자',
        token: '토큰',
        isReported: '신고 여부',
        commercialAllowed: '수익화 가능',
        resaleAllowed: '재판매 가능',
        tags: '태그',
    };

    const { onChange, formState, resetFormFields } = useForm(initialFormState);

    function handleSubmit(e) {
        e.preventDefault();
        try {
            const payload = {
                page: 0,
                searchText: formState?.search?.value,
                platformId: formState?.platform?.value && +formState?.platform?.value,
                terms: formState?.termsofuse?.value,
            };
            getAllAssetList(payload).then((res) => {
                res && setCurrentPage(1);
            });
        } catch (e) {
            console.error(e);
        }
    }

    function openModalDeleteMany(e) {
        e.preventDefault();
        showPopup(POPUP_TYPES.DELETE_ASSET_MANY);
        setPopupState((prev) => ({ ...prev, deletingAssetList: isCheck }));
    }

    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(assetsList?.map((li) => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    function handleReset() {
        resetFormFields();
        setIsToggleReset((prev) => !prev);
        getAllAssetList({ page: +currentPage - 1 });
    }

    useEffect(() => {
        const payload = {
            page: +currentPage - 1,
            searchText: formState?.search?.value,
            platformId: formState?.platform?.value && +formState?.platform?.value,
            terms: formState?.termsofuse?.value,
        };
        getAllAssetList(payload);
        getPlatforms();
    }, [currentPage]);

    useEffect(() => {
        if (platformList) {
            const tempArr = [
                {
                    label: '전체 보기',
                    value: '',
                },
            ];
            platformList.forEach((platform) => {
                tempArr.push({
                    label: platform.name,
                    value: platform.id.toString(),
                });
            });
            setPlatformOptions(tempArr);
        }
    }, [platformList]);

    // console.log("exportAssetData: ", exportAssetData);

    return (
        <div>
            <PageTitle>Assets</PageTitle>

            <Card className='min-w-0 shadow-xs bg-white dark:bg-gray-800 mb-5 overflow-visible'>
                <CardBody className='flex justify-between'>
                    <form className='py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex'>
                        <div className=''>
                            <ExportBtn
                                onClick={() =>
                                    getAssetExportData({
                                        searchText: formState?.search?.value,
                                        platformId:
                                            formState?.platform?.value &&
                                            +formState?.platform?.value,
                                        terms: formState?.termsofuse?.value,
                                    })
                                }
                                data={exportAssetData}
                                exportHeaders={exportHeaders}
                                fileName='assetListCSV'
                            />
                        </div>
                    </form>
                    <div className='py-3 flex gap-4'>
                        <Button
                            className='h-10 w-full bg-rose-600  hover:bg-rose-800 py-3'
                            onClick={(e) => openModalDeleteMany(e)}
                            type='submit'
                            disabled={isCheck.length === 0}
                        >
                            삭제
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Card className='min-w-0 shadow-xs bg-white dark:bg-gray-800 mb-5'>
                <CardBody>
                    <form
                        className='py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex'
                        onSubmit={handleSubmit}
                    >
                        <div className='min-w-[300px]'>
                            <InputText
                                name='search'
                                value={formState?.search?.value}
                                onChange={onChange}
                                placeholder='Search Asset by name/tag'
                            />
                        </div>
                        <Select
                            name='platform'
                            options={platformOptions}
                            defaultValue={platformOptions[0]?.label}
                            onChange={onChange}
                            placeholder='플랫폼'
                            isReset={isToggleReset}
                        />
                        <Select
                            name='termsofuse'
                            options={selectOptions1}
                            defaultValue={selectOptions1[0].label}
                            placeholder='이용조건'
                            onChange={onChange}
                            isReset={isToggleReset}
                        />
                        <Btn onClick={handleSubmit}>Filter</Btn>
                        <ResetBtn onClick={handleReset}>Reset</ResetBtn>
                    </form>
                </CardBody>
            </Card>

            {assetsList?.length !== 0 ? (
                <TableContainer className='mb-8'>
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>
                                    <CheckBox
                                        type='checkbox'
                                        name='selectAll'
                                        id='selectAll'
                                        handleClick={handleSelectAll}
                                        isChecked={isCheckAll}
                                    />
                                </TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>플랫폼</TableCell>
                                <TableCell>이용조건</TableCell>
                                <TableCell>AssetNFT ID</TableCell>
                                <TableCell>태그</TableCell>
                                <TableCell>View</TableCell>
                                <TableCell className='text-right'>Actions</TableCell>
                            </tr>
                        </TableHeader>
                        <AssetTable
                            assetsList={assetsList}
                            isCheck={isCheck}
                            setIsCheck={setIsCheck}
                        />
                    </Table>
                    <TableFooter>
                        <TablePagination
                            totalItems={totalElement}
                            itemsPerPage={itemPerPage}
                            onPageChange={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </TableFooter>
                </TableContainer>
            ) : (
                <NotFound title='데이터 없음.' />
            )}
        </div>
    );
}
