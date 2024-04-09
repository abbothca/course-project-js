import { datepicker } from "./index.js";
import { Datepicker } from "./datepicker.js";
import {
    getDurationTime,
    setHoursStartDate,
    setHoursEndDate
} from "./date.js";
import { setStorage } from "./localstorage.js";
import {
    checkIsDisabledButton,
    addNewLi
} from "./helpers.js";

export const buttonPresetWeekHandler = (event) => {
    datepicker.setEndDateByPreset("week");
    checkIsDisabledButton(Datepicker.getDate(datepicker.startLink), Datepicker.getDate(datepicker.endLink));
}

export const buttonPresetMonthHandler = (event) => {
    datepicker.setEndDateByPreset("month");
    checkIsDisabledButton(Datepicker.getDate(datepicker.startLink), Datepicker.getDate(datepicker.endLink));
}

export const calculateButtonHandler = () => {
    const arg = {
        start: setHoursStartDate(Datepicker.getDate(datepicker.startLink)),
        end: setHoursEndDate(Datepicker.getDate(datepicker.endLink)),
        days: document.querySelector("input[name='radioCalc']:checked").value,
        measure: document.querySelector("input[name='radioCount']:checked").value,
    }
    const value = getDurationTime(arg);
    setStorage({ ...arg, value });
    addNewLi({ ...arg, value });
    Datepicker.setDate(datepicker.startLink, null);
    Datepicker.setDate(datepicker.endLink, null);
    checkIsDisabledButton()
}