/**
 * @createdBy Phill Anderson 2022/02/27
 */
import { useEffect, useState } from 'react';
import { debounce } from 'libs/utils/timer';

function useWindow() {
    const [browserWindow, setBrowserWindow] = useState({
        innerWidth: null,
        innerHeight: null,
        scrollHeight: null,
    });

    function handleWindowResize() {
        const body = document.getElementById('body');
        setBrowserWindow((prev) => ({
            ...prev,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollHeight: body.scrollHeight,
        }));
    }

    useEffect(() => {
        handleWindowResize();
        const debouncedHandleWindowSize = debounce(() => handleWindowResize(), 500);
        window.addEventListener('resize', debouncedHandleWindowSize);

        return () => {
            window.removeEventListener('resize', debouncedHandleWindowSize);
        };
    }, []);

    return { browserWindow };
}

export default useWindow;
