export function formReducer(state, action) {
    switch (action.type) {
        case 'CHANGE': {
            console.info('dispatched::CHANGE action');
            return {
                ...state,
                [action.payload.fieldName]: {
                    ...state[action.payload.fieldName],
                    value: action.payload.value,
                    error: null,
                },
            };
        }
        case 'ADD_LIST': {
            console.info('dispatched::ADD_LIST action');
            return {
                ...state,
                [action.payload.fieldName]: action.payload.value,
            };
        }
        case 'MINUS_LIST': {
            console.info('dispatched::MINUS_LIST action');
            return {
                ...state,
                [action.payload.fieldName]: action.payload.value,
            };
        }
        case 'UPDATE_LIST': {
            console.info('dispatched::UPDATE_LIST action');
            const updatedFormState = { ...state };

            const currentList = updatedFormState[action.payload.listName];

            const currentListItem = currentList[action.payload.idx];

            const updatedCurrentListItem = {
                ...currentListItem,
                [action.payload.fieldName]: {
                    ...currentListItem[action.payload.fieldName],
                    value: action.payload.value,
                    error: null,
                },
            };

            const updatedCurrentList = [...currentList];
            updatedCurrentList[action.payload.idx] = updatedCurrentListItem;

            updatedFormState[action.payload.listName] = updatedCurrentList;

            return updatedFormState;
        }
        case 'RESET_FORM_FIELD': {
            console.info('dispatched::RESET_FORM_FIELD action');
            return {
                ...state,
                [action.payload.fieldName]: {
                    value: null,
                    error: null,
                },
            };
        }
        case 'RESET_FORM_FIELDS': {
            console.info('dispatched::RESET_FORM_FIELDS action');
            console.log('state:', state);
            return {
                ...action.payload.initialState,
            };
        }
        case 'CHECKBOX_GROUP_CHANGE': {
            console.info('dispatched::CHECKBOX_GROUP_CHANGE action');
            console.log('item:', action.payload.item);
            return {
                ...state,
                [action.payload.groupName]: {
                    ...state[action.payload.groupName],
                    [action.payload.fieldName]: {
                        value: action.payload.value,
                        error: null,
                        item: action.payload.item,
                    },
                },
            };
        }
        case 'INIT_FORM_STATE': {
            console.info('dispatched::INIT_FORM_STATE action');
            return {
                ...state,
                ...action.payload,
            };
        }
        case 'SET_ERRORS': {
            console.info('dispatched::SET_ERRORS action');
            for (const fieldName in action.payload) {
                if (fieldName) {
                    state[fieldName] = {
                        ...state[fieldName],
                        error: action.payload[fieldName],
                    };
                }
            }
            return {
                ...state,
            };
        }
        case 'SET_ERROR_FIELD': {
            return {
                ...state,
                [action.payload.fieldName]: {
                    value: null,
                    error: action.payload.error,
                },
            };
        }
        case 'SET_VALUE_FIELD': {
            return {
                ...state,
                [action.payload.fieldName]: {
                    value: action.payload.value,
                    error: null,
                },
            };
        }
        default:
            return state;
    }
}
