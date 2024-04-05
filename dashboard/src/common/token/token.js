import { jwtDecode } from 'jwt-decode';
import { getCookie, removeCookie, setAuthJWTCookie } from '@/common/storage/cookieStorage';
import { CookieName } from '@/libs/constants';

export function getAuthToken() {
    return getCookie(CookieName.TOKEN);
}

export function setTokenIntoCookie(token) {
    setAuthJWTCookie(token);
}

export function endToken() {
    return window !== undefined && removeCookie(CookieName.TOKEN);
}
export function isTokenExpired(token) {
    if (!token) return true;

    const decoded = jwtDecode(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTimestamp;
}
