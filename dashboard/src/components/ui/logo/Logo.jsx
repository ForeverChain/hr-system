import React, { useContext } from 'react';
import { WindmillContext } from '@windmill/react-ui';
import tw from 'tailwind-styled-components';
import logoDark from '@/assets/img/logo/logo-color.png';
import logoLight from '@/assets/img/logo/logo-dark.svg';

function Logo() {
    const { mode } = useContext(WindmillContext);
    return (
        <Logotw href='/dashboard'>
            {mode === 'dark' ? (
                <img src={logoLight} alt='Dashtar' width='100' className='pl-6' />
            ) : (
                <img src={logoDark} alt='Dashtar' width='70' height='70' className='pl-6' />
            )}
            <span className='font-bold dark:text-white leading-none'>
                Meta
                <h3 className='text-green-700 dark:text-white'>Asset</h3>
            </span>
        </Logotw>
    );
}

const Logotw = tw.a`
    flex
    items-center
    gap-4
    text-gray-900 
    dark:text-gray-200
`;

export default Logo;
