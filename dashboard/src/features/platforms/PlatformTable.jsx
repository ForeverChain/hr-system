import { TableBody, TableCell, TableRow } from '@windmill/react-ui';
import React from 'react';

//internal import

import MainDrawer from '@/components/layout/drawer/MainDrawer';
import useToggleDrawer from '@/common/hooks/useToggleDrawer';
import CustomerDrawer from '@/features/user/drawer/CustomerDrawer';
import EditDeleteButton from '@/components/ui/table/EditDeleteButton';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import { POPUP_TYPES } from '@/common/popup/popupRegistration';
import PlatformDrawer from './drawer/PlatformDrawer';
import CheckBox from '@/components/ui/form/others/CheckBox';

export default function PlatformTable({ platforms, setIsCheck, isCheck }) {
    const { serviceId, handleUpdate } = useToggleDrawer();
    const { showPopup, setPopupState } = usePopupCtx();

    function openModal(rowInfo) {
        showPopup(POPUP_TYPES.DELETE_PLATFORM);
        setPopupState((prev) => ({ ...prev, deletingPlatformInfo: rowInfo }));
    }

    const handleClick = (e) => {
        const { id, checked } = e.target;
        !isCheck.includes(+id) && setIsCheck((prev) => [...prev, +id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== +id));
        }
    };

    return (
        <>
            <MainDrawer>
                <PlatformDrawer id={serviceId} />
            </MainDrawer>

            <TableBody>
                {platforms?.map((platform) => (
                    <TableRow key={platform.id}>
                        <TableCell>
                            <CheckBox
                                isDisabled={platform.assetExist}
                                type='checkbox'
                                name='platform'
                                id={platform.id}
                                handleClick={handleClick}
                                isChecked={isCheck?.includes(platform?.id)}
                            />
                        </TableCell>
                        <TableCell>
                            <span className='font-semibold uppercase text-xs'>{platform?.id}</span>
                        </TableCell>
                        <TableCell>
                            <img
                                src={platform?.image?.url}
                                alt='platform icon'
                                width={30}
                                height={30}
                            />
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>{platform?.name}</span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm font-medium'>{platform?.description}</span>
                        </TableCell>

                        <TableCell>
                            <div className='flex justify-end text-right'>
                                <EditDeleteButton
                                    title={platform?.name}
                                    id={platform?.id}
                                    edittingRowInfo={platform}
                                    handleUpdate={handleUpdate}
                                    openDeleteModal={() => openModal(platform)}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
}
