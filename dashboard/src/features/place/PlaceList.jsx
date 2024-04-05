import React, { useEffect } from 'react';
import { Card } from '@windmill/react-ui';
import placeService from './place.service';
import ClaimsTable from './PlacesTable';
import { usePlaceCtx } from './usePlaceCtx';

function PlaceList() {
    const { isToggleReset, pagination, setPlaceList } = usePlaceCtx();

    useEffect(() => {
        placeService.getPlaceList().then((res) => setPlaceList(res));
    }, [isToggleReset]);

    return (
        <Card>
            <ClaimsTable />
        </Card>
    );
}

export default PlaceList;
