import {
	initListResults,
	checkIsDisabledPresets,
	checkIsDisabledButton,
	buttonPresetMonth,
	buttonPresetWeek,
	checkIsCanGetHolydays,
	countriesSelect,
	yearSelect,
	requestButton
} from "./helpers.js";
import {
	calculateButtonHandler,
	buttonPresetMonthHandler,
	buttonPresetWeekHandler,
	requestGetHolidays
} from "./handler.js"
import { Datepicker } from "./datepicker.js";
import { showErrorHeaderMessage } from "./errors.js";
import { setConnection } from "./request.js";

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

setConnection();

// Event Listeners
buttonPresetWeek.addEventListener("click", buttonPresetWeekHandler);
buttonPresetMonth.addEventListener("click", buttonPresetMonthHandler);
calculateButton.addEventListener("click", calculateButtonHandler);
countriesSelect.addEventListener("change", checkIsCanGetHolydays)
yearSelect.addEventListener("change", checkIsCanGetHolydays)
requestButton.addEventListener("click", requestGetHolidays)

export { datepicker };