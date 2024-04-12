import Cookies from 'js-cookie';
import { CookieName } from '@/libs/constants';
import requests from '../../common/axios/httpService';
import { fetchService } from '@/common/fetch/fetchService';

const AdminServices = {
    registerAdmin: async (body) => {
        return requests.post('/admin/register', body);
    },

    loginAdmin: async (body) => {
        const res = await requests.post('/admin/login', body);
        return res;
    },

    loginHr: async (body) => {
        const res = await requests.post('/login', body);
        return res;
    },

    getProfileInfo: async () => {
        return requests.get('/profile');
    },

    getDashboardData: async () => {
        return requests.get('/dashboard');
    },

    forgetPassword: async (body) => {
        return requests.put('/admin/forget-password', body);
    },

    resetPassword: async (body) => {
        return requests.put('/admin/reset-password', body);
    },

    signUpWithProvider: async (body) => {
        return requests.post('/admin/signup', body);
    },

    addStaff: async (body) => {
        return requests.post('/admins', body);
    },
    getAllStaff: async ({ searchText = '', page = 0 }) => {
        return requests.get(`/admins?searchWord=${searchText}&page=${page}`);
    },
    getStaffById: async (id, body) => {
        return requests.get(`/admins/${id}`, body);
    },

    updateStaff: async (id, body) => {
        console.log('here is', id);
        return requests.put(`/admins/${id}`, body);
    },

    updateStaffStatus: async (id, body) => {
        return requests.put(`/admin/update-status/${id}`, body);
    },

    deleteStaff: async (id) => {
        return requests.delete(`/admins/${id}`);
    },
};

export default AdminServices;
