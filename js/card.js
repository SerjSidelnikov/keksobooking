'use strict';

(function () {

  var dialogPanelTemplate = document.getElementById('lodge-template').content;

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

  window.card = {
    renderDialogPanel: renderDialogPanel
  };

})();
