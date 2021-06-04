import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const openEditPopupButton = document.querySelector('.profile__editbutton'); //кнопка открытия попапа редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');//попап редактирования профиля
const closeEditPopupButton = document.querySelector('.popup__close_type_edit');//кнопка закрытия  попапа редактирования профиля
const userName = document.querySelector('.popup__input_type_profilename');//поле ввода имения пользователя
const userPosition = document.querySelector('.popup__input_type_profiledescription')//поля ввода описания профиля
export const popupButton = document.querySelector('.popup__button_type_edit');//кнопка сохранить профиль пользователя
const profileName = document.querySelector('.profile__name');//текст имени пользователя в html
const profilePosition = document.querySelector('.profile__position');//текст описания профиля в html
const popupEditForm = document.querySelector('.popup__form_type_edit');//форма попапв редактирования профиля
const openAddCardButton = document.querySelector('.profile__addbutton');//кнопка добавления карточки
const popupAddCard = document.querySelector('.popup_type_addcard');//попап добавления карточки
const popupAddCardForm = document.querySelector('.popup__form_type_addcard')//форма попапа добавления карточки
const closeAddCardPopupButton = document.querySelector('.popup__close_type_addcard');//кнопка закрытия попапа добавления карточки
export const saveAddCardButton = document.querySelector('.popup__button_type_addcard');//кнопка добавить карточку
const cardContainer = document.querySelector('.elements-container__elements');//контейнер для карточек
const userNameCard = document.querySelector('.popup__input_type_picturename');//поле ввода имени карточкиб
const userLinkCard = document.querySelector('.popup__input_type_picturelink');//поле ввода ссылки на карточку
const closeBigPopupButton = document.querySelector('.popup__close_type_picturezoom')//кнопка закрытия попапа увеличенной картинки
export const popupPictureZoom = document.querySelector('.popup__picture');//увеличенная картинка
export const popupPictureSign = document.querySelector('.popup__picturesign');//подпись под увеличенной картинкой
export const сardTemplate = document.querySelector('#card-template').content;//Template карточки
export const popupBig = document.querySelector('.popup_type_zoom');//попап увеличенной картинки
const popups = document.querySelectorAll('.popup')//псевдомассив попапов
const config = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__input-error_active'
 }
//массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//экземпляр класса FormValidator для попа редактирования профиля
const profileFormValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}, 
document.querySelector('.popup_type_edit')
);

//экземпляр класса FormValidator для попа lдобавления карточки
const addCardFormValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}, 
document.querySelector('.popup__form_type_addcard')
);

//вызов валидации
profileFormValidator.enableValidation();

addCardFormValidator.enableValidation();


//функция очистки инпутов
function clearInput(popup) {
  const currentForm = popup.querySelector('.popup__form');
  if(currentForm) {
    const inputs = Array.from(currentForm.querySelectorAll('.popup__input'));
    inputs.forEach(inputElement => {
      inputElement.classList.remove('popup__input_type_error');
      inputElement.value = '';
    });
    const spanText = currentForm.querySelectorAll('.popup__input-error');
    spanText.forEach(function (item) {
      item.textContent = '';
    })
  }
}

//функция открытия
export function open(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscape)
}

//функция закрытия
function close(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscape)
};

// закрытие по клику на оверлэй
popups.forEach(popupElement => popupElement.addEventListener('mousedown', function (evt) {
  if (evt.target === evt.currentTarget) {
    close(popupElement);
  }
}));

//закрытие попапа по нажатию на Esc
function closeEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    close(popupOpened);
  };
};

//вызов функции открытия попапа редактирования профиля
openEditPopupButton.addEventListener('click', function () {
  clearInput(popupEdit);
  profileFormValidator.toggleButtonState();
  open(popupEdit);
  userName.value = profileName.textContent;
  userPosition.value = profilePosition.textContent;
});

//вызов функции открытия попапа добавления карточки
openAddCardButton.addEventListener('click', function () {
  open(popupAddCard);
  clearInput(popupAddCard);
  addCardFormValidator.toggleButtonState();
});

//вызов функции закрытия попапа редактирования профиля
closeEditPopupButton.addEventListener('click', function () {
  close(popupEdit);
});

//вызов функции закрытия попапа добавления карточки
closeAddCardPopupButton.addEventListener('click', function () {
  close(popupAddCard);
});

//вызов функции закрытия попапа увеличенной картинки
 closeBigPopupButton.addEventListener('click', function () {
   close(popupBig);
 });

//функция отправки формы редактирования профиля
function submitEditFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = userName.value;
  profilePosition.textContent = userPosition.value;
  close(popupEdit);
};

//вызов функции отправки формы редактирования профиля
popupEditForm.addEventListener('submit', submitEditFormHandler);

//функция создания карточки
function createCard(name, link) {
  const card = new Card(name, link, '#card-template')
  //console.log(card)
  return card.render();
};

//функция добавления карточки
function addCard(evt) {
  evt.preventDefault();
  cardContainer.prepend(createCard(userNameCard.value, userLinkCard.value));
  popupAddCardForm.reset();
  close(popupAddCard);
};

//вызов функции создания карточки
popupAddCardForm.addEventListener('submit', addCard);

//добавление первых шести карточек из массива
initialCards.forEach(function (item) {
  cardContainer.prepend(createCard(item.name, item.link));
});

