import React from 'react';
import tw from 'tailwind-styled-components';
import useJwtAuth from 'a/features/user/auth/useJwtAuth';
import { useRouter } from 'next/navigation';
import { RoundBtn } from './Button';
import UserIcon from '../icon/UserIcon';
import SignOutIcon from '../icon/SignOutIcon';
import GhostBtn from './GhostBtn';

function ProfileBtn() {
    const { logoutUser } = useJwtAuth();
    const { push } = useRouter();
    return (
        <div className='js-nav-dropdown group-dropdown relative'>
            <RoundBtn className='dropdown-toggle '>
                <UserIcon />
            </RoundBtn>
            <DropdownContainer>
                <GhostBtn onClick={() => push('/my-page')}>
                    <UserIcon />
                    <span className='font-display text-jacarta-700 mt-1 text-sm dark:text-white'>
                        내 프로필
                    </span>
                </GhostBtn>
                <GhostBtn onClick={() => logoutUser()}>
                    <SignOutIcon />
                    <span className='font-display text-jacarta-700 mt-1 text-sm dark:text-white'>
                        로그아웃
                    </span>
                </GhostBtn>
            </DropdownContainer>
        </div>
    );
}

const DropdownContainer = tw.div`
    dropdown-menu 
    dark:bg-jacarta-800 
    group-dropdown-hover:opacity-100 
    group-dropdown-hover:visible 
    !-right-4 
    !top-[85%] 
    !left-auto 
    z-10 
    min-w-[14rem] 
    whitespace-nowrap 
    rounded-xl 
    bg-white 
    transition-all 
    will-change-transform 
    before:absolute 
    before:-top-3 
    before:h-3 
    before:w-full 
    lg:absolute 
    lg:grid 
    lg:!translate-y-4 
    lg:py-4 
    lg:px-2 
    lg:shadow-2xl 
    hidden 
    lg:invisible 
    lg:opacity-0
`;
export default ProfileBtn;
