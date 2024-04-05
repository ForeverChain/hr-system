import {
    Card,
    CardBody,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
} from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';

//internal import
import UploadManyTwo from '@/components/ui/common/UploadManyTwo';
import CustomerTable from '@/features/user/UsersTable';
import NotFound from '@/components/ui/table/NotFound';
import PageTitle from '@/components/ui/Typography/PageTitle';
import useFilter from '@/common/hooks/useFilter';
import { customerData } from '@/assets/data';
import useUsers from './useUsers';
import { useUsersCtx } from './useUsersCtx';
import InputText from '@/components/ui/form/elements/input/InputText';
import TablePagination from '@/components/ui/pagination/TablePagination';
import ExportBtn from '@/components/ui/button/ExportBtn';

export default function UsersList() {
    const { getAllCustomersList, getExportCustomersList } = useUsers();
    const { usersList, usersExportList } = useUsersCtx();
    const [searchingText, setSearchingText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElement, setTotalElement] = useState(1);
    const itemPerPage = 20;
    const exportHeaders = {
        id: '아이디',
        username: '사용자 이름',
        name: '이름',
        email: '이메일',
        createdDate: '가입일자',
        address: '주소',
        phone: '전화번호',
        walletAddress: '지갑 주소',
    };

    const { dataTable, serviceData, handleSubmitUser } = useFilter(usersList);

    function handleSearch(e) {
        e.preventDefault();
        getAllCustomersList(searchingText).then((res) => {
            setTotalElement(res?.result?.totalElements);
            setCurrentPage(res?.result?.number + 1);
        });
    }

    function handleReset(e) {
        e.preventDefault();
        setSearchingText('');
        getAllCustomersList();
    }

    useEffect(() => {
        getAllCustomersList(searchingText, currentPage - 1).then((res) => {
            setTotalElement(res?.result?.totalElements);
            setCurrentPage(res?.result?.number + 1);
        });
    }, [currentPage]);

    return (
        <>
            <PageTitle>Users</PageTitle>
            <Card className='min-w-0 shadow-xs overflow-visible bg-white dark:bg-gray-800 mb-5'>
                <CardBody>
                    <form className='py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex'>
                        <div className='items-center'>
                            <ExportBtn
                                onClick={() => getExportCustomersList(searchingText)}
                                data={usersExportList}
                                exportHeaders={exportHeaders}
                                fileName='CustomersListCSV'
                            />
                        </div>
                    </form>
                </CardBody>
            </Card>

            <Card className='min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5'>
                <CardBody>
                    <form
                        onSubmit={handleSearch}
                        className='py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex'
                    >
                        <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                            <InputText
                                value={searchingText}
                                type='search'
                                onChange={(e) => setSearchingText(e.target.value)}
                                placeholder='Search by name/email/wallet_address'
                            />
                            <button type='submit' className='absolute right-0 top-0 mt-5 mr-1' />
                        </div>
                        <div className='flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                            <div className='w-full mx-1'>
                                <button
                                    onClick={(e) => handleSearch(e)}
                                    className='h-12 w-full bg-emerald-700 rounded-lg text-white'
                                >
                                    Filter
                                </button>
                            </div>

                            <div className='w-full mx-1'>
                                <button
                                    type='reset'
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
                                    <TableCell>지갑주소</TableCell>
                                    <TableCell>가입일자</TableCell>
                                    <TableCell className='text-right'>Actions</TableCell>
                                </tr>
                            </TableHeader>
                            <CustomerTable customers={dataTable} />
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
