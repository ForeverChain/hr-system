import requests from '../../common/axios/httpService';

const CustomerServices = {
    getAllCustomers: async ({ searchText = '', page = 0 }) => {
        const res = requests.get(`/users?searchWord=${searchText}&page=${page}`);
        return res;
    },

    getExportCustomers: async ({ searchText = '' }) => {
        const res = requests.get(`/users/export_all?searchWord=${searchText}`);
        return res;
    },

    addAllCustomers: async (body) => {
        return requests.post('/customer/add/all', body);
    },
    // user create
    createCustomer: async (body) => {
        return requests.post(`/customer/create`, body);
    },

    filterCustomer: async (email) => {
        return requests.post(`/customer/filter/${email}`);
    },

    getCustomerById: async (id) => {
        return requests.get(`/users/${id}`);
    },

    updateCustomer: async (id, body) => {
        return requests.put(`/users/${id}`, body);
    },

    deleteCustomer: async (id) => {
        return requests.delete(`/users/${id}`);
    },
};

export default CustomerServices;
