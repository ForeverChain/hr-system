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
import { FiUploadCloud } from 'react-icons/fi';
//internal import
import NotFound from '@/components/ui/table/NotFound';
import PageTitle from '@/components/ui/Typography/PageTitle';
import useFilter from '@/common/hooks/useFilter';
import { adminData } from '@/assets/data';
import AdminTable from './AdminTable';
import MainDrawer from '@/components/layout/drawer/MainDrawer';
import AdminsDrawer from './adminsDrawer/AdminsDrawer';
import useToggleDrawer from '@/common/hooks/useToggleDrawer';
import InputText from '@/components/ui/form/elements/input/InputText';
import TablePagination from '@/components/ui/pagination/TablePagination';
import useAdmins from './useAdmins';
import { useAdminCtx } from './useAdminCtx';

export default function Admins() {
    const { getAllAdminsList } = useAdmins();
    const { adminsList, setTotalElement, currentPage, setCurrentPage, totalElement, itemPerPage } =
        useAdminCtx();
    const [searchingText, setSearchingText] = useState('');
    const { dataTable, serviceData, handleSubmitUser } = useFilter(adminsList);
    const { handleUpdate, serviceId } = useToggleDrawer();

    function handleSearch(e) {
        e.preventDefault();
        getAllAdminsList(searchingText).then((res) => {
            setTotalElement(res?.result?.totalElements);
            setCurrentPage(res?.result?.number + 1);
        });
    }

    function handleReset(e) {
        e.preventDefault();
        setSearchingText('');
        getAllAdminsList();
    }

    useEffect(() => {
        getAllAdminsList(searchingText).then((res) => {
            setTotalElement(res?.result?.totalElements).then((res) => {
                setTotalElement(res?.result?.totalElements);
                setCurrentPage(res?.result?.number + 1);
            });
        });
    }, [currentPage]);

    return (
        <>
            <PageTitle>Admins</PageTitle>

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
                                placeholder='Search by name/email'
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
                                    + New admin
                                </button>
                            </div>
                            <div className='w-full mx-1'>
                                <button
                                    type='button'
                                    onClick={(e) => handleSearch(e)}
                                    className='h-12 w-full bg-emerald-700 rounded-lg text-white'
                                >
                                    Filter
                                </button>
                            </div>

                            <div className='w-full mx-1'>
                                <button
                                    type='button'
                                    onClick={(e) => handleReset(e)}
                                    className='px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700 rounded-lg border w-full'
                                >
                                    <span className='text-black dark:text-gray-200'>Reset</span>
                                </button>
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
                                    <TableCell>ID</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>가입일자</TableCell>
                                    <TableCell className='text-right'>Actions</TableCell>
                                </tr>
                            </TableHeader>
                            <AdminTable admins={dataTable} />
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
