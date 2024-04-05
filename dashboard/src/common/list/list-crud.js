export async function updateListItem(payload) {
    return payload.dataList.map((item) => {
        if (item.id === payload.id) {
            return {
                ...item,
                [payload.fieldName]: payload.editValue,
            };
        }
        return item;
    });
}
