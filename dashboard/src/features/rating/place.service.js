import requests from '@/common/axios/httpService';

const ClaimServices = {
    getPlaceList: async () => {
        return requests.get('/interview');
    },
};

export default ClaimServices;
