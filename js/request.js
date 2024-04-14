import { showErrorHeaderMessage } from "./errors.js"
import { checkIsCanGetHolydays, countriesSelect, yearSelect } from "./helpers.js"
import { getFromStorage, setStorage, LS_KEY_COUNTRIES } from "./localstorage.js"

const API_KEY = "wL5X18bK9oeeWUu7HL3BeLQf6rWDmDBe";
const options = {
    method: "GET",
    mode: "cors",
}

const getURLCountries = () => {
    return `https://calendarific.com/api/v2/countries?api_key=${API_KEY}`;
}

const getURLHolidays = (country, year) => {
    return `https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=${country}&year=${year}`;
}

const addOption = (parent, value, text) => {
    let option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    parent.append(option);
}

export const setConnection = async () => {
    let countries = getFromStorage(LS_KEY_COUNTRIES);

    if (!countries) {
        try {
            const response = await fetch(getURLCountries(), options);

            if (!response.ok) {
                throw new Error("There is not connection with the endpoint!");
            }

            const parseResponse = await response.json();
            setStorage(LS_KEY_COUNTRIES, parseResponse.response.countries);
            countries = parseResponse.response.countries;
        } catch (error) {
            showErrorHeaderMessage(error);
            return false;
        }
    };

    countries[0].forEach((country) => {
        addOption(countriesSelect, country["iso-3166"], country["country_name"]);
    });
    countriesSelect.value = "UA";

    for (let i = 2001; i < 2050; i++) {
        addOption(yearSelect, i, i);
    };
    yearSelect.value = (new Date()).getFullYear();

    checkIsCanGetHolydays();

    return true;
}

export const getHolidays = async (country, year) => {
    try {
        const response = await fetch(getURLHolidays(country, year), options);

        if (!response.ok) {
            throw new Error(response.code);
        }

        const parseResponse = await response.json();

        return Promise.resolve(parseResponse.response);
    } catch (error) {
        showErrorHeaderMessage(error)
    }

}