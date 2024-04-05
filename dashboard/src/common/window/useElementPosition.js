/**
 * @createdBy Phill Anderson 2022/02/27
 */
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { debounce } from 'libs/utils/timer';
import { useGlobalCtx } from '../global/useGlobalCtx';

function useElementPosition(refObject, options = {}) {
    const { globalName } = options;
    const { locale } = useRouter();
    const { setGlobalItems } = useGlobalCtx();

    const [refObjectData, setRefObjectData] = useState({
        clientRect: {
            top: null,
            bottom: null,
            left: null,
            right: null,
        },
        offsets: {
            offsetHeight: null,
            offsetLeft: null,
            offsetTop: null,
            offsetWidth: null,
        },
        clientData: {
            clientHeight: null,
            clientWidth: null,
            clientLeft: null,
        },
    });
    const [positionRect, setPositionRect] = useState({
        top: null,
        bottom: null,
        left: null,
        right: null,
        elementName: null,
    });

    const [positionOffset, setPositionOffset] = useState({
        offsetHeight: null,
        offsetLeft: null,
        offsetTop: null,
        offsetWidth: null,
        elementName: null,
    });

    function handleElPosition(e) {
        const elementName = e.currentTarget.innerText;
        const { top, left, bottom, right } = e.currentTarget.getBoundingClientRect();
        setPositionRect((prev) => ({
            ...prev,
            top,
            left,
            bottom,
            right,
            elementName,
        }));

        const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = e.currentTarget;
        setPositionOffset((prev) => ({
            ...prev,
            offsetHeight,
            offsetLeft,
            offsetTop,
            offsetWidth,
            elementName,
        }));
    }

    function handleDataGenerate() {
        if (refObject?.current) {
            const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = refObject.current;
            const { top, left, bottom, right } = refObject.current.getBoundingClientRect();
            // console.log('refObject.current', refObject.current.offsetHeight)
            setRefObjectData((prev) => ({
                ...prev,
                clientRect: {
                    top,
                    left,
                    bottom,
                    right,
                },
                offsets: {
                    offsetHeight: offsetHeight || 0,
                    offsetLeft,
                    offsetTop,
                    offsetWidth,
                },
                clientData: {
                    clientHeight: refObject?.current?.clientHeight,
                    clientWidth: refObject?.current?.clientWidth,
                    clientLeft: refObject?.current?.clientLeft,
                },
            }));

            if (globalName) {
                if (typeof setGlobalItems === 'function') {
                    setGlobalItems((prev) => ({
                        ...prev,
                        [globalName]: {
                            clientRect: {
                                top,
                                left,
                                bottom,
                                right,
                            },
                            offsets: {
                                offsetHeight,
                                offsetLeft,
                                offsetTop,
                                offsetWidth,
                            },
                            clientData: {
                                clientHeight: refObject.current?.clientHeight,
                                clientWidth: refObject.current?.clientWidth,
                                clientLeft: refObject.current?.clientLeft,
                            },
                        },
                    }));
                }
            }
        }
    }

    useEffect(() => {
        if (refObject?.current) {
            const domObject = refObject.current;
            const debouncedDataGenerate = debounce(() => handleDataGenerate(), 500);
            handleDataGenerate();

            window.addEventListener('resize', debouncedDataGenerate);
            domObject.addEventListener('scroll', debouncedDataGenerate);

            return () => {
                window.removeEventListener('resize', debouncedDataGenerate);
                domObject.removeEventListener('scroll', debouncedDataGenerate);
            };
        } else {
            alert('useElement position ruu ref damjuulna uu!');
        }
    }, [locale]);

    return {
        handleElPosition,
        positionRect,
        positionOffset,
        refObjectData,
        setRefObjectData,
    };
}

export default useElementPosition;
