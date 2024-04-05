import { TableBody, TableCell, TableRow } from '@windmill/react-ui';
import dayjs from 'dayjs';
import { t } from 'i18next';
import React from 'react';
import { FiZoomIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

//internal import

import useToggleDrawer from '@/common/hooks/useToggleDrawer';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import { POPUP_TYPES } from '@/common/popup/popupRegistration';
import MainDrawer from '@/components/layout/drawer/MainDrawer';

// internal imports

export default function AssetNFTListTable({ data }) {
    const { title, serviceId, handleModalOpen, handleUpdate, handleShow } = useToggleDrawer();
    const { showPopup, setPopupState } = usePopupCtx();

    function openModal(rowInfo) {
        showPopup(POPUP_TYPES.DELETE_ADMIN);
        setPopupState((prev) => ({ ...prev, deletingUserInfo: rowInfo }));
    }

    return (
        <>
            {/* <MainDrawer>

            </MainDrawer> */}

            <TableBody>
                {data?.map((data) => (
                    <TableRow key={data.id}>
                        <TableCell>
                            <span className='font-semibold uppercase text-xs'> {data?.type}</span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>{data.assetTokenId}</span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>{data.owner}</span>
                        </TableCell>
                        <TableCell>
                            <div className='p-2 cursor-pointer text-gray-400 hover:text-emerald-600'>
                                <p
                                    data-tip
                                    data-for={data?.id}
                                    className='text-xl'
                                    onClick={() => handleShow(data?.id)}
                                >
                                    <FiZoomIn />
                                </p>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
}
