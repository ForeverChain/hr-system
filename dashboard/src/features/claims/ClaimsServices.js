import requests from '@/common/axios/httpService';

const ClaimServices = {
    getClaimList: async ({ searchWord = '', processStatus = '', page = 0, itemPerPage = 10 }) => {
        const status = processStatus === '전체 보기' ? '' : processStatus;
        const url = `/asset/reports?searchWord=${searchWord}&processStatus=${status}&page=${page}&size=${itemPerPage}`;
        return requests.get(url);
    },

    getClaimExportList: async ({ searchWord = '', processStatus = '' }) => {
        return requests.get(
            `/asset/reports/export_all?searchWord=${searchWord}&processStatus=${processStatus}`,
        );
    },

    editAssetReport: async (id, processStatus) => {
        return requests.put('/asset/reports/' + id, {
            processStatus,
        });
    },
    //burn nft apis on the blockchain
    burnAssetNft: async (tokenId) => {
        const burnUrl = `http://121.67.187.153:5000/api/v1/namespaces/default/apis/AssetNFT_1.0.1/invoke/burn`;
        const response = await fetch(burnUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: {
                    tokenId,
                },
                options: {},
            }),
        });
        return response.json();
    },
    burnCopyrightNFT: async (tokenId) => {
        const burnUrl = `http://121.67.187.153:5000/api/v1/namespaces/default/apis/CopyrightNFT_1.0.1/invoke/burn`;
        const response = await fetch(burnUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: {
                    tokenId,
                },
                options: {},
            }),
        });
        return response.json();
    },
    burnLicenseNFT: async (tokenId) => {
        const burnUrl = `http://121.67.187.153:5000/api/v1/namespaces/default/apis/LicenseNFT_1.0.1/invoke/burn`;
        const response = await fetch(burnUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: {
                    tokenId,
                },
                options: {},
            }),
        });
        return response.json();
    },
};

export default ClaimServices;
