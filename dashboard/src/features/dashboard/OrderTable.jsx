import React from 'react';
import { TableCell, TableBody, TableRow } from '@windmill/react-ui';

//internal import
import Status from '@/components/ui/table/Status';
import useUtilsFunction from '@/common/hooks/useUtilsFunction';

function OrderTable({ orders }) {
    // console.log("orders", orders);
    const { currency, showDateTimeFormat, getNumberTwo } = useUtilsFunction();
    return (
        <TableBody>
            {orders?.map((order) => (
                <TableRow key={order._id}>
                    <TableCell>
                        <span className='text-sm'>{showDateTimeFormat(order.createdAt)}</span>
                    </TableCell>

                    <TableCell>
                        <span className='text-sm '>{order?.user_info?.name}</span>
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
                    <TableCell>
                        {' '}
                        <span className='text-sm'>{order?.user_info?.email}</span>{' '}
                    </TableCell>
                    <TableCell>
                        <Status status={order.status} />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default OrderTable;
