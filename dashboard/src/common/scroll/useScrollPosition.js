import { useEffect, useState } from 'react';
import useWindow from '../window/useWindow';

function useScrollPosition(ref) {
    const { browserWindow } = useWindow();
    const [scroll, setScroll] = useState({
        scrollHeight: 0,
        scrollWidth: 0,
    });

    function handleScroll() {
        const element = ref?.current;
        setScroll((prev) => ({
            ...prev,
            scrollHeight: element?.scrollHeight || 0,
            scrollWidth: element?.scrollWidth || 0,
        }));
    }

    useEffect(() => {
        handleScroll();
    }, [browserWindow.innerHeight, browserWindow.innerWidth]);
    return scroll;
}

export function scrollLeft(ref, leftPosition) {
    if (ref.current) {
        ref.current.scrollTo({
            left: leftPosition,
            behavior: 'smooth',
        });
    }
}

export default useScrollPosition;
