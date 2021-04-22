const openPopupButton = document.querySelector('.profile__editbutton');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');
let userName = document.querySelector('.popup__input_type_name')
let userPosition = document.querySelector('.popup__input_type_description')
let popupButton = document.querySelector('.popup__button');
let profileName = document.querySelector('.profile__name');
let profilePosition = document.querySelector('.profile__position')

function togglePopup() {
    popup.classList.toggle('popup_is-opened');
    userName.value = profileName.textContent;
    userPosition.value = profilePosition.textContent;
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = userName.value;
    profilePosition.textContent = userPosition.value;
}

popupButton.addEventListener('click', formSubmitHandler);

popupButton.addEventListener('click', togglePopup);