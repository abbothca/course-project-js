import { showErrorHeaderMessage } from "./errors.js";

const API_KEY = "IWHFEEH2R8D3OEy2r3TF7I7kkhfCoG6a";
const API_URL = "https://calendarific.com";
const API_HOLIDAY_PATH = "/api/v2/holidays";
const API_COUNTRY_PATH = "/api/v2/countries";
const DEFAULT_OPTIONS = {
    method: "GET",
    // mode: "cors",
}

const getURL = (path, searchParam) => {
    const apiEndPoint = new URL(path, API_URL);
    apiEndPoint.search = new URLSearchParams({
        "api_key": API_KEY,
        ...searchParam
    });
    return apiEndPoint.toString();
}

const setConnection = async (url) => {
    const response = await fetch(url, DEFAULT_OPTIONS);

    if (!response.ok) {
        throw new Error("There is not connection with the endpoint!");
    }

    const parseResponse = await response.json();
    return parseResponse.response
}

export const getCountries = async () => {
    const url = getURL(API_COUNTRY_PATH, {});
    const response = await setConnection(url)
    return response.countries;
}

export const getHolidays = async (country, year) => {
    const url = getURL(API_HOLIDAY_PATH, {country, year});
    const response = await setConnection(url)
    return response;
}