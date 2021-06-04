import {open, popupPictureZoom, popupPictureSign, popupBig} from "./index.js"

export class Card {
    constructor(name, link, templateSelector) {
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
  
      this._makeElements();
      this._setEventListeners();
    }
  
    _makeElements() {
      const сardTemplate = document.querySelector(this._templateSelector).content;
      this._сardElement = сardTemplate.querySelector('.element').cloneNode(true);
  
      this._likeButton = this._сardElement.querySelector('.element__like');
      this._deleteButton = this._сardElement.querySelector('.element__delete')
      this._cardImage = this._сardElement.querySelector('.element__image');
  
      this._сardElement.querySelector('.element__text').textContent = this._name;
      this._cardImage.src = this._link;
    }
  
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => this._handleLikeClick())
      this._cardImage.addEventListener('click', () => this._handleOpenPreview());
      this._deleteButton.addEventListener('click', () => this._handleRemoveClick());
    }
  
    _handleLikeClick() {
      this._likeButton.classList.toggle('element__like_active')
    }
  
    _handleRemoveClick() {
      this._сardElement.remove();
    }
  
     _handleOpenPreview() {
       popupPictureZoom.alt = this._name;
       popupPictureSign.textContent = `Изображение ${this._name}`;
       popupPictureZoom.src = this._link;
       open(popupBig);
     }
  
    render() {
      return this._сardElement;
    }
  }