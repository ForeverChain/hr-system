import { Select } from '@windmill/react-ui';

//internal import
import useAsync from '@/common/hooks/useAsync';
import CurrencyServices from '@/common/services/CurrencyServices';
// import { CODES } from 'currencies-map';

function SelectCurrency({
    register,
    name,
    label,
    required,
    // loading,
}) {
    const { data, loading } = useAsync(CurrencyServices.getShowingCurrency);

    return (
        <>
            {loading ? (
                'Loading...'
            ) : (
                <Select
                    name={name}
                    {...register(`${name}`, {
                        required: required ? false : `${label} is required!`,
                    })}
                >
                    {data?.map((currency) => (
                        <option key={currency._id} value={`${currency.symbol}`}>
                            {currency?.name}
                        </option>
                    ))}
                </Select>
            )}
        </>
    );
}
export default SelectCurrency;
