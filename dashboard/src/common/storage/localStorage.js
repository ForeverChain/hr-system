export function getLocal(storageName) {
    if (typeof window !== 'undefined') {
        const item = localStorage.getItem(storageName);
        const retVal = item ? JSON.parse(item) : 'ийм local storage байхгүй!';
        return retVal;
    }
    return 'ийм local storage байхгүй!';
}

export function setLocal(storageName, item) {
    const parsedItem = JSON.stringify(item);
    typeof window !== 'undefined' && localStorage.setItem(storageName, parsedItem);
}
