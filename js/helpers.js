import { getFromStorage, KEY, MAX_COUNT } from "./localstorage.js";

const listResults = document.querySelector("#get-time .list-group");
const buttonPresetWeek = document.getElementById("setWeek");
const buttonPresetMonth = document.getElementById("setMonth");

export const checkIsDisabledButton = (valueStart, valueEnd) => {
    calculateButton.disabled = !(valueStart && valueEnd);;
}

export const checkIsDisabledPresets = (value) => {
    let isDateSelected = !!value;
    buttonPresetMonth.disabled = !isDateSelected;
    buttonPresetWeek.disabled = !isDateSelected;
}

function generateTemplateLi(obj) {
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

export function addNewLi(obj) {
    let newItem = document.createElement("li");
    newItem.classList.add("list-group-item");
    newItem.innerHTML = generateTemplateLi(obj);
    let firstItem = listResults.querySelector("li:nth-child(2)");
    listResults.insertBefore(newItem, firstItem);

    if (listResults.children.length > (MAX_COUNT + 1)) {
        listResults.removeChild(listResults.lastChild);
    }
}

export function initListResults() {
    const initStorage = getFromStorage(KEY);
    if (initStorage) {
        initStorage.forEach(addNewLi);
    }
}

export { buttonPresetMonth, buttonPresetWeek }