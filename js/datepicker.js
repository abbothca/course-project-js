export class Datepicker {
	#FORMAT = "yy-mm-dd";
	#startLink;
	#endLink;

	#setMinDate() {
        const startDateValue = this.getDate(this.#startLink);
		if (startDateValue) {
			let minEnabledDay = new Date(startDateValue);
			minEnabledDay.setDate(minEnabledDay.getDate() + 1);
			this.#endLink.datepicker("option", "minDate", minEnabledDay);
			return;
		}

		this.#endLink.datepicker("option", "minDate", "");
	}

	#setMaxDate() {
        const endDateValue = this.getDate(this.#endLink);
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
			let dateNew = $.datepicker.parseDate(this.#FORMAT, element.value);
			$(element).datepicker("setDate", dateNew);
			$(element).datepicker("hide");
			element.blur();
		}
	}

	constructor(selectorStart, selectorEnd, checkerPresets, checkerButton) {
		this.#startLink = $(selectorStart).datepicker({
			dateFormat: this.#FORMAT,
			onSelect: () => {
				let startDateValue = this.getDate(this.#startLink);
				this.#setMinDate();
                checkerPresets(startDateValue);
				checkerButton(startDateValue, this.getDate(this.#endLink));
			}
		});

		this.#endLink = $(selectorEnd).datepicker({
			dateFormat: this.#FORMAT,
			onSelect: () => {
				this.#setMaxDate();
				checkerButton(this.getDate(this.#startLink), this.getDate(this.#endLink));
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

	getDate(object) {
		return object.datepicker("getDate");
	}

	setEndDateByPreset(value) {
		let newDate = new Date(this.getDate(this.#startLink));
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
		this.#setMaxDate();
	}
}