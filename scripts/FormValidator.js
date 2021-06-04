export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _setEventListenerS() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            })
        })
        this.toggleButtonState();
    }
    
    _checkInputValidity(inputElement, config) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement, config)
        }
        else {
            this._showInputError(inputElement, config)
        }
    }

    _hideInputError(inputElement) {
        //const { inputErrorClass, errorClass } = config;
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
        inputElement.classList.remove(this._config.inputErrorClass);
    };
    
    _showInputError(inputElement) {
        //const { inputErrorClass, errorClass } = config;
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._config.errorClass);
        inputElement.classList.add(this._config.inputErrorClass);
    };    

    _hasInvalidInput() {
            return this._inputList.some(inputElement => !inputElement.validity.valid);
        }

    toggleButtonState() {
        //const { inactiveButtonClass } = config
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._config.inactiveButtonClass)
        }
        else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._config.inactiveButtonClass)
        }
    }  
    
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListenerS(this._formElement, this._config);

    }
}
