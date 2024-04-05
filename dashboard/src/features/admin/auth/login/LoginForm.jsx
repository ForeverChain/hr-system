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
    const { onChange, onError, formState } = useForm(initialLoginState);
    const { authState, setAuthState } = useGlobalCtx();
    const { showGlobalPopup } = useGlobalPopupCtx();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const loginData = {
                email: formState?.email?.value?.trim(),
                password: formState?.password?.value?.trim(),
            };

            const { success, errors } = await validateForm(loginFormSchema, formState);
            if (!success) {
                onError(errors);
                console.error('validation амжилтгүй', errors);
                return;
            }

            const res = await AdminServices.loginAdmin(loginData);

            if (res?.user.isAdmin && res?.token) {
                Cookies.set(CookieName.TOKEN, res?.token);
                setAuthState(res?.user);
                history.push('/');
            } else {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'Нэвтрэх эрхгүй!',
                });
            }
            if (res.response.status === 404) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'Хэрэглэгчийн нэр эсвэл нууц үг таарахгүй байна!',
                });
            } else {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'ямар нэгэн алдаа гарлаа!',
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form>
            <FormRow errMsg={formState?.email?.error}>
                {/* <LabelArea label='Имэйл' /> */}
                <InputEmail
                    name='email'
                    onChange={onChange}
                    value={formState?.email?.value}
                    isValid={Boolean(formState?.email?.error)}
                    placeholder='имейл'
                />
            </FormRow>
            <FormRow errMsg={formState?.password?.error}>
                {/* <LabelArea label='Password' /> */}
                <InputPassword
                    name='password'
                    onChange={onChange}
                    value={formState?.password?.value}
                    isValid={Boolean(formState?.password?.error)}
                    placeholder='нууц үг'
                />
            </FormRow>
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
