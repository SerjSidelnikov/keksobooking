'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var dialogPanel;
  var fragmentPanel;
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var myDialog = offerDialog.children[1].cloneNode(true);
  var pins = window.pin.pinMap.querySelectorAll('.pin');

  /**
   * Вызывает функцию закрытия объявления по нажатию esc
   * @param {Object} event
   */
  var onDialogEscPress = function (event) {
    if (event.keyCode === ESC_KEYCODE) {
      closeDialog();
    }
  };

  /**
   * Вызывает функцию показа объявления по нажатию enter
   * @param {Object} event
   */
  var onDialogEnterPress = function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      showActiveDialog(event.target);
    }
  };

  /**
   * Открывает объявление и добавляет обработчики событий на esc и click
   */
  var openDialog = function () {
    offerDialog.classList.remove('hidden');
    document.addEventListener('keydown', onDialogEscPress);
    dialogClose.addEventListener('click', closeDialog);
  };

  /**
   * Закрывает объявление, удаляет у маркера состояние активности и удаляет обработчики событий на esc и click
   */
  var closeDialog = function () {
    offerDialog.classList.add('hidden');

    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('pin--active');
    }

    document.removeEventListener('keydown', onDialogEscPress);
    dialogClose.removeEventListener('click', closeDialog);
  };

  // отслеживаем click на карте и по event.target определяем на каком элементе произошло событие
  window.pin.pinMap.addEventListener('click', showActiveDialog);
  window.pin.pinMap.addEventListener('keydown', onDialogEnterPress);

  /**
   * Показывает активное объявление
   * @param {Object} event
   */
  function showActiveDialog(event) {
    var target = (event.target) ? event.target : event;
    var targetImage;

    for (var j = 0; j < pins.length; j++) {
      pins[j].classList.remove('pin--active');
    }

    // цикл двигается вверх от target к родителям до pinMap
    while (target !== window.pin.pinMap) {
      if (target.classList.contains('pin')) { // элемент, который нас интересует
        target.classList.add('pin--active');
        targetImage = target.children[0].getAttribute('src');
        openDialog();
      }
      // если клик был не на нашем элементе, то двигаемся вверх по иерархии родителей
      target = target.parentNode;
    }

    renderActiveDialogPanel(targetImage);
  }

  /**
   * Создаёт активное объявление
   * @param {string} targetImage
   */
  function renderActiveDialogPanel(targetImage) {
    for (var x = 0; x < pins.length; x++) {
      if (pins[x].classList.contains('pin--active')) {
        if (pins[x].classList.contains('pin__main')) {
          fragmentPanel = document.createDocumentFragment();
          fragmentPanel.appendChild(myDialog);
          offerDialog.replaceChild(fragmentPanel, offerDialog.children[1]);
          document.querySelector('.dialog__title img').setAttribute('src', 'img/avatars/user01.png');
        } else {
          dialogPanel = window.card.renderDialogPanel(window.data.offers[x - 1]);
          fragmentPanel = document.createDocumentFragment();
          fragmentPanel.appendChild(dialogPanel);
          offerDialog.replaceChild(fragmentPanel, offerDialog.children[1]);
          document.querySelector('.dialog__title img').setAttribute('src', targetImage);
        }
      }
    }
  }

})();
