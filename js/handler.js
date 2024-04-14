import { datepicker } from "./index.js";
import { Datepicker } from "./datepicker.js";
import {
    getDurationTime,
    setHoursStartDate,
    setHoursEndDate
} from "./date.js";
import { setLastCalculationStorage } from "./localstorage.js";
import {
    checkIsDisabledButton,
    addNewLi,
    countriesSelect,
    yearSelect,
    addNewHolidayLi,
    DOM_CLASS_HOLIDAYS_ITEM,
    DOM_CLASS_NAME_ANIMATED_SHOW
} from "./helpers.js";
import { getHolidays } from "./api.js";
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
    setLastCalculationStorage({ ...arg, value });
    addNewLi({ ...arg, value });
    datepicker.setDate();
    checkIsDisabledButton()
}

export const handleRequestHolidays = () => {
    document.querySelectorAll(`.${DOM_CLASS_HOLIDAYS_ITEM}`).forEach((element) => {
        element.remove();
    })
    getHolidays(countriesSelect.value, yearSelect.value)
        .then((response) => {
            const countries = response?.holidays;
            if (countries && countries.length) {
                response.holidays.forEach(element => {
                    addNewHolidayLi(element)
                });
            } else {
                //Tanzania, 2010
                blockResultsHolidays.classList.add(DOM_CLASS_NAME_ANIMATED_SHOW);
                const obj = {
                    name: "Sorry! We've not found this info",
                    states: "--",
                    primary_type: "--",
                    date: {
                        iso: null
                    }
                }
                addNewHolidayLi(obj)
            }
            let country = document.querySelector(`option[value='${countriesSelect.value}']`).textContent;
            selectedCountryBlock.textContent = country;
            selectedYearBlock.textContent = yearSelect.value;
            blockResultsHolidays.classList.add("show");
        })
        .catch(showErrorHeaderMessage)
}