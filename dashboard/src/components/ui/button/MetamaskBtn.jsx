import React, { useRef, useEffect, useState } from 'react';
import { useMetamaskCtx } from 'common/metamask/useMetamaskCtx';
import { formatAddress } from 'common/metamask/_helpers';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useGlobalCtx } from 'common/global/useGlobalCtx';
import useJwtAuth from 'features/user/auth/useJwtAuth';
// import { useGlobalPopupCtx } from 'common/popup/useGlobalPopupCtx'
// import { GLOBAL_POPUP_TYPES } from 'common/popup/globalPopupRegistration'
import ProfileDropdown from 'components/layout/header/ProfileDropdown';
import useOnClickOutside from 'common/mouse/useOnClickOutside';

function MetamaskBtn() {
    const { wallet, hasProvider, connectMetaMask, isMetaMaskLoggedIn, setIsMetamask } =
        useMetamaskCtx();
    const { authState } = useGlobalCtx();

    const { push } = useRouter();
    const { loginWallet } = useJwtAuth();
    const [isShowProfileDropdown, setIsShowProfileDropdown] = useState(false);

    const metaBtnRef = useRef(null);
    useOnClickOutside(metaBtnRef, () => setIsShowProfileDropdown(false));

    async function handleWalletLogin() {
        await connectMetaMask();
    }

    async function handleClickName() {
        // showGlobalPopup(GLOBAL_POPUP_TYPES.DECISION,
        //     {
        //         message: '로그아웃하시겠습니까?',
        //         ok: async () => {
        //             logoutUser()
        //          }
        // })
        setIsShowProfileDropdown((prev) => !prev);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMetamask(window.ethereum?.isMetaMask);
        }
    }, []);

    useEffect(() => {
        if (authState && wallet?.accounts?.length > 0) {
            const walletAddress = wallet.accounts[0];
            loginWallet(walletAddress);
        }
    }, [wallet?.accounts]);
    return (
        <div ref={metaBtnRef} className='flat-wallet flex'>
            <div id='wallet-header'>
                {isMetaMaskLoggedIn ? (
                    <ButtonsWrapper>
                        <button onClick={() => push('/my-page')}>
                            <span>
                                <i className='icon-wa' />
                                {hasProvider &&
                                    wallet.accounts.length > 0 &&
                                    `${formatAddress(wallet.accounts[0])}`}
                            </span>
                        </button>
                        <button onClick={handleClickName}>
                            <span>{authState?.nickname}</span>
                        </button>
                    </ButtonsWrapper>
                ) : (
                    <ButtonsWrapper>
                        <button onClick={handleWalletLogin}>
                            <span>
                                <i className='icon-wa' />
                                <span className='ml-2'>지갑연결</span>
                            </span>
                        </button>
                        <button onClick={handleClickName}>
                            <span>{authState?.nickname}</span>
                        </button>
                    </ButtonsWrapper>
                )}
            </div>
            <ProfileDropdown
                isShow={isShowProfileDropdown}
                setIsShowProfileDropdown={setIsShowProfileDropdown}
            />
            {/* <FlatSidebarBtn onClick={handleSidebar} /> */}
        </div>
    );
}

const ButtonsWrapper = styled.div`
    & button:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    & button:last-child {
        border-left: 1px solid #fff;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
`;

export default MetamaskBtn;
