import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

//internal import
import useNotification from './useNotification';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import SettingServices from '@/common/services/SettingServices';
import { notifyError, notifySuccess } from '@/utils/toast';
import { removeSetting } from '@/reduxStore/slice/settingSlice';

const useSettingSubmit = (id) => {
    const dispatch = useDispatch();
    const { setIsUpdate } = useContext(SidebarContext);
    const [isSave, setIsSave] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { socket } = useNotification();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // return notifyError("This Feature is disabled for demo!");
        try {
            setIsSubmitting(true);
            const settingData = {
                name: 'globalSetting',
                setting: {
                    number_of_image_per_product: data.number_of_image_per_product,
                    shop_name: data.shop_name,
                    address: data.address,
                    company_name: data.company_name,
                    vat_number: data.vat_number,
                    post_code: data.post_code,
                    contact: data.contact,
                    email: data.email,
                    website: data.website,
                    receipt_size: data.receipt_size,
                    default_currency: data.default_currency,
                    default_time_zone: data.default_time_zone,
                    default_date_format: data.default_date_format,
                },
            };

            // console.log('global setting', globalSettingData);
            // return;

            if (!isSave) {
                const res = await SettingServices.updateGlobalSetting(settingData);
                await socket.emit('notification', {
                    message: `Global setting updated`,
                    option: 'globalSetting',
                });
                setIsUpdate(true);
                setIsSubmitting(false);

                window.location.reload();
                notifySuccess(res.message);

                dispatch(removeSetting('globalSetting'));
            } else {
                const res = await SettingServices.addGlobalSetting(settingData);
                await socket.emit('notification', {
                    message: `Global setting added`,
                    option: 'globalSetting',
                });
                setIsUpdate(true);
                setIsSubmitting(false);

                window.location.reload();
                notifySuccess(res.message);
            }
        } catch (err) {
            notifyError(err ? err?.response?.data?.message : err.message);
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await SettingServices.getGlobalSetting();
                // console.log("res>>>", res);
                if (res) {
                    setIsSave(false);
                    setValue('number_of_image_per_product', res.number_of_image_per_product);
                    setValue('shop_name', res.shop_name);
                    setValue('address', res.address);
                    setValue('company_name', res.company_name);
                    setValue('vat_number', res.vat_number);
                    setValue('post_code', res.post_code);
                    setValue('contact', res.contact);
                    setValue('email', res.email);
                    setValue('website', res.website);
                    setValue('receipt_size', res.receipt_size);
                    setValue('default_currency', res.default_currency);
                    setValue('default_time_zone', res?.default_time_zone);
                    setValue('default_date_format', res?.default_date_format);
                }
            } catch (err) {
                notifyError(err ? err?.response?.data?.message : err.message);
            }
        })();
    }, [setValue]);

    return {
        errors,
        register,
        handleSubmit,
        onSubmit,
        isSave,
        isSubmitting,
    };
};

export default useSettingSubmit;
