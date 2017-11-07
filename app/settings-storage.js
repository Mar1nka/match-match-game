'use strict';

(function () {

    window.global = window.global || {};

    function SettingsStorage () {
        this.currentCategory = 0;
        this.cardsNumber = 8;

    }

    SettingsStorage.prototype.getCategory = function () {
        return this.currentCategory;
    }

    SettingsStorage.prototype.setCategory = function (value) {
        this.currentCategory = value;
    }


    SettingsStorage.prototype.getCardsNumber = function () {
        return this.cardsNumber;
    }

    SettingsStorage.prototype.setCardsNumber = function (value) {
        this.cardsNumber = value;
    }

    global.SettingsStorage = new SettingsStorage();
})()