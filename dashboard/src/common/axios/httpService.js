import axios from 'axios';
import Cookies from 'js-cookie';
import { CookieName } from '@/libs/constants';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api`,
    timeout: 50000,
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
    // Do something before request is sent
    let accessToken;
    if (Cookies.get(CookieName.TOKEN)) {
        accessToken = Cookies.get(CookieName.TOKEN);
    }

    let company;

    if (Cookies.get('company')) {
        company = Cookies.get('company');
    }

    return {
        ...config,
        headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : null,
            company: company ?? null,
        },
    };
});

// энийг ажиллуулах үед Claims page дээр claimsList ажиллахгүй байгаа нь их сонин санагдаж байна!!!
// instance.interceptors.response.use(
//     (response) => response.data,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

const responseBody = (response) => response.data;

const requests = {
    get: (url, body, headers) => instance.get(url, body, headers).then(responseBody),

    post: (url, body) =>
        instance
            .post(url, body)
            .then(responseBody)
            .catch((e) => e),

    put: (url, body, headers) => instance.put(url, body, headers).then(responseBody),

    patch: (url, body) => instance.patch(url, body).then(responseBody),

    delete: (url, body) => instance.delete(url, body).then(responseBody),
};

export default requests;
