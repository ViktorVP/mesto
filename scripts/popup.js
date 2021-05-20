const openPopupButton = document.querySelector('.profile__editbutton'); //кнопка открытия попапа редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');// попап редактирования профиля
const closePopupButton = document.querySelector('.popup__close_type_edit');//кнопка закрытия  попапа редактирования профиля
const userName = document.querySelector('.popup__input_type_profilename');//поле ввода имения пользователя
const userPosition = document.querySelector('.popup__input_type_profiledescription')//поля ввода описания профиля
const popupButton = document.querySelector('.popup__button_type_edit');//кнопка сохранить профиль пользователя
const profileName = document.querySelector('.profile__name');//текст имени пользователя в html
const profilePosition = document.querySelector('.profile__position');//текст описания профиля в html
const popupForm = document.querySelector('.popup__form_type_edit');//форма попапв редактирования профиля
const openAddCardButton = document.querySelector('.profile__addbutton');//кнопка добавления карточки
const popupAddCard = document.querySelector('.popup_type_addcard');//попап добавления карточки
const popupAddCardForm = document.querySelector('.popup__form_type_addcard')//форма попапа добавления карточки
const closeAddCardPopupButton = document.querySelector('.popup__close_type_addcard');//кнопка закрытия попапа добавления карточки
const saveAddCardButton = document.querySelector('.popup__button_type_addcard');//кнопка добавить карточку
const cardContainer = document.querySelector('.elements-container__elements');//контейнер для карточек
const userNameCard = document.querySelector('.popup__input_type_picturename');//поле ввода имени карточкиб
const userLinkCard = document.querySelector('.popup__input_type_picturelink');//поле ввода ссылки на карточку
const elementLike = document.querySelector('.element__like');//кнопка "лайк"
const closeBigPopupButton = document.querySelector('.popup__close_type_picturezoom')//кнопка закрытия попапа увеличенной картинки
const popupPictureZoom = document.querySelector('.popup__picture');//увеличенная картинка
const popupPictureSign = document.querySelector('.popup__picturesign');//подпись под увеличенной картинкой
const popupBig = document.querySelector('.popup_type_zoom');
const popups = document.querySelectorAll('.popup')
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


//функция открытия
function open(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscape);;
  closeError()
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });
}

//функция закрытия
function close(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscape)
};

// закрытие по клику на оверлэй
popups.forEach(popupElement => popupElement.addEventListener('click', function (evt) {
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

function closeError() {
  const formList = document.querySelectorAll('.popup');
  formList.forEach(function () {
    const inputList = document.querySelectorAll('.popup__input');
    inputList.forEach(function (inputElement) {
      inputElement.classList.remove('popup__input_type_error');
      inputElement.value = '';
    });
    const spanText = document.querySelectorAll('.popup__input-error');
    spanText.forEach(function (item) {
      item.textContent = '';
    })
  })
};

//вызов функции открытия попапа редактирования профиля
openPopupButton.addEventListener('click', function () {
  open(popupEdit);
  userName.value = profileName.textContent;
  userPosition.value = profilePosition.textContent;
});

//вызов функции открытия попапа добавления карточки
openAddCardButton.addEventListener('click', function () {
  open(popupAddCard);
});

//вызов функции закрытия попапа редактирования профиля
closePopupButton.addEventListener('click', function () {
  close(popupEdit)
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
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = userName.value;
  profilePosition.textContent = userPosition.value;
  close(popupEdit);
};

//вызов функции отправки формы редактирования профиля
popupForm.addEventListener('submit', formSubmitHandler);

//функция показа увеличенной картинки
function openBigImage(name, link) {
  popupPictureZoom.alt = name;
  popupPictureSign.textContent = name;
  popupPictureZoom.src = link;
  open(popupBig);
};

//функция создания карточки
function createCard(name, link) {
  const сardTemplate = document.querySelector('#card-template').content;
  const сardElement = сardTemplate.querySelector('.element').cloneNode(true);
  сardElement.querySelector('.element__text').textContent = name;
  сardElement.querySelector('.element__image').src = link;
  сardElement.querySelector('.element__image').alt = 'Ваше изображение';
  //увеличение
  const cardImage = сardElement.querySelector('.element__image');
  cardImage.addEventListener('click', function () { openBigImage(name, link) });
  //лайк
  сardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active')
  });
  //удаление
  function removeCard(e) {
    e.target.closest('.element').remove();
  }
  сardElement.querySelector('.element__delete').addEventListener('click', removeCard);
  return сardElement;
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



