import requests from '@/common/axios/httpService';

const ClaimServices = {
    getPlaceList: async () => {
        return requests.get('/places');
    },
};

export default ClaimServices;
