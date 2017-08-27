'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var offers = [];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12:00', '13:00', '14:00'];

var offerDialog = document.querySelector('#offer-dialog');
var dialogClose = offerDialog.querySelector('.dialog__close');
var pinMap = document.querySelector('.tokyo__pin-map');
var dialogPanelTemplate = document.getElementById('lodge-template').content;
var dialogPanel;
var fragmentPanel;

var myDialog = offerDialog.children[1].cloneNode(true);

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

// Заполнение массива offers
for (var i = 1; i <= 8; i++) {
  var locationX = generateRandomNumber(300, 900);
  var locationY = generateRandomNumber(100, 500);
  offers.push({
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      title: titles[i - 1],
      address: locationX + ', ' + locationY,
      price: generateRandomNumber(1000, 1000000),
      type: types[generateRandomNumber(0, 2)],
      rooms: generateRandomNumber(1, 5),
      guests: generateRandomNumber(1, 10),
      checkin: times[generateRandomNumber(0, 2)],
      checkout: times[generateRandomNumber(0, 2)],
      features: features.slice(0, generateRandomNumber(1, 5)),
      description: '',
      photos: []
    },
    location: {
      x: locationX,
      y: locationY
    }
  });
}

// Отображаем маркеры на карте
var fragment = document.createDocumentFragment();
makeFragmentPinMap(offers, fragment);
pinMap.appendChild(fragment);

var pins = pinMap.querySelectorAll('.pin');

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
      } else {
        dialogPanel = renderDialogPanel(offers[x - 1]);
        fragmentPanel = document.createDocumentFragment();
        fragmentPanel.appendChild(dialogPanel);
        offerDialog.replaceChild(fragmentPanel, offerDialog.children[1]);
        document.querySelector('.dialog__title img').setAttribute('src', targetImage);
      }
    }
  }
}

/**
 * Создаёт элемент отображающий маркер на карте
 * @param {Object} object
 * @param {Object} element
 */
function makeFragmentPinMap(object, element) {
  for (var k = 0; k < object.length; k++) {
    var newElement = document.createElement('div');
    var imgElement = document.createElement('img');
    var imageWidth = 40;
    var imageHeight = 40;

    newElement.classList.add('pin');
    newElement.setAttribute('tabindex', '0');
    newElement.style.left = object[k].location.x + imageWidth / 2 + 'px';
    newElement.style.top = object[k].location.y + imageHeight + 'px';

    imgElement.classList.add('rounded');
    imgElement.style.width = '40px';
    imgElement.style.height = '40px';
    imgElement.setAttribute('src', object[k].author.avatar);

    newElement.appendChild(imgElement);
    element.appendChild(newElement);
  }
}

/**
 * Создаёт элемент с описанием объявления
 * @param {Object} panel
 * @return {Object}
 */
function renderDialogPanel(panel) {
  var panelElement = dialogPanelTemplate.cloneNode(true);
  var typeLodging;

  if (panel.offer.type === 'flat') {
    typeLodging = 'Квартира';
  } else if (panel.offer.type === 'house') {
    typeLodging = 'Дом';
  } else {
    typeLodging = 'Бунгало';
  }

  var fragmentFeatures = document.createDocumentFragment();

  for (var j = 0; j < panel.offer.features.length; j++) {
    var newFeatures = document.createElement('span');
    newFeatures.className = 'feature__image feature__image--' + panel.offer.features[j];

    fragmentFeatures.appendChild(newFeatures);
  }

  panelElement.querySelector('.lodge__title').textContent = panel.offer.title;
  panelElement.querySelector('.lodge__address').textContent = panel.offer.address;
  panelElement.querySelector('.lodge__price').innerHTML = panel.offer.price + '&#x20bd;/ночь';
  panelElement.querySelector('.lodge__type').textContent = typeLodging;
  panelElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + panel.offer.guests + ' гостей в ' + panel.offer.rooms + ' комнатах';
  panelElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + panel.offer.checkin + ', выезд до ' + panel.offer.checkout;
  panelElement.querySelector('.lodge__features').appendChild(fragmentFeatures);
  panelElement.querySelector('.lodge__description').textContent = panel.offer.description;

  return panelElement;
}

/**
 * Возвращает случайное число от min до max
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function generateRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

// Валидация формы ==========================================================================================
var form = document.querySelector('.notice__form');
var addressInput = form.elements.address;
var priceInput = form.elements.price;
var titleInput = form.elements.title;
var timeinSelect = form.elements.timein;
var timeoutSelect = form.elements.timeout;
var typeSelect = form.elements.type;
var roomsSelect = form.elements.rooms;
var capacitySelect = form.elements.capacity;

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
    titleInput.style.border = '1px solid red';
  } else {
    titleInput.style.border = '1px solid #d9d9d3';
  }
});

// Если адрес не валиден - обводится красной рамкой
addressInput.addEventListener('blur', function () {
  if (!addressInput.validity.valid) {
    addressInput.style.border = '1px solid red';
  } else {
    addressInput.style.border = '1px solid #d9d9d3';
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
