
window.pcs = function (id) {
    "use strict";

    function get(id) {
        return document.getElementById(id);
    }

    function css(el, prop, value) {
        if (arguments.length === 1) {
            return getComputedStyle(el)[prop];
        }
        el.style[prop] = value;

    }

    /** Color Changes */
    function random() {
        return Math.floor(Math.random() * 256);
    } function createColor() {
        return `rgb(${random()},${random()},${random()})`;
    }

    const theEl = get(id);

    return {
        css: function (prop, value) {
            css(theEl, prop, value);
            return this;
        },
        click: function (callback) {
            theEl.addEventListener('click', callback);
            return this;
        },
        hide: function () {
            css(theEl, 'display', 'none');
            return this;
        },
        show: function () {
            css(theEl, 'display', 'block');
            return this;
        },
        colorChange: function (howLong, howFast = 1000) {
            const startTime = new Date().getTime();
            let interval = setInterval(function () {
                if (new Date().getTime() - startTime > howLong) {
                    clearInterval(interval);
                }
                css(theEl, 'background-color', createColor());
                css(theEl, 'color', createColor());
            }, howFast);
            return this;
        }, data: function (key, value) {
            if (value !== undefined) {
                theEl.obj = {
                    myKey: key,
                    myValue: value
                };
            }
            return theEl.obj.myValue;
        }
    };
};