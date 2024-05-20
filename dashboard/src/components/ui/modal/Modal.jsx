import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const MyModal = ({ isOpen, onRequestClose, user }) => (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel='Interview Modal'>
        <h2>Interview for {user?.name}</h2>
        <button onClick={onRequestClose}>Close</button>
    </Modal>
);

export default MyModal;
