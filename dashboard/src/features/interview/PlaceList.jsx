import React, { useEffect } from 'react';
import { Card } from '@windmill/react-ui';
import placeService from './place.service';
import ClaimsTable from './PlacesTable';
import { usePlaceCtx } from './usePlaceCtx';
import usePlace from './usePlace';
function PlaceList() {
    const { isToggleReset, pagination, setPlaceList } = usePlaceCtx();
    const { addInterview, getAllAdminsList } = usePlace();
    useEffect(() => {
        getAllAdminsList();
    }, [isToggleReset]);

    return (
        <Card>
            <ClaimsTable />
        </Card>
    );
}

export default PlaceList;
