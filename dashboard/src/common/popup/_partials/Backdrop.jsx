import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

function Backdrop({ children, global }) {
    return (
        <AnimatePresence>
            <BackdropOverlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className=''
                global={global}
            >
                {children}
            </BackdropOverlay>
        </AnimatePresence>
    );
}

const BackdropOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    z-index: ${(props) => (props.global ? 1400 : 1300)};
`;
export default Backdrop;
