import { useEffect, useState } from 'react';

function useMount() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
}

export default useMount;
