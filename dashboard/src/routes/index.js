import { lazy } from 'react';

// use lazy for better code splitting
const Dashboard = lazy(() => import('@/features/dashboard/DashboardPage'));
const UsersPage = lazy(() => import('@/features/user/UsersPage'));
const InterviewPage = lazy(() => import('@/features/interview/InterviewPage'));
const RatingPage = lazy(() => import('@/features/rating/InterviewPage'));
const Page404 = lazy(() => import('@/features/404'));
const ComingSoon = lazy(() => import('@/features/ComingSoon'));
const EditProfile = lazy(() => import('@/features/user/profile/EditProfile'));
const Setting = lazy(() => import('@/features/user/profile/Setting'));
const Admins = lazy(() => import('@/features/admin/AdminsPage'));
const Hr = lazy(() => import('@/features/hr/HrPage'));
const Platforms = lazy(() => import('@/features/platforms/PlatformPage'));
const EventsPage = lazy(() => import('@/features/event/EventsPage'));
const AssetsPage = lazy(() => import('@/features/assets/AssetPage'));
const AssetDetailPage = lazy(() => import('@/features/assets/detail/AssetDetail'));
const NftPage = lazy(() => import('@/features/nft/NftPage'));
const ClaimsPage = lazy(() => import('@/features/claims/ClaimsPage'));
/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
    {
        path: '/dashboard',
        component: Dashboard,
    },
    {
        path: '/admins',
        component: Admins,
    },
    {
        path: '/hr',
        component: Hr,
    },
    {
        path: '/customers',
        component: UsersPage,
    },
    {
        path: '/platforms',
        component: Platforms,
    },
    {
        path: '/interview',
        component: InterviewPage,
    },
    {
        path: '/rating',
        component: RatingPage,
    },

    {
        path: '/events',
        component: EventsPage,
    },
    {
        path: '/nfts',
        component: NftPage,
    },
    {
        path: '/claims',
        component: ClaimsPage,
    },
    {
        path: '/settings',
        component: Setting,
    },
    {
        path: '/404',
        component: Page404,
    },
    {
        path: '/coming-soon',
        component: ComingSoon,
    },
    {
        path: '/edit-profile',
        component: EditProfile,
    },
    {
        path: '/assets',
        component: AssetsPage,
    },
    {
        path: '/assets/:id',
        component: AssetDetailPage,
    },
];

export default routes;
