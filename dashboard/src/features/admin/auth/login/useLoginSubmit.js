import Cookies from 'js-cookie';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

//internal import
import AdminServices from '@/features/admin/AdminServices';
import { notifyError, notifySuccess } from '@/utils/toast';
import { removeSetting } from '@/reduxStore/slice/settingSlice';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';

const useLoginSubmit = () => {
    const reduxDispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { setAuthState } = useGlobalCtx();
    const history = useHistory();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = ({ name, email, verifyEmail, password, role }) => {
        setLoading(true);
        const cookieTimeOut = 0.5;
        // return;

        if (location.pathname === '/login') {
            reduxDispatch(removeSetting('globalSetting'));
            AdminServices.loginAdmin({ email, password })
                .then((res) => {
                    if (res) {
                        setLoading(false);
                        notifySuccess('Login Success!');
                        Cookies.set('adminInfo', JSON.stringify(res), {
                            expires: cookieTimeOut,
                            sameSite: 'None',
                            secure: true,
                        });
                        history.replace('/');
                    }
                })
                .catch((err) => {
                    notifyError(err ? err.response.data.message : err.message);
                    setLoading(false);
                });
        }

        if (location.pathname === '/signup') {
            AdminServices.registerAdmin({ name, email, password, role })
                .then((res) => {
                    if (res) {
                        setLoading(false);
                        notifySuccess('Register Success!');
                        Cookies.set('adminInfo', JSON.stringify(res), {
                            expires: cookieTimeOut,
                            sameSite: 'None',
                            secure: true,
                        });
                        history.replace('/');
                    }
                })
                .catch((err) => {
                    notifyError(err ? err.response.data.message : err.message);
                    setLoading(false);
                });
        }

        if (location.pathname === '/forgot-password') {
            AdminServices.forgetPassword({ verifyEmail })
                .then((res) => {
                    setLoading(false);
                    notifySuccess(res.message);
                })
                .catch((err) => {
                    setLoading(false);
                    notifyError(err ? err.response.data.message : err.message);
                });
        }
    };
    return {
        onSubmit,
        register,
        handleSubmit,
        errors,
        loading,
    };
};

export default useLoginSubmit;
