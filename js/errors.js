export const showErrorHeaderMessage = (error) => {
    let errorMessage = document.createElement("div");
    errorMessage.classList.add("container", "alert", "alert-danger", "mt-2");
    errorMessage.innerHTML = `<p><strong>Sorry! Something went wrong! </strong></p>
							  <p>${error}</p>
							`
    document.body.insertBefore(errorMessage, document.querySelector("header"))
    console.error(error);
}

export const createErrorValidation = (element, value, error) => {
    const container = element.closest('.datepicker');
    container.classList.add("datepicker-error");
    let errorElement = container.querySelector(".error");
    if (!errorElement) {
        errorElement = document.createElement("span");
        errorElement.classList.add('error');
        container.append(errorElement);
    }
    errorElement.textContent = `Error! ${error} [${value}]`;
}

export const hideErrorValidation = (id) => {
    const container = document.querySelector(`#${id}`).closest('.datepicker');
    let errorElement = container.querySelector(".error");
    if (errorElement) {
        errorElement.textContent = "";
        container.classList.remove("datepicker-error");
    }
}