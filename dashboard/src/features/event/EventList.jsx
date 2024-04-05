import React, { useEffect } from 'react';
import EventServices from './EventServices';
import EventsTable from './EventsTable';
import { useEventCtx } from './useEventCtx';

function EventList() {
    const { setEventList, isToggleReset, pagination, setPagination, filterQueryParams } =
        useEventCtx();

    useEffect(() => {
        EventServices.getEventList({
            page: pagination?.currentPage,
            queryParams: filterQueryParams,
        }).then((res) => {
            setEventList(res);
            setPagination((prev) => ({
                ...prev,
                totalElement: res?.totalItems,
                itemsPerPage: res?.perPage,
            }));
        });
    }, [isToggleReset, pagination?.currentPage]);
    return (
        <div>
            <EventsTable />
        </div>
    );
}

export default EventList;
