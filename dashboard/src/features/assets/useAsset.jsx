import React from 'react';
import { useAssetsCtx } from './useAssetCtx';
import AssetServices from './AssetServices';
import { useAssetDetailCtx } from './detail/useAssetDetailCtx';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';

export default function useAsset() {
    const { setAssetsList, setTotalElement, setExportAssetData } = useAssetsCtx();
    const { setAssetDetail, setAssetDetailNFTList, setAssetDetailPaginationInfo, setPlatformList } =
        useGlobalCtx();

    async function getAllAssetList(props) {
        try {
            const res = await AssetServices.getAllAssetList({ ...props })
                .then((res) => {
                    setAssetsList(res?.result?.content);
                    setTotalElement(res?.result?.totalElements);
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });
            return res;
        } catch (e) {
            console.error(e);
        }
    }

    function convertTagsToSingleString(inputArray) {
        return inputArray.map((item) => {
            const tags = item.tags.map((tag) => tag.name);
            return { ...item, tags: tags.join(', ') };
        });
    }

    async function getAssetExportData(props) {
        try {
            const res = await AssetServices.getAssetExportData({ ...props })
                .then((res) => {
                    setExportAssetData(convertTagsToSingleString(res?.result));
                    // setExportAssetData(res?.result);
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });
            return res;
        } catch (e) {
            console.error(e);
        }
    }

    async function getAssetDetail(props) {
        try {
            const res = await AssetServices.getAssetDetail({ ...props })
                .then((res) => {
                    if (res.message === 'success') {
                        setAssetDetail(res?.result);
                    }
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });
            return res;
        } catch (e) {
            console.error(e);
        }
    }

    async function updateAssetDetail(props) {
        try {
            const res = await AssetServices.updateAsset({ ...props })
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });
            return res;
        } catch (e) {
            console.error(e);
        }
    }

    async function getAssetDetailNFTList(props) {
        try {
            const res = await AssetServices.getAssetDetailNFTList({ ...props })
                .then((res) => {
                    setAssetDetailNFTList(res);
                    setAssetDetailPaginationInfo((prev) => ({
                        ...prev,
                        totalElement: res.totalItems,
                    }));
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });
            return res;
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteAsset(id) {
        try {
            const res = await AssetServices.deleteAsset(id)
                .then((res) => {
                    if (res.message === 'success') {
                        getAllAssetList();
                    }
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });

            return res;
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteAssetMany(body) {
        try {
            const res = await AssetServices.deleteAssetMany(body)
                .then((res) => {
                    if (res.message === 'success') {
                        getAllAssetList();
                    }
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });

            return res;
        } catch (err) {
            console.error(err);
        }
    }

    async function getPlatforms() {
        try {
            const res = await AssetServices.getPlatfromList()
                .then((res) => {
                    if (res.message === 'success') {
                        setPlatformList(res.result);
                    }
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                });

            return res;
        } catch (err) {
            console.error(err);
        }
    }

    return {
        getAllAssetList,
        getAssetDetail,
        getAssetDetailNFTList,
        updateAssetDetail,
        deleteAsset,
        deleteAssetMany,
        getPlatforms,
        getAssetExportData,
    };
}
