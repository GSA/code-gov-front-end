'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

(function () {
  /*global HTMLElement*/
  var SimpleBanner =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(SimpleBanner, _HTMLElement);

    function SimpleBanner() {
      _classCallCheck(this, SimpleBanner);

      // establish prototype chain
      return _possibleConstructorReturn(this, _getPrototypeOf(SimpleBanner).call(this));
    }

    _createClass(SimpleBanner, [{
      key: "connectedCallback",
      // fires after the element has been attached to the DOM
      value: function connectedCallback() {
        this.update();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'options') {
          this.update();
        }
      }
    }, {
      key: "update",
      value: function update() {
        this.innerHTML = "\n        <div class=\"banner\" style=\"background-image: url('".concat(this.getAttribute('image'), "')\">\n          <div class=\"banner-content\">\n            <div class=\"banner-title\">").concat(this.getAttribute('title'), "</div>\n          </div>\n        </div>\n      ");
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['image', 'title'];
      }
    }]);

    return SimpleBanner;
  }(_wrapNativeSuper(HTMLElement)); // let the browser know about the custom element

  /*global customElements*/


  customElements.define('simple-banner', SimpleBanner);
})();
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

(function () {
  /*global HTMLElement*/
  var FilterBox =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(FilterBox, _HTMLElement);

    function FilterBox() {
      var _this;

      _classCallCheck(this, FilterBox);

      // establish prototype chain
      _this = _possibleConstructorReturn(this, _getPrototypeOf(FilterBox).call(this));
      _this.internalId = Math.random().toString(36).substring(2, 7);
      return _this;
    }

    _createClass(FilterBox, [{
      key: "setClassName",
      value: function setClassName(className, newValue) {
        if (newValue) {
          this.className = (this.className.replace(className, "") + " " + className).trim();
        } else {
          this.className = this.className.replace(className, "").trim();
        }
      }
    }, {
      key: "connectedCallback",
      // fires after the element has been attached to the DOM
      value: function connectedCallback() {
        this.update();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'options') {
          this.update();
        }
      }
    }, {
      key: "getHTML",
      value: function getHTML() {
        var _this2 = this;

        return "\n        <div class=\"title-bar\">".concat(this.title, "<i class=\"icon icon-angle-down\"></i><i class=\"icon icon-angle-up\"></i></div>\n        <ul class=\"options\">\n          ").concat(this.options.map(function (option, index) {
          var className = "";
          if (index >= 4 && _this2.showAll) className += "hideOnCollapsed";
          if (option.checked) className += " checked";
          return '<li class="' + className + '"><input' + (option.checked ? ' checked' : '') + ' type="checkbox" id="' + _this2.internalId + option.value + '" value="' + option.value + '"><label for="' + _this2.internalId + option.value + '"><span>' + option.name + '</span></label></li>';
        }).join("\n"), "\n          ").concat(this.options.length > 4 ? '<li><span class="showMore">Show more</span><span class="showLess">Show less</span></li>' : '', "\n        </ul>\n      ");
      }
    }, {
      key: "parseOptions",
      value: function parseOptions() {
        var rawOptions = this.getAttribute('options');
        var parsedOptions = null;

        try {
          parsedOptions = JSON.parse(rawOptions);
        } catch (error) {
          console.error("[filter-box] failed to parse rawOptions:", rawOptions);

          if (rawOptions.contains("object")) {
            console.error('It seems that you might have put in an object.  Make sure to convert your object to a JSON string with JSON.stringify');
          }

          throw error;
        }

        if (parsedOptions) {
          this.options = parsedOptions.map(function (option) {
            if (_typeof(option) === "object" && option.name && option.value) {
              return {
                name: option.name,
                value: option.value,
                checked: option.checked ? true : false
              };
            } else {
              return {
                name: option,
                value: option,
                checked: false
              };
            }
          });
        } else {
          this.options = [];
        }
      }
    }, {
      key: "update",
      value: function update() {
        var _this3 = this;

        this.showAll = true;
        this.innerHTML = ""; // creating a container for the editable-list component

        var container = document.createElement('div');
        this.title = this.getAttribute('title');
        this.parseOptions();
        container.className = "filter-box";
        container.innerHTML = this.getHTML();
        this.appendChild(container);
        this.querySelector(".icon-angle-down").addEventListener('click', function (_) {
          _this3.setClassName('collapsed', false);
        }, false);
        this.querySelector(".icon-angle-up").addEventListener('click', function (_) {
          _this3.setClassName('collapsed', true);
        }, false);
        Array.prototype.slice.call(this.querySelectorAll('.showLess, .showMore')).forEach(function (tag) {
          tag.addEventListener('click', function (_) {
            _this3.toggleState();
          }, false);
        });
        Array.prototype.slice.call(this.querySelectorAll('input')).forEach(function (tag) {
          tag.addEventListener('change', function (event) {
            var li = event.target.parentElement;

            if (event.target.checked) {
              li.className = (li.className.replace("checked", "") + " checked").trim();
            } else {
              li.className = li.className.replace("checked", "").trim();
            }

            var newEvent = new CustomEvent('change', {
              target: _this3
            });

            _this3.dispatchEvent(newEvent);
          }, false);
        });
        /*
        addElementButton.addEventListener('click', this.addListItem, false);
        */

        /*global CustomEvent*/

        var event = new CustomEvent('change', {});
        this.dispatchEvent(event);
      }
    }, {
      key: "toggleState",
      value: function toggleState() {
        this.showAll = !this.showAll;
      }
    }, {
      key: "collapsed",
      get: function get() {
        return this.className.indexOf("collapsed") > -1;
      },
      set: function set(newValue) {
        this.setClassName("collapsed", newValue);
      }
    }, {
      key: "showAll",
      get: function get() {
        return this.className.indexOf("showAll") > -1;
      },
      set: function set(newValue) {
        this.setClassName("showAll", newValue);
      }
    }, {
      key: "values",
      get: function get() {
        return Array.from(this.querySelectorAll(":checked")).map(function (tag) {
          return tag.value;
        });
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['options'];
      }
    }]);

    return FilterBox;
  }(_wrapNativeSuper(HTMLElement)); // let the browser know about the custom element

  /*global customElements*/


  customElements.define('filter-box', FilterBox);
})();
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/* global HTMLElement */
var FilterTag =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(FilterTag, _HTMLElement);

  function FilterTag() {
    _classCallCheck(this, FilterTag);

    return _possibleConstructorReturn(this, _getPrototypeOf(FilterTag).call(this));
  }

  _createClass(FilterTag, [{
    key: "connectedCallback",
    // fires after the element has been attached to the DOM
    value: function connectedCallback() {
      this.update();
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === 'title') {
        this.update();
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.innerHTML = "\n      <div class=\"filter-tag\">\n        <div class=\"filter-tag-title\">".concat(this.getAttribute('title'), "</div>\n      </div>\n    ");
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['title'];
    }
  }]);

  return FilterTag;
}(_wrapNativeSuper(HTMLElement));
/* global customElements */


customElements.define('filter-tag', FilterTag);
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

(function () {
  var smallUsFlagURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAAG1BMVEUdM7EeNLIeM7HgQCDaPh/bPh/bPx/////bPyBEby41AAAAUElEQVQI123MNw4CABDEwD3jC/9/MQ1BQrgeOSkIqYe2o2FZtthXgQLgbHVMZdlsfUQFQnHtjP1+8BUhBDKOqtmfot6ojqPzR7TjdU+f6vkED+IDPhTBcMAAAAAASUVORK5CYII=";
  var dotGovIconURI = 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NCA1NCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMyMzc4YzM7fS5jbHMtMntmaWxsOm5vbmU7c3Ryb2tlOiMwMDVlYTI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5kb3QgZ292IGljb248L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTM2LjUsMjAuOTF2MS4zNkgzNS4xNWEwLjcxLDAuNzEsMCwwLDEtLjczLjY4SDE4LjIzYTAuNzEsMC43MSwwLDAsMS0uNzMtMC42OEgxNi4xNFYyMC45MWwxMC4xOC00LjA3Wm0wLDEzLjU3djEuMzZIMTYuMTRWMzQuNDhhMC43MSwwLjcxLDAsMCwxLC43My0wLjY4aDE4LjlBMC43MSwwLjcxLDAsMCwxLDM2LjUsMzQuNDhaTTIxLjU3LDIzLjYydjguMTRoMS4zNlYyMy42MmgyLjcxdjguMTRIMjdWMjMuNjJoMi43MXY4LjE0aDEuMzZWMjMuNjJoMi43MXY4LjE0aDAuNjNhMC43MSwwLjcxLDAsMCwxLC43My42OHYwLjY4SDE3LjVWMzIuNDVhMC43MSwwLjcxLDAsMCwxLC43My0wLjY4aDAuNjNWMjMuNjJoMi43MVoiLz48Y2lyY2xlIGNsYXNzPSJjbHMtMiIgY3g9IjI3IiBjeT0iMjcuMTIiIHI9IjI2Ii8+PC9zdmc+';
  var httpsIconURI = 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NCA1NCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM3MTlmMmE7fS5jbHMtMntmaWxsOm5vbmU7c3Ryb2tlOiM1MzgyMDA7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5odHRwcyBpY29uPC90aXRsZT48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zNC43MiwzNC44NGExLjI5LDEuMjksMCwwLDEtMS4yOSwxLjI5SDIwLjU3YTEuMjksMS4yOSwwLDAsMS0xLjI5LTEuMjlWMjcuMTJhMS4yOSwxLjI5LDAsMCwxLDEuMjktMS4yOUgyMVYyMy4yNmE2LDYsMCwwLDEsMTIsMHYyLjU3aDAuNDNhMS4yOSwxLjI5LDAsMCwxLDEuMjksMS4yOXY3LjcyWm0tNC4yOS05VjIzLjI2YTMuNDMsMy40MywwLDAsMC02Ljg2LDB2Mi41N2g2Ljg2WiIvPjxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iMjciIGN5PSIyNy4xMiIgcj0iMjYiLz48L3N2Zz4=';
  /*global HTMLElement*/

  var GovBanner =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(GovBanner, _HTMLElement);

    function GovBanner() {
      var _this;

      _classCallCheck(this, GovBanner);

      // establish prototype chain
      _this = _possibleConstructorReturn(this, _getPrototypeOf(GovBanner).call(this));
      _this.toggleAccordion = _this.toggleAccordion.bind(_assertThisInitialized(_this));
      _this.isCollapsed = true;
      return _this;
    } // fires after the element has been attached to the DOM


    _createClass(GovBanner, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.render();
        this.postRenderActions();
      }
    }, {
      key: "postRenderActions",
      value: function postRenderActions() {
        this.buttonToggle = this.querySelector('button.usa-accordion__button');
        this.bannerHeader = this.querySelector('header.usa-banner__header');
        this.accordionContent = this.querySelector('div.usa-banner__content');
        this.buttonToggle.addEventListener('click', this.toggleAccordion);
      }
    }, {
      key: "toggleAccordion",
      value: function toggleAccordion() {
        if (this.buttonToggle.getAttribute('aria-expanded') === 'true') {
          this.collapseBanner();
        } else {
          this.expandBanner();
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.buttonToggle.removeEventListener('click', this.toggleAccordion);
      }
    }, {
      key: "expandBanner",
      value: function expandBanner() {
        this.accordionContent.removeAttribute('hidden');
        this.buttonToggle.setAttribute('aria-expanded', 'true');
        this.bannerHeader.classList.add('usa-banner__header--expanded');
        this.isCollapsed = false;
      }
    }, {
      key: "collapseBanner",
      value: function collapseBanner() {
        this.accordionContent.setAttribute('hidden', '');
        this.buttonToggle.setAttribute('aria-expanded', 'false');
        this.bannerHeader.classList.remove('usa-banner__header--expanded');
        this.isCollapsed = true;
      }
    }, {
      key: "render",
      value: function render() {
        var isCollapsed = this.isCollapsed;
        var hiddenString = isCollapsed ? 'hidden' : '';
        var ariaExpandedString = isCollapsed ? 'false' : 'true';
        this.innerHTML = "\n      <div class=\"usa-banner\">\n        <div class=\"usa-accordion\">\n            <header class=\"usa-banner__header\">\n                <div class=\"usa-banner__inner\">\n                    <div class=\"grid-col-auto\">\n                        <img class=\"usa-banner__header-flag\" src=".concat(smallUsFlagURI, " alt=\"U.S. flag\">\n                    </div>\n                    <div class=\"grid-col-fill tablet:grid-col-auto\">\n                        <p class=\"usa-banner__header-text\">An official website of the United States government</p>\n                        <p class=\"usa-banner__header-action\" aria-hidden=\"true\">Here\u2019s how you know</p>\n                    </div>\n                    <button class=\"usa-accordion__button usa-banner__button\" aria-expanded=").concat(ariaExpandedString, " aria-controls=\"gov-banner\">\n                      <span class=\"usa-banner__button-text\">Here\u2019s how you know</span>\n                    </button>\n                </div>\n            </header>\n            <div class=\"usa-banner__content usa-accordion__content\" id=\"gov-banner\" ").concat(hiddenString, ">\n                <div class=\"grid-row grid-gap-lg\">\n                    <div class=\"usa-banner__guidance tablet:grid-col-6\">\n                        <img class=\"usa-banner__icon usa-media-block__img\" src=").concat(dotGovIconURI, " alt=\"Dot gov\">\n                        <div class=\"usa-media-block__body\">\n                            <p>\n                                <strong>The .gov means it\u2019s official.</strong>\n                                <br> Federal government websites often end in .gov or .mil. Before sharing sensitive information, make sure you\u2019re on a federal government site.\n                            </p>\n                        </div>\n                    </div>\n                    <div class=\"usa-banner__guidance tablet:grid-col-6\">\n                        <img class=\"usa-banner__icon usa-media-block__img\" src=").concat(httpsIconURI, " alt=\"Https\">\n                        <div class=\"usa-media-block__body\">\n                            <p>\n                                <strong>The site is secure.</strong>\n                                <br> The <strong>https://</strong> ensures that you are connecting to the official website and that any information you provide is encrypted and transmitted securely.\n                            </p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n      </div>\n      ");
      }
    }]);

    return GovBanner;
  }(_wrapNativeSuper(HTMLElement)); // let the browser know about the custom element

  /*global customElements*/


  customElements.define('gov-banner', GovBanner);
})();
"use strict";
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

(function () {
  /*global HTMLElement*/
  var MobileMenuButton =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(MobileMenuButton, _HTMLElement);

    function MobileMenuButton() {
      _classCallCheck(this, MobileMenuButton);

      // establish prototype chain
      return _possibleConstructorReturn(this, _getPrototypeOf(MobileMenuButton).call(this));
    }

    _createClass(MobileMenuButton, [{
      key: "connectedCallback",
      // fires after the element has been attached to the DOM
      value: function connectedCallback() {
        this.innerHTML = "\n        <div class=\"mobile-menu-button\" onClick=\"this.parentElement.toggleState()\">\n          <div class=\"icon\"></div>\n        </div>\n      ";
        this.icon = this.querySelector('.icon');
        this.update();
      }
    }, {
      key: "getAttr",
      value: function getAttr() {
        this.open = [true, 'true', 'True'].includes(this.getAttribute('open'));
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'open') {
          this.update();
        }
      }
    }, {
      key: "toggleState",
      value: function toggleState() {
        console.log("toggling state");
        this.open = !this.open;
        this.update();
      }
    }, {
      key: "update",
      value: function update() {
        if (this.icon) {
          this.getAttr();

          if (this.open) {
            this.icon.className = 'icon icon-close';
          } else {
            this.icon.className = 'icon icon-menu';
          }
        }
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['open'];
      }
    }]);

    return MobileMenuButton;
  }(_wrapNativeSuper(HTMLElement)); // let the browser know about the custom element

  /*global customElements*/


  customElements.define('mobile-menu-button', MobileMenuButton);
})();
'use strict';
/*global HTMLElement*/

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var QualityTag =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(QualityTag, _HTMLElement);

  function QualityTag() {
    _classCallCheck(this, QualityTag);

    // establish prototype chain
    return _possibleConstructorReturn(this, _getPrototypeOf(QualityTag).call(this));
  }

  _createClass(QualityTag, [{
    key: "connectedCallback",
    // fires after the element has been attached to the DOM
    value: function connectedCallback() {
      this.update();
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === 'score') {
        this.update();
      }
    }
  }, {
    key: "update",
    value: function update() {
      var rounded = Math.round(Number(this.getAttribute('score')) * 10) / 10;
      var category = '';

      if (rounded > 0 && rounded < 4) {
        category = 'low';
      } else if (rounded >= 4 && rounded < 6) {
        category = 'medium';
      } else if (rounded >= 6) {
        category = 'high';
      } else {
        category = '';
      }

      this.innerHTML = "<div aria-label=\"".concat(category, "\" class=\"corner-tag ").concat(category, "\"><div class=\"corner-tag-value\">").concat(rounded, "</div></div>");
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['score'];
    }
  }]);

  return QualityTag;
}(_wrapNativeSuper(HTMLElement)); // let the browser know about the custom element

/*global customElements*/


customElements.define('quality-tag', QualityTag);

