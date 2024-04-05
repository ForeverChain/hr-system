import React from 'react';
import { useAdminCtx } from './useAdminCtx';
import AdminServices from './AdminServices';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';

export default function useAdmins() {
    const { setAdminsList, setAdminDetail, setTotalElement, setDashboardData } = useAdminCtx();
    const { setAuthState } = useGlobalCtx();

    async function getAllAdminsList(searchingText, page = 0) {
        try {
            const res = await AdminServices.getAllStaff({ searchText: searchingText, page })
                .then((res) => {
                    setAdminsList(res?.result?.content);
                    setTotalElement(res?.result?.totalElements);
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });

            return res;
        } catch (err) {
            console.error(err);
        }
    }

    async function getAdminDetail(id, body) {
        try {
            const res = await AdminServices.getStaffById(id, body)
                .then((res) => {
                    if (res?.message === 'success') {
                        setAdminDetail(res?.result);
                    }
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });
            return res;
        } catch (err) {
            console.error(err);
        }
    }

    async function getProfileInfo() {
        try {
            const res = await AdminServices.getProfileInfo();
            setAuthState(res?.result);
        } catch (e) {
            console.error(e);
        }
    }

    async function getDashboardData() {
        try {
            const res = await AdminServices.getDashboardData()
                .then((res) => {
                    if (res?.message === 'success') {
                        setDashboardData(res?.result);
                    }
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });
            return res;
        } catch (err) {
            console.error(err);
        }
    }

    async function updateAdminDetail(id, body) {
        try {
            const res = await AdminServices.updateStaff(id, body)
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });

            return res;
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteAdmin(id) {
        try {
            const res = await AdminServices.deleteStaff(id)
                .then((res) => {
                    if (res.message === 'success') {
                        getAllAdminsList();
                    }
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });

            return res;
        } catch (err) {
            console.error(err);
        }
    }

    async function addAdmin(body) {
        try {
            const res = await AdminServices.addStaff(body)
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });

            return res;
        } catch (err) {
            console.error(err);
        }
    }

    return {
        getAllAdminsList,
        getAdminDetail,
        updateAdminDetail,
        deleteAdmin,
        addAdmin,
        getDashboardData,
        getProfileInfo,
    };
}
