import requests from '@/common/axios/httpService';

const AssetServices = {
    getAllAssetList: async ({ searchText = '', platformId = '', terms = '', page = 0 }) => {
        return requests.get(
            `/assets?searchWord=${searchText}&platformId=${platformId}&terms=${terms}&page=${page}`,
        );
    },

    getAssetExportData: async ({ searchText = '', platformId = '', terms = '' }) => {
        return requests.get(
            `/assets/export_all?searchWord=${searchText}&platformId=${platformId}&terms=${terms}`,
        );
    },

    getAssetDetail: async ({ id }) => {
        return requests.get(`/assets/${id}`);
    },

    getPlatfromList: async () => {
        return requests.get(`/platform`);
    },

    getAssetDetailNFTList: async ({ id, page = '' }) => {
        const url = `http://121.67.187.153:8190/api/collections/nft/records?filter=(assetTokenId=${id})&page=${
            page && page
        }`;
        const response = await fetch(url);
        return response.json();
    },

    updateAsset: async ({ id, body }) => {
        return requests.put(`assets/${id}`, body);
    },

    deleteAsset: async (id) => {
        return requests.delete(`assets/${id}`);
    },

    deleteAssetMany: async (body) => {
        return requests.delete(`assets`, body);
    },
};

export default AssetServices;
