import { getDurationTime } from "./date.js";
import { Datepicker } from "./datepicker.js";

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
	console.log(value);
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