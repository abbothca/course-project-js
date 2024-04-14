const LS_KEY_LAST_REQUESTS = "holidays_duration_store";
export const LS_KEY_COUNTRIES = "holidays_countries_list";
const LS_MAX_COUNT_ITEMS = 10;

export const getFromStorage = (lsKey) => {
    return JSON.parse(localStorage.getItem(lsKey));
}

export const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify([value]));
}

export const setLastCalculationStorage = (value) => {
    let lastRequests = getFromStorage(LS_KEY_LAST_REQUESTS);
    if (lastRequests === null) {
        setStorage(LS_KEY_LAST_REQUESTS, value);
        return;
    }

    lastRequests.push(value);
    if (lastRequests.length > LS_MAX_COUNT_ITEMS) {
        lastRequests.shift();
    };

    setStorage(LS_KEY_LAST_REQUESTS, lastRequests);

}

export { LS_KEY_LAST_REQUESTS as KEY, LS_MAX_COUNT_ITEMS as MAX_COUNT }