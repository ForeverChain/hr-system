import { useState } from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

function LineChart({ salesReport }) {
    // console.log("saleReport", salesReport);
    // Create a Set to store unique dates
    const uniqueDates = new Set();

    // Use filter to iterate through the array and add unique dates to the Set
    const updatedSalesReport = salesReport?.filter((item) => {
        const isUnique = !uniqueDates.has(item.date);
        uniqueDates.add(item.date);
        return isUnique;
    });

    // console.log("updatedSalesReport", updatedSalesReport);

    const [activeButton, setActiveButton] = useState({
        title: 'Asset',
        color: 'emerald',
    });

    const handleClick = ({ title, color }) => {
        setActiveButton({ title, color });
    };

    const barOptions = {
        data: {
            labels: updatedSalesReport
                ?.sort((a, b) => new Date(a.date) - new Date(b.date))
                ?.map((or) => or.date),
            datasets: [
                activeButton.title === 'Asset'
                    ? {
                          label: 'Asset',
                          data: updatedSalesReport
                              ?.sort((a, b) => new Date(a.date) - new Date(b.date))
                              ?.map((or) => or.Asset),
                          borderColor: '#10B981',
                          backgroundColor: '#10B981',
                          borderWidth: 3,
                          yAxisID: 'y',
                      }
                    : {
                          label: 'NFT',
                          data: updatedSalesReport
                              ?.sort((a, b) => new Date(a.date) - new Date(b.date))
                              ?.map((or) => or.NFT),
                          borderColor: '#F97316',
                          backgroundColor: '#F97316',
                          borderWidth: 3,
                          yAxisID: 'y',
                      },
            ],
        },
        options: {
            responsive: true,
        },
        legend: {
            display: false,
        },
    };

    const { t } = useTranslation();

    return (
        <>
            <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4'>
                <ul className='flex flex-wrap -mb-px'>
                    <li className='mr-2'>
                        <button
                            onClick={() => handleClick({ title: 'Asset', color: 'emerald' })}
                            type='button'
                            className={`inline-block p-2 rounded-t-lg border-b-2 border-transparent ${
                                activeButton.title === 'Asset'
                                    ? 'text-emerald-600 border-emerald-600 dark:text-emerald-500 dark:border-emerald-500'
                                    : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                            }  focus:outline-none`}
                        >
                            Asset
                        </button>
                    </li>

                    <li className='mr-2'>
                        <button
                            onClick={() => handleClick({ title: 'NFT', color: 'red' })}
                            type='button'
                            className={`inline-block p-2 rounded-t-lg border-b-2 border-transparent ${
                                activeButton.title === 'NFT'
                                    ? 'text-orange-500 border-orange-500 dark:text-orange-500 dark:border-orange-500'
                                    : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                            }  focus:outline-none`}
                        >
                            NFTs
                        </button>
                    </li>
                </ul>
            </div>

            <Line {...barOptions} />
        </>
    );
}

export default LineChart;
