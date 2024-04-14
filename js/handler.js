import { datepicker } from "./index.js";
import { Datepicker } from "./datepicker.js";
import {
    getDurationTime,
    setHoursStartDate,
    setHoursEndDate
} from "./date.js";
import { setStorage } from "./localstorage.js";
import {
    checkIsDisabledButton,
    addNewLi,
    countriesSelect,
    yearSelect,
    addNewHolidayLi
} from "./helpers.js";
import { getHolidays } from "./request.js";
import { showErrorHeaderMessage } from "./errors.js";

const blockResultsHolidays = document.querySelector("#holidays-results");
const selectedCountryBlock = document.querySelector("#selectedCountry");
const selectedYearBlock = document.querySelector("#selectedYear");

export const buttonPresetWeekHandler = (event) => {
    datepicker.setEndDateByPreset("week");
    checkIsDisabledButton(Datepicker.getDate(datepicker.startLink), Datepicker.getDate(datepicker.endLink));
}

export const buttonPresetMonthHandler = (event) => {
    datepicker.setEndDateByPreset("month");
    checkIsDisabledButton(Datepicker.getDate(datepicker.startLink), Datepicker.getDate(datepicker.endLink));
}

export const calculateButtonHandler = () => {
    const arg = {
        start: setHoursStartDate(Datepicker.getDate(datepicker.startLink)),
        end: setHoursEndDate(Datepicker.getDate(datepicker.endLink)),
        days: document.querySelector("input[name='radioCalc']:checked").value,
        measure: document.querySelector("input[name='radioCount']:checked").value,
    }
    const value = getDurationTime(arg);
    setStorage({ ...arg, value });
    addNewLi({ ...arg, value });
    datepicker.setDate();
    checkIsDisabledButton()
}

export const requestGetHolidays = () => {
    getHolidays(countriesSelect.value, yearSelect.value)
        .then((response) => {
            response.holidays.forEach(element => {
                addNewHolidayLi(element)
            });
            let country = document.querySelector(`option[value='${countriesSelect.value}']`).textContent;
            selectedCountryBlock.textContent  = country;
            selectedYearBlock.textContent  = yearSelect.value;
            blockResultsHolidays.classList.add("show");
        })
        .catch((error) => {
            showErrorHeaderMessage(error);
        }) 
}