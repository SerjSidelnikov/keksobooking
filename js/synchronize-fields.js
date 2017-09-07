'use strict';

(function () {

  window.synchronizeFields = function (fieldOne, fieldTwo, arrayOne, arrayTwo, callback) {
    fieldOne.addEventListener('change', function () {
      for (var i = 0; i < arrayOne.length; i++) {
        var option = arrayOne[i];
        if (option.selected) {
          if (fieldTwo.type === 'number') {
            callback(fieldTwo, arrayTwo[i]);
          } else {
            callback(arrayTwo[i], option.value);
          }
        }
      }
    });

    fieldTwo.addEventListener('change', function () {
      for (var i = 0; i < arrayTwo.length; i++) {
        var option = arrayTwo[i];
        if (option.selected) {
          callback(arrayOne[i], option.value);
        }
      }
    });
  };

})();
