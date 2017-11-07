'use strict';

(function () {

    let routes = [
        {
            state: 'main-menu',
            url: 'app/main-menu/main-menu.html',
            html: ''
        },
        {
            state: 'game',
            url: 'app/game/game.html',
            html: '',
            handler: function () {
                var game = new global.Game();
                game.start();
            }
        },
        {
            state: 'settings',
            url: 'app/settings/settings.html',
            html: '',
            handler: function () {
                var setting = new global.GameSettings();
                setting.start();
            }
        },
        {
            state: 'about',
            url: 'app/about/about.html',
            html: ''
        }
    ]

    function Router () {
        this.hashChangeHandlerBind = this.hashChangeHandler.bind(this);

        window.location.hash = '#main-menu';
        this.updateRoute('main-menu');
        window.addEventListener('hashchange', this.hashChangeHandlerBind);
    }

    Router.prototype.hashChangeHandler = function hashChangeHandler (event) {
        var splitUrl = event.newURL.split('#');
        var newState = splitUrl[1];

        this.updateRoute(newState);
    }


    Router.prototype.updateRoute = function updateRoute (state) {
        var route = routes.find(function (route) {
            if (route.state === state) {
                return true;
            }
        });

        this.loadTemplateHtml(route.url, function (templateHtml) {
            var mainElement = document.body.querySelector('.main');
            mainElement.innerHTML = templateHtml;

            if (route.handler) {
                route.handler();
            }
        });
    }

    Router.prototype.loadTemplateHtml = function loadTemplateHtml (url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.send();

        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        })
    }

    var router = new Router();
})();
