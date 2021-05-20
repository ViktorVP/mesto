const hideInputError = (inputElement, formElement, config) => {
    const { inputErrorClass, errorClass } = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(inputErrorClass);
};

const showInputError = (inputElement, formElement, config) => {
    const { inputErrorClass, errorClass } = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
};

const checkInputValidity = (inputElement, formElement, config) => {
    if (inputElement.validity.valid) {
        hideInputError(inputElement, formElement, config)
    }
    else {
        showInputError(inputElement, formElement, config)
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

const toggleButtonState = (buttonElement, inputList) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_disabled')
    }
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled')
    }
}

const setEventListener = (formElement, config) => {
    const { inputSelector, submitButtonSelector, ...restConfig } = config;
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement, formElement, restConfig);
            toggleButtonState(buttonElement, inputList);
        })
    })
    toggleButtonState(buttonElement, inputList);
}


const enableValidation = ({ formSelector, ...restConfig }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        setEventListener(formElement, restConfig);
    });
};
