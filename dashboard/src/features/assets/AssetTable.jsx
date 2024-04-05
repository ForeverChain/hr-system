import { TableBody, TableCell, TableRow } from '@windmill/react-ui';
import React from 'react';

//internal import

import { FiZoomIn } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import MainDrawer from '@/components/layout/drawer/MainDrawer';
import useToggleDrawer from '@/common/hooks/useToggleDrawer';
import CustomerDrawer from '@/features/user/drawer/CustomerDrawer';
import EditDeleteButton from '@/components/ui/table/EditDeleteButton';
import { usePopupCtx } from '@/common/popup/usePopupCtx';
import { POPUP_TYPES } from '@/common/popup/popupRegistration';
import CheckBox from '@/components/ui/form/others/CheckBox';
import AssetDrawer from './AssetDrawer';

export default function AssetTable({ assetsList, setIsCheck, isCheck }) {
    const { serviceId, handleUpdate, handleShow } = useToggleDrawer();
    const { showPopup, setPopupState } = usePopupCtx();
    const history = useHistory();

    function openModal(rowInfo) {
        showPopup(POPUP_TYPES.DELETE_ASSET);
        setPopupState((prev) => ({ ...prev, deletingAssetInfo: rowInfo }));
    }

    const handleClick = (e) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, +id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== +id));
        }
    };

    return (
        <>
            <MainDrawer>
                <AssetDrawer id={serviceId} />
            </MainDrawer>

            <TableBody>
                {assetsList?.map((asset, index) => (
                    <TableRow key={'assetTable' + index}>
                        <TableCell>
                            <CheckBox
                                type='checkbox'
                                name='asset'
                                id={asset.id}
                                handleClick={handleClick}
                                isChecked={isCheck?.includes(+asset.id)}
                            />
                        </TableCell>
                        <TableCell>
                            <span className='font-semibold uppercase text-xs'>{asset?.title}</span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>{asset.type}</span>
                        </TableCell>
                        <TableCell>
                            <div className='text-sm flex flex-col gap-1'>
                                {asset.resaleAllowed && (
                                    <span className=' bg-emerald-400 text-white text-sm rounded-xl text-center px-1'>
                                        재판매가능
                                    </span>
                                )}
                                {asset.commercialAllowed && (
                                    <span className=' bg-cyan-400 text-white text-sm rounded-xl text-center px-1'>
                                        수익화가능
                                    </span>
                                )}
                            </div>{' '}
                        </TableCell>
                        <TableCell>
                            <span className='text-sm font-medium'>{asset.id}</span>
                        </TableCell>
                        <TableCell className='flex flex-wrap gap-1'>
                            {(asset?.tags || [])
                                ?.sort((a, b) => a.name.localeCompare(b.name))
                                .map((tag) => (
                                    <span
                                        key={'fghdjska' + tag.name}
                                        className=' text-white bg-slate-500 rounded-xl px-2 py-1 h-6 text-center text-sm items-center flex'
                                    >
                                        {tag?.name}
                                    </span>
                                ))}
                        </TableCell>
                        <TableCell>
                            <div className='p-2 cursor-pointer text-gray-400 hover:text-emerald-600'>
                                <p
                                    data-tip
                                    data-for={asset?.id}
                                    className='text-xl'
                                    onClick={() => history.push(`assets/${asset?.id}`)}
                                >
                                    <FiZoomIn />
                                </p>
                            </div>
                        </TableCell>

                        <TableCell>
                            <div className='flex justify-end text-right'>
                                <EditDeleteButton
                                    title={asset.name}
                                    id={asset.id}
                                    edittingRowInfo={asset}
                                    handleUpdate={handleUpdate}
                                    openDeleteModal={() => openModal(asset)}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
}
