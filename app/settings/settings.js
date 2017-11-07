'use strict';

(function () {
    const SettingsStorage = global.SettingsStorage;

    function GameSettings () {

    }

    GameSettings.prototype.start = function () {
        this.difficultyClickHandlerBind = this.difficultyClickHandler.bind(this);
        this.difficultyElement = document.body.querySelector('.difficulty__options');
        this.difficultyElement.addEventListener('click', this.difficultyClickHandlerBind);
        this.setCheckedDifficulty();

        this.categoryClickHandlerBind = this.categoryClickHandler.bind(this);
        this.categoryElement = document.body.querySelector('.card-categories__options');
        this.categoryElement.addEventListener('click', this.categoryClickHandlerBind);
        this.setCheckedCategory();
    }


    GameSettings.prototype.setCheckedDifficulty = function () {
        var currentDifficulty = SettingsStorage.getCardsNumber();
        var difficultyOptionElement = this.difficultyElement.querySelector(`[data-difficulty="${currentDifficulty}"]`);
        difficultyOptionElement.classList.add('difficulty__options-item--checked');
    }


    GameSettings.prototype.difficultyClickHandler = function (event) {
        var currentElement = event.target;
        var optionElement = currentElement.closest('.difficulty__options-item');


        if (optionElement) {

            for (var i = 0; i < this.difficultyElement.children.length; i++) {
                this.difficultyElement.children[i].classList.remove('difficulty__options-item--checked');
            }

            optionElement.classList.add('difficulty__options-item--checked');
        }

        SettingsStorage.setCardsNumber(parseInt(optionElement.dataset.difficulty, 10));
    }


    GameSettings.prototype.setCheckedCategory = function () {
        var currentCategory = SettingsStorage.getCategory();
        var categoryOptionElement = this.categoryElement.querySelector(`[data-category="${currentCategory}"]`);
        categoryOptionElement.classList.add('card-categories__options-item--checked');
    }


    GameSettings.prototype.categoryClickHandler = function (event) {
        var currentElement = event.target;
        var optionElement = currentElement.closest('.card-categories__options-item');

        if (optionElement) {

            for (var i = 0; i < this.categoryElement.children.length; i++) {
                this.categoryElement.children[i].classList.remove('card-categories__options-item--checked');
            }

            optionElement.classList.add('card-categories__options-item--checked');
        }

        SettingsStorage.setCategory(parseInt(optionElement.dataset.category, 10));
    }


    global.GameSettings = GameSettings;
})();