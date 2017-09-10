'use strict';

(function () {

  var ENTER_KEYCODE = 13;

  var offers = [];
  var map = document.querySelector('.tokyo');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = pinMap.querySelector('.pin__main');
  var addressInput = document.getElementById('address');
  var widthPinMain = 76;
  var heightPinMain = 94;
  var widthMap = 1200;
  var heightMap = 700;
  var topPointMap = 180;
  var regex = /x: (\d{1,4}), y: (\d{1,3})/;
  var pins;
  var form = document.querySelector('.notice__form');

  // элемент отображающий статус ответа с сервера
  var node = document.createElement('div');
  node.style.margin = '0 auto';
  node.style.textAlign = 'center';
  node.style.color = 'white';
  node.style.fontSize = '30px';

  /**
   * Обрабатывает полученные данные с сервера
   * @param {Object} offer
   */
  var successHandler = function (offer) {
    offers = offer.slice();

    // Отображаем маркеры на карте
    var fragment = document.createDocumentFragment();
    window.pin.makeFragmentPinMap(offers, fragment);
    pinMap.appendChild(fragment);

    pins = pinMap.querySelectorAll('.pin');
  };

  /**
   * Выводит сообщение об ошибке при неудачных попытках отправить или получить данные с сервера
   * @param {string} errorMessage
   */
  var errorHandler = function (errorMessage) {
    node.style.backgroundColor = 'red';
    node.textContent = errorMessage;
    document.querySelector('.notice').insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  // Отправляем данные формы на сервер, выводим сообщение об успешной отправке и сбрасываем значения формы по умолчанию
  form.addEventListener('submit', function (event) {
    window.backend.save(new FormData(form), function () {
      node.style.backgroundColor = 'green';
      node.textContent = 'Форма успешно отправлена';
      document.querySelector('.notice').insertAdjacentElement('afterbegin', node);

      form.reset();
    }, errorHandler);

    event.preventDefault();
  });

  // отслеживаем click на карте и по event.target определяем на каком элементе произошло событие
  pinMap.addEventListener('click', function () {
    window.showCard(event, pins, offers);
  });
  pinMap.addEventListener('keydown', onDialogEnterPress);

  // Добавляем события на перемещение пина заполняемого объявления и изменения координат пина в поле адреса
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

  /**
   * Проверяет строку на валидность
   * @param {string}str
   * @param {string} reg
   * @return {boolean}
   */
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
   * Вызывает функцию показа объявления по нажатию enter
   * @param {Object} event
   */
  function onDialogEnterPress(event) {
    if (event.keyCode === ENTER_KEYCODE) {
      window.showCard(event.target, pins, offers);
    }
  }

})();
