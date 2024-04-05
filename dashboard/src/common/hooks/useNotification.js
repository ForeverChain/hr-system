import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addSetting, removeSetting } from '@/reduxStore/slice/settingSlice';

const useNotification = () => {
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // setSocket(io(import.meta.env.VITE_APP_API_BASE_URL));
        setSocket(io('http://localhost:5055'));
    }, []);

    useEffect(() => {
        // Listen for the 'notification' event from the server
        socket?.on('notification', (notification) => {
            // Update data in real-time here
            console.log('notification', notification);
            if (notification?.option === 'globalSetting') {
                dispatch(removeSetting('globalSetting'));
                const globalSettingData = {
                    ...notification.globalSetting,
                    name: 'globalSetting',
                };
                dispatch(addSetting(globalSettingData));
            }
            // if(notification?.option === 'storeCustomizationSetting'){

            // }
        });

        return () => {
            // Disconnect the socket when the component unmounts
            socket?.disconnect();
        };
    }, [socket]);

    return {
        socket,
    };
};

export default useNotification;
