import {
    LS_KEY_COUNTRIES,
    LS_KEY_LAST_REQUESTS,
    LS_MAX_COUNT_ITEMS,
    TIME_ACTUALITY_LOCAL_STORAGE
} from "./constants.js";

export const getFromStorage = (lsKey) => {
    return JSON.parse(localStorage.getItem(lsKey));
}

export const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const setLastCalculationStorage = (value) => {
    let lastRequests = getFromStorage(LS_KEY_LAST_REQUESTS);
    if (lastRequests === null) {
        setStorage(LS_KEY_LAST_REQUESTS, [value]);
        return;
    }

    lastRequests.push(value);
    if (lastRequests.length > LS_MAX_COUNT_ITEMS) {
        lastRequests.shift();
    };

    setStorage(LS_KEY_LAST_REQUESTS, lastRequests);

}