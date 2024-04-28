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
    const { getAllAdminsList, addAdmin } = useAdmins();
    const { adminsList, setTotalElement, currentPage, setCurrentPage, totalElement, itemPerPage } =
        useAdminCtx();
    const [searchingText, setSearchingText] = useState('');
    const { dataTable, serviceData, handleSubmitUser } = useFilter(adminsList);
    const { handleUpdate, serviceId } = useToggleDrawer();
    function handleSearch(e) {
        e.preventDefault();
        getAllAdminsList(searchingText).then((res) => {
            // setTotalElement(res?.result?.totalElements);
            // setCurrentPage(res?.result?.number + 1);
        });
    }

    const [newHRData, setNewHRData] = useState({
        userName: '',
        password: '',
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewHRData({
            ...newHRData,
            [name]: value,
        });
    }

    function handleSubmitNewHR(event) {
        event.preventDefault();

        addAdmin(newHRData);
        setNewHRData({
            userName: '',
            password: '',
        });
    }

    function handleReset(e) {
        e.preventDefault();
        setSearchingText('');
        getAllAdminsList();
    }
    useEffect(() => {
        getAllAdminsList(searchingText).then((res) => {});
    }, [currentPage]);

    return (
        <>
            <PageTitle>Hr</PageTitle>
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
                                placeholder='HR нэрээр хайх'
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
                                    + Шинэ HR нэмэх
                                </button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </Card>
            <TableContainer className='mb-8'>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>ID</TableCell>
                            <TableCell>Хэрэглэгчийн нэр</TableCell>
                            <TableCell>Хэрэглэгчийн нууц үг</TableCell>
                            <TableCell className='text-right'>Үйлдэл</TableCell>
                        </tr>
                    </TableHeader>
                    <AdminTable admins={dataTable} />
                </Table>
            </TableContainer>
        </>
    );
}
