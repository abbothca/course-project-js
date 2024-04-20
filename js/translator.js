import { getSSTranslator, setSSTranslator } from "./storage.js";
import { showErrorHeaderMessage } from "./errors.js";

const DOM_ID_HIDDEN_AREA = "hiddenArea";
let hiddenArea = document.getElementById(DOM_ID_HIDDEN_AREA);

const getTemplateFromServer = async (selectedLang) => {
	const url = new URL(`/modal/template_modal_about-${selectedLang}.html`, window.location.href);
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Something went wrong with connection! Status Code: ${response.status}`);
	}
	const htmlText = await response.text();
	const parser = new DOMParser();
	const html = parser.parseFromString(htmlText, 'text/html');
	return html;
}

const getJSONFromServer = async () => {
	const url = new URL(`./content/translate.json`, window.location.href);
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Something went wrong with connection! Status Code: ${response.status}`);
	};

	const jsonObj = await response.json();
	return jsonObj;
}

const initTranslate = () => {
	if (!hiddenArea) {
		const section = document.createElement("section");
		section.id = DOM_ID_HIDDEN_AREA;
		section.hidden = true;
		document.body.append(section);
		hiddenArea = document.getElementById(DOM_ID_HIDDEN_AREA);
	}
}

const translateByKey = (jsonObj, selectedLang) => {
	const keys = Object.keys(jsonObj["content"]);
	keys.forEach((key) => {
		const dataName = key;
		document.querySelectorAll(`[data-lang="${key}"]`).forEach((item) => {
			item.textContent = jsonObj["content"][key][selectedLang]
		})
	})

	Object.keys(jsonObj["placeholder"]).forEach((key) => {
		const dataName = key;
		document.querySelector(`[data-placeholder="${key}"]`).placeholder = jsonObj["placeholder"][key][selectedLang]
	})
}

const translateByTemplate = async (selectedLang) => {
	let modalTranslateAbout = hiddenArea.querySelector(`#aboutContent-${selectedLang}`);
	let footerTranslateAbout = hiddenArea.querySelector(`#footerContent-${selectedLang}`);

	if (!modalTranslateAbout || !footerTranslateAbout) {
		try {
			const html = await getTemplateFromServer(selectedLang);
			const about = (html.querySelector(`#aboutContent-${selectedLang}`)).cloneNode(true);
			const footer = (html.querySelector(`#footerContent-${selectedLang}`)).cloneNode(true);
			hiddenArea.append(about);
			hiddenArea.append(footer);
		} catch (error) {
			showErrorHeaderMessage(error);
		}
	}

	document.getElementById("aboutModal").innerHTML = "";
	document.getElementById("footer").innerHTML = "";

	document.getElementById("aboutModal").append((document.querySelector(`#aboutContent-${selectedLang}`)).cloneNode(true));
	document.getElementById("footer").append((document.querySelector(`#footerContent-${selectedLang}`)).cloneNode(true));
}

export const translate = async ({ target }) => {
	if (target.classList.contains("lang")) {
		const selectedLang = target.dataset.lang;
		document.getElementById("langpicker").querySelector("span").textContent = selectedLang.toUpperCase();

		await translateByTemplate(selectedLang);

		let jsonObj = getSSTranslator();
		if (!jsonObj) {
			jsonObj = await getJSONFromServer();
			setSSTranslator(jsonObj);
		};
		translateByKey(jsonObj, selectedLang);
	}
}

initTranslate();