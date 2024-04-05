import { FiUsers, FiShoppingCart } from 'react-icons/fi';
import { RiNftLine } from 'react-icons/ri';
import { TbLicense } from 'react-icons/tb';

//internal import
import { useEffect, useState } from 'react';
import LineChart from '@/components/ui/chart/LineChart/LineChart';
import PieChart from '@/components/ui/chart/Pie/PieChart';
import CardItem from '@/features/dashboard/CardItem';
import ChartCard from '@/components/ui/chart/ChartCard';
import PageTitle from '@/components/ui/Typography/PageTitle';
import { useAdminCtx } from '../admin/useAdminCtx';
import useAdmins from '../admin/useAdmins';

function Dashboard() {
    const { dashboardData } = useAdminCtx();
    const { getDashboardData } = useAdmins();
    const [LineChartData, setLinearChartData] = useState(null);

    useEffect(() => {
        getDashboardData();
    }, []);

    useEffect(() => {
        if (dashboardData) {
            const tempArr = [];
            dashboardData?.tokenWeeklyCount?.map((element) => {
                return tempArr.push({
                    date: element.date,
                    NFT: element.count,
                    Asset: dashboardData?.assetTokenWeeklyCount?.filter((token) => {
                        return token.date === element.date;
                    })[0].count,
                });
            });
            setLinearChartData(tempArr);
        }
    }, [dashboardData]);

    return (
        <>
            <PageTitle>Dashboard Overview</PageTitle>
            <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
                <CardItem
                    title='Total Asset'
                    Icon={FiShoppingCart}
                    quantity={dashboardData?.assetTokenCount || 0}
                    className='text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500'
                />
                <CardItem
                    title='Total NFT'
                    Icon={RiNftLine}
                    quantity={dashboardData?.tokenCount || 0}
                    // amount={dashboardOrderCount?.totalPendingOrder?.total || 0}
                    className='text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500'
                />
                <CardItem
                    title='Total License'
                    Icon={TbLicense}
                    quantity={dashboardData?.licenseTokenCount || 0}
                    className='text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500'
                />
                <CardItem
                    title='Total User'
                    Icon={FiUsers}
                    quantity={dashboardData?.userCount || 0}
                    className='text-emerald-600 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-500'
                />
            </div>

            <div className='grid gap-4 md:grid-cols-2 my-8'>
                <ChartCard title='Weekly Statistics'>
                    <LineChart salesReport={LineChartData} />
                </ChartCard>

                <ChartCard title='Asset Platforms'>
                    <PieChart data={dashboardData?.assetCountByPlatform} />
                </ChartCard>
            </div>
        </>
    );
}

export default Dashboard;
