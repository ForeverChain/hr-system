import requests from '@/common/axios/httpService';

const NftServices = {
    getNftList: async ({ page = 1, queryParams }) => {
        let filterUrlArr = [];
        if (queryParams) {
            for (let property in queryParams) {
                if (queryParams[property] && queryParams[property] !== '전체 보기') {
                    if (property === 'searchType') {
                        filterUrlArr.push(`${queryParams[property]}='${queryParams.searchValue}'`);
                    } else if (property === 'tokenType') {
                        filterUrlArr.push(`type='${queryParams[property]}'`);
                    }
                }
            }
        }
        const formattedFilterUrl = filterUrlArr.map((item) => item).join('%26%26 ');
        const theFormattedFilterUrl =
            formattedFilterUrl.length === 0 ? '' : `(${formattedFilterUrl})`;
        const filterUrl = `http://121.67.187.153:8190/api/collections/nft/records?filter=${theFormattedFilterUrl}&perPage=20`;
        const paginationUrl = `http://121.67.187.153:8190/api/collections/nft/records?page=${page}&perPage=20`;

        const theUrl = queryParams ? filterUrl : paginationUrl;

        const response = await fetch(theUrl);
        return response.json();
    },

    getAllNft: async ({ perPage }) => {
        const allEventsUrl = `http://121.67.187.153:8190/api/collections/nft/records?perPage=${perPage}`;
        const response = await fetch(allEventsUrl);
        return response.json();
    },
};

export default NftServices;
