import React from 'react';
import CustomerServices from './CustomerServices';
import { useUsersCtx } from './useUsersCtx';

export default function useUsers() {
    const { setUsersList, setUsersDetail, setUsersExportList } = useUsersCtx();

    async function getAllCustomersList(searchingText, page = 0, filter="") {
        try {
            const res = await CustomerServices.getAllCustomers({ searchText: searchingText, page })
                .then((response) => {
                    if(filter !== "" )
                        {
                            let filteredData = response?.data?.filter((user) => {
                                return user.type === filter;
                            });
                            
                        setUsersList(filteredData);
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
                    setUsersDetail(response?.data);
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

    async function addHr(body) {
        try {
            const res = await CustomerServices.createCustomer(body)
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

    async function getHrDetail(id) {
        try {
            await CustomerServices.getHrById(id)
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

    return {
        getAllCustomersList,
        getCustomersDetail,
        updateUser,
        deleteUser,
        addHr,
        getHrDetail,
        getExportCustomersList,
    };
}
