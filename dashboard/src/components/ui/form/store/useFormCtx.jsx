import React, { useReducer, useContext, createContext } from 'react';
import { formReducer } from './formReducer';

const FormContext = createContext({});

function FormProvider({ children }) {
    const [formState, formDispatch] = useReducer(formReducer, {});

    return (
        <FormContext.Provider
            value={{
                formState,
                formDispatch,
            }}
        >
            {children}
        </FormContext.Provider>
    );
}

const useFormCtx = () => {
    const context = useContext(FormContext);
    if (!context) throw new Error('useFormCtx must be used within a FormProvider');
    return context;
};

export { FormContext, FormProvider, useFormCtx };
