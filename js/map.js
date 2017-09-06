'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var offers = window.data.generateOffers();
  var dialogPanel;
  var fragmentPanel;
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var myDialog = offerDialog.children[1].cloneNode(true);
  var pinMap = document.querySelector('.tokyo__pin-map');

  // Отображаем маркеры на карте
  var fragment = document.createDocumentFragment();
  window.pin.makeFragmentPinMap(offers, fragment);
  pinMap.appendChild(fragment);

  var pins = pinMap.querySelectorAll('.pin');
  var pinMain = pinMap.querySelector('.pin__main');
  var map = document.querySelector('.tokyo');
  var addressInput = document.getElementById('address');
  var widthPinMain = 76;
  var heightPinMain = 94;
  var widthMap = 1200;
  var heightMap = 700;
  var topPointMap = 180;
  var regex = /x: (\d{1,4}), y: (\d{1,3})/;

  pinMain.addEventListener('mousedown', movePin);
  addressInput.addEventListener('change', changeAddressInput);

  /**
   * Изменение положения пина при вводе координат в поле адрес
   */
  function changeAddressInput() {
    var valueAddressInput = addressInput.value;

    if (formatIsValid(valueAddressInput, regex)) {
      var match = regex.exec(valueAddressInput);
      var top = match[2];
      var left = match[1];

      if (left > widthMap - widthPinMain) {
        left = widthMap;
      }

      if (left < -widthPinMain / 2) {
        left = 0;
      }

      if (top < topPointMap - heightPinMain) {
        top = topPointMap;
      }

      if (top > heightMap) {
        top = heightMap;
      }

      pinMain.style.top = top - heightPinMain + 'px';
      pinMain.style.left = left - widthPinMain / 2 + 'px';

      addressInput.value = 'x: ' + left + ', y: ' + top;
    } else {
      addressInput.value = '';
    }
  }

  function formatIsValid(str, reg) {
    return reg.test(str);
  }

  /**
   * Перемещение пина заполняемого объявдения
   * @param {Object}event
   */
  function movePin(event) {
    event.preventDefault();

    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();

      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };

      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      pinMain.style.left = pinMain.offsetLeft - shift.x + 'px';
      pinMain.style.top = pinMain.offsetTop - shift.y + 'px';

      addressInput.value = 'x: ' + (parseInt(pinMain.style.left, 10) + widthPinMain / 2) + ', y: ' + (parseInt(pinMain.style.top, 10) + heightPinMain);
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();

      if (parseInt(pinMain.style.left, 10) > widthMap - widthPinMain / 2) {
        pinMain.style.left = (widthMap - widthPinMain / 2) + 'px';
      }

      if (parseInt(pinMain.style.left, 10) < -widthPinMain / 2) {
        pinMain.style.left = -widthPinMain / 2 + 'px';
      }

      if (parseInt(pinMain.style.top, 10) < topPointMap - heightPinMain) {
        pinMain.style.top = (topPointMap - heightPinMain) + 'px';
      }

      if (parseInt(pinMain.style.top, 10) > heightMap - heightPinMain) {
        pinMain.style.top = (heightMap - heightPinMain) + 'px';
      }

      addressInput.value = 'x: ' + (parseInt(pinMain.style.left, 10) + widthPinMain / 2) + ', y: ' + (parseInt(pinMain.style.top, 10) + heightPinMain);

      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  }

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
  pinMap.addEventListener('click', showActiveDialog);
  pinMap.addEventListener('keydown', onDialogEnterPress);

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
    while (target !== pinMap) {
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
          myDialog = offerDialog.children[1].cloneNode(true);
        } else {
          dialogPanel = window.card.renderDialogPanel(offers[x - 1]);
          fragmentPanel = document.createDocumentFragment();
          fragmentPanel.appendChild(dialogPanel);
          offerDialog.replaceChild(fragmentPanel, offerDialog.children[1]);
          document.querySelector('.dialog__title img').setAttribute('src', targetImage);
        }
      }
    }
  }

})();
