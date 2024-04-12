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
import useToggleDrawer from '@/common/hooks/useToggleDrawer';

export default function UsersList() {
    const { getAllCustomersList, getExportCustomersList, addHr } = useUsers();
    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
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
        getAllCustomersList(searchingText).then((res) => {});
    }

    function handleReset(e) {
        e.preventDefault();
        setSearchingText('');
        getAllCustomersList();
    }

    useEffect(() => {
        getAllCustomersList(searchingText, currentPage - 1).then((res) => {});
    }, [currentPage]);

    return (
        <>
            <PageTitle>Ажил горилогч</PageTitle>

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
                                placeholder='Админ нэрээр хайх'
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
                                    <TableCell>Овог</TableCell>
                                    <TableCell>Нэр</TableCell>
                                    <TableCell>Имэйл</TableCell>
                                    <TableCell>Утасны дугаар</TableCell>
                                    <TableCell className='text-right'>Үйлдэл</TableCell>
                                </tr>
                            </TableHeader>
                            <CustomerTable customers={dataTable} />
                        </Table>
                    </TableContainer>
                ) : (
                    <NotFound title='데이터 없음.' />
                )
            }
        </>
    );
}
