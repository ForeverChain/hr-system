import React, { useContext, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

//internal import

import {
    Button,
    Card,
    CardBody,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
} from '@windmill/react-ui';
import Title from '@/components/ui/form/others/Title';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import { FormProvider } from '@/components/ui/form/store/useFormCtx';
import UserEditForm from '../UserEditForm';
import UserAddForm from '../UserAddForm';
import { useUsersCtx } from '../useUsersCtx';
import useUsers from '../useUsers';
import AdminDrawerForm from '../form/AdminDrawerForm';
import AdminDrawerFormEdit from '../form/AdminDrawerFormEdit';

function CustomerDrawer({ id, isItInfo }) {
    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
    const { usersDetail } = useUsersCtx();

    const [addDrawerOpen, setAddDrawerOpen] = useState(false);
    const [editDrawerOpen, setEditDrawerOpen] = useState(false);
    const { getCustomersDetail, getExportCustomersList, addHr, getHrDetail } = useUsers();

    useEffect(() => {
        if (id) {
            getCustomersDetail(id);
        }
    }, [id]);

    // console.log("formState: ", formState);

    // async function getCustomersDetail() {
    //     const res = await await CustomerServices.getCustomerById(id);
    //     return res;
    // }

    const [newHRData, setNewHRData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        school: '',
        educationDegrees: '',
        educationStartDate: '',
        educationEndDate: '',
        job: '',
        gpa: '',
        courseName: '',
        courseStartDate: '',
        courseEndDate: '',
        acquiredSkill: '',
        companyName: '',
        languageName: '',
        reading: '',
        listening: '',
        writing: '',
        speaking: '',
        company: '',
        role: '',
        workStartDate: '',
        workEndDate: '',
        quitJobReason: '',
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
        addHr(newHRData);
        // setNewHRData({
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        //     phoneNumber: '',
        //     country: '',
        //     school: '',
        //     educationDegrees: '',
        //     educationStartDate: '',
        //     educationEndDate: '',
        //     job: '',
        //     gpa: '',
        //     courseName: '',
        //     courseStartDate: '',
        //     courseEndDate: '',
        //     acquiredSkill: '',
        //     companyName: '',
        //     languageName: '',
        //     reading: '',
        //     listening: '',
        //     writing: '',
        //     speaking: '',
        //     company: '',
        //     role: '',
        //     workStartDate: '',
        //     workEndDate: '',
        //     quitJobReason: '',
        // });
    }

    useEffect(() => {
        if (id) {
            getCustomersDetail(id);
        }
    }, [id]);

    return (
        <>
            <div className='w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                {isItInfo ? (
                    <Title title={`Users/ ${id}`} />
                ) : (
                    <Title title={`Users/ ${id}/edit`} />
                )}
            </div>
            <Scrollbars className='w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200'>
                <FormProvider>
                    {isDrawerOpen &&
                        (id && usersDetail ? (
                            <AdminDrawerFormEdit id={id} />
                        ) : (
                            <AdminDrawerForm id={id} />
                        ))}
                </FormProvider>
            </Scrollbars>
        </>
    );
}

export default CustomerDrawer;
