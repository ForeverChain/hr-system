import React from 'react';
import { TableCell, TableBody, TableRow } from '@windmill/react-ui';

//internal import
import Status from '@/components/ui/table/Status';
import useUtilsFunction from '@/common/hooks/useUtilsFunction';
import SelectStatus from '@/components/ui/form/selectOption/SelectStatus';

// import Status from '../table/Status';
// import SelectStatus from '../form/SelectStatus';

function UserOrderTable({ orders }) {
    const { showDateTimeFormat, getNumberTwo, currency } = useUtilsFunction();
    return (
        <>
            <TableBody>
                {orders?.map((order) => (
                    <TableRow key={order._id}>
                        <TableCell>
                            <span className='font-semibold uppercase text-xs'>
                                {order?._id?.substring(20, 24)}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className='text-sm'>
                                {/* {dayjs(order.createdAt).format("MMM D, YYYY")} */}
                                {showDateTimeFormat(order.createdAt)}
                            </span>
                        </TableCell>

                        <TableCell>
                            <span className='text-sm'>{order?.user_info?.address}</span>
                        </TableCell>
                        <TableCell>
                            {' '}
                            <span className='text-sm'>{order.user_info?.contact}</span>{' '}
                        </TableCell>
                        <TableCell>
                            <span className='text-sm font-semibold'>{order.paymentMethod}</span>
                        </TableCell>
                        <TableCell>
                            {' '}
                            <span className='text-sm font-semibold'>
                                {currency}
                                {getNumberTwo(order.total)}
                            </span>{' '}
                        </TableCell>
                        <TableCell className='text-center'>
                            <Status status={order.status} />
                        </TableCell>
                        <TableCell className='text-right'>
                            <SelectStatus id={order._id} order={order} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
}

export default UserOrderTable;
