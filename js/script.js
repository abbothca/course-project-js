"use strict"

// Get the DOM elements
const buttonPresetWeek = document.getElementById("setWeek");
const buttonPresetMonth = document.getElementById("setMonth");
const calculatedDaysElements = document.querySelectorAll("input[name='radioCalc']");
const calculatedMeasuresElements = document.querySelectorAll("input[name='radioCount']");
const calculateButton = document.getElementById("calculateButton");

// Start values
let calculatedDaysValue = document.querySelector("input[name='radioCalc']:checked").value;
let calculatedMeasuresValue = document.querySelector("input[name='radioCount']:checked").value;
let startDateValue,
	endDateValue;

class Datepicker {
	#FORMAT = "yy-mm-dd";
	#startLink;
	#endLink;

	#setMinDate() {
		if (startDateValue) {
			let minEnabledDay = (new Date(startDateValue));
			minEnabledDay.setDate(minEnabledDay.getDate() + 1);
			this.#endLink.datepicker("option", "minDate", minEnabledDay);
			return;
		}

		this.#endLink.datepicker("option", "minDate", "");
	}

	#setMaxDate() {
		if (endDateValue) {
			let maxEnabledDay = new Date(endDateValue);
			maxEnabledDay.setDate(maxEnabledDay.getDate() - 1);
			this.#startLink.datepicker("option", "maxDate", maxEnabledDay);
			return;
		}
		this.#startLink.datepicker("option", "maxDate", "");
	}

	#handleKeyup(event) {
		if (event.key === "Enter") {
			const element = event.target;
			let dateNew = $.datepicker.parseDate("yy-mm-dd", element.value);
			Datepicker.setDate($(element), dateNew);
			$(element).datepicker("hide");
			element.blur();
		}
	}

	constructor(selectorStart, selectorEnd) {
		this.#startLink = $(selectorStart).datepicker({
			dateFormat: this.#FORMAT,
			onSelect: () => {
				startDateValue = Datepicker.getDate(startDatePicker);
				this.#setMinDate();
				checkIsDisabledPresets();
				checkIsDisabledButton();
			}
		});

		this.#endLink = $(selectorEnd).datepicker({
			dateFormat: this.#FORMAT,
			onSelect: () => {
				endDateValue = Datepicker.getDate(endDatePicker);
				this.#setMaxDate();
				checkIsDisabledButton();
			}
		});

		this.#startLink[0].addEventListener("keyup", this.#handleKeyup)
		this.#endLink[0].addEventListener("keyup", this.#handleKeyup)
	}

	get startLink() {
		return this.#startLink;
	}

	get endLink() {
		return this.#endLink;
	}

	static maxDate(object, maxEnabledDay) {
		object.datepicker("option", "maxDate", maxEnabledDay);
	}

	static getDate(object) {
		return object.datepicker("getDate");
	}

	static setDate(object, newDate) {
		object.datepicker("setDate", newDate);
	}

	setEndDateByPreset(value) {
		let newDate = new Date(Datepicker.getDate(startDatePicker));
		switch (value) {
			case "week":
				newDate.setDate(+newDate.getDate() + 6);
				break;
			case "month":
				newDate.setMonth(+newDate.getMonth() + 1);
				newDate.setDate(newDate.getDate() - 1)
				break;
		}
		this.#endLink.datepicker("setDate", newDate);
		endDateValue = newDate;
		this.#setMaxDate();
	}
}

class HandleDate {
	static ONE_DAY = 1000 * 60 * 60 * 24; //ms
	static ONE_HOUR = 1000 * 60 * 60; //ms
	static ONE_MINUTE = 1000 * 60; //ms
	static ONE_SECOND = 1000; //ms
	static WEEKDAYS = [1, 2, 3, 4, 5];
	static WEEKENDS = [0, 6];

	static arrangeDates(dayOne, dayTwo) {
		return (dayOne.getTime() - dayTwo.getTime() < 0) ?
			{ start: new Date(dayOne), end: new Date(dayTwo) } :
			{ start: new Date(dayTwo), end: new Date(dayOne) }
	}

	static getTimestampSetByTwoDays(dayOne, dayTwo) {
		const period = this.arrangeDates(dayOne, dayTwo);
		period.end.setHours(23, 59, 59, 999);
		period.start.setHours(0, 0, 0, 0);

		return period.end.getTime() - period.start.getTime();
	}

	static getWeeks(dayOne, dayTwo) {
		const durationOfPeriod = this.getDuration(dayOne, dayTwo, "days");
		const daysLeft = durationOfPeriod % 7;
		const period = this.arrangeDates(dayOne, dayTwo);
		const startDay = period.start.getDay();
		let indexesOfRestDays = [];
		for (let i = 0; i < daysLeft; i++) {
			let numberCurrentDay = startDay + i;
			(numberCurrentDay < 7) ? indexesOfRestDays.push(numberCurrentDay) : indexesOfRestDays.push(numberCurrentDay - 7);
		}

		return {
			fullWeek: Math.floor(durationOfPeriod / 7),
			restDays: indexesOfRestDays,
		}
	}

	static calcWeekdays(arrayOfIndexes) {
		const arrayOfWeekdays = arrayOfIndexes.filter(function (item) {
			return (HandleDate.WEEKDAYS).includes(item);
		});
		return arrayOfWeekdays.length;
	}

	static calcWeekends(arrayOfIndexes) {
		const arrayOfWeekends = arrayOfIndexes.filter(function (item) {
			return (HandleDate.WEEKENDS).includes(item);
		});
		return arrayOfWeekends.length;
	}

	static calcDuration(dayOne, dayTwo, days, measure) {
		switch (days) {
			case "days":
				return this.getDuration(dayOne, dayTwo, measure);
			case "weekdays":
				const weekdays = this.getWeeks(dayOne, dayTwo);
				const amountWeekdays = weekdays.fullWeek * 5 + this.calcWeekdays(weekdays.restDays);
				return this.getDurationAsMeasure(amountWeekdays * this.ONE_DAY, measure)
			case "weekends":
				const weekends = this.getWeeks(dayOne, dayTwo);
				const amountWeekends = weekends.fullWeek * 2 + this.calcWeekends(weekends.restDays);
				return this.getDurationAsMeasure(amountWeekends * this.ONE_DAY, measure);
			default:
				return this.getDurationAsMeasure(amountWeekends * this.ONE_DAY, measure);
		}
	}

	static getDurationAsMeasure(milliseconds, measure) {
		switch (measure) {
			case "days":
				return Math.round(milliseconds / this.ONE_DAY);
			case "hours":
				return Math.round(milliseconds / this.ONE_HOUR);
			case "minutes":
				return Math.round(milliseconds / this.ONE_MINUTE);
			case "seconds":
				return Math.round(milliseconds / this.ONE_SECOND);
		}
	}

	static getDuration = (dayOne, dayTwo, measure) => {
		const differenceTimeInMS = this.getTimestampSetByTwoDays(dayOne, dayTwo);
		return this.getDurationAsMeasure(differenceTimeInMS, measure);
	}
}

// Helpers
const checkIsDisabledButton = () => {
	let isDateSelected = !!(startDateValue && endDateValue);
	calculateButton.disabled = !isDateSelected;
}

const checkIsDisabledPresets = () => {
	let isDateSelected = !!startDateValue;
	buttonPresetMonth.disabled = !isDateSelected;
	buttonPresetWeek.disabled = !isDateSelected;
}

// Handler 
const buttonPresetWeekHandler = (event) => {
	datepicker.setEndDateByPreset("week");
	checkIsDisabledButton();
}

const buttonPresetMonthHandler = (event) => {
	datepicker.setEndDateByPreset("month");
	checkIsDisabledButton();
}

const calculateButtonHandler = () => {
	const value = HandleDate.calcDuration(startDateValue, endDateValue, calculatedDaysValue, calculatedMeasuresValue);
	console.log(value);
}

// Initialization 
const datepicker = new Datepicker("#startDate", "#endDate");
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