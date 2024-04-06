import {
	initListResults,
	checkIsDisabledPresets,
	checkIsDisabledButton,
	buttonPresetMonth,
	buttonPresetWeek
} from "./helpers.js";
import { calculateButtonHandler, buttonPresetMonthHandler, buttonPresetWeekHandler } from "./handler.js"
import { Datepicker } from "./datepicker.js";

// Get the DOM elements
const calculateButton = document.getElementById("calculateButton");

// Initialization 
export const datepicker = new Datepicker(
	"#startDate",
	"#endDate",
	checkIsDisabledPresets,
	checkIsDisabledButton
);
initListResults();

// Event Listeners
buttonPresetWeek.addEventListener("click", buttonPresetWeekHandler);
buttonPresetMonth.addEventListener("click", buttonPresetMonthHandler);
calculateButton.addEventListener("click", calculateButtonHandler);