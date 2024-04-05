import { FiGrid, FiUsers, FiUser } from 'react-icons/fi';
import { GiPlatform } from 'react-icons/gi';
import { SiEventstore } from 'react-icons/si';
import { LiaCoinsSolid } from 'react-icons/lia';
import { RiNftFill } from 'react-icons/ri';
import { LuBaggageClaim } from 'react-icons/lu';

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
    {
        path: '/dashboard', // the url
        icon: FiGrid, // icon
        name: 'Dashboard', // name that appear in Sidebar
    },
    {
        path: '/admins',
        icon: FiUser,
        name: 'Админууд',
    },
    {
        path: '/customers',
        icon: FiUsers,
        name: 'Энгийн хэрэглэгч',
    },
    {
        path: '/categories',
        icon: LiaCoinsSolid,
        name: 'Категор',
    },
    {
        path: '/places',
        icon: GiPlatform,
        name: 'Байршил',
    },
    {
        path: '/assets',
        icon: LiaCoinsSolid,
        name: 'Захиалга',
    },
    // {
    //     path: '/events',
    //     icon: SiEventstore,
    //     name: 'Events',
    // },
    // {
    //     path: '/nfts',
    //     icon: RiNftFill,
    //     name: 'Nfts',
    // },
    // {
    //     path: '/claims',
    //     icon: LuBaggageClaim,
    //     name: 'Claims',
    // },
];

export default sidebar;
