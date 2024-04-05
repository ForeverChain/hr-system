import { useEffect, useState } from 'react';
import { formatAddress } from './_helpers';
import { useMetamaskCtx } from './useMetamaskCtx';

export function MetamaskNavigation() {
    const {
        wallet,
        hasProvider,
        isConnecting,
        connectMetaMask,
        isMetaMaskLoggedIn,
        logoutMetaMask,
    } = useMetamaskCtx();
    const [isMetamask, setIsMetamask] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMetamask(window.ethereum?.isMetaMask);
        }
    }, []);

    return (
        <div>
            <div>
                <div>{isMetaMaskLoggedIn ? 'нэвтэрсэн' : 'нэвтрээгүй'}</div>
                <div>{isMetaMaskLoggedIn && <button onClick={logoutMetaMask}>logout</button>}</div>
                <div>
                    {!hasProvider && (
                        <a href='https://metamask.io' target='_blank' rel='noreferrer'>
                            Install MetaMask
                        </a>
                    )}
                    {isMetamask && wallet.accounts.length < 1 && (
                        <button disabled={isConnecting} onClick={connectMetaMask}>
                            Connect MetaMask
                        </button>
                    )}
                    {hasProvider && wallet.accounts.length > 0 && (
                        <a
                            className='text_link tooltip-bottom'
                            href={`https://etherscan.io/address/${wallet.accounts[0]}`}
                            target='_blank'
                            data-tooltip='Open in Block Explorer'
                            rel='noreferrer'
                        >
                            {formatAddress(wallet.accounts[0])}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
