export const parseToken = (token) => {
    let parsedToken;
    try {
        if (token) {
            parsedToken = JSON.parse(atob(token.split('.')[1]));
        }
        return parsedToken;
    } catch (e) {
        throw new Error(e);
    }
};

export const isTokenExpired = (token) => {
    if (token) {
        if (token.exp * 1000 < Date.now()) {
            return true;
        }
    }
    return false;
};
