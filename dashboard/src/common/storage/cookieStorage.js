import { CookieName } from '@/libs/constants';

export function getCookie(name) {
    const value =
        typeof window !== 'undefined' && document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? unescape(value[2]) : undefined;
}

export function setCookie(name, value, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + '; path=/';
}

export function removeCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// хугацаа өгөөгүй учраас session cookie

export function setSessionCookie(sessionCookieName, value) {
    const theValue = JSON.stringify(value);
    document.cookie = `${sessionCookieName}=${theValue};path=/`;
}

export function setAuthJWTCookie(token) {
    document.cookie = `${CookieName.TOKEN}=${token};path=/`;
}
