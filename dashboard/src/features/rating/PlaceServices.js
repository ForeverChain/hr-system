import Cookies from 'js-cookie';
import { CookieName } from '@/libs/constants';
import requests from '../../common/axios/httpService';
import { fetchService } from '@/common/fetch/fetchService';

const PlaceServices = {
    registerAdmin: async (body) => {
        return requests.post('/hr/register', body);
    },

    loginAdmin: async (body) => {
        const res = await requests.post('/admin/login', body);
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
        return requests.post('/interview', body);
    },
    getAllStaff: async ({ searchText = '', page = 0 }) => {
        return requests.get(`/interviewByResult?searchWord=${searchText}&page=${page}`);
    },
    getAllCandidate: async ({ searchText = '', page = 0 }) => {
        return requests.get(`/candidate?searchWord=${searchText}&page=${page}`);
    },
    getAllHr: async ({ searchText = '', page = 0 }) => {
        return requests.get(`/hr?searchWord=${searchText}&page=${page}`);
    },
    getStaffById: async (id, body) => {
        return requests.get(`/interview/${id}`, body);
    },

    updateStaff: async (id, body) => {
        return requests.put(`/interview/${id}`, body);
    },

    updateStaffStatus: async (id, body) => {
        return requests.put(`/hr/update-status/${id}`, body);
    },

    deleteStaff: async (id) => {
        return requests.delete(`/interview/${id}`);
    },
};

export default PlaceServices;
