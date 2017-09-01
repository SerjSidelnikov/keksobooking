'use strict';

(function () {
  var offers = [];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['flat', 'house', 'bungalo'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var times = ['12:00', '13:00', '14:00'];

  /**
   * Заполняет массив offers данными
   */
  function generateOffers() {
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

  window.data = {
    generateOffers: generateOffers
  };

})();
