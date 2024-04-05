import { dayNames } from 'a/components/ui/form/elements/datepicker/dateData';

export function getNumberOfDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
export function getSortedDays(year, month) {
    const dayIndex = new Date(year, month, 1).getDay();
    const firstHalf = dayNames.slice(dayIndex);
    return [...firstHalf, ...dayNames.slice(0, dayIndex)];
}
export function range(start, end) {
    const length = Math.abs((end - start) / 1);
    const { result } = Array.from({ length }).reduce(
        ({ result, current }) => ({
            result: [...result, current],
            current: current + 1,
        }),
        { result: [], current: start },
    );
    return result;
}
