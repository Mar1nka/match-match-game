'use strict';

(function () {
    const Timer = global.Timer;
    const PlayGround = global.PlayGround;
    const SettingsStorage = global.SettingsStorage;

    const TIME_OVER_MS = 300500;


    function Game () {
        this.prevCardElement = null;
        this.isRotateInProcess = false;
        this.backRotateTimerId = undefined;
        this.timeOverTimerId = undefined;
        this.clickHandlerBind = this.clickHandler.bind(this);
        this.foundCardsCounter = 0;
        this.settings = {
            category: SettingsStorage.getCategory(),
            cardsNumber: SettingsStorage.getCardsNumber()
        };
        this.messageElement = null;

        this.timer = null;
        this.timeOverHandlerBind = this.timeOverHandler.bind(this);
        this.showGameWinMessageBind = this.showGameWinMessage.bind(this);
        this.destroyBind = this.destroy.bind(this);

    }

    Game.prototype.start = function start () {
        var playGroundElement = document.body.querySelector(".playground");
        var elementTimer = document.body.querySelector(".timer__label");

        this.playground = new PlayGround(playGroundElement, this.settings);
        this.timer = new Timer(elementTimer);

        this.playground.start();
        this.timer.start();
        this.scheduleTimeOver();
        playGroundElement.addEventListener("click", this.clickHandlerBind);

        window.addEventListener('hashchange', this.destroyBind);
    }

    Game.prototype.restart = function restart () {
        this.prevCardElement = null;
        this.foundCardsCounter = 0;
        this.playground.start();
        this.timer.start();
        this.scheduleTimeOver();
    }

    Game.prototype.scheduleTimeOver = function scheduleTimeOver () {
        this.timeOverTimerId = setTimeout(this.timeOverHandlerBind, TIME_OVER_MS);
    }


    Game.prototype.clickHandler = function clickHandler () {
        if (this.isRotateInProcess) {
            return;
        }

        var currentElement = event.target;

        if (currentElement.classList.contains("card__front")) {
            var cardElement = currentElement.closest('.card');
            if (cardElement.classList.contains('card--hidden')) {
                return;
            }
            cardElement.classList.toggle("card--rotate");

            if (this.prevCardElement) {
                this.handelTwoOpenedCards(cardElement);
            } else {
                this.prevCardElement = cardElement;
            }

        }
    }


    Game.prototype.handelTwoOpenedCards = function handelTwoOpenedCards (cardElement) {
        var _this = this;

        if (this.prevCardElement.dataset.type === cardElement.dataset.type) {
            this.prevCardElement.classList.add('card--hidden');
            cardElement.classList.add('card--hidden');
            this.prevCardElement = null;

            this.foundCardsCounter += 2;
            this.checkIsGameOver();


        } else {
            this.isRotateInProcess = true;

            this.backRotateTimerId = setTimeout(function () {
                _this.rotateBack(_this.prevCardElement, cardElement);
                _this.prevCardElement = null;
                _this.isRotateInProcess = false;

            }, 500);
        }
    }


    Game.prototype.rotateBack = function rotateBack (prevCardElement, cardElement) {
        prevCardElement.classList.toggle('card--rotate');
        cardElement.classList.toggle('card--rotate');
    }

    Game.prototype.checkIsGameOver = function checkIsGameOver () {
        if (this.foundCardsCounter === this.settings.cardsNumber) {
            this.stop();
            setTimeout(this.showGameWinMessageBind, 1000);
        }
    }

    Game.prototype.timeOverHandler = function timeOverHandler () {
        this.stop();
        this.showGameOverMessage();
    }

    Game.prototype.showGameWinMessage = function () {
        this.playground.clearScene();
        this.showMessage('You are a winner!!!');
    }

    Game.prototype.showGameOverMessage = function () {
        this.playground.clearScene();
        this.showMessage('Time is over.');
    }


    Game.prototype.removeMessage = function removeMessage () {
        if (this.messageElement) {
            this.messageElement.parentNode.removeChild(this.messageElement);
        }
    }

    Game.prototype.showMessage = function showMessage (message) {
        var _this = this;

        var messageTextElement = document.createElement('p');
        messageTextElement.innerText = message;

        var messageTextWrapperElement = document.createElement('div');
        messageTextWrapperElement.classList.add('game-message__text');
        messageTextWrapperElement.appendChild(messageTextElement);


        var messageMenuButtonElement = document.createElement('a');
        messageMenuButtonElement.classList.add('game-message__button');
        messageMenuButtonElement.innerText = 'Main menu';
        messageMenuButtonElement.href = '#main-menu';

        var messageAgainButtonElement = messageMenuButtonElement.cloneNode(true);
        messageAgainButtonElement.innerText = 'Play again';
        messageAgainButtonElement.href = '#game';
        messageAgainButtonElement.addEventListener('click', function () {
            _this.removeMessage();
            _this.restart();
        })

        var messageButtonWrapperElement = document.createElement('div');
        messageButtonWrapperElement.classList.add('game-message__button-wrapper');
        messageButtonWrapperElement.appendChild(messageMenuButtonElement);
        messageButtonWrapperElement.appendChild(messageAgainButtonElement);

        var messageElement = document.createElement('div');
        messageElement.classList.add('game-message');
        messageElement.appendChild(messageTextWrapperElement);
        messageElement.appendChild(messageButtonWrapperElement);

        document.body.appendChild(messageElement);

        this.messageElement = messageElement;
    }

    Game.prototype.stop = function () {
        this.timer.stop();
        clearTimeout(this.backRotateTimerId);
        clearTimeout(this.timeOverTimerId);
    }

    Game.prototype.destroy = function () {
        this.stop();
        this.removeMessage();
        window.removeEventListener('hashchange', this.destroyBind);

    }

    global.Game = Game;
})();