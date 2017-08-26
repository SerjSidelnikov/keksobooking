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

var onDialogEscPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closeDialog();
  }
};

var onDialogEnterPress = function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    showActiveDialog();
  }
};

var openDialog = function () {
  offerDialog.classList.remove('hidden');
  document.addEventListener('keydown', onDialogEscPress);
  dialogClose.addEventListener('click', closeDialog);
};

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

pinMap.addEventListener('click', showActiveDialog);
pinMap.addEventListener('keydown', onDialogEnterPress); // если сюда поставить onDialogEnterPress, то будет ошибка event undefined, а так открывает объявление любой кнопкой. Не знаю как решить.

/**
 * Показывает активное объявление
 * @param {object} event
 */
function showActiveDialog(event) {
  var target = event.target;
  var targetImage;

  for (var j = 0; j < pins.length; j++) {
    pins[j].classList.remove('pin--active');
  }

  while (target !== pinMap) {
    if (target.classList.contains('pin')) {
      target.classList.add('pin--active');
      targetImage = target.children[0].getAttribute('src');
      openDialog();
    }

    target = target.parentNode;
  }

  for (var x = 0; x < pins.length; x++) {
    if (pins[x].classList.contains('pin--active')) {
      if (x === 0) {
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
