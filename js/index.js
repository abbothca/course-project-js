import { getDurationTime } from "./date.js";
import { Datepicker } from "./datepicker.js";

// Get the DOM elements
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const buttonPresetWeek = document.getElementById("setWeek");
const buttonPresetMonth = document.getElementById("setMonth");
const calculateButton = document.getElementById("calculateButton");
const calculatedDaysElements = document.querySelectorAll("input[name='radioCalc']");
const calculatedMeasuresElements = document.querySelectorAll("input[name='radioCount']");
// Start values
let calculatedDaysValue = document.querySelector("input[name='radioCalc']:checked").value;
let calculatedMeasuresValue = document.querySelector("input[name='radioCount']:checked").value;

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
	const value = getDurationTime(datepicker.getDate(startDatePicker), datepicker.getDate(endDatePicker), calculatedDaysValue, calculatedMeasuresValue);
	console.log(value);
}

// Initialization 
const datepicker = new Datepicker("#startDate", "#endDate", checkIsDisabledPresets, checkIsDisabledButton);
const startDatePicker = datepicker.startLink;
const endDatePicker = datepicker.endLink; 

// listeners
calculatedDaysElements.forEach((element) => {
	element.addEventListener("change", (event) => {
		calculatedDaysValue = event.target.checked ? event.target.value : calculatedDaysValue;
	})
});
calculatedMeasuresElements.forEach((element) => {
	element.addEventListener("change", (event) => {
		calculatedMeasuresValue = event.target.checked ? event.target.value : calculatedMeasuresValue;
	})
});
buttonPresetWeek.addEventListener("click", buttonPresetWeekHandler);
buttonPresetMonth.addEventListener("click", buttonPresetMonthHandler);
calculateButton.addEventListener("click", calculateButtonHandler);