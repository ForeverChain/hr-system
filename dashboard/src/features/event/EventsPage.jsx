import React, { useEffect } from 'react';
import { Card } from '@windmill/react-ui';
import PageTitle from '@/components/ui/Typography/PageTitle';
import EventList from './EventList';
import { EventProvider } from './useEventCtx';
import { FormProvider } from '@/components/ui/form/store/useFormCtx';
import EventsPageTop from './EventsPageTop';

function EventsPage() {
    return (
        <EventProvider>
            <PageTitle>Events</PageTitle>
            <FormProvider>
                <EventsPageTop />
            </FormProvider>
            <Card>
                <EventList />
            </Card>
        </EventProvider>
    );
}

export default EventsPage;
