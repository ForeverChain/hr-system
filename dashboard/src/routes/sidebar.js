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
        path: '/admins',
        icon: FiUser,
        name: 'Админууд',
    },
    {
        path: '/hr',
        icon: FiUser,
        name: 'Хүний нөөцийн менежер',
    },
    {
        path: '/customers',
        icon: FiUsers,
        name: 'Ажил горилогч',
    },

    {
        path: '/interview',
        icon: GiPlatform,
        name: 'Ажлын ярилцлага авах',
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
