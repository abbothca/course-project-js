const ONE_DAY = 1000 * 60 * 60 * 24; //ms
const ONE_HOUR = 1000 * 60 * 60; //ms
const ONE_MINUTE = 1000 * 60; //ms
const ONE_SECOND = 1000; //ms
const WEEKENDS = [0, 6];

function arrangeDates(dayOne, dayTwo) {
    return ((new Date(dayOne)).getTime() - (new Date(dayTwo)).getTime() < 0) ?
        { start: dayOne, end: dayTwo } :
        { start: dayTwo, end: dayOne }
}

function getDuration(dayOne, dayTwo, measure) {
    const differenceTimeInMS = getTimestampSetByTwoDays(new Date(dayOne), new Date(dayTwo));
    return getDurationAsMeasure(differenceTimeInMS, measure);
}

function getTimestampSetByTwoDays(dayOne, dayTwo) {
    const period = arrangeDates(dayOne, dayTwo);
    let endDate = (new Date(period.end)).setHours(23, 59, 59, 999);
    let startDate = (new Date(period.start)).setHours(0, 0, 0, 0);
    return endDate - startDate;
}

function getWeeks(dayOne, dayTwo) {
    const durationOfPeriod = getDuration(dayOne, dayTwo, "days");
    const daysLeft = durationOfPeriod % 7;
    const period = arrangeDates(dayOne, dayTwo);
    const startDay = (new Date(period.start)).getDay();
    let indexesOfRestDays = [];
    for (let i = 0; i < daysLeft; i++) {
        let numberCurrentDay = startDay + i;
        (numberCurrentDay < 7) ? indexesOfRestDays.push(numberCurrentDay) : indexesOfRestDays.push(numberCurrentDay - 7);
    }

    return {
        fullWeek: Math.floor(durationOfPeriod / 7),
        restDays: indexesOfRestDays,
    }
}

function calcWeekends(arrayOfIndexes) {
    const arrayOfWeekends = arrayOfIndexes.filter(function (item) {
        return (WEEKENDS).includes(item);
    });
    return arrayOfWeekends.length;
}

function getDurationAsMeasure(milliseconds, measure) {
    switch (measure) {
        case "days":
            return Math.round(milliseconds / ONE_DAY);
        case "hours":
            return Math.round(milliseconds / ONE_HOUR);
        case "minutes":
            return Math.round(milliseconds / ONE_MINUTE);
        case "seconds":
            return Math.round(milliseconds / ONE_SECOND);
    }
}

function calcDuration(dayOne, dayTwo, days, measure) {
    switch (days) {
        case "days":
            return getDuration(dayOne, dayTwo, measure);
        case "weekdays":
            const weekdays = getWeeks(dayOne, dayTwo);
            const amountWeekdays = weekdays.fullWeek * 5 + (weekdays.restDays.length - calcWeekends(weekdays.restDays));
            return getDurationAsMeasure(amountWeekdays * ONE_DAY, measure)
        case "weekends":
            const weekends = getWeeks(dayOne, dayTwo);
            const amountWeekends = weekends.fullWeek * 2 + calcWeekends(weekends.restDays);
            return getDurationAsMeasure(amountWeekends * ONE_DAY, measure);
    }
}

export { calcDuration as getDurationTime };