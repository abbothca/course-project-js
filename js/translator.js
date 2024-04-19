export const translate = async ({ target }) => {
	if (target.classList.contains("lang")) {
		const selectedLang = target.dataset.lang;
		console.log(selectedLang);
		document.getElementById("langpicker").querySelector("a").textContent = selectedLang.toUpperCase();

		const response = await fetch(`./modal/template_modal_about-${selectedLang}.html`)
		const htmlText = await response.text();
		var parser = new DOMParser();
		var html = parser.parseFromString(htmlText, 'text/html');
		// console.log(html.getElementById("aboutContent"))
		document.getElementById("aboutModal").innerHTML = "";
		document.getElementById("footer").innerHTML = "";

		document.getElementById("aboutModal").append(html.getElementById("aboutContent"));
		document.getElementById("footer").append(html.getElementById("footerContent"));


		let jsonObj;
		if (!sessionStorage.getItem("translator_holidays")) {
			const responseJson = await fetch(`./content/translate.json`);
			jsonObj = await responseJson.json();
			sessionStorage.setItem("translator_holidays", JSON.stringify(jsonObj));
			console.log(jsonObj)
		} else {
			const stringStorage = sessionStorage.getItem("translator_holidays");
			jsonObj = JSON.parse(stringStorage);
		}
		// const responseJson = await fetch(`./content/translate.json`);
		// const jsonObj = await responseJson.json();
		// sessionStorage.setItem("translator_holidays", JSON.stringify(jsonObj));
		// console.log(jsonObj)
		const keys = Object.keys(jsonObj);
		keys.forEach((key) => {
			const dataName = key;
			console.log(`[data-lang="${dataName}"]`)
			document.querySelector(`[data-lang="${key}"]`).textContent = jsonObj[key][selectedLang]
		})
	}

}