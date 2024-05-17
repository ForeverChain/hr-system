import { FiGrid, FiUsers, FiUser } from 'react-icons/fi';
import { GiPlatform, GiSelect } from 'react-icons/gi';
import { SiEventstore } from 'react-icons/si';
import { LiaCoinsSolid } from 'react-icons/lia';
import { RiNftFill } from 'react-icons/ri';
import { FcRating } from 'react-icons/fc';
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
        path: '/admins',
        icon: FiUser,
        name: 'Админууд',
        showAdmin: true,
    },
    {
        path: '/hr',
        icon: FiUser,
        name: 'Хүний нөөцийн менежер',
        showAdmin: true,
    },
    {
        path: '/customers',
        icon: FiUsers,
        name: 'Ажилчдын мэдээлэл',
        showAdmin: false,
    },

    {
        path: '/interview',
        icon: GiPlatform,
        name: 'Сонгон шалгаруулалт',
        showAdmin: false,
    },
    {
        path: '/rating',
        icon: FcRating,
        name: 'Ажилчдын үнэлгээ',
        showAdmin: false,
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
