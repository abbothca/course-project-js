const ONE_DAY = 1000 * 60 * 60 * 24; //ms
const ONE_HOUR = 1000 * 60 * 60; //ms
const ONE_MINUTE = 1000 * 60; //ms
const ONE_SECOND = 1000; //ms
const WEEKENDS = [0, 6];

export function setHoursStartDate(date) {
    return (new Date(date)).setHours(0, 0, 0, 0);
}

export function setHoursEndDate(date) {
    return (new Date(date)).setHours(23, 59, 59, 999);
}

function differenceTimestamps(dayOne, dayTwo) {
    return (new Date(dayOne)).getTime() - (new Date(dayTwo)).getTime();
}

function getDuration(dayOne, dayTwo, measure) {
    const differenceTimeInMS =
        Math.abs(differenceTimestamps(dayOne, dayTwo));
    return getDurationAsMeasure(differenceTimeInMS, measure);
}

function getTimestampSetByTwoDays(dayOne, dayTwo) {
    return Math.abs(endDate - startDate);
}

function getWeeks(dayOne, dayTwo) {
    const durationOfPeriod = getDuration(dayOne, dayTwo, "days");
    const daysLeft = durationOfPeriod % 7;
    const start = (differenceTimestamps(dayOne, dayTwo) > 0) ? dayOne : dayTwo;
    const startDay = (new Date(start)).getDay();
    let indexesOfRestDays = [];
    for (let i = 0; i < daysLeft; i++) {
        let numberCurrentDay = startDay + i;
        (numberCurrentDay < 7) ?
            indexesOfRestDays.push(numberCurrentDay) :
            indexesOfRestDays.push(numberCurrentDay - 7);
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

function calcDuration({start, end, days, measure}) {
    switch (days) {
        case "days":
            return getDuration(start, end, measure);
        case "weekdays":
            const weekdays = getWeeks(start, end);
            const amountWeekdays = weekdays.fullWeek * 5 + (weekdays.restDays.length - calcWeekends(weekdays.restDays));
            return getDurationAsMeasure(amountWeekdays * ONE_DAY, measure)
        case "weekends":
            const weekends = getWeeks(start, end);
            const amountWeekends = weekends.fullWeek * 2 + calcWeekends(weekends.restDays);
            return getDurationAsMeasure(amountWeekends * ONE_DAY, measure);
    }
}

export { calcDuration as getDurationTime };