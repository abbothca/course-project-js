import {
	initListResults,
	checkIsDisabledPresets,
	checkIsDisabledButton,
	buttonPresetMonth,
	buttonPresetWeek,
	countriesSelect,
	yearSelect,
	initSelects,
	initTabActive	
} from "./helpers.js";
import {
	requestButton,
	calculateButtonHandler,
	buttonPresetMonthHandler,
	buttonPresetWeekHandler,
	handleRequestHolidays,
	sortButtonHandler,
	countrySelectHandler,
	langHandler
} from "./handler.js"
import { Datepicker } from "./datepicker.js";
import { showErrorHeaderMessage } from "./errors.js";

// Get the DOM elements
const calculateButton = document.getElementById("calculateButton");
const sortButton = document.getElementById("holiday-sort");
const langPicker = document.getElementById("langpicker");

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
initTabActive();

// Event Listeners
buttonPresetWeek.addEventListener("click", buttonPresetWeekHandler);
buttonPresetMonth.addEventListener("click", buttonPresetMonthHandler);
calculateButton.addEventListener("click", calculateButtonHandler);
countriesSelect.addEventListener("change", countrySelectHandler);
requestButton.addEventListener("click", handleRequestHolidays);
sortButton.addEventListener("click", sortButtonHandler);
langPicker.addEventListener("click", langHandler);

export { datepicker };