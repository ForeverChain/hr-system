import React from 'react';
import { useMetamaskCtx } from './useMetamaskCtx';
import { formatChainAsNum } from './_helpers';

function Example() {
    const { wallet } = useMetamaskCtx();
    return (
        <div>
            {wallet.accounts.length > 0 && (
                <>
                    <div>Wallet Accounts: {wallet.accounts[0]}</div>
                    <div>Wallet Balance: {wallet.balance}</div>
                    <div>Hex ChainId: {wallet.chainId}</div>
                    <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
                </>
            )}
        </div>
    );
}

export default Example;
