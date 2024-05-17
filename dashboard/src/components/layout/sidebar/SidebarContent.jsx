import React from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { Button } from '@windmill/react-ui';
import { IoLogOutOutline } from 'react-icons/io5';

//internal import
import sidebar from '@/routes/sidebar';
// import SidebarSubMenu from "SidebarSubMenu";

import SidebarSubMenu from '@/components/layout/sidebar/SidebarSubMenu';
import Logo from '@/components/ui/logo/Logo';
import { CookieName } from '@/libs/constants';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';

function SidebarContent() {
    const { t } = useTranslation();
    const history = useHistory();
    const { authState, setAuthState } = useGlobalCtx();
    console.log('authState', authState);

    const handleLogOut = () => {
        Cookies.remove(CookieName.LOGGED_USER);
        Cookies.remove(CookieName.TOKEN);
        setAuthState(null);
        history.push('/login');
    };
    console.log(authState);

    const filteredRoutes =
        authState?.userType === '1' ? sidebar.filter((route) => route.showAdmin) : sidebar;

    return (
        <div className='py-4 text-gray-500 dark:text-gray-400'>
            <Logo />
            <ul className='mt-8'>
                {filteredRoutes.map((route) =>
                    route.routes ? (
                        <SidebarSubMenu route={route} key={route.name} />
                    ) : (
                        <li className='relative' key={route.name}>
                            <NavLink
                                exact
                                to={route.path}
                                target={`${route?.outside ? '_blank' : '_self'}`}
                                className='px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-emerald-700 dark:hover:text-gray-200'
                                // activeClassName="text-emerald-500 dark:text-gray-100"
                                activeStyle={{
                                    color: '#0d9e6d',
                                }}
                                rel='noreferrer'
                            >
                                <Route path={route.path} exact={route.exact}>
                                    <span
                                        className='absolute inset-y-0 left-0 w-1 bg-emerald-500 rounded-tr-lg rounded-br-lg'
                                        aria-hidden='true'
                                    />
                                </Route>
                                <route.icon className='w-5 h-5' aria-hidden='true' />
                                <span className='ml-4'>{t(`${route.name}`)}</span>
                            </NavLink>
                        </li>
                    ),
                )}
            </ul>
            <span className='lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block'>
                <Button onClick={handleLogOut} size='large' className='w-full'>
                    <span className='flex items-center'>
                        <IoLogOutOutline className='mr-3 text-lg' />
                        <span className='text-sm'>Системээс гарах</span>
                    </span>
                </Button>
            </span>
        </div>
    );
}

export default SidebarContent;
