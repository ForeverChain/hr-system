import { lazy } from 'react';

const LicenseAgreementPopup = lazy(() => import('@/features/admin/popup/DummyAdminPopup'));
const DeleteUserPopup = lazy(() => import('@/features/user/popup/DeleteUserPopup'));
const DeleteAdminPopup = lazy(() => import('@/features/admin/popup/DeleteAdminPopup'));
const DeletePlatformPopup = lazy(() => import('@/features/platforms/popup/DeletePlatformPopup'));
const DeletePlatformPopupMany = lazy(
    () => import('@/features/platforms/popup/DeletePlatformPopupMany'),
);
const DeleteAsset = lazy(() => import('@/features/assets/DeleteAssetPopup'));
const DeleteAssetMany = lazy(() => import('@/features/assets/DeleteAssetPopupMany'));

export const POPUP_TYPES = {
    LICENSE_AGREEMENT: 'LICENSE_AGREEMENT',
    DELETE_USER: 'DeleteUserPopup',
    DELETE_ADMIN: 'DeleteAdminPopup',
    DELETE_PLATFORM: 'DeletePlatformPopup',
    DELETE_PLATFORM_MANY: 'DeletePlatformPopupMany',
    DELETE_ASSET: 'DeleteAsset',
    DELETE_ASSET_MANY: 'DeleteAssetMany',
};

export const POPUP_COMPONENTS = {
    [POPUP_TYPES.LICENSE_AGREEMENT]: LicenseAgreementPopup,
    [POPUP_TYPES.DELETE_USER]: DeleteUserPopup,
    [POPUP_TYPES.DELETE_ADMIN]: DeleteAdminPopup,
    [POPUP_TYPES.DELETE_PLATFORM]: DeletePlatformPopup,
    [POPUP_TYPES.DELETE_PLATFORM_MANY]: DeletePlatformPopupMany,
    [POPUP_TYPES.DELETE_ASSET]: DeleteAsset,
    [POPUP_TYPES.DELETE_ASSET_MANY]: DeleteAssetMany,
};
