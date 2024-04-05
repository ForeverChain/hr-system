import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
import { isTokenExpired } from '@/common/token/token';
import { CookieName } from '@/libs/constants';

function PrivateRoute({ children, ...rest }) {
    const token = Cookies.get(CookieName.TOKEN);
    const isTokenEnded = isTokenExpired(token);
    const { setAuthState } = useGlobalCtx();
    useEffect(() => {
        if (!isTokenEnded) {
            const decoded = jwtDecode(token);
            setAuthState(decoded);
        }
    }, []);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !isTokenEnded ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;
