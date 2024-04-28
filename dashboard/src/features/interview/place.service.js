import requests from '@/common/axios/httpService';

const ClaimServices = {
    getPlaceList: async () => {
        return await requests.get('/interview');
    },
};

export default ClaimServices;
