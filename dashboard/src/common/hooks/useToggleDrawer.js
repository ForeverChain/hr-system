import { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';

const useToggleDrawer = () => {
    const [serviceId, setServiceId] = useState('');
    const [isItInfo, setIsItInfo] = useState(true);
    const [allId, setAllId] = useState([]);
    const [title, setTitle] = useState('');
    const { toggleDrawer, isDrawerOpen, toggleModal, toggleBulkDrawer } =
        useContext(SidebarContext);

    const handleUpdate = (id) => {
        setServiceId(id);
        setIsItInfo(false);
        toggleDrawer();
    };

    const handleShow = (id) => {
        setServiceId(id);
        setIsItInfo(true);
        toggleDrawer();
    };

    const handleUpdateMany = (id) => {
        setAllId(id);
        toggleBulkDrawer();
    };

    const handleModalOpen = (id, title1) => {
        setServiceId(id);
        toggleModal();
        setTitle(title1);
    };

    useEffect(() => {
        if (!isDrawerOpen) {
            setServiceId();
        }
    }, [isDrawerOpen]);

    const handleDeleteMany = async (id, products) => {
        setAllId(id);
        toggleModal();
        setTitle('Selected Products');
    };

    return {
        title,
        allId,
        serviceId,
        handleUpdate,
        setServiceId,
        handleModalOpen,
        handleDeleteMany,
        handleUpdateMany,
        handleShow,
        isItInfo,
    };
};

export default useToggleDrawer;
