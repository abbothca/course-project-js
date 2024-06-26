import { createErrorValidation, hideErrorValidation } from "./errors.js";

export class Datepicker {
	#FORMAT = "yy-mm-dd";
	#startLink;
	#endLink;
	validPresetsFunction;
	validButtonFunction;

	#setMinDate() {
		const startDateValue = Datepicker.getDate(this.#startLink);
		if (startDateValue) {
			let minEnabledDay = new Date(startDateValue);
			minEnabledDay.setDate(minEnabledDay.getDate());
			// minEnabledDay.setDate(minEnabledDay.getDate() + 1);
			this.#endLink.datepicker("option", "minDate", minEnabledDay);
			return;
		}

		this.#endLink.datepicker("option", "minDate", "");
	}

	#setMaxDate() {
		const endDateValue = Datepicker.getDate(this.#endLink);
		if (endDateValue) {
			let maxEnabledDay = new Date(endDateValue);
			maxEnabledDay.setDate(maxEnabledDay.getDate());
			// maxEnabledDay.setDate(maxEnabledDay.getDate() - 1);
			this.#startLink.datepicker("option", "maxDate", maxEnabledDay);
			return;
		}
		this.#startLink.datepicker("option", "maxDate", "");
	}

	#handleKeyup(event) {
		if (event.key === "Enter" || event.keyCode === 61) {
			const element = event.target;
			const value = element.value;
			try {
				let data = $.datepicker.parseDate(this.#FORMAT, value);
				Datepicker.setDate(element, data);
				$(element).datepicker("hide");
				element.blur();
			}
			catch (error) {
				this.setDate(element, null);
				$(element).datepicker("hide");
				element.blur();

				if ($(element)[0].id === $(this.#startLink)[0].id) {
					this.#setMinDate();
				} else {
					this.#setMaxDate();
				}

				createErrorValidation(element, value, error);
			}
			finally {
				this.validButtonFunction(Datepicker.getDate(this.startLink), Datepicker.getDate(this.endLink));
				this.validPresetsFunction(Datepicker.getDate(this.startLink));
			}


		}
	}

	constructor(selectorStart, selectorEnd, checkerPresets, checkerButton) {
		this.validButtonFunction = checkerButton;
		this.validPresetsFunction = checkerPresets;
		this.#startLink = $(selectorStart).datepicker({
			dateFormat: this.#FORMAT,
			onSelect: () => {
				let startDateValue = Datepicker.getDate(this.#startLink);
				this.#setMinDate();
				hideErrorValidation($(this.#startLink)[0].id)
				checkerPresets(startDateValue);
				checkerButton(startDateValue, Datepicker.getDate(this.#endLink));
			}
		});

		this.#endLink = $(selectorEnd).datepicker({
			dateFormat: this.#FORMAT,
			onSelect: () => {
				this.#setMaxDate();
				hideErrorValidation($(this.#endLink)[0].id);
				checkerButton(Datepicker.getDate(this.#startLink), Datepicker.getDate(this.#endLink));
			}
		});

		this.#startLink[0].addEventListener("keyup", this.#handleKeyup.bind(this));
		this.#endLink[0].addEventListener("keyup", this.#handleKeyup.bind(this));
	}

	get startLink() {
		return this.#startLink;
	}

	get endLink() {
		return this.#endLink;
	}

	static getDate(object) {
		return $(object).datepicker("getDate");
	}

	static setDate(element, date) {
		$(element).datepicker("setDate", date);
	}

	setDate(element, date) {
		if (element) {
			$(element).datepicker("setDate", date);
			return;
		}

		$(this.#startLink).datepicker("setDate", date);
		$(this.#endLink).datepicker("setDate", date);
		this.#setMaxDate();
		this.#setMinDate();
	}

	setEndDateByPreset(value) {
		let newDate = new Date(Datepicker.getDate(this.#startLink));
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
		hideErrorValidation($(this.#endLink)[0].id)
		this.#setMaxDate();
	}
}