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

const toggleButtonState = (buttonElement, inputList, config) => {
    const {inactiveButtonClass} = config
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass)
    }
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass)
    }
}

const cleanInput = (formElement, config) => {
    const { inputSelector, submitButtonSelector} = config;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
            hideInputError (inputElement, formElement, config)
            inputElement.value = ''
            toggleButtonState (buttonElement, inputList, config)
        })
    }

const setEventListener = (formElement, config) => {
    const { inputSelector, submitButtonSelector } = config;
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement, formElement, config);
            toggleButtonState(buttonElement, inputList, config);
        })
    })
    toggleButtonState(buttonElement, inputList, config);
}


const enableValidation = ({ formSelector, ...restConfig }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        setEventListener(formElement, restConfig);
    });
};
