import React, { useContext } from 'react';
import Switch from 'react-switch';

//internal import

import AdminServices from '@/features/admin/AdminServices';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import { notifyError, notifySuccess } from '@/utils/toast';

function ActiveInActiveButton({ id, status, option, staff }) {
    const { setIsUpdate } = useContext(SidebarContext);
    const handleChangeStatus = async (id, staff) => {
        // return notifyError("This Feature is disabled for demo!");
        try {
            let newStatus;
            if (status === 'Active') {
                newStatus = 'Inactive';
            } else {
                newStatus = 'Active';
            }
            const res = await AdminServices.updateStaffStatus(id, {
                status: newStatus,
            });
            setIsUpdate(true);
            notifySuccess(res.message);
        } catch (err) {
            notifyError(err ? err?.response?.data?.message : err?.message);
        }
    };

    return (
        <>
            <Switch
                onChange={() => handleChangeStatus(id, staff)}
                checked={status === 'Active'}
                className='react-switch md:ml-0'
                uncheckedIcon={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            width: 120,
                            fontSize: 14,
                            color: 'white',
                            paddingRight: 22,
                            paddingTop: 1,
                        }}
                    />
                }
                width={30}
                height={15}
                handleDiameter={13}
                offColor='#E53E3E'
                onColor='#2F855A'
                checkedIcon={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 73,
                            height: '100%',
                            fontSize: 14,
                            color: 'white',
                            paddingLeft: 20,
                            paddingTop: 1,
                        }}
                    />
                }
            />
        </>
    );
}

export default ActiveInActiveButton;
