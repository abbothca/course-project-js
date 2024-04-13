import {
	initListResults,
	checkIsDisabledPresets,
	checkIsDisabledButton,
	buttonPresetMonth,
	buttonPresetWeek,
	checkIsCanGetHolydays,
	countriesSelect,
	yearSelect
} from "./helpers.js";
import { calculateButtonHandler, buttonPresetMonthHandler, buttonPresetWeekHandler } from "./handler.js"
import { Datepicker } from "./datepicker.js";
import { showErrorHeaderMessage } from "./errors.js";
import { setConnection, getHolidays } from "./request.js";

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

// Event Listeners
buttonPresetWeek.addEventListener("click", buttonPresetWeekHandler);
buttonPresetMonth.addEventListener("click", buttonPresetMonthHandler);
calculateButton.addEventListener("click", calculateButtonHandler);

export { datepicker };

countriesSelect.addEventListener("change", checkIsCanGetHolydays)
yearSelect.addEventListener("change", checkIsCanGetHolydays)

setConnection();
document.querySelector("button#get-holidays").addEventListener("click", (event) => {
	getHolidays(countriesSelect.value, yearSelect.value)
		.then((response) => {
			console.log(response)
		})

})