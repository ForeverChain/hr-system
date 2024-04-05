import requests from '@/common/axios/httpService';

const EventServices = {
    getEventList: async ({ page, perPage, queryParams }) => {
        let filterUrlArr = [];
        if (queryParams) {
            for (let property in queryParams) {
                if (queryParams[property] && queryParams[property] !== '전체 보기') {
                    if (property === 'tokenId') {
                        filterUrlArr.push(`tokenId=${queryParams[property]}`);
                    }
                    if (property === 'assetTokenId') {
                        filterUrlArr.push(`assetTokenId=${queryParams[property]}`);
                    } else if (property === 'tokenType') {
                        filterUrlArr.push(`type='${queryParams[property]}'`);
                    } else if (property === 'eventType') {
                        filterUrlArr.push(`name='${queryParams[property]}'`);
                    }
                }
            }
        }
        const formattedFilterUrl = filterUrlArr.map((item) => item).join('%26%26 ');
        const theFormattedFilterUrl =
            formattedFilterUrl.length === 0 ? '' : `(${formattedFilterUrl})`;
        const filterUrl = `http://121.67.187.153:8190/api/collections/event/records?filter=${theFormattedFilterUrl}&perPage=${
            perPage || 20
        }`;
        const paginationUrl = `http://121.67.187.153:8190/api/collections/event/records?page=${page}&perPage=${
            perPage || 20
        }`;

        const theUrl = queryParams ? filterUrl : paginationUrl;

        const response = await fetch(theUrl);
        return response.json();
    },

    getAllEvents: async ({ perPage }) => {
        const allEventsUrl = `http://121.67.187.153:8190/api/collections/event/records?perPage=${perPage}`;
        const response = await fetch(allEventsUrl);
        return response.json();
    },
};

export default EventServices;
