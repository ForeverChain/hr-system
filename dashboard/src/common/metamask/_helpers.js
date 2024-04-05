export const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance, 10) / 1000000000000000000).toFixed(2);
    return balance;
};

export const formatChainAsNum = (chainIdHex) => {
    const chainIdNum = parseInt(chainIdHex, 10);
    return chainIdNum;
};

export const formatAddress = (addr) => {
    return `${addr.substring(0, 8)}...`;
};
