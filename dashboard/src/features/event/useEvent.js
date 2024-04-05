import { useEventCtx } from './useEventCtx';

function useEvent() {
    async function handleSubmitEvent(e) {
        e.preventDefault();
    }

    async function calcExportEventData(data) {
        const newData = data.map((event) => ({
            type: event.type,
            tokenId: event?.tokenId,
            transaction_hash: event.transaction_hash,
            block_number: event?.block_number,
            eventType: event?.name,
        }));

        return newData;
    }

    return {
        handleSubmitEvent,
        calcExportEventData,
    };
}

export default useEvent;
