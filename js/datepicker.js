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
			minEnabledDay.setDate(minEnabledDay.getDate() + 1);
			this.#endLink.datepicker("option", "minDate", minEnabledDay);
			return;
		}

		this.#endLink.datepicker("option", "minDate", "");
	}

	#setMaxDate() {
		const endDateValue = Datepicker.getDate(this.#endLink);
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
			const format = $(element).datepicker("option", "dateFormat");
			const value = element.value;
			Promise.resolve("Success")
				.then(() => {
					return $.datepicker.parseDate(format, value);
				})
				.then((data) => {
					Datepicker.setDate(element, data);
					$(element).datepicker("hide");
					element.blur();
				})
				.catch((error) => {
					Datepicker.setDate(element, null);
					$(element).datepicker("hide");
					element.blur();
					const container = element.closest('.datepicker');
					container.classList.add("datepicker-error");
					let errorElement = container.querySelector(".error");
					if (!errorElement) {
						errorElement = document.createElement("span");
						errorElement.classList.add('error');
						container.append(errorElement);
					}
					this.#setMinDate(null)
					errorElement.textContent = `Error! For ${value} : ${error}`;
				})
				.then(() => {
					this.validButtonFunction(Datepicker.getDate(this.startLink), Datepicker.getDate(this.endLink));
					this.validPresetsFunction(Datepicker.getDate(this.startLink));
				})


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

				const id = $(this.#startLink)[0].id;
				const container = document.querySelector(`#${id}`).closest('.datepicker');
				let errorElement = container.querySelector(".error");
				if(errorElement) {
					errorElement.textContent = "";
					container.classList.remove("datepicker-error");
				}

				checkerPresets(startDateValue);
				checkerButton(startDateValue, Datepicker.getDate(this.#endLink));
			}
		});

		this.#endLink = $(selectorEnd).datepicker({
			dateFormat: this.#FORMAT,
			onSelect: () => {
				this.#setMaxDate();
				checkerButton(Datepicker.getDate(this.#startLink), Datepicker.getDate(this.#endLink));
			}
		});

		this.#startLink[0].addEventListener("keyup", this.#handleKeyup.bind(this))
		this.#endLink[0].addEventListener("keyup", this.#handleKeyup.bind(this))
	}

	get startLink() {
		return this.#startLink;
	}

	get getFormat() {
		return this.#FORMAT;
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
		this.#setMaxDate();
	}
}