import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiZoomIn } from 'react-icons/fi';

import Tooltip from '@/components/ui/tooltip/Tooltip';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';

function EditDeleteButton({
    id,
    handleUpdate,
    isCheck,
    parent,
    children,
    openDeleteModal,
    edittingRowInfo,
}) {
    const { t } = useTranslation();
    const { setEdittingRowInfo } = useGlobalCtx();

    function handleEdit(id) {
        handleUpdate(id);
        setEdittingRowInfo(edittingRowInfo);
    }

    return (
        <>
            <div className='flex justify-end text-right'>
                {children?.length > 0 ? (
                    <>
                        <Link
                            to={`/categories/${parent?._id}`}
                            className='p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none'
                        >
                            <Tooltip
                                id='view'
                                Icon={FiZoomIn}
                                title={t('View')}
                                bgColor='#10B981'
                            />
                        </Link>

                        <button
                            disabled={isCheck?.length > 0}
                            onClick={() => handleUpdate(id)}
                            className='p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none'
                        >
                            <Tooltip id='edit' Icon={FiEdit} title={t('Edit')} bgColor='#10B981' />
                        </button>
                    </>
                ) : (
                    <button
                        disabled={isCheck?.length > 0}
                        onClick={() => handleEdit(id)}
                        className='p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none'
                    >
                        <Tooltip id='edit' Icon={FiEdit} title={t('Edit')} bgColor='#10B981' />
                    </button>
                )}

                <button
                    disabled={isCheck?.length > 0}
                    onClick={() => openDeleteModal()}
                    className='p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none'
                >
                    <Tooltip id='delete' Icon={FiTrash2} title={t('Delete')} bgColor='#EF4444' />
                </button>
            </div>
        </>
    );
}

export default EditDeleteButton;
