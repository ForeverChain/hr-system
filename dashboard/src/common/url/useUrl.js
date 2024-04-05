import { useCallback, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function useUrl() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const checkFirstUrl = useCallback(() => {
        const firstUrl = pathname?.split('/')[1];
        return firstUrl;
    }, [pathname]);

    const isNoLayoutUrl = useCallback(() => {
        const url = checkFirstUrl();
        return url === 'login' || url === 'sign-up' || url === 'reset-password';
    }, [pathname]);

    const setQueryString = useCallback(
        (name, value) => {
            // debugger
            const params = new URLSearchParams(searchParams);
            params.set(name, value);
            return params.toString();
        },
        [searchParams],
    );
    const isNoLayoutPage = isNoLayoutUrl();

    useEffect(() => {
        const body = typeof window !== 'undefined' && document.getElementById('body');
        if (body) {
            if (isNoLayoutPage) body.classList.add('overflow-hidden');
            else body.classList.remove('overflow-hidden');
        }
    }, [pathname]);

    return {
        pathname,
        checkFirstUrl,
        isNoLayoutUrl,
        setQueryString,
        isNoLayoutPage,
    };
}

export default useUrl;
