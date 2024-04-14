import {
	initListResults,
	checkIsDisabledPresets,
	checkIsDisabledButton,
	buttonPresetMonth,
	buttonPresetWeek,
	checkIsCanGetHolidays,
	countriesSelect,
	yearSelect,
	requestButton,
	initSelects
} from "./helpers.js";
import {
	calculateButtonHandler,
	buttonPresetMonthHandler,
	buttonPresetWeekHandler,
	handleRequestHolidays
} from "./handler.js"
import { Datepicker } from "./datepicker.js";
import { showErrorHeaderMessage } from "./errors.js";

// Get the DOM elements
const calculateButton = document.getElementById("calculateButton");

let datepicker;

// Initialization 
try {
	datepicker = new Datepicker(
		"#startDate",
		"#endDate",
		checkIsDisabledPresets,
		checkIsDisabledButton
	);
	initListResults();
} catch (error) {
	showErrorHeaderMessage(error);
}

initSelects();

// Event Listeners
buttonPresetWeek.addEventListener("click", buttonPresetWeekHandler);
buttonPresetMonth.addEventListener("click", buttonPresetMonthHandler);
calculateButton.addEventListener("click", calculateButtonHandler);
countriesSelect.addEventListener("change", checkIsCanGetHolidays)
yearSelect.addEventListener("change", checkIsCanGetHolidays)
requestButton.addEventListener("click", handleRequestHolidays)

export { datepicker };