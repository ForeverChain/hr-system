import React from 'react';
import {
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
    TableRow,
    TableBody,
} from '@windmill/react-ui';
import { useEventCtx } from './useEventCtx';
import TablePagination from '@/components/ui/pagination/TablePagination';

function EventsTable() {
    const { eventList, setEventList, pagination, setPagination } = useEventCtx();

    function onPageChange(page) {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
        }));
    }

    return (
        <TableContainer className='mb-8'>
            <Table>
                <TableHeader>
                    <tr>
                        <TableCell>토큰 타입</TableCell>
                        <TableCell>토큰ID</TableCell>
                        <TableCell>이벤트종류</TableCell>
                        <TableCell>트랜잭션 해쉬</TableCell>
                        <TableCell>블록넘버</TableCell>
                    </tr>
                </TableHeader>
                <TableBody>
                    {eventList?.items?.map((event, idx) => (
                        <TableRow key={'event' + idx}>
                            <TableCell>
                                <span className='font-semibold uppercase text-xs'>
                                    {event?.type}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{event?.tokenId}</span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{event?.name}</span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{event?.transaction_hash}</span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm font-medium'>{event?.block_number}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TableFooter>
                <TablePagination
                    totalItems={pagination?.totalElement}
                    itemsPerPage={pagination?.itemsPerPage}
                    onPageChange={onPageChange}
                    currentPage={pagination?.currentPage}
                />
            </TableFooter>
        </TableContainer>
    );
}

export default EventsTable;
