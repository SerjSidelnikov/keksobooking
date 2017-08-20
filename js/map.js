'use strict';

var offers = [
  {
    author: {
      avatar: 'img/avatars/user01.png'
    },
    offer: {
      title: 'Большая уютная квартира',
      address: location.x + ' ' + location.y,
      price: Math.floor(1000 + Math.random() * (1000000 + 1 - 1000)),
      type: 'flat',
      rooms: Math.floor(1 + Math.random() * (5 + 1 - 1)),
      guests: Math.floor(1 + Math.random() * (10 + 1 - 1)),
      checkin: '12:00',
      checkout: '12:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: []
    },
    location: {
      x: Math.floor(300 + Math.random() * (900 + 1 - 300)),
      y: Math.floor(100 + Math.random() * (500 + 1 - 100)),
    }
  },
  {
    author: {
      avatar: 'img/avatars/user02.png'
    },
    offer: {
      title: 'Маленькая неуютная квартира',
      address: location.x + ' ' + location.y,
      price: Math.floor(1000 + Math.random() * (1000000 + 1 - 1000)),
      type: 'flat',
      rooms: Math.floor(1 + Math.random() * (5 + 1 - 1)),
      guests: Math.floor(1 + Math.random() * (10 + 1 - 1)),
      checkin: '13:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'washer', 'elevator'],
      description: '',
      photos: []
    },
    location: {
      x: Math.floor(300 + Math.random() * (900 + 1 - 300)),
      y: Math.floor(100 + Math.random() * (500 + 1 - 100)),
    }
  },
  {
    author: {
      avatar: 'img/avatars/user03.png'
    },
    offer: {
      title: 'Огромный прекрасный дворец',
      address: location.x + ' ' + location.y,
      price: Math.floor(1000 + Math.random() * (1000000 + 1 - 1000)),
      type: 'house',
      rooms: Math.floor(1 + Math.random() * (5 + 1 - 1)),
      guests: Math.floor(1 + Math.random() * (10 + 1 - 1)),
      checkin: '13:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: []
    },
    location: {
      x: Math.floor(300 + Math.random() * (900 + 1 - 300)),
      y: Math.floor(100 + Math.random() * (500 + 1 - 100)),
    }
  },
  {
    author: {
      avatar: 'img/avatars/user04.png'
    },
    offer: {
      title: 'Маленький ужасный дворец',
      address: location.x + ' ' + location.y,
      price: Math.floor(1000 + Math.random() * (1000000 + 1 - 1000)),
      type: 'flat',
      rooms: Math.floor(1 + Math.random() * (5 + 1 - 1)),
      guests: Math.floor(1 + Math.random() * (10 + 1 - 1)),
      checkin: '14:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'washer'],
      description: '',
      photos: []
    },
    location: {
      x: Math.floor(300 + Math.random() * (900 + 1 - 300)),
      y: Math.floor(100 + Math.random() * (500 + 1 - 100)),
    }
  },
  {
    author: {
      avatar: 'img/avatars/user05.png'
    },
    offer: {
      title: 'Красивый гостевой домик',
      address: location.x + ' ' + location.y,
      price: Math.floor(1000 + Math.random() * (1000000 + 1 - 1000)),
      type: 'house',
      rooms: Math.floor(1 + Math.random() * (5 + 1 - 1)),
      guests: Math.floor(1 + Math.random() * (10 + 1 - 1)),
      checkin: '14:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: []
    },
    location: {
      x: Math.floor(300 + Math.random() * (900 + 1 - 300)),
      y: Math.floor(100 + Math.random() * (500 + 1 - 100)),
    }
  },
  {
    author: {
      avatar: 'img/avatars/user06.png'
    },
    offer: {
      title: 'Некрасивый негостеприимный домик',
      address: location.x + ' ' + location.y,
      price: Math.floor(1000 + Math.random() * (1000000 + 1 - 1000)),
      type: 'bungalo',
      rooms: Math.floor(1 + Math.random() * (5 + 1 - 1)),
      guests: Math.floor(1 + Math.random() * (10 + 1 - 1)),
      checkin: '14:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: []
    },
    location: {
      x: Math.floor(300 + Math.random() * (900 + 1 - 300)),
      y: Math.floor(100 + Math.random() * (500 + 1 - 100)),
    }
  },
  {
    author: {
      avatar: 'img/avatars/user07.png'
    },
    offer: {
      title: 'Уютное бунгало далеко от моря',
      address: location.x + ' ' + location.y,
      price: Math.floor(1000 + Math.random() * (1000000 + 1 - 1000)),
      type: 'bungalo',
      rooms: Math.floor(1 + Math.random() * (5 + 1 - 1)),
      guests: Math.floor(1 + Math.random() * (10 + 1 - 1)),
      checkin: '14:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: []
    },
    location: {
      x: Math.floor(300 + Math.random() * (900 + 1 - 300)),
      y: Math.floor(100 + Math.random() * (500 + 1 - 100)),
    }
  },
  {
    author: {
      avatar: 'img/avatars/user08.png'
    },
    offer: {
      title: 'Неуютное бунгало по колено в воде',
      address: location.x + ' ' + location.y,
      price: Math.floor(1000 + Math.random() * (1000000 + 1 - 1000)),
      type: 'bungalo',
      rooms: Math.floor(1 + Math.random() * (5 + 1 - 1)),
      guests: Math.floor(1 + Math.random() * (10 + 1 - 1)),
      checkin: '14:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'washer'],
      description: '',
      photos: []
    },
    location: {
      x: Math.floor(300 + Math.random() * (900 + 1 - 300)),
      y: Math.floor(100 + Math.random() * (500 + 1 - 100)),
    }
  }
];

var pinMap = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();

for (var i = 0; i < offers.length; i++) {
  var newElement = document.createElement('div');
  newElement.classList.add('pin');
  newElement.style.left = offers[i].location.x + 'px';
  newElement.style.top = offers[i].location.y + 'px';
  newElement.innerHTML = '<img src="' + offers[i].author.avatar + '" class="rounded" width="40" height="40">';

  fragment.appendChild(newElement);
}

pinMap.appendChild(fragment);

var offerDialog = document.querySelector('#offer-dialog');
var dialogPanelTemplate = document.getElementById('lodge-template').content;

var renderDialogPanel = function (panel) {
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
};

var fragmentPanel = document.createDocumentFragment();
fragmentPanel.appendChild(renderDialogPanel(offers[0]));

offerDialog.replaceChild(fragmentPanel, offerDialog.children[1]);

document.querySelector('.dialog__title img').setAttribute('src', offers[0].author.avatar);
