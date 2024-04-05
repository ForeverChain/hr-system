import { Select } from '@windmill/react-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

//internal import

import useAsync from '@/common/hooks/useAsync';
import CategoryServices from '@/common/services/CategoryServices';
import useUtilsFunction from '@/common/hooks/useUtilsFunction';

function SelectCategory({ setCategory }) {
    // console.log('data category',data)
    const { t } = useTranslation();
    const { data } = useAsync(CategoryServices.getAllCategories);
    const { showingTranslateValue } = useUtilsFunction();

    return (
        <>
            <Select onChange={(e) => setCategory(e.target.value)}>
                <option value='All' defaultValue hidden>
                    {t('Category')}
                </option>
                {data?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {showingTranslateValue(cat?.name)}
                    </option>
                ))}
            </Select>
        </>
    );
}

export default SelectCategory;
