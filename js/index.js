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
	initSelects,
	initTabActive
} from "./helpers.js";
import {
	calculateButtonHandler,
	buttonPresetMonthHandler,
	buttonPresetWeekHandler,
	handleRequestHolidays,
	sortButtonHandler
} from "./handler.js"
import { Datepicker } from "./datepicker.js";
import { translate } from "./translator.js";
import { showErrorHeaderMessage } from "./errors.js";

// Get the DOM elements
const calculateButton = document.getElementById("calculateButton");
const sortButton = document.getElementById("holiday-sort");

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
countriesSelect.addEventListener("change", checkIsCanGetHolidays);
yearSelect.addEventListener("change", checkIsCanGetHolidays);
requestButton.addEventListener("click", handleRequestHolidays);
sortButton.addEventListener("click", sortButtonHandler);
document.getElementById("langpicker").addEventListener("click", async (event) => {
	try {
		await translate(event);
	}
	catch (error) {
		showErrorHeaderMessage(error)
	};
})

export { datepicker };