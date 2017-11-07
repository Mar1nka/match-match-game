'use strict';

(function () {
    const IMAGES_URL = '../play/images/categories/';

    function Card (category, type) {
        this.category = category;
        this.type = type;
    }

    Card.prototype.createElement = function createElement () {
        var srcFront = `${IMAGES_URL}${this.category}/cover.png`;
        var srcBack = `${IMAGES_URL}${this.category}/types/${this.type}.png`;

        var card = document.createElement('div');
        card.classList.add("card");

        var frontCard = document.createElement('img');
        frontCard.classList.add("card__front");
        frontCard.src = srcFront;
        frontCard.alt = "card";

        var backCard = document.createElement('img');
        backCard.classList.add("card__back");
        backCard.src = srcBack;
        backCard.alt = "card";

        card.appendChild(frontCard);
        card.appendChild(backCard);

        card.dataset.type = this.type;

        return card;
    }

    function PlayGround (element, options) {
        this.element = element;
        this.category = options.category;
        this.cardsNumber = options.cardsNumber;
        this.pair = 2
        this.cardsTypes = this.cardsNumber / this.pair;
    }

    PlayGround.prototype.start = function start () {
        this.createCards();
    }


    PlayGround.prototype.createCards = function createCards () {
        const positions = this.getPositions(this.cardsNumber);
        const cards = this.getCards(this.cardsTypes, this.category, this.pair)

        while (positions.length) {
            const randIndex = this.getRandomNumber(0, positions.length - 1);
            const randomPosition = positions[randIndex];
            const randomCard = cards[randomPosition];
            const cardElement = randomCard.createElement();

            this.element.appendChild(cardElement);
            positions.splice(randIndex, 1);
        }
    }


    PlayGround.prototype.getRandomNumber = function getRandomNumber (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    PlayGround.prototype.getPositions = function getPositions (cardsNumber) {
        const positions = [];

        for (var i = 0; i < cardsNumber; i++) {
            positions[i] = i;
        }

        return positions;
    }

    PlayGround.prototype.getCards = function getCards (cardsTypes, category, pair) {
        const cards = [];

        for (var i = 0; i < cardsTypes; i++) {
            for (var j = 0; j < pair; j++) {
                cards.push(new Card(category, i));
            }
        }

        return cards;
    }

    PlayGround.prototype.clearScene = function clearScene () {
        this.element.innerHTML = '';
    }


    global.PlayGround = PlayGround;
})();
