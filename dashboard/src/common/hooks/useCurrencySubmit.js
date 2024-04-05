import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

//internal import
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import CurrencyServices from '@/common/services/CurrencyServices';
import { notifyError, notifySuccess } from '@/utils/toast';

const useCurrencySubmit = (id) => {
    const [status, setStatus] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

    // console.log(variants);

    const {
        handleSubmit,
        register,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm();

    const onSubmit = async ({ symbol, name }) => {
        try {
            setIsSubmitting(true);
            const currencyData = {
                name,
                symbol,
                status: status ? 'show' : 'hide',
            };

            if (id) {
                const res = await CurrencyServices.updateCurrency(id, currencyData);
                setIsUpdate(true);
                setIsSubmitting(false);
                notifySuccess(res.message);
                closeDrawer();
            } else {
                const res = await CurrencyServices.addCurrency(currencyData);
                setIsUpdate(true);
                setIsSubmitting(false);
                notifySuccess(res.message);
                closeDrawer();
            }
        } catch (err) {
            setIsSubmitting(false);
            notifyError(err ? err?.response?.data?.message : err.message);
            closeDrawer();
        }
    };

    useEffect(() => {
        if (!isDrawerOpen) {
            setValue('name');
            setValue('symbol');

            setStatus(true);
            clearErrors('symbol');
            clearErrors('name');

            return;
        }
        if (id) {
            (async () => {
                try {
                    const res = await CurrencyServices.getCurrencyById(id);
                    if (res) {
                        setValue('name', res.name);
                        setValue('symbol', res.symbol);
                        setStatus(res.status === 'show');
                    }
                } catch (err) {
                    notifyError(err ? err?.response?.data?.message : err.message);
                }
            })();
        }
    }, [clearErrors, id, isDrawerOpen, setValue]);

    return {
        errors,
        onSubmit,
        register,
        status,
        setStatus,
        isSubmitting,
        handleSubmit,
    };
};

export default useCurrencySubmit;
