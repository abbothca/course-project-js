import {
	initListResults,
	checkIsDisabledPresets,
	checkIsDisabledButton,
	buttonPresetMonth,
	buttonPresetWeek
} from "./helpers.js";
import { calculateButtonHandler, buttonPresetMonthHandler, buttonPresetWeekHandler } from "./handler.js"
import { Datepicker } from "./datepicker.js";
import { showErrorHeaderMessage } from "./errors.js";

// Get the DOM elements
const calculateButton = document.getElementById("calculateButton");

let datepicker;

// Initialization 
try {
	datepicker = new Datepicker(
		"#startDate3",
		"#endDate",
		checkIsDisabledPresets,
		checkIsDisabledButton
	);
	initListResults();
} catch (error) {
	showErrorHeaderMessage(error);
}


// Event Listeners
buttonPresetWeek.addEventListener("click", buttonPresetWeekHandler);
buttonPresetMonth.addEventListener("click", buttonPresetMonthHandler);
calculateButton.addEventListener("click", calculateButtonHandler);

export { datepicker };