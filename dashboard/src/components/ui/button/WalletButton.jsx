import { useMetaMask } from 'metamask-react';
import { formatAddress } from 'a/common/metamask/_helpers';
import { useUserCtx } from 'a/features/user/useUserCtx';
import useUser from 'a/features/user/useUser';
import { useGlobalCtx } from 'a/common/global/useGlobalCtx';
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration';
import { useRouter } from 'next/router';
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx';
import WalletIcon from '../icon/WalletIcon';
import { RoundBtn } from './Button';

export default function WalletButton() {
    const { status, connect, account } = useMetaMask();
    const { userInfo, setUserInfo } = useUserCtx();
    // console.log(account, chainId, ethereum)
    const walletHandler = () => {
        if (status === 'unavailable') {
            console.log('unavailable');
        }
    };
    const { updateWallet } = useUser();
    const { setAuthState, authState } = useGlobalCtx();
    const { showGlobalPopup } = useGlobalPopupCtx();
    const { push } = useRouter();

    async function handleAddWalletAddress(e) {
        e.preventDefault();
        const walletPayload = {
            walletAddress: account,
        };
        const res = await updateWallet(walletPayload);
        if (res.status === 200) {
            setAuthState((prev) => ({
                ...prev,
                walletAddress: res?.data?.result?.walletAddress,
            }));
            setUserInfo((prev) => ({
                ...prev,
                walletAddress: res?.data?.result?.walletAddress,
            }));

            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message: '지갑 연결되었습니다.',
            });
        } else {
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message: '지갑 연결 시 문제가 발생했습니다.',
            });
        }
    }

    if (status === 'initializing') return <div>Ongoing...</div>;

    if (status === 'unavailable')
        return (
            <RoundBtn onClick={walletHandler} className='js-wallet'>
                <WalletIcon />
            </RoundBtn>
        );

    if (status === 'notConnected')
        return (
            <RoundBtn onClick={connect} className='js-wallet'>
                <WalletIcon />
            </RoundBtn>
        );

    if (status === 'connecting') return <div>Connecting...</div>;

    if (status === 'connected') {
        if (authState) {
            if (userInfo?.walletAddress) {
                return (
                    <RoundBtn
                        onClick={() => push('/my-page')}
                        className='js-wallet w-[140px] flex gap-2'
                    >
                        <WalletIcon />
                        {formatAddress(userInfo?.walletAddress)}
                    </RoundBtn>
                );
            } else {
                return (
                    <RoundBtn
                        onClick={(e) => handleAddWalletAddress(e)}
                        className='js-wallet w-[200px] flex gap-2'
                    >
                        <WalletIcon />
                        지갑연결
                    </RoundBtn>
                );
            }
        }
    }
}
