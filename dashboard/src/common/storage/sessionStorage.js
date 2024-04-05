export function getSession(key) {
    try {
        const serializedValue = sessionStorage.getItem(key);
        if (serializedValue === null) {
            return null;
        }
        const parsedValue = JSON.parse(serializedValue);
        return parsedValue;
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
}

export function setSession(key, value) {
    try {
        const serializedValue = JSON.stringify(value);
        sessionStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error('Error setting session:', error);
    }
}
