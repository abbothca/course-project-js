import {
    getFromStorage,
    setStorage,
    LS_KEY_LAST_REQUESTS,
    LS_MAX_COUNT_ITEMS,
    LS_KEY_COUNTRIES,
    TIME_ACTUALITY_LOCAL_STORAGE
} from "./localstorage.js";
import { getHolidays, getCountries } from "./api.js";
import { showErrorHeaderMessage } from "./errors.js";

const DOM_CLASS_NAME_NO_ANIMATED = "no-animation";
const DOM_CLASS_NAME_ANIMATED_SHOW = "show";
const DOM_CLASS_NAME_ANIMATED_REMOVE = "removed";
export const DOM_CLASS_HOLIDAYS_ITEM = "holidays-item";

const listResults = document.querySelector("#get-time .list-group");
const blockResults = document.querySelector(".duration-results");
const listHolidays = document.querySelector("#holidays-list");
const buttonPresetWeek = document.getElementById("setWeek");
const buttonPresetMonth = document.getElementById("setMonth");
export const countriesSelect = document.getElementById("country");
export const yearSelect = document.getElementById("year");
export const requestButton = document.querySelector("button#get-holidays");

export const checkIsDisabledButton = (valueStart, valueEnd) => {
    calculateButton.disabled = !(valueStart && valueEnd);;
}

export const checkIsDisabledPresets = (value) => {
    let isDateSelected = !!value;
    buttonPresetMonth.disabled = !isDateSelected;
    buttonPresetWeek.disabled = !isDateSelected;
}

export const checkIsCanGetHolidays = () => {
    if (countriesSelect.value !== "" && yearSelect.value !== "") {
        requestButton.disabled = false;
        return;
    }
}

const getStringStates = (obj) => {
    if (typeof obj.states === "object") {
        let states = obj.states.reduce((accumulator, currentValue) => {
            return accumulator.concat(`${currentValue.name}, `)
        }, "")
        return states.slice(0, states.length - 2);
    };

    return obj.states;
}

const generateTemplateLi = (obj) => {
    return `
			<div class="row">
				<div class="col-3">${(new Date(obj.start)).toDateString()}</div>
				<div class="col-3">${(new Date(obj.end)).toDateString()}</div>
				<div class="col-2">${obj.days}</div>
				<div class="col-2">${obj.measure}</div>
				<div class="col-2">${obj.value}</div>
			</div>
			`
};

const generateTemplateHolidaysLi = (obj) => {
    return `
        <div class="row">
            <div class="col-3"> ${(new Date(obj.date.iso)).toDateString()} </div>
            <div class="col-4" title="${obj.description}">${obj.name}</div>
            <div class="col-2">${getStringStates(obj)}</div>
            <div class="col-3">${obj.primary_type}</div>
        </div>
        `
};

export const addNewHolidayLi = (obj) => {
    let newItem = document.createElement("li");
    newItem.classList.add("list-group-item", DOM_CLASS_HOLIDAYS_ITEM);
    newItem.innerHTML = generateTemplateHolidaysLi(obj);
    listHolidays.append(newItem);
}

export const addNewLi = (obj, className) => {
    let newItem = document.createElement("li");
    newItem.classList.add("list-group-item");
    newItem.innerHTML = generateTemplateLi(obj);
    if (className) {
        newItem.classList.add(className);
    }
    let firstItem = listResults.querySelector("li:nth-child(2)");
    listResults.insertBefore(newItem, firstItem);
    blockResults.classList.add(DOM_CLASS_NAME_ANIMATED_SHOW);

    if (listResults.children.length > (LS_MAX_COUNT_ITEMS + 1)) {
        listResults.lastChild.classList.add(DOM_CLASS_NAME_ANIMATED_REMOVE);
        setTimeout(() => {
            listResults.removeChild(listResults.lastChild);
        }, 1000)
    }
}

export const initListResults = () => {
    const initStorage = getFromStorage(LS_KEY_LAST_REQUESTS);
    if (initStorage) {
        initStorage.forEach((item) => addNewLi(item, DOM_CLASS_NAME_NO_ANIMATED));
        blockResults.classList.add(DOM_CLASS_NAME_ANIMATED_SHOW);
        return;
    }
}

const addOption = (parent, value, text) => {
    let option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    parent.append(option);
}

const createOptionsCountries = (countries) => {
    countries.forEach((country) => {
        addOption(countriesSelect, country["iso-3166"], country["country_name"]);
    });
    countriesSelect.value = "UA";
}

const createOptionsYears = (start, end) => {
    for (let i = start; i <= end; i++) {
        addOption(yearSelect, i, i);
    };
    yearSelect.value = (new Date()).getFullYear();
}

const updateListCountries = async () => {
    let countriesList;
    await getCountries()
        .then((result) => {
            const countries = result;
            setStorage(LS_KEY_COUNTRIES, { countries: countries, date: new Date() });
            countriesList = countries;
        })
        .catch((error) => {
            showErrorHeaderMessage(error);
            countriesList = [];
        });
    return countriesList;
}

const getListCountries = async () => {
    let dataFromStorage = getFromStorage(LS_KEY_COUNTRIES);
    if (!dataFromStorage) {
        // console.log("!dataFromStorage", updateListCountries())
        const rew = updateListCountries();
        // console.log("rew", rew)
        return rew;
        // return getFromStorage(LS_KEY_COUNTRIES);
    };
    const isLastUpdateActual =
        (new Date(dataFromStorage?.date)).getTime() - Date.now() < TIME_ACTUALITY_LOCAL_STORAGE;
    if (!isLastUpdateActual) {
        // console.log("!isLastUpdateActual")
        return updateListCountries();
        // return getFromStorage(LS_KEY_COUNTRIES);
    };
    return dataFromStorage.countries;
}

export const initSelects = () => {
    getListCountries().then((result) => {
        console.log(result)
        const countries = result;
        createOptionsCountries(countries);
        createOptionsYears(2001, 2049);
        checkIsCanGetHolidays();
    })
}

export { buttonPresetMonth, buttonPresetWeek }