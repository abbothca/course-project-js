const LS_KEY_LAST_REQUESTS = "holidays_duration_store";
const LS_MAX_COUNT_ITEMS = 10;

export function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setStorage(value) {
    let lastRequests = getFromStorage(LS_KEY_LAST_REQUESTS);
    if (lastRequests === null) {
        localStorage.setItem(LS_KEY_LAST_REQUESTS, JSON.stringify([value]));
        return;
    }

    lastRequests.unshift(value);
    if (lastRequests.length > LS_MAX_COUNT_ITEMS) {
        lastRequests.pop();
    };

    localStorage.setItem(LS_KEY_LAST_REQUESTS, JSON.stringify(lastRequests));
}

export { LS_KEY_LAST_REQUESTS as KEY }