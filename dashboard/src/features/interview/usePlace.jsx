import React from 'react';
import { usePlaceCtx } from './usePlaceCtx';
import PlaceServices from './PlaceServices';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';

export default function usePlace() {
    const {
        setPlaceList,
        setAdminDetail,
        setTotalElement,
        setDashboardData,
        setCandidateList,
        setHrList,
    } = usePlaceCtx();
    const { setAuthState } = useGlobalCtx();

    async function getAllAdminsList(searchingText, page = 0) {
        try {
            const res = await PlaceServices.getAllStaff({ searchText: searchingText, page })
                .then((res) => {
                    setPlaceList(res?.data);
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

    async function getAllHrList(searchingText, page = 0) {
        try {
            const res = await PlaceServices.getAllHr({ searchText: searchingText, page })
                .then((res) => {
                    setHrList(res?.data);
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

    async function getAllCandidateList(searchingText, page = 0) {
        try {
            const res = await PlaceServices.getAllStaff({ searchText: searchingText, page })
                .then((res) => {
                    setCandidateList(res?.data);
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
            const res = await PlaceServices.getStaffById(id, body)
                .then((res) => {
                    setAdminDetail(res?.data);
                    return res.data;
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
            const res = await PlaceServices.getProfileInfo();
            setAuthState(res?.result);
        } catch (e) {
            console.error(e);
        }
    }

    async function getDashboardData() {
        try {
            const res = await PlaceServices.getDashboardData()
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
            const res = await PlaceServices.updateStaff(id, body)
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
            const res = await PlaceServices.deleteStaff(id)
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

    async function addInterview(body) {
        try {
            const res = await PlaceServices.addStaff(body)
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
        addInterview,
        getDashboardData,
        getProfileInfo,
        getAllCandidateList,
        getAllHrList,
    };
}
