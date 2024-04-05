import React, { useContext } from 'react';
import Switch from 'react-switch';
import { useLocation } from 'react-router-dom';

//internal import
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import AttributeServices from '@/common/services/AttributeServices';
import CategoryServices from '@/common/services/CategoryServices';
import CouponServices from '@/common/services/CouponServices';
import CurrencyServices from '@/common/services/CurrencyServices';
import LanguageServices from '@/common/services/LanguageServices';
import ProductServices from '@/common/services/ProductServices';
import { notifyError, notifySuccess } from '@/utils/toast';

function ShowHideButton({ id, status, category, currencyStatusName }) {
    const location = useLocation();
    const { setIsUpdate } = useContext(SidebarContext);

    const handleChangeStatus = async (id) => {
        // return notifyError("This Feature is disabled for demo!");
        try {
            let newStatus;
            if (status === 'show') {
                newStatus = 'hide';
            } else {
                newStatus = 'show';
            }

            if (location.pathname === '/categories' || category) {
                const res = await CategoryServices.updateStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }

            if (location.pathname === '/products') {
                const res = await ProductServices.updateStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }

            if (location.pathname === '/languages') {
                const res = await LanguageServices.updateStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }
            if (location.pathname === '/currencies') {
                if (currencyStatusName === 'status') {
                    const res = await CurrencyServices.updateEnabledStatus(id, {
                        status: newStatus,
                    });
                    setIsUpdate(true);
                    notifySuccess(res.message);
                } else {
                    const res = await CurrencyServices.updateLiveExchangeRateStatus(id, {
                        live_exchange_rates: newStatus,
                    });
                    setIsUpdate(true);
                    notifySuccess(res.message);
                }
            }

            if (location.pathname === '/attributes') {
                const res = await AttributeServices.updateStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }

            if (location.pathname === `/attributes/${location.pathname.split('/')[2]}`) {
                const res = await AttributeServices.updateChildStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }

            if (location.pathname === '/coupons') {
                // console.log('coupns',id)
                const res = await CouponServices.updateStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }

            if (location.pathname === '/our-staff') {
                // console.log('coupns',id)
                const res = await CouponServices.updateStaffStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }
        } catch (err) {
            notifyError(err ? err?.response?.data?.message : err?.message);
        }
    };

    return (
        <Switch
            onChange={() => handleChangeStatus(id)}
            checked={status === 'show'}
            className='react-switch md:ml-0'
            uncheckedIcon={
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        width: 120,
                        fontSize: 14,
                        color: 'white',
                        paddingRight: 22,
                        paddingTop: 1,
                    }}
                />
            }
            width={30}
            height={15}
            handleDiameter={13}
            offColor='#E53E3E'
            onColor='#2F855A'
            checkedIcon={
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 73,
                        height: '100%',
                        fontSize: 14,
                        color: 'white',
                        paddingLeft: 20,
                        paddingTop: 1,
                    }}
                />
            }
        />
    );
}

export default ShowHideButton;
