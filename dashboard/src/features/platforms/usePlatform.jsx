import React from 'react';
import { usePlatformCtx } from './usePlatformCtx';
import PlatformService from './PlatformService';

export default function usePlatform() {
    const {
        setPlatformList,
        setPlatformDetail,
        setCurrentPage,
        setTotalElement,
        setExportPlatformData,
    } = usePlatformCtx();

    async function getAllPlatFormList(props) {
        try {
            const res = await PlatformService.getPlatformList({ ...props })
                .then((res) => {
                    setPlatformList(res?.result?.content);
                    setTotalElement(res?.result?.totalElements);
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

    async function getAllPlatForm() {
        try {
            const res = await PlatformService.getPlatform()
                .then((res) => {
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

    function convertToImageUrl(inputArray) {
        return inputArray.map((item) => {
            const { image, ...rest } = item;

            return {
                ...rest,
                image: image?.url ? image?.url : null,
            };
        });
    }

    async function getExportPlatFormList(props) {
        try {
            const res = await PlatformService.getExportPlatformList({ ...props })
                .then((res) => {
                    setExportPlatformData(convertToImageUrl(res?.result));
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

    async function getPlatFormDetail(id) {
        try {
            const res = await PlatformService.getPlatformDetail({ id })
                .then((res) => {
                    if (res?.message === 'success') {
                        setPlatformDetail(res?.result);
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

    async function deletePlatformById(id) {
        try {
            const res = await PlatformService.deletePlatform({ id })
                .then((res) => {
                    if (res?.message === 'success') {
                        getAllPlatFormList();
                    }
                    return res;
                })
                .catch((err) => {
                    console.error(err);
                    if (err.response.data.message === 'asset.exist') {
                        alert('사용중인 플랫폼입니다.');
                    }
                });
            return res;
        } catch (err) {
            console.error(err);
        }
    }

    async function deletePlatformMany(body) {
        try {
            const res = await PlatformService.deleteAssetMany(body)
                .then((res) => {
                    if (res.message === 'success') {
                        getAllPlatFormList();
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

    async function addPlatform(body) {
        try {
            const res = await PlatformService.createPlatform({ body })
                .then((res) => {
                    if (res.message === 'success') {
                        getAllPlatFormList();
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

    async function updatePlatform(id, body) {
        try {
            const res = await PlatformService.editPlatform({ id, body })
                .then((res) => {
                    if (res.message === 'success') {
                        getAllPlatFormList();
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
        getAllPlatFormList,
        addPlatform,
        getPlatFormDetail,
        updatePlatform,
        deletePlatformById,
        deletePlatformMany,
        getExportPlatFormList,
        getAllPlatForm,
    };
}
