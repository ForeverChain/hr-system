import React from 'react';
import CustomerServices from './CustomerServices';
import { useUsersCtx } from './useUsersCtx';

export default function useUsers() {
    const { setUsersList, setUsersDetail, setUsersExportList } = useUsersCtx();

    async function getAllCustomersList(searchingText, page = 0) {
        try {
            const res = await CustomerServices.getAllCustomers({ searchText: searchingText, page })
                .then((response) => {
                    setUsersList(response?.result?.content);
                    return response;
                })
                .catch((err) => {
                    console.error(err);
                });
            return res;
        } catch (err) {
            console.error(err);
        }
    }

    async function getExportCustomersList(searchingText) {
        try {
            const res = await CustomerServices.getExportCustomers({ searchText: searchingText })
                .then((response) => {
                    setUsersExportList(response?.result);
                    return response;
                })
                .catch((err) => {
                    console.error(err);
                });
            return res;
        } catch (err) {
            console.error(err);
        }
    }

    async function getCustomersDetail(id) {
        try {
            await CustomerServices.getCustomerById(id)
                .then((response) => {
                    if (response.message === 'success') {
                        setUsersDetail(response?.result);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (err) {
            console.error(err);
        }
    }

    async function updateUser(id, payload) {
        try {
            const res = await CustomerServices.updateCustomer(id, payload)
                .then((response) => {
                    if (response.message === 'success') {
                        setUsersDetail(response.result);
                        getAllCustomersList();
                    }
                    return response;
                })
                .catch((err) => {
                    console.error(err);
                });
            return res;
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteUser(id) {
        try {
            const res = await CustomerServices.deleteCustomer(id)
                .then((response) => {
                    if (response.message === 'success') {
                        getAllCustomersList();
                    }
                    return response;
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
        getAllCustomersList,
        getCustomersDetail,
        updateUser,
        deleteUser,
        getExportCustomersList,
    };
}
