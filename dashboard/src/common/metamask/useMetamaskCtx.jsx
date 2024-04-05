import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { formatBalance } from './_helpers';

const disconnectedState = { accounts: [], balance: '', chainId: '' };
const MetaMaskContext = createContext({});

function MetaMaskContextProvider({ children }) {
    const [isMetamask, setIsMetamask] = useState(false);
    const [hasProvider, setHasProvider] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [wallet, setWallet] = useState(disconnectedState);
    const isMetaMaskLoggedIn = wallet.accounts.length > 0;
    const clearError = () => setErrorMessage('');

    // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
    const _updateWallet = useCallback(async (providedAccounts) => {
        const accounts =
            providedAccounts ||
            (await window.ethereum.request({
                method: 'eth_accounts',
            }));

        if (accounts.length === 0) {
            // If there are no accounts, then the user is disconnected
            setWallet(disconnectedState);
            return;
        }

        const balance = formatBalance(
            await window.ethereum.request({
                method: 'eth_getBalance',
                params: [accounts[0], 'latest'],
            }),
        );
        const chainId = await window.ethereum.request({
            method: 'eth_chainId',
        });

        setWallet({ accounts, balance, chainId });
    }, []);

    const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet]);
    const updateWallet = useCallback((accounts) => _updateWallet(accounts), [_updateWallet]);

    useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({
                silent: true,
            });
            setHasProvider(Boolean(provider));

            if (provider) {
                updateWalletAndAccounts();
                window.ethereum.on('accountsChanged', updateWallet);
                window.ethereum.on('chainChanged', updateWalletAndAccounts);
            }
        };

        getProvider();

        return () => {
            window.ethereum?.removeListener('accountsChanged', updateWallet);
            window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts);
        };
    }, [updateWallet, updateWalletAndAccounts]);

    const connectMetaMask = async () => {
        setIsConnecting(true);
        try {
            if (!window.ethereum) {
                const installMetamask = window.confirm('Pls install metamask');
                if (installMetamask) {
                    window.open(
                        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
                    );
                }
                return;
            }
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            clearError();
            updateWallet(accounts);
        } catch (err) {
            setErrorMessage(err.message);
        }
        setIsConnecting(false);
    };

    const logoutMetaMask = async () => {
        try {
            if (window.ethereum) {
                setWallet(disconnectedState);
                await window.ethereum.disconnect();
            }
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    return (
        <MetaMaskContext.Provider
            value={{
                wallet,
                hasProvider,
                error: !!errorMessage,
                errorMessage,
                isConnecting,
                connectMetaMask,
                clearError,
                logoutMetaMask,
                isMetaMaskLoggedIn,
                isMetamask,
                setIsMetamask,
            }}
        >
            {children}
        </MetaMaskContext.Provider>
    );
}

function useMetamaskCtx() {
    const context = useContext(MetaMaskContext);
    if (context === undefined) {
        throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"');
    }
    return context;
}
export { useMetamaskCtx, MetaMaskContextProvider };
