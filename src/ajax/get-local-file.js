(function () {
  'use strict';

  function getLocalFile() {
    var data,

        method = 'GET',

        location = 'raw-data.txt',

        isAsync = false,

        xhRequest = new XMLHttpRequest(),

        onReadyStateChange = function () {
          if (xhRequest.readyState === xhRequest.DONE) {
            data = formatToJSON(xhRequest.responseText);
          }
        };

    xhRequest.onreadystatechange = onReadyStateChange;
    xhRequest.open(method, location, isAsync);
    xhRequest.send();

    return Promise.resolve(data);
  }

  function formatToJSON(data) {
    var lines = data.split(/\n/g),
        values = [];

    lines.shift();

    return lines.map(
      function (line) {
        values = line.split(',');

        return {
          id: Number(
            values[0].replace(/\s+/g, '')
          ),

          running_time: Number(
            values[1].replace(/\s+/g, '')
          ),

          rating: Number(
            values[2].replace(/\s+/g, '')
          )
        };
      }
    );
  }

  function sortData(data) {
    data.sort(
      function (a, b) {
        return +(a.rating < b.rating)
            || +(a.rating === b.rating) - 1;
      }
    );
  }

  function rotate(arr) {
    return arr.splice(-3).concat(arr);
  }

  function renderTop10(list) {
    var dataContainer = document.querySelector('#data'),

        div,

        text,

        textNode;

    list.forEach(
      function (item) {
        div = document.createElement('div');

        text = [
          'ID: ', item.id,
          ' Rating: ', item.rating,
          ' Duration: ', item.running_time
        ].join('');

        textNode = document.createTextNode(text);

        div.appendChild(textNode);

        dataContainer.appendChild(div);
      }
    );
  }

  function init() {
    getLocalFile()
      .then(
        function (data) {
          sortData(data);

          renderTop10(
            data.slice(0, 10)
          );
        }
      );
  }

  document.addEventListener('DOMContentLoaded', init);
})();
