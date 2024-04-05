import React, { lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AccessibleNavigationAnnouncer from '@/components/ui/announcer/AccessibleNavigationAnnouncer';
import PrivateRoute from '@/features/admin/auth/PrivateRoute';
import { UsersProvider } from './features/user/useUsersCtx';

// import LoginPage from './features/admin/auth/login/Login';
const Layout = lazy(() => import('./components/layout/Layout'));
const LoginPage = lazy(() => import('./features/admin/auth/login/LoginPage'));
const SignUp = lazy(() => import('./features/admin/auth/SignUp'));
const ForgetPassword = lazy(() => import('./features/admin/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./features/admin/auth/ResetPassword'));

function App() {
    return (
        <>
            <ToastContainer />
            <Router>
                <AccessibleNavigationAnnouncer />
                <Switch>
                    <Route path='/login' component={LoginPage} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/forgot-password' component={ForgetPassword} />
                    <Route path='/reset-password/:token' component={ResetPassword} />

                    <PrivateRoute>
                        <Route path='/' component={Layout} />
                    </PrivateRoute>
                    <Redirect exact from='/' to='/login' />
                </Switch>
            </Router>
        </>
    );
}

export default App;
