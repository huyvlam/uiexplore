(function () {
  'use strict';

  function CheeseHunt(options) {
    var target = document.querySelector('.target'),
        moveable = document.querySelector('.moveable'),
        moveableContainer = document.querySelector('.moveable-container'),
        score = document.querySelector('.score'),
        life = document.querySelector('.life'),
        time = document.querySelector('.time'),
        modal = document.querySelector('.modal-overlay'),
        totalScore = document.querySelector('.total-score'),

        containerWidth = Math.floor(moveableContainer.offsetWidth / 10) * 10,
        containerHeight = moveableContainer.offsetHeight,

        timeout = null,
        offset = 40,

        resizeContainer = function () {
          moveableContainer.style.width = containerWidth + 'px';
        },

        // Generate a random position for target
        getRandomPosition = function (max) {
          return Math.floor(
              Math.random() * (max - 0 + 1) + 0
            ) * 10;
        },

        // Place target in new position
        positionTarget = function () {
          var left = getRandomPosition((containerWidth - offset) / 10),
              top = getRandomPosition((containerHeight - offset) / 10);

          target.style.left = left + 'px';
          target.style.top = top + 'px';
        },

        // Restore moveable object to original center position
        positionMoveable = function () {
          moveable.style.left = '50%';
          moveable.style.top = '50%';
        },

        isTimeUp = function () {
          var remainingTime = Number(time.innerHTML);

          if (remainingTime !== 0) {
            time.innerHTML = --remainingTime;
            return timeout = setTimeout(isTimeUp, 1000);
          }

          destroy();
        },

        // Display the total score in modal
        displayScore = function () {
          totalScore.innerHTML = 'Your score: ' +
            (
              +(life.innerHTML) + +(score.innerHTML)
            );
        },

        // Clear timeout that was created
        resetTimeout = function () {
          clearTimeout(timeout);
          timeout = null;
        },

        decrementLife = function () {
          life.innerHTML = --life.innerHTML;

          if (Number(life.innerHTML) === 0) {
            return destroy();
          }
        },

        incrementScore = function () {
          score.innerHTML = ++score.innerHTML;
        },

        addClass = function (className) {
          moveable.className = 'moveable ' + className || '';
        },

        // Move the object LEFT
        moveLeft = function (left, top, targetLeft, targetTop) {
          if (left <= 0) {
            decrementLife();
            return positionMoveable(moveable);
          }

          moveable.style.left = left - 10 + 'px';

          if (left === targetLeft && top === targetTop) {
            incrementScore();
            positionTarget();
          }
        },

        // Move the object UP
        moveUp = function (left, top, targetLeft, targetTop) {
          if (top === 0) {
            decrementLife();
            return positionMoveable(moveable);
          }

          moveable.style.top = top - 10 + 'px';

          if (left === targetLeft && top === targetTop) {
            incrementScore();
            positionTarget();
          }
        },

        // Move the object Right
        moveRight = function (left, top, targetLeft, targetTop, leftBound) {
          if (left >= leftBound) {
            decrementLife();
            return positionMoveable(moveable);
          }

          moveable.style.left = left + 10 + 'px';

          if (left === targetLeft && top === targetTop) {
            incrementScore();
            positionTarget();
          }
        },

        // Move the object Down
        moveDown = function (left, top, targetLeft, targetTop, lowerBound) {
          if (top === lowerBound) {
            decrementLife();
            return positionMoveable(moveable);
          }

          moveable.style.top = top + 10 + 'px';

          if (left === targetLeft && top === targetTop) {
            incrementScore();
            positionTarget();
          }
        },

        // Move the object according to direction
        move = function(direction) {
          var top = moveable.offsetTop,
              left = moveable.offsetLeft,

              targetTop = target.offsetTop,
              targetLeft = target.offsetLeft,

              leftBound = containerWidth - offset,
              lowerBound = moveableContainer.offsetHeight - offset;

          switch(direction) {
            case 'Left':
              addClass('left');
              return moveLeft(left, top, targetLeft, targetTop);

            case 'Up':
              addClass('up');
              return moveUp(left, top, targetLeft, targetTop);

            case 'Right':
              addClass('right');
              return moveRight(left, top, targetLeft, targetTop, leftBound);

            case 'Down':
              addClass();
              return moveDown(left, top, targetLeft, targetTop, lowerBound);
          }
        },

        // Listen for Left, Up, Right, Down and move the object on keydown
        getKeyCode = function (event) {
          if (!/37|38|39|40/.test(event.which)) {
            return;
          }

          if (!!timeout) {
            return move(event.keyIdentifier);
          }

          timeout = setTimeout(isTimeUp, 1000);
          move(event.keyIdentifier);
        },

        // Disable keydown event till user click 'Play again!'
        destroy = function () {
          resetTimeout();
          displayScore();
          document.removeEventListener('keydown', getKeyCode);

          modal.style.display = 'block';
        },

        // Restore all values to original state
        reset = function () {
          life.innerHTML = 3;
          score.innerHTML = 0;
          time.innerHTML = 60;
          modal.style.display = 'none';

          positionMoveable();
          document.addEventListener('keydown', getKeyCode);
        },

        // Initialize the game
        init = function () {
          resizeContainer();
          positionTarget();
          document.addEventListener('keydown', getKeyCode);
          document.querySelector('.play-again')
            .addEventListener('click', reset);
        };

    init();
  }

  document.addEventListener('DOMContentLoaded', CheeseHunt);
})();
