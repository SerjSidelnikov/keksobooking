'use strict';

(function () {
  // Валидация формы
  var form = document.querySelector('.notice__form');
  var elem = form.elements;
  var addressInput = elem.address;
  var priceInput = elem.price;
  var titleInput = elem.title;
  var timeinSelect = elem.timein;
  var timeoutSelect = elem.timeout;
  var typeSelect = elem.type;
  var roomsSelect = elem.rooms;
  var capacitySelect = elem.capacity;

  // Изменяет время выезда в зависимости от времени заезда
  timeinSelect.addEventListener('change', function () {
    for (var x = 0; x < timeinSelect.options.length; x++) {
      var option = timeinSelect.options[x];
      if (option.selected) {
        timeoutSelect.options[x].selected = true;
      }
    }
  });

  // Изменяет время заезда в зависимости от времени выезда
  timeoutSelect.addEventListener('change', function () {
    for (var x = 0; x < timeoutSelect.options.length; x++) {
      var option = timeoutSelect.options[x];
      if (option.selected) {
        timeinSelect.options[x].selected = true;
      }
    }
  });

  // Устанавливает минимальное значение цены в зависимости от типа жилья
  typeSelect.addEventListener('change', function () {
    for (var x = 0; x < typeSelect.options.length; x++) {
      var option = typeSelect.options[x];
      if (option.selected) {
        if (option.text === 'Лачуга') {
          priceInput.value = '0';
          priceInput.setAttribute('min', '0');
        } else if (option.text === 'Квартира') {
          priceInput.value = '1000';
          priceInput.setAttribute('min', '1000');
        } else if (option.text === 'Дом') {
          priceInput.value = '5000';
          priceInput.setAttribute('min', '5000');
        } else {
          priceInput.value = '10000';
          priceInput.setAttribute('min', '10000');
        }
      }
    }
  });

  // Ставит значение количества мест по умолчанию при выборе количества комнат
  roomsSelect.addEventListener('change', function () {
    for (var x = 0; x < roomsSelect.options.length; x++) {
      var option = roomsSelect.options[x];
      if (option.selected) {
        if (option.value === '1') {
          capacitySelect.options[2].selected = true;
        } else if (option.value === '2') {
          capacitySelect.options[1].selected = true;
        } else if (option.value === '3') {
          capacitySelect.options[0].selected = true;
        } else {
          capacitySelect.options[3].selected = true;
        }
      }
    }
  });

  // Ставит значение количества комнат при изменении количества гостей
  capacitySelect.addEventListener('change', function () {
    for (var x = 0; x < capacitySelect.options.length; x++) {
      var option = capacitySelect.options[x];
      if (option.selected) {
        if (option.value === '2' && roomsSelect.value < '2') {
          roomsSelect.options[1].selected = true;
        } else if (option.value === '3' && roomsSelect.value < '3') {
          roomsSelect.options[2].selected = true;
        } else if (option.value === '0') {
          roomsSelect.options[3].selected = true;
        }
      }
    }
  });

  // Проверка поля адреса на валидность
  addressInput.addEventListener('invalid', function () {
    if (!addressInput.validity.valid) {
      addressInput.setCustomValidity('Обязательное поле');
    } else {
      addressInput.setCustomValidity('');
    }
  });

  // Проверка заголовка объявления на валидность
  titleInput.addEventListener('invalid', function () {
    if (!titleInput.validity.valid) {
      if (titleInput.validity.tooShort) {
        titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов, сейчас длина ' + titleInput.value.length);
      } else if (titleInput.validity.tooLong) {
        titleInput.setCustomValidity('Заголовок не должен превышать 100 символов, сейчас длина ' + titleInput.value.length);
      } else if (titleInput.validity.valueMissing) {
        titleInput.setCustomValidity('Обязательное поле');
      }
    } else {
      titleInput.setCustomValidity('');
    }
  });

  // Если заголовок объявления не валиден - обводится красной рамкой
  titleInput.addEventListener('blur', function () {
    if (!titleInput.validity.valid) {
      titleInput.classList.add('error');
    } else {
      titleInput.classList.remove('error');
    }
  });

  // Если адрес не валиден - обводится красной рамкой
  addressInput.addEventListener('blur', function () {
    if (!addressInput.validity.valid) {
      addressInput.classList.add('error');
    } else {
      addressInput.classList.remove('error');
    }
  });

  // Валидация заголовка объявления для браузера Edge
  titleInput.addEventListener('input', function (event) {
    var target = event.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Заголовок должен состоять минимум из 30 символов, сейчас длина ' + target.value.length);
    } else if (target.value.length > 100) {
      target.setCustomValidity('Заголовок не должен превышать 100 символов, сейчас длина ' + target.value.length);
    } else {
      target.setCustomValidity('');
    }
  });

})();
