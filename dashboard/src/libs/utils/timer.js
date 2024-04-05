export const getCurrentDate = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const time = newDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    const seconds = newDate.getSeconds();

    return { date, time, seconds, month, year };
};

export function debounce(func, delay) {
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}
