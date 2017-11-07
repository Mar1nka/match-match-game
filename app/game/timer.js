'use strict';

(function () {
    function Timer (element) {
        this.element = element;
        this.secondCounter = 0;
        this.timerId = undefined;
        this.displayTimeBind = this.displayTime.bind(this);
    }

    Timer.prototype.start = function start () {
        this.secondCounter = 0;
        this.element.innerHTML = '00:00:00';
        this.timerId = setInterval(this.displayTimeBind, 1000);
    }

    Timer.prototype.displayTime = function displayTime () {
        this.secondCounter++;
        var timeLabel = this.getTimeLabelBySecond(this.secondCounter);
        this.element.textContent = timeLabel;
    }

    Timer.prototype.getTimeLabelBySecond = function getTimeLabelBySecond (seconds) {
        var hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;

        var min = Math.floor(seconds / 60);
        seconds -= min * 60;

        var secondView = this.formatView(seconds);
        var minView = this.formatView(min);
        var hoursView = this.formatView(hours);

        var timeLabel = hoursView + ':' + minView + ':' + secondView;

        return timeLabel;
    }

    Timer.prototype.formatView = function formatView (time) {
        var result = time;

        if (Math.floor(time / 10) < 1) {
            result = '0' + time;
        }

        return result;
    }

    Timer.prototype.stop = function stop () {
        clearInterval(this.timerId);
    }

    global.Timer = Timer;
})();


