import { useEffect } from 'react';
import { useFormCtx } from './useFormCtx';

function useForm(data, options) {
    const { formState, formDispatch } = useFormCtx();

    function createInitFormPayload(data) {
        if (data) {
            const fieldNames = Object.keys(data);
            const partialFormState = {};

            fieldNames.forEach((fieldName) => {
                partialFormState[fieldName] = data[fieldName];
            });

            return partialFormState;
        }
        return {};
    }
    function onChange(e, isCheckbox) {
        const { value, name } = e.target;
        const theValue = isCheckbox ? e.target.checked.toString() : value;

        formDispatch({
            type: 'CHANGE',
            payload: { fieldName: name, value: theValue },
        });
    }

    // event авахгүйгээр форм руу set хийх функц
    function onChangeWithoutEvent(name, value) {
        formDispatch({
            type: 'CHANGE',
            payload: { fieldName: name, value },
        });
    }

    function onChangeGroupCheckbox(groupName, fieldName, value, item) {
        formDispatch({
            type: 'CHECKBOX_GROUP_CHANGE',
            payload: {
                groupName,
                fieldName,
                value: value.toString(),
                item,
            },
        });
    }

    function onChangeGroupList(listName, idx, fieldName, value) {
        formDispatch({
            type: 'UPDATE_LIST',
            payload: {
                listName,
                idx,
                fieldName,
                value,
            },
        });
    }

    function onChangeFile(e) {
        const { files, name } = e.target;
        formDispatch({
            type: 'CHANGE',
            payload: { fieldName: name, value: files[0] },
        });
    }

    function onError(errors) {
        if (errors === null) {
            return;
        }
        formDispatch({
            type: 'SET_ERRORS',
            payload: errors,
        });
    }

    function resetFormField(fieldName) {
        formDispatch({
            type: 'RESET_FORM_FIELD',
            payload: { fieldName },
        });
    }

    function resetFormFields() {
        formDispatch({
            type: 'RESET_FORM_FIELDS',
            payload: { initialState: data },
        });
    }

    // формын тухайн талбарын error - ийг set - лэнэ
    function setErrorField(fieldName, error) {
        formDispatch({
            type: 'SET_ERROR_FIELD',
            payload: { fieldName, error },
        });
    }

    // формын тухайн талбар луу value set - лэнэ
    function setValueField(fieldName, value) {
        formDispatch({
            type: 'SET_VALUE_FIELD',
            payload: { fieldName, value },
        });
    }

    useEffect(() => {
        if (data) {
            const initFormState = createInitFormPayload(data);
            formDispatch({
                type: 'INIT_FORM_STATE',
                payload: initFormState,
            });
        }
    }, [options?.initCase, data]);

    return {
        onChange,
        onChangeFile,
        onChangeGroupCheckbox,
        onChangeWithoutEvent,
        onError,
        formState,
        resetFormField,
        resetFormFields,
        setErrorField,
        setValueField,
        onChangeGroupList,
        formDispatch,
        createInitFormPayload,
    };
}

export default useForm;
