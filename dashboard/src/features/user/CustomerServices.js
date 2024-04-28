import requests from '../../common/axios/httpService';

const CustomerServices = {
    getAllCustomers: async ({ searchText = '', page = 0 }) => {
        const res = requests.get(`/candidate?searchWord=${searchText}&page=${page}`);
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
        return requests.post(`/candidate`, body);
    },

    filterCustomer: async (email) => {
        return requests.post(`/customer/filter/${email}`);
    },

    getCustomerById: async (id) => {
        return requests.get(`/candidate/${id}`);
    },

    getHrById: async (id) => {
        return requests.get(`/hr/${id}`);
    },

    updateCustomer: async (id, body) => {
        return requests.put(`/candidate/${id}`, body);
    },

    deleteCustomer: async (id) => {
        return requests.delete(`/candidate/${id}`);
    },
};

export default CustomerServices;
