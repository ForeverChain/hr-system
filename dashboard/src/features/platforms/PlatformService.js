import requests from '@/common/axios/httpService';

const PlatformService = {
    getPlatform: async () => {
        return requests.get(`/platform`);
    },
    getPlatformList: async ({ searchText = '', page = 0 }) => {
        return requests.get(`/platforms?searchWord=${searchText}&page=${page}`);
    },
    getExportPlatformList: async ({ searchText = '' }) => {
        return requests.get(`/platforms/export_all?searchWord=${searchText}`);
    },
    getPlatformDetail: async ({ id }) => {
        return requests.get(`/platforms/${id}`);
    },
    editPlatform: async ({ id, body }) => {
        return requests.put(`/platforms/${id}`, body);
    },
    createPlatform: async ({ body }) => {
        return requests.post(`/platforms`, body);
    },
    deletePlatform: async ({ id }) => {
        return requests.delete(`/platforms/${id}`);
    },
};

export default PlatformService;
