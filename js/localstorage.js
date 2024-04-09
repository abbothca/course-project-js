const LS_KEY_LAST_REQUESTS = "holidays_duration_store";
const LS_MAX_COUNT_ITEMS = 10;

export const getFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const setStorage = (value) => {
    let lastRequests = getFromStorage(LS_KEY_LAST_REQUESTS);
    if (lastRequests === null) {
        localStorage.setItem(LS_KEY_LAST_REQUESTS, JSON.stringify([value]));
        return;
    }

    lastRequests.push(value);
    if (lastRequests.length > LS_MAX_COUNT_ITEMS) {
        lastRequests.shift();
    };

    localStorage.setItem(LS_KEY_LAST_REQUESTS, JSON.stringify(lastRequests));
}

export { LS_KEY_LAST_REQUESTS as KEY, LS_MAX_COUNT_ITEMS as MAX_COUNT }