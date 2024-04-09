import { getFromStorage, KEY, MAX_COUNT } from "./localstorage.js";

const listResults = document.querySelector("#get-time .list-group");
const blockResults = document.querySelector(".duration-results");
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

export const addNewLi = (obj) => {
    let newItem = document.createElement("li");
    newItem.classList.add("list-group-item");
    newItem.innerHTML = generateTemplateLi(obj);
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
        initStorage.forEach(addNewLi);
        blockResults.classList.add("show");
        return;
    }
}

export { buttonPresetMonth, buttonPresetWeek }