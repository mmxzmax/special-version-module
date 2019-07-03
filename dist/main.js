!function (e) {
  var t = {};

  function n(o) {
    if (t[o]) return t[o].exports;
    var i = t[o] = {i: o, l: !1, exports: {}};
    return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
  }

  n.m = e, n.c = t, n.d = function (e, t, o) {
    n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: o})
  }, n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var o = Object.create(null);
    if (n.r(o), Object.defineProperty(o, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var i in e) n.d(o, i, function (t) {
      return e[t]
    }.bind(null, i));
    return o
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return n.d(t, "a", t), t
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, n.p = "", n(n.s = 5)
}([function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var o, i = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
    }

    return function (t, n, o) {
      return n && e(t.prototype, n), o && e(t, o), t
    }
  }(), r = n(1), s = (o = r) && o.__esModule ? o : {default: o};
  var a = function () {
    function e(t, n) {
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, e), this.group = null, this.settings = n, this.textNodes = t, this.value = window.localStorage.getItem(this.settings.cacheName), this.init(), this.value && (this.setStyle(), this.processNodes(this.value))
    }

    return i(e, [{
      key: "setStyle", value: function () {
        for (var e = null, t = 0; t < this.settings.params.length; t++) {
          var n = this.settings.params[t];
          String(n.value) === String(this.value) && (e = n)
        }
        e && this.callback(e)
      }
    }, {
      key: "init", value: function () {
      }
    }, {
      key: "processNodes", value: function (e) {
        if (e) {
          window.localStorage.setItem(this.settings.cacheName, e);
          try {
            document.head.appendChild(this.sizeStyes)
          } catch (e) {
            console.log("no stylesheets")
          }
        } else {
          try {
            this.sizeStyes = document.head.removeChild(this.sizeStyes)
          } catch (e) {
            console.log("no stylesheets")
          }
          window.localStorage.removeItem(this.settings.cacheName)
        }
      }
    }, {
      key: "saveToCache", value: function (e) {
        var t = JSON.parse(window.localStorage.getItem("specialVersionSettings"));
        t || (t = {}), t[this.settings.cacheName] = e, window.localStorage.setItem("specialVersionSettings", JSON.stringify(t))
      }
    }, {
      key: "createUi", value: function (e) {
        this.group = s.default.createGroup(e);
        for (var t = s.default.createGroup(), n = 0; n < this.settings.params.length; n++) {
          var o = this.settings.params[n], i = s.default.createButton(o.buttonTittle, o.buttonAltText);
          if (o.buttonClass) {
            var r = o.buttonClass.split(",");
            if (Array.isArray(r)) for (var a = 0; a < r.length; a++) i.classList.add(r[a]); else i.classList.add(o.buttonClass)
          }
          String(this.value) === String(o.value) && i.classList.add("state_active"), this.bindEvent(i, o), t.appendChild(i)
        }
        return this.group.appendChild(t), this.group
      }
    }, {
      key: "bindEvent", value: function (e, t) {
        var n = this;
        e.addEventListener("click", function (e) {
          n.processNodes(t.value), s.default.buttonClassTrigger(e.currentTarget), n.saveToCache(t.value), n.callback(t)
        }, !1)
      }
    }, {
      key: "callback", value: function (e) {
        this.setSizeStyle(e)
      }
    }, {
      key: "setSizeStyle", value: function (e) {
        e.styleSheet && (this.sizeStyes ? this.sizeStyes.href = e.styleSheet : this.sizeStyes = s.default.addStyleSheet(e.styleSheet))
      }
    }]), e
  }();
  t.default = a
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var o, i = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
    }

    return function (t, n, o) {
      return n && e(t.prototype, n), o && e(t, o), t
    }
  }(), r = n(2), s = (o = r) && o.__esModule ? o : {default: o};
  var a = function () {
    function e() {
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, e)
    }

    return i(e, null, [{
      key: "getNodes", value: function (t) {
        return new s.default(function (n, o) {
          var i;
          (i = document.body.querySelectorAll("*"), new s.default(function (e, t) {
            var n = [], o = i.length, r = 0, s = 0, a = setInterval(function () {
              for (s = r; s < r + 10; s++) {
                var t = i[s];
                s < o && n.push(t)
              }
              r < o ? r = s : (clearInterval(a), e(n))
            }, 10)
          })).then(function (o) {
            e.cleanNodes(o, t).then(function (e) {
              n(e)
            })
          })
        })
      }
    }, {
      key: "cleanNodes", value: function (e, t) {
        var n = t || [];
        return n.push("script"), n.push("#text"), n.push("#comment"), n.push("img"), n.push("svg"), n.push("use"), n.push("noscript"), n.push("br"), n.push("hr"), n.push("ymaps"), new s.default(function (t, o) {
          var i = 0, r = 0;
          e || o();
          var s = setInterval(function () {
            for (r = i; r < i + 10; r++) if (r < e.length) {
              var a = null;
              try {
                a = e[r]
              } catch (e) {
              }
              for (var l = 0; l < n.length; l++) if (a && String(a.nodeName).toLowerCase() === n[l]) {
                try {
                  a.classList.add("special-version__ignore")
                } catch (e) {
                }
                try {
                  e.splice(r, 1), r--
                } catch (e) {
                  o();
                  break
                }
              }
            }
            i < e.length ? i = r : (clearInterval(s), t(e))
          }, 10)
        })
      }
    }, {
      key: "getStyle", value: function (e) {
        return window.getComputedStyle(e, null) || e.currentStyle
      }
    }, {
      key: "setToParent", value: function (e, t, n, o) {
        if (e.parentNode !== document.body) if (o) try {
          e.parentNode.style[t] = n
        } catch (e) {
          console.log("%c no node found", "color: yellow; font-style: italic; background-color: grey; padding: 2px;")
        } else setTimeout(function () {
          try {
            e.parentNode.style[t] = n
          } catch (e) {
            console.log("%c no node found", "color: yellow; font-style: italic; background-color: grey; padding: 2px;")
          }
        }, 200)
      }
    }, {
      key: "isEmptyObject", value: function (e) {
        for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
        return !0
      }
    }, {
      key: "setSettings", value: function (e) {
        window.localStorage.setItem("specialVersionSettings", JSON.stringify(e))
      }
    }, {
      key: "createButton", value: function (e, t) {
        var n = document.createElement("div");
        return n.type = "button", n.classList.add("special-version__button"), n.classList.add("js-special-version__button"), n.classList.add("special-version__ignore"), n.innerHTML = e, t && n.setAttribute("data-read", t), n
      }
    }, {
      key: "createGroup", value: function (e) {
        var t = document.createElement("div");
        if (e) {
          var n = document.createElement("h4");
          n.classList.add("special-version__group-title"), n.classList.add("special-version__ignore"), n.innerHTML = e, t.appendChild(n)
        }
        return t.classList.add("special-version__group"), t.classList.add("special-version__ignore"), t
      }
    }, {
      key: "buttonClassTrigger", value: function (e) {
        for (var t = e.parentNode.querySelectorAll(".special-version__button"), n = 0; n < t.length; n++) t[n].classList.remove("state_active");
        e.classList.add("state_active")
      }
    }, {
      key: "getSettings", value: function () {
        var e = window.localStorage.getItem("specialVersionSettings");
        return JSON.parse(e)
      }
    }, {
      key: "addStyleSheet", value: function (e) {
        var t = document.createElement("link");
        return t.rel = "stylesheet", t.href = e, document.head.appendChild(t), t
      }
    }]), e
  }();
  t.default = a
}, function (e, t, n) {
  "use strict";
  n.r(t), function (e) {
    var o = n(4), i = setTimeout;

    function r(e) {
      return Boolean(e && void 0 !== e.length)
    }

    function s() {
    }

    function a(e) {
      if (!(this instanceof a)) throw new TypeError("Promises must be constructed via new");
      if ("function" != typeof e) throw new TypeError("not a function");
      this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], p(e, this)
    }

    function l(e, t) {
      for (; 3 === e._state;) e = e._value;
      0 !== e._state ? (e._handled = !0, a._immediateFn(function () {
        var n = 1 === e._state ? t.onFulfilled : t.onRejected;
        if (null !== n) {
          var o;
          try {
            o = n(e._value)
          } catch (e) {
            return void u(t.promise, e)
          }
          c(t.promise, o)
        } else (1 === e._state ? c : u)(t.promise, e._value)
      })) : e._deferreds.push(t)
    }

    function c(e, t) {
      try {
        if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
        if (t && ("object" == typeof t || "function" == typeof t)) {
          var n = t.then;
          if (t instanceof a) return e._state = 3, e._value = t, void f(e);
          if ("function" == typeof n) return void p((o = n, i = t, function () {
            o.apply(i, arguments)
          }), e)
        }
        e._state = 1, e._value = t, f(e)
      } catch (t) {
        u(e, t)
      }
      var o, i
    }

    function u(e, t) {
      e._state = 2, e._value = t, f(e)
    }

    function f(e) {
      2 === e._state && 0 === e._deferreds.length && a._immediateFn(function () {
        e._handled || a._unhandledRejectionFn(e._value)
      });
      for (var t = 0, n = e._deferreds.length; t < n; t++) l(e, e._deferreds[t]);
      e._deferreds = null
    }

    function d(e, t, n) {
      this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
    }

    function p(e, t) {
      var n = !1;
      try {
        e(function (e) {
          n || (n = !0, c(t, e))
        }, function (e) {
          n || (n = !0, u(t, e))
        })
      } catch (e) {
        if (n) return;
        n = !0, u(t, e)
      }
    }

    a.prototype.catch = function (e) {
      return this.then(null, e)
    }, a.prototype.then = function (e, t) {
      var n = new this.constructor(s);
      return l(this, new d(e, t, n)), n
    }, a.prototype.finally = o.a, a.all = function (e) {
      return new a(function (t, n) {
        if (!r(e)) return n(new TypeError("Promise.all accepts an array"));
        var o = Array.prototype.slice.call(e);
        if (0 === o.length) return t([]);
        var i = o.length;

        function s(e, r) {
          try {
            if (r && ("object" == typeof r || "function" == typeof r)) {
              var a = r.then;
              if ("function" == typeof a) return void a.call(r, function (t) {
                s(e, t)
              }, n)
            }
            o[e] = r, 0 == --i && t(o)
          } catch (e) {
            n(e)
          }
        }

        for (var a = 0; a < o.length; a++) s(a, o[a])
      })
    }, a.resolve = function (e) {
      return e && "object" == typeof e && e.constructor === a ? e : new a(function (t) {
        t(e)
      })
    }, a.reject = function (e) {
      return new a(function (t, n) {
        n(e)
      })
    }, a.race = function (e) {
      return new a(function (t, n) {
        if (!r(e)) return n(new TypeError("Promise.race accepts an array"));
        for (var o = 0, i = e.length; o < i; o++) a.resolve(e[o]).then(t, n)
      })
    }, a._immediateFn = "function" == typeof e && function (t) {
      e(t)
    } || function (e) {
      i(e, 0)
    }, a._unhandledRejectionFn = function (e) {
      "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
    }, t.default = a
  }.call(this, n(11).setImmediate)
}, function (e, t) {
  var n;
  n = function () {
    return this
  }();
  try {
    n = n || new Function("return this")()
  } catch (e) {
    "object" == typeof window && (n = window)
  }
  e.exports = n
}, function (e, t, n) {
  "use strict";
  t.a = function (e) {
    var t = this.constructor;
    return this.then(function (n) {
      return t.resolve(e()).then(function () {
        return n
      })
    }, function (n) {
      return t.resolve(e()).then(function () {
        return t.reject(n)
      })
    })
  }
}, function (e, t, n) {
  "use strict";
  var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
      }

      return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
      }
    }(), i = (p(n(6)), p(n(7))), r = p(n(10)), s = p(n(14)), a = p(n(15)), l = p(n(16)), c = p(n(17)), u = p(n(18)),
    f = p(n(19)), d = p(n(20));

  function p(e) {
    return e && e.__esModule ? e : {default: e}
  }

  var h = function () {
    function e(t, n, o) {
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, e), this.services = [s.default, a.default, l.default, c.default, u.default, f.default, d.default];
      var r = i.default, p = n || [{
        serviceName: "FontSizeService",
        position: 1,
        groupName: "Шрифт",
        params: {
          cacheName: "fontsize",
          params: [{
            buttonTittle: "A",
            buttonAltText: "размер шрифта стандартный",
            buttonClass: "special-version__button_square,size-small",
            value: 1,
            styleSheet: "1.css"
          }, {
            buttonTittle: "A",
            buttonAltText: "размер шрифта средний",
            buttonClass: "special-version__button_square,size-middle",
            value: 1.5,
            styleSheet: "2.css"
          }, {
            buttonTittle: "A",
            buttonAltText: "размер шрифта большой",
            buttonClass: "special-version__button_square,size-big",
            value: 2,
            styleSheet: "3.css"
          }]
        }
      }, {
        serviceName: "FontFamilyService",
        position: 1,
        groupName: "",
        params: {
          cacheName: "fontFamily",
          params: [{
            buttonTittle: "Arial",
            buttonAltText: "шрифт ариал",
            buttonClass: "",
            value: "Arial",
            styleSheet: ""
          }, {
            buttonTittle: "Times New Roman",
            buttonAltText: "шрифт таймс нью роман",
            buttonClass: "",
            value: "Times New Roman",
            styleSheet: ""
          }],
          fontList: ["", ""]
        }
      }, {
        serviceName: "ColorSchemeService",
        position: 1,
        groupName: "Цвет",
        params: {
          cacheName: "colorScheme",
          params: [{
            buttonTittle: "Ц",
            buttonAltText: "цветовая схемма черным по белому",
            buttonClass: "special-version__button_square,theme-bw",
            value: "bw",
            styleSheet: ""
          }, {
            buttonTittle: "Ц",
            buttonAltText: "цветовая схемма белым по черному",
            buttonClass: "special-version__button_square,theme-wb",
            value: "wb",
            styleSheet: ""
          }, {
            buttonTittle: "Ц",
            buttonAltText: "цветовая схемма черным по голубому",
            buttonClass: "special-version__button_square,theme-bb",
            value: "bb",
            styleSheet: ""
          }, {
            buttonTittle: "Ц",
            buttonAltText: "цветовая схемма черным по светло коричневому",
            buttonClass: "special-version__button_square,theme-bwl",
            value: "bwl",
            styleSheet: ""
          }, {
            buttonTittle: "Ц",
            buttonAltText: "цветовая схемма зеленым по коричневому",
            buttonClass: "special-version__button_square,theme-bg",
            value: "bg",
            styleSheet: ""
          }],
          scheme: {
            bw: ["#ffffff", "#000000"],
            wb: ["#000000", "#ffffff"],
            bb: ["#9dd1ff", "#195183"],
            bwl: ["#f7f3d6", "#4d4b43"],
            bg: ["#3b2716", "#a9e44d"]
          }
        }
      }, {
        serviceName: "FontIntervalService",
        position: 2,
        groupName: "Интервал",
        params: {
          cacheName: "fontInterval",
          params: [{
            buttonTittle: "Одинарный",
            buttonAltText: "интервал Одинарный",
            buttonClass: "",
            value: 1,
            styleSheet: ""
          }, {
            buttonTittle: "Полуторный",
            buttonAltText: "интервал Полуторный",
            buttonClass: "",
            value: 1.5,
            styleSheet: ""
          }, {buttonTittle: "Двойной", buttonAltText: "интервал Двойной", buttonClass: "", value: 2, styleSheet: ""}]
        }
      }, {
        serviceName: "FontKerningService",
        position: 2,
        groupName: "Кернинг",
        params: {
          cacheName: "fontKerning",
          params: [{
            buttonTittle: "Стандартный",
            buttonAltText: "кернинг стандартый",
            buttonClass: "",
            value: "",
            styleSheet: ""
          }, {
            buttonTittle: "Полуторный",
            buttonAltText: "кернинг Полуторный",
            buttonClass: "",
            value: 1.5,
            styleSheet: ""
          }, {buttonTittle: "Двойной", buttonAltText: "кернинг Двойной", buttonClass: "", value: 2, styleSheet: ""}]
        }
      }, {
        serviceName: "ImagesService",
        position: 2,
        groupName: "Графика",
        params: {
          cacheName: "svImages",
          params: [{
            buttonTittle: "Показать",
            buttonAltText: "изображения включены",
            buttonClass: "",
            value: "",
            styleSheet: ""
          }, {
            buttonTittle: "Скрыть",
            buttonAltText: "изображения выключены",
            buttonClass: "",
            value: 2,
            styleSheet: ""
          }, {
            buttonTittle: "Чернобелый",
            buttonAltText: "Цвет изображений чернобелый",
            buttonClass: "",
            value: 3,
            styleSheet: ""
          }]
        }
      }, {
        serviceName: "PluginSpeechSystem", position: 3, groupName: "Озвучивание", params: {
          cacheName: "speech", lngCode: "ru", params: [{
            buttonTittle: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 54 46" width="54" height="46"><path d=" M 46.414 22 L 53.707 14.707 C 54.098 14.316 54.098 13.684 53.707 13.293 C 53.316 12.902 52.684 12.902 52.293 13.293 L 45 20.586 L 37.707 13.293 C 37.316 12.902 36.684 12.902 36.293 13.293 C 35.902 13.684 35.902 14.316 36.293 14.707 L 43.586 22 L 36.293 29.293 C 35.902 29.684 35.902 30.316 36.293 30.707 C 36.488 30.902 36.744 31 37 31 C 37.256 31 37.512 30.902 37.707 30.707 L 45 23.414 L 52.293 30.707 C 52.488 30.902 52.744 31 53 31 C 53.256 31 53.512 30.902 53.707 30.707 C 54.098 30.316 54.098 29.684 53.707 29.293 L 46.414 22 L 46.414 22 Z  M 13 31 C 13 31.553 12.553 32 12 32 C 11.447 32 11 31.553 11 31 L 11 27 C 11 26.447 11.447 26 12 26 C 12.553 26 13 26.447 13 27 L 13 31 L 13 31 L 13 31 Z  M 13 18 C 13 18.553 12.553 19 12 19 C 11.447 19 11 18.553 11 18 L 11 14 C 11 13.447 11.447 13 12 13 C 12.553 13 13 13.447 13 14 L 13 18 L 13 18 L 13 18 Z  M 26.894 0 C 26.343 0 25.797 0.153 25.315 0.444 C 25.269 0.471 25.225 0.503 25.185 0.537 L 11.634 12 L 1 12 C 0.447 12 0 12.447 0 13 L 0 32 C 0 32.553 0.447 33 1 33 L 11.61 33 L 25.153 45.436 C 25.203 45.482 25.257 45.522 25.314 45.556 C 25.797 45.847 26.343 46 26.894 46 C 28.606 46 30 44.584 30 42.844 L 30 3.156 C 30 1.416 28.606 0 26.894 0 L 26.894 0 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/></svg>',
            buttonAltText: "Озвучивание выключено",
            buttonClass: "special-version__button_square",
            value: "off",
            styleSheet: ""
          }, {
            buttonTittle: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 60 47.41" width="60" height="47.41"><path d=" M 13 32.063 C 13 32.616 12.553 33.063 12 33.063 C 11.447 33.063 11 32.616 11 32.063 L 11 28.063 C 11 27.51 11.447 27.063 12 27.063 C 12.553 27.063 13 27.51 13 28.063 L 13 32.063 L 13 32.063 L 13 32.063 L 13 32.063 L 13 32.063 Z  M 13 19.063 C 13 19.616 12.553 20.063 12 20.063 C 11.447 20.063 11 19.616 11 19.063 L 11 15.063 C 11 14.51 11.447 14.063 12 14.063 C 12.553 14.063 13 14.51 13 15.063 L 13 19.063 L 13 19.063 L 13 19.063 L 13 19.063 L 13 19.063 Z  M 52.026 23.563 C 52.026 15.216 46.71 7.803 38.797 5.116 C 38.275 4.939 37.706 5.219 37.528 5.742 C 37.351 6.264 37.631 6.833 38.154 7.011 C 45.255 9.422 50.026 16.074 50.026 23.564 C 50.026 31.047 45.264 37.7 38.177 40.118 C 37.655 40.296 37.375 40.864 37.554 41.388 C 37.696 41.803 38.084 42.065 38.5 42.065 C 38.607 42.065 38.716 42.048 38.823 42.011 C 46.721 39.316 52.026 31.903 52.026 23.563 L 52.026 23.563 L 52.026 23.563 Z  M 44.453 0.079 C 43.945 -0.134 43.358 0.1 43.141 0.609 C 42.926 1.118 43.163 1.705 43.672 1.921 C 52.376 5.614 58 14.11 58 23.563 C 58 33.34 52.106 41.943 42.985 45.477 C 42.47 45.677 42.214 46.256 42.414 46.771 C 42.567 47.167 42.946 47.41 43.347 47.41 C 43.467 47.41 43.589 47.389 43.708 47.343 C 53.605 43.506 60 34.172 60 23.563 C 60 13.305 53.897 4.087 44.453 0.079 L 44.453 0.079 Z  M 26.894 1.063 C 26.343 1.063 25.797 1.216 25.315 1.507 C 25.269 1.534 25.225 1.566 25.185 1.6 L 11.634 13.063 L 1 13.063 C 0.447 13.063 0 13.51 0 14.063 L 0 33.063 C 0 33.329 0.105 33.583 0.293 33.77 C 0.481 33.957 0.734 34.063 1 34.063 L 11.61 34.058 L 25.153 46.498 C 25.203 46.544 25.257 46.584 25.314 46.618 C 25.796 46.909 26.342 47.062 26.893 47.062 C 28.606 47.062 29.999 45.646 29.999 43.906 L 29.999 4.219 C 30 2.479 28.606 1.063 26.894 1.063 L 26.894 1.063 L 26.894 1.063 L 26.894 1.063 Z  M 43.026 23.563 C 43.026 17.591 39.017 12.261 33.277 10.601 C 32.747 10.45 32.193 10.753 32.039 11.285 C 31.886 11.815 32.191 12.37 32.723 12.523 C 37.612 13.936 41.027 18.476 41.027 23.563 C 41.027 28.65 37.612 33.19 32.723 34.603 C 32.192 34.756 31.886 35.311 32.039 35.841 C 32.166 36.279 32.565 36.564 33 36.564 C 33.092 36.564 33.185 36.551 33.277 36.525 C 39.018 34.864 43.026 29.534 43.026 23.563 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/></svg>',
            buttonAltText: "Озвучивание включено",
            buttonClass: "special-version__button_square",
            value: "on",
            styleSheet: ""
          }]
        }
      }], h = o || {
        specialVersionOn: "Включаю версию для слабовидящих",
        standardVersion: "переходим в обычную версию сайта",
        closeAdditional: "Закрыть дополнительные настройки",
        additionalSettings: "дополнительные настройки"
      };
      this.connectServiceClasses(p), console.log(p), this.init(r, p, h, t)
    }

    return o(e, [{
      key: "init", value: function (e, t, n, o) {
        new r.default(e, t, n, o)
      }
    }, {
      key: "connectServiceClasses", value: function (e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];
          n.service = this.getClassByName(n.serviceName)
        }
      }
    }, {
      key: "getClassByName", value: function (e) {
        for (var t = 0; t < this.services.length; t++) {
          var n = this.services[t];
          if (String(n.name) === String(e)) return n
        }
      }
    }]), e
  }();
  t.SpecialVersion = h
}, function (e, t, n) {
}, function (e, t, n) {
  var o = n(8);
  e.exports = "string" == typeof o ? o : o.toString()
}, function (e, t, n) {
  (e.exports = n(9)(!1)).push([e.i, "@charset \"UTF-8\";\n.js-special-version {\n  cursor: pointer; }\n\n.special-version {\n  box-sizing: border-box;\n  display: flex;\n  justify-content: flex-start;\n  align-items: stretch;\n  flex-direction: row;\n  background-color: #f8f8f8 !important;\n  border: 1px solid #000000;\n  padding: 10px;\n  flex-wrap: wrap;\n  position: relative;\n  z-index: 800; }\n  .special-version * {\n    box-sizing: border-box;\n    font-size: 14px !important;\n    font-family: \"Arial\", sans-serif !important; }\n  .special-version-loading:after {\n    content: '\\418\\43D\\438\\446\\438\\430\\43B\\438\\437\\430\\446\\438\\44F   \\432\\435\\440\\441\\438\\438   \\434\\43B\\44F   \\441\\43B\\430\\431\\43E\\432\\438\\434\\44F\\449\\438\\445...';\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-weight: bold;\n    position: fixed;\n    width: 500px;\n    padding: 15px;\n    max-width: 100%;\n    height: auto;\n    right: 0;\n    top: 0;\n    background: #fff;\n    border: 1px solid #000000;\n    z-index: 9999; }\n  .special-version__group {\n    border: none;\n    flex: 1;\n    display: flex;\n    justify-content: flex-start;\n    align-items: stretch;\n    flex-direction: row;\n    background: transparent !important; }\n    @media only screen and (max-width: 768px) {\n      .special-version__group {\n        flex-wrap: wrap; } }\n    .special-version__group-title {\n      display: flex;\n      justify-content: flex-start;\n      align-items: center;\n      flex-direction: row;\n      margin-right: 10px !important;\n      color: #000000; }\n    .special-version__group > * {\n      margin: 0; }\n    .special-version__group > .special-version__group {\n      margin: 5px;\n      flex-basis: auto; }\n      @media only screen and (max-width: 768px) {\n        .special-version__group > .special-version__group {\n          width: 100%;\n          flex-basis: 100%;\n          flex-wrap: nowrap; } }\n      .special-version__group > .special-version__group .special-version__button {\n        margin: -1px; }\n        .special-version__group > .special-version__group .special-version__button:first-child {\n          margin-left: 5px; }\n        .special-version__group > .special-version__group .special-version__button:last-child {\n          margin-right: 5px; }\n  .special-version__button {\n    display: flex;\n    flex-basis: 100%;\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n    margin: 5px 0;\n    border: 1px solid #000000 !important;\n    border-color: #000000 !important;\n    border-right: none;\n    border-radius: 0;\n    background: #ffffff;\n    height: 40px;\n    position: relative;\n    cursor: pointer;\n    white-space: nowrap;\n    color: #000000 !important; }\n    .special-version__button.size-small {\n      font-size: 14px !important; }\n    .special-version__button.size-middle {\n      font-size: 22px !important; }\n    .special-version__button.size-big {\n      font-size: 33px !important; }\n    .special-version__button.theme-bw {\n      background: #ffffff !important;\n      color: #000000 !important; }\n    .special-version__button.theme-wb {\n      background: #000000 !important;\n      color: #ffffff !important; }\n    .special-version__button.theme-bb {\n      background: #9dd1ff !important;\n      color: #195183 !important; }\n    .special-version__button.theme-bwl {\n      background: #f7f3d6 !important;\n      color: #4d4b43 !important; }\n    .special-version__button.theme-bg {\n      background: #3b2716 !important;\n      color: #a9e44d !important; }\n    .special-version__button svg {\n      width: 20px;\n      max-width: 20px;\n      max-height: 20px;\n      margin-right: 5px; }\n    .special-version__button_square {\n      width: 40px;\n      max-width: 40px; }\n      .special-version__button_square svg {\n        margin-right: 0; }\n    .special-version__button:hover, .special-version__button.state_active {\n      background: rgba(98, 163, 254, 0.28); }\n    .special-version__button:active, .special-version__button:focus {\n      outline: none; }\n    .special-version__button:active {\n      background: rgba(98, 163, 254, 0.47);\n      box-shadow: inset 2px 2px 4px 0 #9c9c9c; }\n    .special-version__button.state_active:after {\n      content: '';\n      display: block;\n      width: 100% !important;\n      height: 4px !important;\n      position: absolute !important;\n      bottom: -6px !important;\n      left: 0 !important;\n      background: #000000 !important; }\n    .special-version__button:first-child {\n      margin-left: 5px;\n      border-bottom-left-radius: 3px;\n      border-top-left-radius: 3px; }\n    .special-version__button:last-child {\n      margin-right: 5px;\n      border-bottom-right-radius: 3px;\n      border-top-right-radius: 3px;\n      border-right: 1px solid #000000; }\n  .special-version__additional-settings-block {\n    position: absolute;\n    top: 100%;\n    left: 0;\n    width: 100%;\n    height: 0;\n    border: 1px solid transparent !important;\n    border-bottom-color: #000000 !important;\n    z-index: 800;\n    margin: -1px;\n    background: #f8f8f8 !important;\n    transition: height 0.5s ease;\n    overflow: hidden;\n    flex-wrap: wrap; }\n    .special-version__additional-settings-block .special-version__group-title {\n      min-width: 110px; }\n    .special-version__additional-settings-block > .special-version__group {\n      flex-wrap: wrap;\n      padding: 3px; }\n      .special-version__additional-settings-block > .special-version__group .special-version__group .special-version__group {\n        width: auto; }\n    .special-version__additional-settings-block .special-version__group {\n      width: 100%; }\n    .special-version__additional-settings-block.state_show {\n      border-color: #000000 !important; }\n", ""])
}, function (e, t) {
  e.exports = function (e) {
    var t = [];
    return t.toString = function () {
      return this.map(function (t) {
        var n = function (e, t) {
          var n = e[1] || "", o = e[3];
          if (!o) return n;
          if (t && "function" == typeof btoa) {
            var i = (s = o, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(s)))) + " */"),
              r = o.sources.map(function (e) {
                return "/*# sourceURL=" + o.sourceRoot + e + " */"
              });
            return [n].concat(r).concat([i]).join("\n")
          }
          var s;
          return [n].join("\n")
        }(t, e);
        return t[2] ? "@media " + t[2] + "{" + n + "}" : n
      }).join("")
    }, t.i = function (e, n) {
      "string" == typeof e && (e = [[null, e, ""]]);
      for (var o = {}, i = 0; i < this.length; i++) {
        var r = this[i][0];
        "number" == typeof r && (o[r] = !0)
      }
      for (i = 0; i < e.length; i++) {
        var s = e[i];
        "number" == typeof s[0] && o[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(" + s[2] + ") and (" + n + ")"), t.push(s))
      }
    }, t
  }
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var o = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
    }

    return function (t, n, o) {
      return n && e(t.prototype, n), o && e(t, o), t
    }
  }(), i = s(n(1)), r = s(n(2));

  function s(e) {
    return e && e.__esModule ? e : {default: e}
  }

  var a = function () {
    function e(t, n, o, r) {
      var s = this;
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, e), this._setDocumentStyle(t), this.servicesList = n || [], this.lng = o || {
        lngCode: "ru",
        specialVersionOn: "Включаю версию для слабовидящих",
        standardVersion: "переходим в обычную версию сайта",
        closeAdditional: "Закрыть дополнительные настройки",
        additionalSettings: "дополнительные настройки"
      };
      var a = window.localStorage.getItem("specialVersion");
      this.ready = !1, this.services = {}, this.addedNodes = [], this.watcherTimer = null;
      for (var l = document.body.querySelectorAll(r || ".js-special-version"), c = 0; c < l.length; c++) l[c].addEventListener("click", function () {
        if (document.body.classList.add("special-version-loading"), s.nodes) {
          s.ready = !1, s.initServices(), s.uiBlock || s.init(), document.body.classList.remove("special-version-loading");
          try {
            s.services.textReadService.playText(s.lng.specialVersionOn)
          } catch (e) {
          }
          s.watcher()
        } else i.default.getNodes().then(function (e) {
          s.nodes = e, s.initServices(), s.uiBlock || s.init(), document.body.classList.remove("special-version-loading");
          try {
            s.services.textReadService.playText(s.lng.specialVersionOn)
          } catch (e) {
          }
          s.watcher()
        })
      }, !1);
      a && (document.body.classList.add("special-version-loading"), i.default.getNodes().then(function (e) {
        s.nodes = e, s.initServices(), s.init(), document.body.classList.remove("special-version-loading"), s.watcher()
      }))
    }

    return o(e, [{
      key: "initServices", value: function () {
        window.localStorage.setItem("specialVersion", "on");
        var e = i.default.getSettings();
        if (!e) {
          e = {};
          for (var t = 0; t < this.servicesList.length; t++) {
            var n = this.servicesList[t];
            e[n.params.cacheName] = n.params.params[0].value
          }
          i.default.setSettings(e)
        }
        if (Object.keys(e).forEach(function (t) {
          window.localStorage.setItem(t, e[t])
        }), !this.ready) {
          for (var o = 0; o < this.servicesList.length; o++) {
            var r = this.servicesList[o];
            this.services[r.serviceName] = new r.service(this.nodes, r.params)
          }
          this.ready = !0
        }
      }
    }, {
      key: "init", value: function () {
        document.body.classList.add("special-version-on"), this.uiBlock = e._createUiBlock(), this._createUi()
      }
    }, {
      key: "watcher", value: function () {
        var e = this;
        try {
          var t = new MutationObserver(function (t) {
            t.forEach(function (t) {
              t.addedNodes.length && i.default.cleanNodes(t.addedNodes).then(function (t) {
                for (var n = 0; n < t.length; n++) {
                  var o = t[n];
                  e.addedNodes.push(o)
                }
                clearTimeout(e.watcherTimer), e.watcherTimer = setTimeout(function () {
                  e.updateOnWatchEvent()
                }, 100)
              }), t.removedNodes.length && e.cleanNodesList(t.removedNodes).then(function () {
                clearTimeout(e.watcherTimer), e.watcherTimer = setTimeout(function () {
                  e.updateOnWatchEvent()
                }, 100)
              })
            })
          });
          t.observe(document.body, {attributes: !1, childList: !0, characterData: !1, subtree: !0})
        } catch (e) {
          console.error("no watcher detect the version do not watch the dom changes")
        }
      }
    }, {
      key: "updateOnWatchEvent", value: function () {
        for (var e = this, t = 0; t < e.addedNodes.length; t++) {
          var n = e.addedNodes[t];
          e.nodes.push(n)
        }
        e.addedNodes = [], Object.keys(e.services).forEach(function (t) {
          var n = e.services[t];
          n.processNodes(localStorage.getItem(n.settings.cacheName))
        }), console.log(e.nodes.length)
      }
    }, {
      key: "cleanNodesList", value: function (e) {
        var t = this;
        return new r.default(function (n, o) {
          var i = 0, r = 0, s = setInterval(function () {
            for (r = i; r < i + 10; r++) if (r < t.nodes.length) for (var o = 0; o < e.length; o++) {
              var a = e[o];
              t.nodes[r] === a && (t.nodes.splice(r, 1), r--)
            }
            i < t.nodes.length ? i = r : (clearInterval(s), n())
          }, 10)
        })
      }
    }, {
      key: "_createUi", value: function () {
        this._addServiceUi(this.uiBlock, 1), this._initSettingsButton(), this._createAdditionalMenu(), this._addServiceUi(this.uiBlock, 3), this._initResetButton();
        var e = this.services.PluginSpeechSystem;
        if (e) {
          var t = i.default.getSettings();
          e.enabled = "on" === t.speech, e.initReadNodes()
        }
      }
    }, {
      key: "_addServiceUi", value: function (e, t) {
        for (var n = 0; n < this.servicesList.length; n++) {
          var o = this.servicesList[n], i = this.services[o.serviceName];
          if (i && o.position === t) try {
            e.appendChild(i.createUi(o.groupName))
          } catch (e) {
          }
        }
      }
    }, {
      key: "_createAdditionalMenu", value: function () {
        var e = this;
        this._addServiceUi(this.additionalSettingsBlockInner, 2);
        var t = i.default.createGroup(), n = i.default.createGroup(),
          o = '<svg class="special-version__ignore"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 511 383" width="511" height="383"><path class="special-version__ignore"  d=" M 361.161 227.703 C 376.198 205.907 383.721 181.781 383.721 155.328 C 383.721 147.906 382.961 139.911 381.435 131.344 L 301.497 274.665 C 326.235 265.152 346.125 249.489 361.161 227.703 L 361.161 227.703 Z  M 158.456 298.936 C 108.97 276.667 68.33 240.981 36.547 191.873 C 65.478 146.952 101.737 113.355 145.324 91.09 C 133.714 110.882 127.907 132.296 127.907 155.327 C 127.907 175.692 132.568 195.007 141.897 213.282 C 151.224 231.556 164.167 246.682 180.727 258.674 L 158.456 298.936 L 158.456 298.936 L 158.456 298.936 L 158.456 298.936 Z  M 265.525 91.938 C 262.863 94.605 259.619 95.937 255.813 95.937 C 239.445 95.937 225.452 101.745 213.842 113.353 C 202.229 124.968 196.426 138.956 196.426 155.324 C 196.426 159.135 195.09 162.368 192.427 165.034 C 189.759 167.701 186.525 169.033 182.72 169.033 C 178.911 169.033 175.675 167.699 173.01 165.034 C 170.343 162.368 169.011 159.131 169.011 155.324 C 169.011 131.534 177.531 111.118 194.564 94.082 C 211.598 77.048 232.011 68.529 255.805 68.529 C 259.611 68.529 262.848 69.865 265.518 72.528 C 268.18 75.192 269.514 78.429 269.514 82.235 C 269.515 86.043 268.181 89.279 265.525 91.938 L 265.525 91.938 L 265.525 91.938 Z  M 372.872 30.272 C 373.063 29.894 373.152 29.037 373.152 27.704 C 373.152 24.467 371.63 21.902 368.581 19.989 C 368.013 19.609 366.158 18.514 363.013 16.702 C 359.875 14.897 356.873 13.135 354.024 11.42 C 351.17 9.707 348.035 7.948 344.602 6.14 C 341.176 4.331 338.227 2.856 335.756 1.713 C 333.277 0.572 331.567 0 330.615 0 C 327.189 0 324.523 1.525 322.621 4.569 L 307.208 32.265 C 289.892 29.031 272.757 27.411 255.817 27.411 C 204.616 27.411 157.413 40.357 114.204 66.242 C 70.998 92.131 34.836 127.436 5.711 172.165 C 1.903 178.07 0 184.637 0 191.87 C 0 199.101 1.903 205.671 5.711 211.568 C 22.459 237.641 42.303 260.964 65.239 281.517 C 88.175 302.078 113.25 318.535 140.468 330.913 C 132.093 345.186 127.906 353.469 127.906 355.755 C 127.906 359.18 129.43 361.843 132.476 363.745 C 155.695 377.074 168.446 383.73 170.732 383.73 C 174.154 383.73 176.821 382.201 178.724 379.155 L 192.714 353.749 C 212.891 317.782 242.962 263.818 282.936 191.871 C 322.908 119.922 352.886 66.056 372.872 30.272 L 372.872 30.272 L 372.872 30.272 Z  M 505.916 172.165 C 495.063 154.085 481.313 136.571 464.661 119.631 C 448.015 102.692 430.639 88.135 412.556 75.951 L 394.569 107.928 C 426.354 129.816 453.194 157.798 475.079 191.867 C 452.055 227.649 423.356 256.867 389.009 279.515 C 354.651 302.176 317.297 315.208 276.944 318.63 L 255.815 356.318 C 298.072 356.318 337.995 347.28 375.584 329.197 C 413.174 311.121 446.252 285.709 474.8 252.972 C 488.122 237.551 498.495 223.753 505.921 211.571 C 509.727 205.095 511.629 198.525 511.629 191.869 C 511.626 185.208 509.724 178.641 505.916 172.165 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/></svg><span class="special-version__ignore" >Обычная версия сайта</span>',
          r = i.default.createButton(o, this.lng.standardVersion);
        r.addEventListener("click", function () {
          e.reset()
        }, !1), n.appendChild(r), o = '<svg class="special-version__ignore" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 212 212" width="212" height="212"><path class="special-version__ignore" d=" M 131.196 106 L 206.782 30.414 C 213.74 23.456 213.74 12.176 206.782 5.219 C 199.824 -1.739 188.545 -1.739 181.587 5.219 L 106 80.806 L 30.413 5.218 C 23.455 -1.74 12.176 -1.74 5.218 5.218 C -1.739 12.176 -1.739 23.456 5.218 30.413 L 80.805 105.999 L 5.218 181.586 C -1.739 188.544 -1.739 199.824 5.218 206.781 C 12.176 213.739 23.455 213.739 30.413 206.781 L 106 131.194 L 181.587 206.781 C 188.544 213.739 199.824 213.739 206.782 206.781 C 213.74 199.823 213.74 188.544 206.782 181.586 L 131.196 106 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/></svg><span class="special-version__ignore" >' + this.lng.closeAdditional + "</span>", (r = i.default.createButton(o, this.lng.closeAdditional)).addEventListener("click", function () {
          e._triggerAdditionalBlock()
        }, !1), n.appendChild(r), t.appendChild(n), this.additionalSettingsBlockInner.appendChild(t)
      }
    }, {
      key: "_initResetButton", value: function () {
        var e = this;
        this.resetButtonGroup = i.default.createGroup();
        var t = i.default.createButton('<svg class="special-version__ignore"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 511 383" width="511" height="383"><path class="special-version__ignore"  d=" M 361.161 227.703 C 376.198 205.907 383.721 181.781 383.721 155.328 C 383.721 147.906 382.961 139.911 381.435 131.344 L 301.497 274.665 C 326.235 265.152 346.125 249.489 361.161 227.703 L 361.161 227.703 Z  M 158.456 298.936 C 108.97 276.667 68.33 240.981 36.547 191.873 C 65.478 146.952 101.737 113.355 145.324 91.09 C 133.714 110.882 127.907 132.296 127.907 155.327 C 127.907 175.692 132.568 195.007 141.897 213.282 C 151.224 231.556 164.167 246.682 180.727 258.674 L 158.456 298.936 L 158.456 298.936 L 158.456 298.936 L 158.456 298.936 Z  M 265.525 91.938 C 262.863 94.605 259.619 95.937 255.813 95.937 C 239.445 95.937 225.452 101.745 213.842 113.353 C 202.229 124.968 196.426 138.956 196.426 155.324 C 196.426 159.135 195.09 162.368 192.427 165.034 C 189.759 167.701 186.525 169.033 182.72 169.033 C 178.911 169.033 175.675 167.699 173.01 165.034 C 170.343 162.368 169.011 159.131 169.011 155.324 C 169.011 131.534 177.531 111.118 194.564 94.082 C 211.598 77.048 232.011 68.529 255.805 68.529 C 259.611 68.529 262.848 69.865 265.518 72.528 C 268.18 75.192 269.514 78.429 269.514 82.235 C 269.515 86.043 268.181 89.279 265.525 91.938 L 265.525 91.938 L 265.525 91.938 Z  M 372.872 30.272 C 373.063 29.894 373.152 29.037 373.152 27.704 C 373.152 24.467 371.63 21.902 368.581 19.989 C 368.013 19.609 366.158 18.514 363.013 16.702 C 359.875 14.897 356.873 13.135 354.024 11.42 C 351.17 9.707 348.035 7.948 344.602 6.14 C 341.176 4.331 338.227 2.856 335.756 1.713 C 333.277 0.572 331.567 0 330.615 0 C 327.189 0 324.523 1.525 322.621 4.569 L 307.208 32.265 C 289.892 29.031 272.757 27.411 255.817 27.411 C 204.616 27.411 157.413 40.357 114.204 66.242 C 70.998 92.131 34.836 127.436 5.711 172.165 C 1.903 178.07 0 184.637 0 191.87 C 0 199.101 1.903 205.671 5.711 211.568 C 22.459 237.641 42.303 260.964 65.239 281.517 C 88.175 302.078 113.25 318.535 140.468 330.913 C 132.093 345.186 127.906 353.469 127.906 355.755 C 127.906 359.18 129.43 361.843 132.476 363.745 C 155.695 377.074 168.446 383.73 170.732 383.73 C 174.154 383.73 176.821 382.201 178.724 379.155 L 192.714 353.749 C 212.891 317.782 242.962 263.818 282.936 191.871 C 322.908 119.922 352.886 66.056 372.872 30.272 L 372.872 30.272 L 372.872 30.272 Z  M 505.916 172.165 C 495.063 154.085 481.313 136.571 464.661 119.631 C 448.015 102.692 430.639 88.135 412.556 75.951 L 394.569 107.928 C 426.354 129.816 453.194 157.798 475.079 191.867 C 452.055 227.649 423.356 256.867 389.009 279.515 C 354.651 302.176 317.297 315.208 276.944 318.63 L 255.815 356.318 C 298.072 356.318 337.995 347.28 375.584 329.197 C 413.174 311.121 446.252 285.709 474.8 252.972 C 488.122 237.551 498.495 223.753 505.921 211.571 C 509.727 205.095 511.629 198.525 511.629 191.869 C 511.626 185.208 509.724 178.641 505.916 172.165 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/></svg>', this.lng.standardVersion);
        t.classList.add("special-version__button_square"), t.addEventListener("click", function () {
          e.reset()
        }, !1), this.resetButtonGroup.appendChild(t), this.uiBlock.appendChild(this.resetButtonGroup)
      }
    }, {
      key: "_initSettingsButton", value: function () {
        this.settingsGroup = i.default.createGroup(), this.settingsGroup.appendChild(this._createAdditionalSettingsBlock()), this.uiBlock.appendChild(this.settingsGroup)
      }
    }, {
      key: "reset", value: function () {
        var e = this;
        Object.keys(this.services).forEach(function (t) {
          e.services[t].processNodes("")
        }), document.body.classList.remove("special-version-on");
        try {
          this.services.PluginSpeechSystem.playText(this.lng.specialVersionOn), this.services.PluginSpeechSystem.playText(this.lng.standardVersion), this.services.PluginSpeechSystem.enabled = !1
        } catch (e) {
        }
        document.body.removeChild(this.uiBlock), this.uiBlock = null, window.localStorage.removeItem("specialVersion")
      }
    }, {
      key: "_createAdditionalSettingsBlock", value: function () {
        var e = this, t = document.createElement("div");
        t.classList.add("special-version__additional-settings-block"), t.classList.add("special-version__ignore"), this.additionalSettingsBlock = t, this.additionalSettingsBlockInner = i.default.createGroup(), this.additionalSettingsBlock.appendChild(this.additionalSettingsBlockInner), this.uiBlock.appendChild(t);
        var n = i.default.createButton('<svg class="special-version__ignore" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 21.589 21.137" width="21.589" height="21.137"><path class="special-version__ignore"  d=" M 18.622 8.145 L 18.077 6.85 C 18.077 6.85 19.345 3.989 19.233 3.879 L 17.554 2.24 C 17.438 2.127 14.576 3.433 14.576 3.433 L 13.256 2.9 C 13.256 2.9 12.09 0 11.93 0 L 9.561 0 C 9.396 0 8.317 2.906 8.317 2.906 L 6.999 3.441 C 6.999 3.441 4.077 2.199 3.965 2.31 L 2.289 3.951 C 2.173 4.064 3.507 6.867 3.507 6.867 L 2.962 8.16 C 2.962 8.16 0 9.301 0 9.455 L 0 11.777 C 0 11.939 2.969 12.996 2.969 12.996 L 3.514 14.287 C 3.514 14.287 2.246 17.146 2.357 17.256 L 4.035 18.899 C 4.149 19.01 7.012 17.704 7.012 17.704 L 8.333 18.239 C 8.333 18.239 9.499 21.137 9.66 21.137 L 12.029 21.137 C 12.193 21.137 13.273 18.231 13.273 18.231 L 14.595 17.696 C 14.595 17.696 17.511 18.938 17.624 18.829 L 19.302 17.188 C 19.419 17.073 18.082 14.272 18.082 14.272 L 18.626 12.979 C 18.626 12.979 21.589 11.836 21.589 11.68 L 21.589 9.36 C 21.59 9.199 18.622 8.145 18.622 8.145 Z  M 14.256 10.568 C 14.256 12.435 12.703 13.955 10.795 13.955 C 8.889 13.955 7.334 12.435 7.334 10.568 C 7.334 8.701 8.889 7.183 10.795 7.183 C 12.704 7.184 14.256 8.701 14.256 10.568 Z " /></svg><span class="special-version__ignore" > Дополнительно</span>', this.lng.additionalSettings);
        return n.addEventListener("click", function () {
          e._triggerAdditionalBlock()
        }), n
      }
    }, {
      key: "_triggerAdditionalBlock", value: function () {
        this.additionalSettingsBlock.classList.contains("state_show") ? (this.additionalSettingsBlock.classList.remove("state_show"), this.additionalSettingsBlock.style.height = 0) : (this.additionalSettingsBlock.classList.add("state_show"), this.additionalSettingsBlock.style.height = this.additionalSettingsBlockInner.offsetHeight + "px")
      }
    }, {
      key: "_setDocumentStyle", value: function (e) {
        if (e) this.style || (this.style = document.createElement("style"), this.style.innerHTML = e, document.head.appendChild(this.style)); else {
          try {
            document.head.removeChild(this.style)
          } catch (e) {
            console.log("%c there is no header styles add", "color: yellow; font-style: italic; background-color: grey; padding: 2px;")
          }
          this.style = null
        }
      }
    }], [{
      key: "_createUiBlock", value: function () {
        var e = document.body.firstChild, t = document.createElement("div");
        return t.classList.add("special-version"), t.classList.add("special-version__ignore"), document.body.insertBefore(t, e), t
      }
    }]), e
  }();
  t.default = a
}, function (e, t, n) {
  (function (e) {
    var o = void 0 !== e && e || "undefined" != typeof self && self || window, i = Function.prototype.apply;

    function r(e, t) {
      this._id = e, this._clearFn = t
    }

    t.setTimeout = function () {
      return new r(i.call(setTimeout, o, arguments), clearTimeout)
    }, t.setInterval = function () {
      return new r(i.call(setInterval, o, arguments), clearInterval)
    }, t.clearTimeout = t.clearInterval = function (e) {
      e && e.close()
    }, r.prototype.unref = r.prototype.ref = function () {
    }, r.prototype.close = function () {
      this._clearFn.call(o, this._id)
    }, t.enroll = function (e, t) {
      clearTimeout(e._idleTimeoutId), e._idleTimeout = t
    }, t.unenroll = function (e) {
      clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
    }, t._unrefActive = t.active = function (e) {
      clearTimeout(e._idleTimeoutId);
      var t = e._idleTimeout;
      t >= 0 && (e._idleTimeoutId = setTimeout(function () {
        e._onTimeout && e._onTimeout()
      }, t))
    }, n(12), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate
  }).call(this, n(3))
}, function (e, t, n) {
  (function (e, t) {
    !function (e, n) {
      "use strict";
      if (!e.setImmediate) {
        var o, i, r, s, a, l = 1, c = {}, u = !1, f = e.document, d = Object.getPrototypeOf && Object.getPrototypeOf(e);
        d = d && d.setTimeout ? d : e, "[object process]" === {}.toString.call(e.process) ? o = function (e) {
          t.nextTick(function () {
            h(e)
          })
        } : !function () {
          if (e.postMessage && !e.importScripts) {
            var t = !0, n = e.onmessage;
            return e.onmessage = function () {
              t = !1
            }, e.postMessage("", "*"), e.onmessage = n, t
          }
        }() ? e.MessageChannel ? ((r = new MessageChannel).port1.onmessage = function (e) {
          h(e.data)
        }, o = function (e) {
          r.port2.postMessage(e)
        }) : f && "onreadystatechange" in f.createElement("script") ? (i = f.documentElement, o = function (e) {
          var t = f.createElement("script");
          t.onreadystatechange = function () {
            h(e), t.onreadystatechange = null, i.removeChild(t), t = null
          }, i.appendChild(t)
        }) : o = function (e) {
          setTimeout(h, 0, e)
        } : (s = "setImmediate$" + Math.random() + "$", a = function (t) {
          t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(s) && h(+t.data.slice(s.length))
        }, e.addEventListener ? e.addEventListener("message", a, !1) : e.attachEvent("onmessage", a), o = function (t) {
          e.postMessage(s + t, "*")
        }), d.setImmediate = function (e) {
          "function" != typeof e && (e = new Function("" + e));
          for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
          var i = {callback: e, args: t};
          return c[l] = i, o(l), l++
        }, d.clearImmediate = p
      }

      function p(e) {
        delete c[e]
      }

      function h(e) {
        if (u) setTimeout(h, 0, e); else {
          var t = c[e];
          if (t) {
            u = !0;
            try {
              !function (e) {
                var t = e.callback, o = e.args;
                switch (o.length) {
                  case 0:
                    t();
                    break;
                  case 1:
                    t(o[0]);
                    break;
                  case 2:
                    t(o[0], o[1]);
                    break;
                  case 3:
                    t(o[0], o[1], o[2]);
                    break;
                  default:
                    t.apply(n, o)
                }
              }(t)
            } finally {
              p(e), u = !1
            }
          }
        }
      }
    }("undefined" == typeof self ? void 0 === e ? this : e : self)
  }).call(this, n(3), n(13))
}, function (e, t) {
  var n, o, i = e.exports = {};

  function r() {
    throw new Error("setTimeout has not been defined")
  }

  function s() {
    throw new Error("clearTimeout has not been defined")
  }

  function a(e) {
    if (n === setTimeout) return setTimeout(e, 0);
    if ((n === r || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
    try {
      return n(e, 0)
    } catch (t) {
      try {
        return n.call(null, e, 0)
      } catch (t) {
        return n.call(this, e, 0)
      }
    }
  }

  !function () {
    try {
      n = "function" == typeof setTimeout ? setTimeout : r
    } catch (e) {
      n = r
    }
    try {
      o = "function" == typeof clearTimeout ? clearTimeout : s
    } catch (e) {
      o = s
    }
  }();
  var l, c = [], u = !1, f = -1;

  function d() {
    u && l && (u = !1, l.length ? c = l.concat(c) : f = -1, c.length && p())
  }

  function p() {
    if (!u) {
      var e = a(d);
      u = !0;
      for (var t = c.length; t;) {
        for (l = c, c = []; ++f < t;) l && l[f].run();
        f = -1, t = c.length
      }
      l = null, u = !1, function (e) {
        if (o === clearTimeout) return clearTimeout(e);
        if ((o === s || !o) && clearTimeout) return o = clearTimeout, clearTimeout(e);
        try {
          o(e)
        } catch (t) {
          try {
            return o.call(null, e)
          } catch (t) {
            return o.call(this, e)
          }
        }
      }(e)
    }
  }

  function h(e, t) {
    this.fun = e, this.array = t
  }

  function v() {
  }

  i.nextTick = function (e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    c.push(new h(e, t)), 1 !== c.length || u || a(p)
  }, h.prototype.run = function () {
    this.fun.apply(null, this.array)
  }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = v, i.addListener = v, i.once = v, i.off = v, i.removeListener = v, i.removeAllListeners = v, i.emit = v, i.prependListener = v, i.prependOnceListener = v, i.listeners = function (e) {
    return []
  }, i.binding = function (e) {
    throw new Error("process.binding is not supported")
  }, i.cwd = function () {
    return "/"
  }, i.chdir = function (e) {
    throw new Error("process.chdir is not supported")
  }, i.umask = function () {
    return 0
  }
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var o = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
    }

    return function (t, n, o) {
      return n && e(t.prototype, n), o && e(t, o), t
    }
  }(), i = s(n(0)), r = s(n(1));

  function s(e) {
    return e && e.__esModule ? e : {default: e}
  }

  var a = function (e) {
    function t(e, n) {
      return function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, t), function (e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n))
    }

    return function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }(t, i.default), o(t, [{
      key: "processNodes", value: function (e) {
        (function e(t, n, o) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
            var r = Object.getPrototypeOf(t);
            return null === r ? void 0 : e(r, n, o)
          }
          if ("value" in i) return i.value;
          var s = i.get;
          return void 0 !== s ? s.call(o) : void 0
        })(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "processNodes", this).call(this, e), this.changeFontSize(e)
      }
    }, {
      key: "changeFontSize", value: function (e) {
        function t(e, t) {
          for (var n = function (n) {
            var o = e[n];
            r.default.setToParent(o, "fontSize", "", !0);
            var i = r.default.getStyle(o),
              s = parseInt(String(o.style.fontSize ? o.style.fontSize : i.fontSize).replace("px", ""));
            o.style.transition = "none", t ? (o.style.fontSize = s * t + "px", setTimeout(function () {
              r.default.setToParent(o, "fontSize", s * t + "px")
            }, 10)) : (o.style.fontSize = "", setTimeout(function () {
              r.default.setToParent(o, "fontSize", "")
            }, 10))
          }, o = 0; o < e.length; o++) n(o)
        }

        t(this.textNodes), t(this.textNodes, e)
      }
    }]), t
  }();
  t.default = a
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var o = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
    }

    return function (t, n, o) {
      return n && e(t.prototype, n), o && e(t, o), t
    }
  }(), i = s(n(0)), r = s(n(1));

  function s(e) {
    return e && e.__esModule ? e : {default: e}
  }

  var a = function (e) {
    function t(e, n) {
      return function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, t), function (e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n))
    }

    return function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }(t, i.default), o(t, [{
      key: "init", value: function () {
        var e = this.settings.fontList;
        if (e) {
          this.fontList = e, this.fontListIds = [], this.head = document.head || document.getElementsByTagName("head")[0];
          for (var t = [], n = 0; n < e.length; n++) t.push(this.fontList[n]);
          this.addFonts(t)
        }
      }
    }, {
      key: "processNodes", value: function (e) {
        (function e(t, n, o) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
            var r = Object.getPrototypeOf(t);
            return null === r ? void 0 : e(r, n, o)
          }
          if ("value" in i) return i.value;
          var s = i.get;
          return void 0 !== s ? s.call(o) : void 0
        })(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "processNodes", this).call(this, e), this.changeFontFamily(e)
      }
    }, {
      key: "addFonts", value: function (e) {
        for (var t = 0, n = 0; n < e.length; n++) {
          var o = e[n];
          if (o) {
            var i = document.createElement("link");
            i.rel = "stylesheet", i.type = "text/css";
            var r = "font" + t;
            i.id = r, this.fontListIds.push(r), t++, i.href = o, this.head.appendChild(i)
          }
        }
      }
    }, {
      key: "changeFontFamily", value: function (e) {
        function t(e, t) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.style.fontFamily = t, r.default.setToParent(o, "fontFamily", t)
          }
        }

        t(this.textNodes), t(this.textNodes, e)
      }
    }]), t
  }();
  t.default = a
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var o, i = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
    }

    return function (t, n, o) {
      return n && e(t.prototype, n), o && e(t, o), t
    }
  }(), r = n(0), s = (o = r) && o.__esModule ? o : {default: o};
  var a = function (e) {
    function t(e, n) {
      return function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, t), function (e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n))
    }

    return function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }(t, s.default), i(t, [{
      key: "processNodes", value: function (e) {
        (function e(t, n, o) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
            var r = Object.getPrototypeOf(t);
            return null === r ? void 0 : e(r, n, o)
          }
          if ("value" in i) return i.value;
          var s = i.get;
          return void 0 !== s ? s.call(o) : void 0
        })(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "processNodes", this).call(this, e), this.setScheme(e)
      }
    }, {
      key: "setScheme", value: function (e) {
        var t = this;

        function n(e, n) {
          document.body.style.backgroundColor = n ? t.settings.scheme[n][0] : "";
          for (var o = 0; o < e.length; o++) {
            var i = e[o];
            if (n) try {
              i.style.backgroundColor = t.settings.scheme[n][0], i.parentNode.style.backgroundColor = t.settings.scheme[n][0], i.style.color = t.settings.scheme[n][1], i.parentNode.style.color = t.settings.scheme[n][1]
            } catch (e) {
              console.log("%c no node found", "color: yellow; font-style: italic; background-color: grey; padding: 2px;")
            } else try {
              i.style.backgroundColor = "", i.parentNode.style.backgroundColor = "", i.style.color = "", i.parentNode.style.color = ""
            } catch (e) {
              console.log("%c no node found", "color: yellow; font-style: italic; background-color: grey; padding: 2px;")
            }
          }
        }

        n(this.textNodes), n(this.textNodes, e)
      }
    }]), t
  }();
  t.default = a
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var o = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
    }

    return function (t, n, o) {
      return n && e(t.prototype, n), o && e(t, o), t
    }
  }(), i = s(n(0)), r = s(n(1));

  function s(e) {
    return e && e.__esModule ? e : {default: e}
  }

  var a = function (e) {
    function t(e, n) {
      return function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, t), function (e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n))
    }

    return function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }(t, i.default), o(t, [{
      key: "processNodes", value: function (e) {
        (function e(t, n, o) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
            var r = Object.getPrototypeOf(t);
            return null === r ? void 0 : e(r, n, o)
          }
          if ("value" in i) return i.value;
          var s = i.get;
          return void 0 !== s ? s.call(o) : void 0
        })(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "processNodes", this).call(this, e), this.changeInterval(e)
      }
    }, {
      key: "changeInterval", value: function (e) {
        function t(e, t) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            t ? (o.style.lineHeight = t, r.default.setToParent(o, "lineHeight", t)) : (o.style.lineHeight = "", r.default.setToParent(o, "lineHeight", ""))
          }
        }

        t(this.textNodes), t(this.textNodes, e)
      }
    }]), t
  }();
  t.default = a
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var o = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
    }

    return function (t, n, o) {
      return n && e(t.prototype, n), o && e(t, o), t
    }
  }(), i = s(n(0)), r = s(n(1));

  function s(e) {
    return e && e.__esModule ? e : {default: e}
  }

  var a = function (e) {
    function t(e, n) {
      return function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, t), function (e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n))
    }

    return function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }(t, i.default), o(t, [{
      key: "processNodes", value: function (e) {
        (function e(t, n, o) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
            var r = Object.getPrototypeOf(t);
            return null === r ? void 0 : e(r, n, o)
          }
          if ("value" in i) return i.value;
          var s = i.get;
          return void 0 !== s ? s.call(o) : void 0
        })(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "processNodes", this).call(this, e), this.changeKerning(e)
      }
    }, {
      key: "changeKerning", value: function (e) {
        function t(e, t) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            t ? (o.style.letterSpacing = t + "px", r.default.setToParent(o, "letterSpacing", t + "px")) : (o.style.letterSpacing = "", r.default.setToParent(o, "letterSpacing", ""))
          }
        }

        t(this.textNodes), t(this.textNodes, e)
      }
    }]), t
  }();
  t.default = a
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var o, i = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
    }

    return function (t, n, o) {
      return n && e(t.prototype, n), o && e(t, o), t
    }
  }(), r = n(0), s = (o = r) && o.__esModule ? o : {default: o};
  var a = function (e) {
    function t(e, n) {
      return function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, t), function (e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n))
    }

    return function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }(t, s.default), i(t, [{
      key: "init", value: function () {
        this.nodes = [];
        var e = t._findImages(), n = this._findBgImages(), o = t._findSvgImg();
        this._cacheBlocks(e), this._cacheBlocks(n), this._cacheBlocks(o)
      }
    }, {
      key: "_findBgImages", value: function () {
        for (var e = this.textNodes, t = [], n = 0; n < e.length; n++) {
          var o = e[n];
          !(String(o.getAttribute("style")).indexOf("background-image") + 1) || t.push(o)
        }
        return t
      }
    }, {
      key: "_cacheBlocks", value: function (e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];
          this.nodes.push(n)
        }
      }
    }, {
      key: "hideImages", value: function () {
        this.showImages();
        for (var e = 0; e < this.nodes.length; e++) {
          this.nodes[e].style.display = "none"
        }
      }
    }, {
      key: "showImages", value: function () {
        for (var e = 0; e < this.nodes.length; e++) {
          var t = this.nodes[e];
          t.style.display = "", t.style.filter = ""
        }
      }
    }, {
      key: "setToMonochrome", value: function () {
        this.showImages();
        for (var e = 0; e < this.nodes.length; e++) {
          this.nodes[e].style.filter = "grayscale(100%)"
        }
      }
    }, {
      key: "changeImg", value: function (e) {
        var t = void 0;
        t = e.value ? e.value : e, 2 === parseInt(t) ? this.hideImages() : 3 === parseInt(t) ? (this.showImages(), this.setToMonochrome()) : this.showImages()
      }
    }, {
      key: "processNodes", value: function (e) {
        (function e(t, n, o) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
            var r = Object.getPrototypeOf(t);
            return null === r ? void 0 : e(r, n, o)
          }
          if ("value" in i) return i.value;
          var s = i.get;
          return void 0 !== s ? s.call(o) : void 0
        })(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "processNodes", this).call(this, e), this.changeImg(e)
      }
    }], [{
      key: "_findImages", value: function () {
        return document.getElementsByTagName("img")
      }
    }, {
      key: "_findSvgImg", value: function () {
        return document.getElementsByTagName("svg")
      }
    }]), t
  }();
  t.default = a
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var o, i = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
    }

    return function (t, n, o) {
      return n && e(t.prototype, n), o && e(t, o), t
    }
  }(), r = n(0), s = (o = r) && o.__esModule ? o : {default: o};
  var a = function (e) {
    function t(e, n) {
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, t);
      var o = function (e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
      return o.button = "", o.enabled = "on" === o.value, o.voice = {}, o.hasLang = !1, o.hasSpeech = !1, "speechSynthesis" in window && (o.hasSpeech = !0, window.addEventListener("load", function () {
        o.getvoices()
      }, !1), window.speechSynthesis.onvoiceschanged = function () {
        o.getvoices()
      }), o
    }

    return function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }(t, s.default), i(t, [{
      key: "initReadNodes", value: function () {
        var e = this;
        document.addEventListener("selectionchange", function () {
          e.playText(e.getSelectionHtml())
        });
        for (var t = document.querySelectorAll(".js-special-version__button"), n = function (n) {
          var o = t[n];
          o.addEventListener("click", function () {
            var t = o.getAttribute("data-read");
            e.playText(t)
          }, !1)
        }, o = 0; o < t.length; o++) n(o)
      }
    }, {
      key: "getvoices", value: function () {
        for (var e = window.speechSynthesis.getVoices(), t = 0; t < e.length; t++) {
          new RegExp(this.settings.lngCode, "g").test(e[t].lang) && (this.hasLang = !0, this.voice.name = e[t].name)
        }
        console.log(this.voice.name), this.hasLang || (this.button.style.display = "none")
      }
    }, {
      key: "createUi", value: function (e) {
        return this.hasSpeech && (this.button = function e(t, n, o) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
            var r = Object.getPrototypeOf(t);
            return null === r ? void 0 : e(r, n, o)
          }
          if ("value" in i) return i.value;
          var s = i.get;
          return void 0 !== s ? s.call(o) : void 0
        }(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "createUi", this).call(this, e)), this.button
      }
    }, {
      key: "playText", value: function (e, t) {
        var n = this, o = void 0;
        if (this.enabled) {
          window.speechSynthesis.cancel();
          var i = new SpeechSynthesisUtterance;
          i.voice = speechSynthesis.getVoices().filter(function (e) {
            return e.name === n.voice.name
          })[0], i.text = e, window.speechSynthesis.speak(i), i.onstart = function () {
            r()
          }, i.onend = function () {
            clearTimeout(o), t && t()
          }
        }

        function r() {
          window.speechSynthesis.resume(), o = setTimeout(r, 1e3)
        }
      }
    }, {
      key: "callback", value: function (e) {
        var t = this;
        "on" === e.value ? (this.enabled = !0, this.playText(e.buttonAltText)) : this.playText(e.buttonAltText, function () {
          t.enabled = "on" === e.value
        })
      }
    }, {
      key: "getSelectionHtml", value: function () {
        var e = "";
        if (void 0 !== window.getSelection) {
          var t = window.getSelection();
          if (t.rangeCount) {
            for (var n = document.createElement("div"), o = 0, i = t.rangeCount; o < i; ++o) n.appendChild(t.getRangeAt(o).cloneContents());
            e = n.innerText
          }
        } else void 0 !== document.selection && "Text" === document.selection.type && (e = document.selection.createRange().htmlText);
        return e
      }
    }]), t
  }();
  t.default = a
}]);
