import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import InputEmail from '@/components/ui/form/elements/input/InputEmail';
import useForm from '@/components/ui/form/store/useForm';
import Btn from '@/components/ui/button/Button';
import { validateForm } from '@/common/validation/validate';
import { loginFormSchema } from './loginFormSchema';
import InputPassword from '@/components/ui/form/elements/input/InputPassword';
import FormRow from '@/components/ui/form/FormRow';
import AdminServices from '../../AdminServices';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
import { useGlobalPopupCtx } from '@/common/popup/globalPopups/useGlobalPopupCtx';
import { GLOBAL_POPUP_TYPES } from '@/common/popup/globalPopups/globalPopupRegistration';
import { CookieName } from '@/libs/constants';
import Cookies from 'js-cookie';

const initialLoginState = {
    email: { value: null, error: null },
    password: { value: null, error: null },
};

function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isAdminLogin, setIsAdminLogin] = useState(false); // State for admin login option
    const { onChange, onError, formState } = useForm(initialLoginState);
    const { authState, setAuthState } = useGlobalCtx();
    const { showGlobalPopup } = useGlobalPopupCtx();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const loginData = {
                userName: formState?.email?.value?.trim(),
                password: formState?.password?.value?.trim(),
            };

            const { success, errors } = await validateForm(loginFormSchema, formState);
            if (!success) {
                onError(errors);
                console.error('validation амжилтгүй', errors);
                return;
            }

            let res;
            if (isAdminLogin) {
                // Check if admin login option is selected
                res = await AdminServices.loginAdmin(loginData);
            } else {
                res = await AdminServices.loginHr(loginData);
            }

            if (res?.data?.token) {
                Cookies.set(CookieName.TOKEN, res?.data?.token);
                setAuthState(res?.data.admin);
                history.push('/');
            } else {
                // Handle login failure
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'Нэвтрэх эрхгүй!',
                });
            }
            // Other error handling logic
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form>
            <FormRow errMsg={formState?.email?.error}>
                <InputEmail
                    name='email'
                    onChange={onChange}
                    value={formState?.email?.value}
                    isValid={Boolean(formState?.email?.error)}
                    placeholder='имейл'
                />
            </FormRow>
            <FormRow errMsg={formState?.password?.error}>
                <InputPassword
                    name='password'
                    onChange={onChange}
                    value={formState?.password?.value}
                    isValid={Boolean(formState?.password?.error)}
                    placeholder='нууц үг'
                />
            </FormRow>
            <div className='mb-4 mt-2'>
                <input
                    type='checkbox'
                    checked={isAdminLogin}
                    onChange={() => setIsAdminLogin(!isAdminLogin)}
                    className='mr-2 leading-tight'
                    id='isAdmin'
                />
                <label htmlFor='isAdmin' className='text-sm'>
                    Админ эрхээр нэвтрэх
                </label>
            </div>
            <div className='mt-5'>
                <Btn disabled={isLoading} isLoading={isLoading} onClick={handleSubmit}>
                    Ok
                </Btn>
            </div>
            <hr className='my-10' />
        </form>
    );
}

export default LoginForm;
