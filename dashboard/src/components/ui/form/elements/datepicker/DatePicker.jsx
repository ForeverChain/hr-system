import React, { useState } from 'react';
import CalendarUi from 'react-calendar';

function DatePicker(props) {
    const { maxDate, minDate, locale } = props;
    const [activeDate, setActiveDate] = useState(new Date());

    function handleActiveStartDateChange() {
        setActiveDate(new Date());
    }
    return (
        <div>
            <CalendarUi
                activeStartDate={activeDate}
                className='calendar'
                locale={locale}
                minDate={minDate}
                maxDate={maxDate}
                onActiveStartDateChange={handleActiveStartDateChange}
            />
        </div>
    );
}

export default DatePicker;
