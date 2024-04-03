import { getDurationTime } from "./date.js";
import { Datepicker } from "./datepicker.js";
import { setStorage, getFromStorage, KEY } from "./localstorage.js"

// Get the DOM elements
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const buttonPresetWeek = document.getElementById("setWeek");
const buttonPresetMonth = document.getElementById("setMonth");
const calculateButton = document.getElementById("calculateButton");
const selectedDaysElements = document.querySelectorAll("input[name='radioCalc']");
const measuresElements = document.querySelectorAll("input[name='radioCount']");
// Start values
let selectedDaysValue = document.querySelector("input[name='radioCalc']:checked").value;
let measuresValue = document.querySelector("input[name='radioCount']:checked").value;

// Helpers
const checkIsDisabledButton = (valueStart, valueEnd) => {
	calculateButton.disabled = !(valueStart && valueEnd);;
}

const checkIsDisabledPresets = (value) => {
	let isDateSelected = !!value;
	buttonPresetMonth.disabled = !isDateSelected;
	buttonPresetWeek.disabled = !isDateSelected;
}

// Handler 
const buttonPresetWeekHandler = (event) => {
	datepicker.setEndDateByPreset("week");
	checkIsDisabledButton(startDateInput.value, endDateInput.value);
}

const buttonPresetMonthHandler = (event) => {
	datepicker.setEndDateByPreset("month");
	checkIsDisabledButton(startDateInput.value, endDateInput.value);
}

const calculateButtonHandler = () => {
	const value = getDurationTime(
		datepicker.getDate(startDatePicker),
		datepicker.getDate(endDatePicker),
		selectedDaysValue,
		measuresValue
	);
	let start = datepicker.getDate(startDatePicker),
		end = datepicker.getDate(endDatePicker),
		days = selectedDaysValue,
		measure = measuresValue;
	console.log(value);
	setStorage({
		start,
		end,
		days,
		measure,
		value
	});
}

// Initialization 
const datepicker = new Datepicker(
	"#startDate",
	"#endDate",
	checkIsDisabledPresets,
	checkIsDisabledButton
);
const startDatePicker = datepicker.startLink;
const endDatePicker = datepicker.endLink;

const ul = document.querySelector("#get-time .list-group");
function init() {
	const initStorage = getFromStorage(KEY);
	initStorage.forEach((item) => {
		console.table({item});
		let newItem = document.createElement("li");
		newItem.classList.add("list-group-item");
		newItem.innerHTML = `
		
		`
	})
}

init()

// listeners
selectedDaysElements.forEach((element) => {
	element.addEventListener("change", (event) => {
		if (event.target.checked) {
			selectedDaysValue = event.target.value
		}
	})
});
measuresElements.forEach((element) => {
	element.addEventListener("change", (event) => {
		if (event.target.checked) {
			measuresValue = event.target.value
		}
	})
});
buttonPresetWeek.addEventListener("click", buttonPresetWeekHandler);
buttonPresetMonth.addEventListener("click", buttonPresetMonthHandler);
calculateButton.addEventListener("click", calculateButtonHandler);