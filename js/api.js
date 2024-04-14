import { showErrorHeaderMessage } from "./errors.js";

const API_KEY = "wL5X18bK9oeeWUu7HL3BeLQf6rWDmDBe";
const API_URL = "https://calendarific.com/api/v2/";
const DEFAULT_OPTIONS = {
    method: "GET",
    mode: "cors",
}

export const getCountries = async () => {
    try {
        const response = await fetch(`${API_URL}countries?api_key=${API_KEY}`, DEFAULT_OPTIONS);

        if (!response.ok) {
            throw new Error("There is not connection with the endpoint!");
        }

        const parseResponse = await response.json();
        return parseResponse.response.countries
    } catch (error) {
        showErrorHeaderMessage(error);
        return false;
    }
}

export const getHolidays = async (country, year) => {
    try {
        const response = await fetch(`${API_URL}holidays?&api_key=${API_KEY}&country=${country}&year=${year}`, DEFAULT_OPTIONS);

        if (!response.ok) {
            throw new Error(response.code);
        }

        const parseResponse = await response.json();

        return Promise.resolve(parseResponse.response);
    } catch (error) {
        showErrorHeaderMessage(error)
    }

}