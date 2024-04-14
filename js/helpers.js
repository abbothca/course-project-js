import { getFromStorage, KEY, MAX_COUNT } from "./localstorage.js";

const CLASS_NAME_NO_ANIMATED = "no-animation";
const listResults = document.querySelector("#get-time .list-group");
const blockResults = document.querySelector(".duration-results");
const listHolidays = document.querySelector("#holidays-list");
const buttonPresetWeek = document.getElementById("setWeek");
const buttonPresetMonth = document.getElementById("setMonth");
export const countriesSelect = document.getElementById("country");
export const yearSelect = document.getElementById("year");

export const checkIsDisabledButton = (valueStart, valueEnd) => {
    calculateButton.disabled = !(valueStart && valueEnd);;
}

export const checkIsDisabledPresets = (value) => {
    let isDateSelected = !!value;
    buttonPresetMonth.disabled = !isDateSelected;
    buttonPresetWeek.disabled = !isDateSelected;
}

export const checkIsCanGetHolydays = () => {
    if (countriesSelect.value !== "" && yearSelect.value !== "") {
        document.querySelector("button#get-holidays").disabled = false;
        return;
    }
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
            <div class="col-2"> ${obj.date.iso} </div>
            <div class="col-5" title="${obj.description}">${obj.name}</div>
            <div class="col-2">${obj.states}</div>
            <div class="col-3">${obj.primary_type}</div>
        </div>
        `
};

export const addNewHolidayLi = (obj) => {
    let newItem = document.createElement("li");
    newItem.classList.add("list-group-item");
    newItem.innerHTML = generateTemplateHolidaysLi(obj);
    // let firstItem = listHolidays.querySelector("li:nth-child(2)");
    listHolidays.append(newItem);
    // blockHolidays.classList.add("show");
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
    blockResults.classList.add("show");

    if (listResults.children.length > (MAX_COUNT + 1)) {
        listResults.lastChild.classList.add("removed");
        setTimeout(() => {
            listResults.removeChild(listResults.lastChild);
        }, 1000)
    }
}

export const initListResults = () => {
    const initStorage = getFromStorage(KEY);
    if (initStorage) {
        initStorage.forEach((item) => addNewLi(item, CLASS_NAME_NO_ANIMATED));
        blockResults.classList.add("show");
        return;
    }

}

export { buttonPresetMonth, buttonPresetWeek }