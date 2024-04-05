import {
    Card,
    Button,
    CardBody,
    Input,
    Pagination,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
} from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

//internal import
import UploadManyTwo from '@/components/ui/common/UploadManyTwo';
import CustomerTable from '@/features/user/UsersTable';
import TableLoading from '@/components/ui/preloader/TableLoading';
import NotFound from '@/components/ui/table/NotFound';
import PageTitle from '@/components/ui/Typography/PageTitle';
import useAsync from '@/common/hooks/useAsync';
import useFilter from '@/common/hooks/useFilter';
import { platformsData } from '@/assets/data';
import PlatformTable from './PlatformTable';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import { POPUP_TYPES } from '@/common/popup/popupRegistration';
import useToggleDrawer from '@/common/hooks/useToggleDrawer';
import CheckBox from '@/components/ui/form/others/CheckBox';
import usePlatform from './usePlatform';
import { usePlatformCtx } from './usePlatformCtx';
import InputText from '@/components/ui/form/elements/input/InputText';
import ExportBtn from '@/components/ui/button/ExportBtn';
import TablePagination from '@/components/ui/pagination/TablePagination';

export default function Platforms() {
    const {
        userRef,
        dataTable,
        serviceData,
        setSearchUser,
        totalResults,
        resultsPerPage,
        handleSubmitUser,
        handleChangePage,
    } = useFilter(platformsData);
    const { getAllPlatFormList, getExportPlatFormList } = usePlatform();
    const {
        platformList,
        setCurrentPage,
        exportPlatformData,
        totalElement,
        itemPerPage,
        currentPage,
    } = usePlatformCtx();

    const { t } = useTranslation();

    const { showPopup, setPopupState } = usePopupCtx();
    const { handleUpdate } = useToggleDrawer();
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [searchingText, setSearchingText] = useState('');
    const exportHeaders = {
        id: '아이디',
        name: '이름',
        description: '설명',
        createdDate: '등록일자',
        image: '이미지',
    };

    function deleteSelectedPlatforms() {
        showPopup(POPUP_TYPES.DELETE_PLATFORM_MANY);
        setPopupState((prev) => ({ ...prev, deletingPlatformsList: isCheck }));
    }

    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(platformList?.filter((li) => !li.assetExist).map((li) => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        try {
            const payload = {
                page: 0,
                searchText: searchingText,
            };
            getAllPlatFormList(payload).then((res) => {
                setCurrentPage(res?.result?.number + 1);
            });
        } catch (e) {
            console.error(e);
        }
    }

    const handleReset = (e) => {
        e.preventDefault();
        setSearchingText('');
        getAllPlatFormList();
    };

    useEffect(() => {
        getAllPlatFormList().then((res) => {
            setCurrentPage(res?.result?.number + 1);
        });
    }, [currentPage]);

    useEffect(() => {
        const allSelectablePlatForm = platformList?.filter((li) => !li.assetExist);
        setIsCheckAll(isCheck?.length === allSelectablePlatForm?.length);
    }, [isCheck]);

    return (
        <>
            <Card className='min-w-0 overflow-visible shadow-xs bg-white dark:bg-gray-800 mb-5'>
                <CardBody className='flex justify-between'>
                    <form className='py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex'>
                        <div className='items-center'>
                            <ExportBtn
                                onClick={() => getExportPlatFormList({ searchText: searchingText })}
                                data={exportPlatformData}
                                exportHeaders={exportHeaders}
                                fileName='platformListCSV'
                            />
                        </div>
                    </form>
                    <div className='py-3 flex gap-4'>
                        <Button
                            className='h-10 w-full bg-rose-600  hover:bg-rose-800 py-3'
                            onClick={() => deleteSelectedPlatforms()}
                            type='submit'
                            disabled={isCheck.length === 0}
                        >
                            삭제
                        </Button>
                        <Button
                            className='h-10 w-full min-w-[120px] bg-emerald-900 py-3 break-keep'
                            onClick={handleUpdate}
                            type='submit'
                        >
                            + 플랫폼 추가
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Card className='min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5'>
                <CardBody>
                    <form
                        onSubmit={handleSubmit}
                        className='py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex'
                    >
                        <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                            <div className='min-w-[300px]'>
                                <InputText
                                    name='search'
                                    value={searchingText}
                                    onChange={(e) => setSearchingText(e.target.value)}
                                    placeholder='Search by Platform name'
                                />
                            </div>
                            <button type='submit' className='absolute right-0 top-0 mt-5 mr-1' />
                        </div>
                        <div className='flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                            <div className='w-full mx-1'>
                                <Button
                                    onClick={handleSubmit}
                                    className='h-12 w-full bg-emerald-700'
                                >
                                    Filter
                                </Button>
                            </div>

                            <div className='w-full mx-1'>
                                <Button
                                    layout='outline'
                                    onClick={handleReset}
                                    type='reset'
                                    className='px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700'
                                >
                                    <span className='text-black dark:text-gray-200'>Reset</span>
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </Card>

            {
                // loading ? (
                //     // <Loading loading={loading} />
                //     <TableLoading row={12} col={6} width={190} height={20} />
                // ) : error ? (
                //     <span className='text-center mx-auto text-red-500'>{error}</span>
                // ) :
                serviceData?.length !== 0 ? (
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
                                            isDisabled={!platformList?.some((e) => !e.assetExist)}
                                        />
                                    </TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>아이콘</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>설명</TableCell>
                                    <TableCell className='text-right'>Actions</TableCell>
                                </tr>
                            </TableHeader>
                            <PlatformTable
                                platforms={platformList}
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
                )
            }
        </>
    );
}
