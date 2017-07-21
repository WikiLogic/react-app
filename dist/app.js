/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib/React\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Claim;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _StatusIndicator = __webpack_require__(4);

var _StatusIndicator2 = _interopRequireDefault(_StatusIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Each Claim in the list of search results
 */

function Claim(props) {
  var _this = this;

  var cssClass = 'claim';
  if (props.isSelected) {
    cssClass = cssClass + ' claim--selected';
  }

  if (typeof this.props.claim.labels !== 'undefined' && this.props.claim.labels.includes('Axiom')) {
    cssClass = cssClass + ' claim--axiom';
  }

  return _react2.default.createElement(
    'button',
    { className: cssClass, onClick: function onClick() {
        return _this.props.handleClick(_this.props.claim);
      } },
    _react2.default.createElement(
      'div',
      { className: 'claim__body' },
      _react2.default.createElement(
        'div',
        { className: 'claim__status-circle' },
        _react2.default.createElement(_StatusIndicator2.default, { state: this.props.claim.probability, type: 'circle' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'claim__text' },
        this.props.claim.text
      )
    )
  );
}

Claim.propTypes = {
  isSelected: _react2.default.PropTypes.bool.isRequired
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SearchIconSvg = __webpack_require__(17);

var _SearchIconSvg2 = _interopRequireDefault(_SearchIconSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Listens to the search form for input and submission
 * Publishes search submissions (for text or number searches)
 * Hands the submission event back up to the parent
 */

var SearchInput = function (_React$Component) {
  _inherits(SearchInput, _React$Component);

  function SearchInput(props) {
    _classCallCheck(this, SearchInput);

    var _this = _possibleConstructorReturn(this, (SearchInput.__proto__ || Object.getPrototypeOf(SearchInput)).call(this, props));

    _this.state = { value: '' };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(SearchInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.inputValue !== '') {
        this.setState({
          value: nextProps.inputValue
        });
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      this.props.submissionHandler(this.state.value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { className: 'search-form', onSubmit: this.handleSubmit },
        _react2.default.createElement('input', {
          className: 'search-form__input',
          type: 'text',
          placeholder: this.props.placeholder,
          value: this.state.value,
          onChange: this.handleChange
        }),
        _react2.default.createElement(
          'button',
          { className: 'search-form__submit', onClick: this.handleSubmit },
          _react2.default.createElement(_SearchIconSvg2.default, null)
        )
      );
    }
  }]);

  return SearchInput;
}(_react2.default.Component);

exports.default = SearchInput;


SearchInput.propTypes = {
  inputValue: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object).isRequired,
  submissionHandler: _react2.default.PropTypes.func.isRequired,
  placeholder: _react2.default.PropTypes.string.isRequired
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Claim = __webpack_require__(1);

var _Claim2 = _interopRequireDefault(_Claim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* An argument group
 */

var Argument = function (_React$Component) {
  _inherits(Argument, _React$Component);

  function Argument(props) {
    _classCallCheck(this, Argument);

    var _this = _possibleConstructorReturn(this, (Argument.__proto__ || Object.getPrototypeOf(Argument)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Argument, [{
    key: 'handleClick',
    value: function handleClick(premis) {
      this.props.premisClickHandler(premis);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // loop through the premises in this argument
      var premises = this.props.argumentObject.premises.map(function (premis) {
        var isSelected = premis.id === _this2.props.highlightedPremisId;

        return _react2.default.createElement(
          'div',
          { className: 'argument__premis', key: premis.id },
          _react2.default.createElement(_Claim2.default, {
            claim: premis,
            isSelected: isSelected,
            handleClick: function handleClick() {
              _this2.handleClick(premis);
            }
          })
        );
      });

      return _react2.default.createElement(
        'div',
        { className: 'argument argument--' + this.props.argumentObject.type },
        _react2.default.createElement(
          'div',
          { className: 'argument__header' },
          this.props.argumentObject.type
        ),
        _react2.default.createElement(
          'div',
          { className: 'argument__body' },
          premises
        )
      );
    }
  }]);

  return Argument;
}(_react2.default.Component);

exports.default = Argument;


Argument.propTypes = {
  premisClickHandler: _react2.default.PropTypes.func.isRequired,
  argumentObject: _react2.default.PropTypes.shape({
    type: _react2.default.PropTypes.string.isRequired,
    premises: _react2.default.PropTypes.array.isRequired
  }).isRequired,
  highlightedPremisId: _react2.default.PropTypes.string.isRequired
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StatusIndicator;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* A status between 1 and 100
 */

function StatusIndicator(props) {
  if (props.type === 'bar') {
    return _react2.default.createElement(
      'div',
      { className: 'status-bar' },
      _react2.default.createElement('div', { className: 'status-bar__bar status-bar__bar--' + props.state })
    );
  }

  if (props.type === 'circle') {
    return _react2.default.createElement(
      'div',
      { className: 'status-circle status-circle--' + props.state * 100 },
      _react2.default.createElement(
        'svg',
        { className: 'status-circle__svg', viewBox: '-5 -5 200 200' },
        _react2.default.createElement('circle', {
          className: 'status-circle__svg-icon status-circle__svg-bg outer',
          cx: '95',
          cy: '95',
          r: '85',
          transform: 'rotate(-90, 95, 95)'
        }),
        _react2.default.createElement('circle', {
          className: 'status-circle__svg-icon status-circle__svg-state outer',
          cx: '95',
          cy: '95',
          r: '85',
          transform: 'rotate(-90, 95, 95)'
        })
      ),
      _react2.default.createElement(
        'div',
        { className: 'status-circle__text' },
        props.state * 100 + '%'
      )
    );
  }

  return null;
}

StatusIndicator.propTypes = {
  state: _react2.default.PropTypes.number.isRequired,
  type: _react2.default.PropTypes.string.isRequired
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Claim = __webpack_require__(1);

var _Claim2 = _interopRequireDefault(_Claim);

var _reactRouterDom = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* The Search Results
 * This is the parent component for the search results list
 */

var SearchResults = function (_React$Component) {
  _inherits(SearchResults, _React$Component);

  function SearchResults(props) {
    _classCallCheck(this, SearchResults);

    var _this = _possibleConstructorReturn(this, (SearchResults.__proto__ || Object.getPrototypeOf(SearchResults)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(SearchResults, [{
    key: 'render',
    value: function render() {
      if (typeof this.props.searchResults === 'undefined') {
        return null;
      }

      var searchResults = this.props.searchResults.map(function (searchResult) {
        return _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/claim/' + searchResult.id, key: searchResult.id, className: 'search-results__result' },
          _react2.default.createElement(_Claim2.default, { claim: searchResult, isSelected: false })
        );
      });

      return _react2.default.createElement(
        'div',
        { className: 'search-results' },
        searchResults
      );
    }
  }]);

  return SearchResults;
}(_react2.default.Component);

exports.default = SearchResults;


SearchResults.propTypes = {
  searchResults: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object).isRequired
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
throw new Error("Cannot find module \"./BrowserRouter\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "BrowserRouter", function() { return __WEBPACK_IMPORTED_MODULE_0__BrowserRouter___default.a; });
throw new Error("Cannot find module \"./HashRouter\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "HashRouter", function() { return __WEBPACK_IMPORTED_MODULE_1__HashRouter___default.a; });
throw new Error("Cannot find module \"./Link\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return __WEBPACK_IMPORTED_MODULE_2__Link___default.a; });
throw new Error("Cannot find module \"./MemoryRouter\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return __WEBPACK_IMPORTED_MODULE_3__MemoryRouter___default.a; });
throw new Error("Cannot find module \"./NavLink\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "NavLink", function() { return __WEBPACK_IMPORTED_MODULE_4__NavLink___default.a; });
throw new Error("Cannot find module \"./Prompt\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return __WEBPACK_IMPORTED_MODULE_5__Prompt___default.a; });
throw new Error("Cannot find module \"./Redirect\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return __WEBPACK_IMPORTED_MODULE_6__Redirect___default.a; });
throw new Error("Cannot find module \"./Route\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return __WEBPACK_IMPORTED_MODULE_7__Route___default.a; });
throw new Error("Cannot find module \"./Router\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return __WEBPACK_IMPORTED_MODULE_8__Router___default.a; });
throw new Error("Cannot find module \"./StaticRouter\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return __WEBPACK_IMPORTED_MODULE_9__StaticRouter___default.a; });
throw new Error("Cannot find module \"./Switch\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return __WEBPACK_IMPORTED_MODULE_10__Switch___default.a; });
throw new Error("Cannot find module \"./matchPath\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return __WEBPACK_IMPORTED_MODULE_11__matchPath___default.a; });
throw new Error("Cannot find module \"./withRouter\"");
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return __WEBPACK_IMPORTED_MODULE_12__withRouter___default.a; });



























/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(24);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(6);

var _createHashHistory = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"history/createHashHistory\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _api = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"API/api\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _api2 = _interopRequireDefault(_api);

var _SearchResults = __webpack_require__(5);

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _EditClaimForm = __webpack_require__(15);

var _EditClaimForm2 = _interopRequireDefault(_EditClaimForm);

var _Circle = __webpack_require__(12);

var _Circle2 = _interopRequireDefault(_Circle);

var _Notifyer = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"Notifyer/Notifyer\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _Notifyer2 = _interopRequireDefault(_Notifyer);

var _notify = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"Services/notify\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _notify2 = _interopRequireDefault(_notify);

var _HomeScene = __webpack_require__(20);

var _HomeScene2 = _interopRequireDefault(_HomeScene);

var _SearchScene = __webpack_require__(21);

var _SearchScene2 = _interopRequireDefault(_SearchScene);

var _ClaimDetailScene = __webpack_require__(19);

var _ClaimDetailScene2 = _interopRequireDefault(_ClaimDetailScene);

var _ClaimCreateScene = __webpack_require__(18);

var _ClaimCreateScene2 = _interopRequireDefault(_ClaimCreateScene);

var _StyleguideScene = __webpack_require__(22);

var _StyleguideScene2 = _interopRequireDefault(_StyleguideScene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //React


var history = (0, _createHashHistory2.default)();

//JS


//React components


//Scenes

var Wikilogic = function (_React$Component) {
	_inherits(Wikilogic, _React$Component);

	function Wikilogic(props) {
		_classCallCheck(this, Wikilogic);

		var _this = _possibleConstructorReturn(this, (Wikilogic.__proto__ || Object.getPrototypeOf(Wikilogic)).call(this, props));

		_this.state = {
			search_results: [],
			focused_claim: {}
		};

		_this.setNewClaimFocus = _this.setNewClaimFocus.bind(_this);
		return _this;
	}

	_createClass(Wikilogic, [{
		key: 'setNewClaimFocus',
		value: function setNewClaimFocus(claim) {
			var _this2 = this;

			_api2.default.getClaimDetailById(claim.id).then(function (data) {
				_this2.setState({ focused_claim: data.claim });
			}).catch(function (err) {
				_notify2.default.post(err);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'main-layout' },
				_react2.default.createElement(
					'div',
					{ className: 'main-layout__header' },
					_react2.default.createElement(
						'header',
						{ className: 'header' },
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ to: '/', className: 'header__title' },
							'Wikilogic'
						),
						_react2.default.createElement(
							'div',
							{ className: 'header__links' },
							_react2.default.createElement(
								_reactRouterDom.Link,
								{ to: '/' },
								'Search'
							),
							_react2.default.createElement(
								_reactRouterDom.Link,
								{ to: '/new-claim' },
								'New claim'
							),
							_react2.default.createElement(
								_reactRouterDom.Link,
								{ to: '/styleguide' },
								'Styleguide'
							)
						)
					)
				),
				_react2.default.createElement(
					'main',
					{ className: 'main main-layout__body' },
					_react2.default.createElement(_reactRouterDom.Route, { path: '/', exact: true, component: _HomeScene2.default }),
					_react2.default.createElement(_reactRouterDom.Route, { path: '/search', exact: true, component: _SearchScene2.default }),
					_react2.default.createElement(_reactRouterDom.Route, { path: '/claim/:claimId', exact: true, component: _ClaimDetailScene2.default }),
					_react2.default.createElement(_reactRouterDom.Route, { path: '/new-claim', exact: true, component: _ClaimCreateScene2.default }),
					_react2.default.createElement(_reactRouterDom.Route, { path: '/edit-claim', exact: true, render: function render() {
							return _react2.default.createElement(
								'div',
								{ className: 'sidebar-layout' },
								_react2.default.createElement(
									'div',
									{ className: 'sidebar-layout__main' },
									_react2.default.createElement(_EditClaimForm2.default, null)
								),
								_react2.default.createElement(
									'div',
									{ className: 'sidebar-layout__side' },
									_react2.default.createElement(_SearchResults2.default, { search_results: _this3.state.search_results, resultClickHandler: _this3.setNewClaimFocus })
								)
							);
						} }),
					_react2.default.createElement(_reactRouterDom.Route, { path: '/styleguide', exact: true, component: _StyleguideScene2.default })
				),
				_react2.default.createElement(
					'div',
					{ className: 'main-layout__footer' },
					_react2.default.createElement(
						'footer',
						{ className: 'footer max-width-wrap' },
						_react2.default.createElement(
							'div',
							{ className: 'footer__col' },
							'Wikilogic is maintainted by the ',
							_react2.default.createElement(
								'a',
								{ href: 'www.wikilogicfoundation.org', target: '_blank' },
								'Wikilogic Foundation'
							),
							', a non-profit organisation...'
						),
						_react2.default.createElement(
							'div',
							{ className: 'footer__col' },
							'Privacy policy'
						),
						_react2.default.createElement(
							'div',
							{ className: 'footer__col' },
							'Terms of use'
						)
					)
				)
			);
		}
	}]);

	return Wikilogic;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(
	_reactRouterDom.Router,
	{ history: history },
	_react2.default.createElement(Wikilogic, null)
), document.getElementById('root'));

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Argument = __webpack_require__(3);

var _Argument2 = _interopRequireDefault(_Argument);

var _api = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"API/api\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _api2 = _interopRequireDefault(_api);

var _SearchInput = __webpack_require__(2);

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _Claim = __webpack_require__(1);

var _Claim2 = _interopRequireDefault(_Claim);

var _validate = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"Services/validate\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _validate2 = _interopRequireDefault(_validate);

var _notify = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"Services/notify\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _notify2 = _interopRequireDefault(_notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Search & select claims to add as premises to an argument
 */

var AddArgumentForm = function (_React$Component) {
  _inherits(AddArgumentForm, _React$Component);

  function AddArgumentForm(props) {
    _classCallCheck(this, AddArgumentForm);

    // state is bundled inside an argument for ease in passing to the argument element
    var _this = _possibleConstructorReturn(this, (AddArgumentForm.__proto__ || Object.getPrototypeOf(AddArgumentForm)).call(this, props));

    _this.state = {
      argument: {
        type: 'SUPPORTS',
        premises: []
      },
      premis_search_results: []
    };

    _this.handleTypeToggle = _this.handleTypeToggle.bind(_this);
    _this.handlePremisSearch = _this.handlePremisSearch.bind(_this);
    _this.handlePremisResultClick = _this.handlePremisResultClick.bind(_this);
    _this.handleArgumentPremisClick = _this.handleArgumentPremisClick.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(AddArgumentForm, [{
    key: 'handleTypeToggle',
    value: function handleTypeToggle(type) {
      var newArgument = this.state.argument;
      newArgument.type = type;
      this.setState({ argument: newArgument });
    }
  }, {
    key: 'handlePremisSearch',
    value: function handlePremisSearch(term) {
      var _this2 = this;

      if (isNaN(term)) {
        _api2.default.searchClaimsByTerm(term).then(function (data) {
          _this2.setState({ premis_search_results: data.claims });
        }).catch(function (err) {
          _notify2.default.post(err);
        });
      } else {
        _api2.default.getClaimDetailById(term).then(function (data) {
          _this2.setState({ premis_search_results: [data.claim] });
        }).catch(function (err) {
          _notify2.default.post(err);
        });
      }
    }
  }, {
    key: 'handlePremisResultClick',
    value: function handlePremisResultClick(premis) {
      // a premis in the premis search - add it to the new argument when it's clicked
      var newArgument = this.state.argument;

      if (_validate2.default.newPremis(premis, newArgument, this.props.parentClaim)) {
        newArgument.premises.push(premis);
        this.setState({ argument: newArgument });
      }
    }
  }, {
    key: 'handleArgumentPremisClick',
    value: function handleArgumentPremisClick(premis) {
      // when a premis that has been added to the argument is clicked, remove it from the argument
      var newArgument = this.state.argument;
      newArgument.premises = newArgument.premises.filter(function (statePremis) {
        return statePremis.id !== premis.id;
      });
      this.setState({ argument: newArgument });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _this3 = this;

      // when the publish button is clicked, set up the new argument JSON to be passed to the API
      event.preventDefault();

      var premisIdArray = this.state.argument.premises.map(function (premis) {
        return premis.id;
      });

      _api2.default.postNewArgument({
        parent_claim_id: this.props.parentClaim.id,
        type: this.state.argument.type,
        premise_ids: premisIdArray
      }).then(function (res) {
        _this3.props.updatedClaimHandler(res.data.claim);
      }).catch(function (err) {
        _notify2.default.post(err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var premisSearchResults = null;
      if (this.state.premis_search_results.length > 0) {
        premisSearchResults = this.state.premis_search_results.map(function (premis) {
          return _react2.default.createElement(_Claim2.default, {
            claim: premis,
            key: premis.id,
            handleClick: _this4.handlePremisResultClick,
            isSelected: false
          });
        });
      }

      return _react2.default.createElement(
        'div',
        { className: 'add-argument-form' },
        _react2.default.createElement(
          'h4',
          { className: 'add-argument-form__parent-claim' },
          this.props.parentClaim.text
        ),
        _react2.default.createElement(
          'div',
          { className: 'add-argument-form__type-toggle' },
          _react2.default.createElement(
            'div',
            { className: 'type-toggle' },
            _react2.default.createElement(
              'label',
              { className: 'type-toggle__label', htmlFor: 'type-toggle-supports' },
              _react2.default.createElement('input', {
                className: 'type-toggle__input',
                id: 'type-toggle-supports',
                type: 'radio',
                value: 'SUPPORTS',
                checked: this.state.argument.type === 'SUPPORTS',
                onChange: function onChange() {
                  return _this4.handleTypeToggle('SUPPORTS');
                }
              }),
              _react2.default.createElement(
                'div',
                { className: 'type-toggle__text' },
                'SUPPORTS'
              )
            ),
            _react2.default.createElement(
              'label',
              { className: 'type-toggle__label', htmlFor: 'type-toggle-opposes' },
              _react2.default.createElement('input', {
                className: 'type-toggle__input',
                id: 'type-toggle-opposes',
                type: 'radio',
                value: 'OPPOSES',
                checked: this.state.argument.type === 'OPPOSES',
                onChange: function onChange() {
                  return _this4.handleTypeToggle('OPPOSES');
                }
              }),
              _react2.default.createElement(
                'div',
                { className: 'type-toggle__text' },
                'OPPOSES'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'add-argument-form__premis-finder' },
          _react2.default.createElement(
            'div',
            { className: 'premis-finder' },
            _react2.default.createElement(_SearchInput2.default, {
              submissionHandler: this.handlePremisSearch,
              placeholder: 'Search Premises'
            }),
            _react2.default.createElement(
              'div',
              { className: 'premis-finder__results' },
              premisSearchResults
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'add-argument-form__argument-simulator' },
          _react2.default.createElement(_Argument2.default, {
            argumentObject: this.state.argument,
            premisClickHandler: this.handleArgumentPremisClick
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'add-argument-form__submit' },
          _react2.default.createElement(
            'button',
            { onClick: this.handleSubmit },
            'Publish'
          )
        )
      );
    }
  }]);

  return AddArgumentForm;
}(_react2.default.Component);

exports.default = AddArgumentForm;


AddArgumentForm.propTypes = {
  parentClaim: _react2.default.PropTypes.shape({
    id: _react2.default.PropTypes.string.isRequired,
    text: _react2.default.PropTypes.string.isRequired
  }).isRequired,
  updatedClaimHandler: _react2.default.PropTypes.func.isRequired
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _api = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"API/api\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _api2 = _interopRequireDefault(_api);

var _notify = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"Services/notify\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _notify2 = _interopRequireDefault(_notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Each Claim in the list of search results
 */

var AddClaimForm = function (_React$Component) {
  _inherits(AddClaimForm, _React$Component);

  function AddClaimForm(props) {
    _classCallCheck(this, AddClaimForm);

    var _this = _possibleConstructorReturn(this, (AddClaimForm.__proto__ || Object.getPrototypeOf(AddClaimForm)).call(this, props));

    _this.state = {
      text: ''
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.submitHandler = _this.submitHandler.bind(_this);
    return _this;
  }

  _createClass(AddClaimForm, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({
        text: event.target.value
      });
    }
  }, {
    key: 'submitHandler',
    value: function submitHandler(event) {
      event.preventDefault();

      _api2.default.postNewClaim({ text: this.state.text }).then(function (data) {
        _notify2.default.post(data);
      }).catch(function (err) {
        _notify2.default.post(err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { className: 'form', onSubmit: this.submitHandler },
        _react2.default.createElement(
          'div',
          { className: 'form__label' },
          _react2.default.createElement(
            'label',
            { className: 'form__label-text', htmlFor: 'new-claim-text' },
            'Write up your new claim'
          ),
          _react2.default.createElement('textarea', { className: 'form__input', id: 'new-claim-text', onChange: this.handleChange })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form__submit' },
          _react2.default.createElement('input', { className: 'form__submit-button', type: 'submit', value: 'Publish' })
        )
      );
    }
  }]);

  return AddClaimForm;
}(_react2.default.Component);

exports.default = AddClaimForm;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Argument = __webpack_require__(3);

var _Argument2 = _interopRequireDefault(_Argument);

var _api = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"API/api\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _api2 = _interopRequireDefault(_api);

var _SearchInput = __webpack_require__(2);

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _Claim = __webpack_require__(1);

var _Claim2 = _interopRequireDefault(_Claim);

var _validate = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"Services/validate\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _validate2 = _interopRequireDefault(_validate);

var _notify = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"Services/notify\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _notify2 = _interopRequireDefault(_notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Search & select claims to add as premises to an argument
 */

var AddExplanationForm = function (_React$Component) {
  _inherits(AddExplanationForm, _React$Component);

  function AddExplanationForm(props) {
    _classCallCheck(this, AddExplanationForm);

    // state is bundled inside an argument for ease in passing to the argument element
    var _this = _possibleConstructorReturn(this, (AddExplanationForm.__proto__ || Object.getPrototypeOf(AddExplanationForm)).call(this, props));

    _this.state = {
      argument: {
        type: 'SUPPORTS',
        premises: []
      },
      premis_search_results: []
    };
    // this.handleTypeToggle = this.handleTypeToggle.bind(this);
    _this.handlePremisSearch = _this.handlePremisSearch.bind(_this);
    _this.handlePremisResultClick = _this.handlePremisResultClick.bind(_this);
    _this.handleArgumentPremisClick = _this.handleArgumentPremisClick.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(AddExplanationForm, [{
    key: 'handleTypeToggle',
    value: function handleTypeToggle(type) {
      var newArgument = this.state.argument;
      newArgument.type = type;
      this.setState({ argument: newArgument });
    }
  }, {
    key: 'handlePremisSearch',
    value: function handlePremisSearch(term) {
      var _this2 = this;

      if (isNaN(term)) {
        _api2.default.searchClaimsByTerm(term).then(function (data) {
          _this2.setState({ premis_search_results: data.claims });
        }).catch(function (err) {
          _notify2.default.post(err);
        });
      } else {
        _api2.default.getClaimDetailById(term).then(function (data) {
          _this2.setState({ premis_search_results: [data.claim] });
        }).catch(function (err) {
          _notify2.default.post(err);
        });
      }
    }
  }, {
    key: 'handlePremisResultClick',
    value: function handlePremisResultClick(premis) {
      // a premis in the premis search - add it to the new argument when it's clicked
      var newArgument = this.state.argument;

      if (_validate2.default.newPremis(premis, newArgument, this.props.parentClaim)) {
        newArgument.premises.push(premis);
        this.setState({ argument: newArgument });
      }
    }
  }, {
    key: 'handleArgumentPremisClick',
    value: function handleArgumentPremisClick(premis) {
      // when a premis that has been added to the argument is clicked, remove it from the argument
      var newArgument = this.state.argument;
      newArgument.premises = newArgument.premises.filter(function (statePremis) {
        return statePremis.id !== premis.id;
      });
      this.setState({ argument: newArgument });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _this3 = this;

      // when the publish button is clicked, set up the new argument JSON to be passed to the API
      event.preventDefault();

      var premisIdArray = this.state.argument.premises.map(function (premis) {
        return premis.id;
      });

      _api2.default.postNewExplanation({
        parent_claim_id: this.props.parentClaim.id,
        type: this.state.argument.type,
        premise_ids: premisIdArray
      }).then(function (res) {
        _this3.props.updatedClaimHandler(res.data.claim);
      }).catch(function (err) {
        _notify2.default.post(err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var premisSearchResults = null;
      if (this.state.premis_search_results.length > 0) {
        premisSearchResults = this.state.premis_search_results.map(function (premis) {
          return _react2.default.createElement(_Claim2.default, {
            claim: premis,
            key: premis.id,
            handleClick: _this4.handlePremisResultClick,
            isSelected: false
          });
        });
      }

      return _react2.default.createElement(
        'div',
        { className: 'add-argument-form' },
        _react2.default.createElement(
          'h4',
          { className: 'add-argument-form__parent-claim' },
          'The claim ',
          this.props.parentClaim.text,
          ' requires one of the following explanations to be true:'
        ),
        _react2.default.createElement(
          'div',
          { className: 'add-argument-form__premis-finder' },
          _react2.default.createElement(
            'div',
            { className: 'premis-finder' },
            _react2.default.createElement(_SearchInput2.default, {
              submissionHandler: this.handlePremisSearch,
              placeholder: 'Search Premises'
            }),
            _react2.default.createElement(
              'div',
              { className: 'premis-finder__results' },
              premisSearchResults
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'add-argument-form__argument-simulator' },
          _react2.default.createElement(_Argument2.default, {
            argumentObject: this.state.argument,
            premisClickHandler: this.handleArgumentPremisClick
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'add-argument-form__submit' },
          _react2.default.createElement(
            'button',
            { onClick: this.handleSubmit },
            'Publish'
          )
        )
      );
    }
  }]);

  return AddExplanationForm;
}(_react2.default.Component);

exports.default = AddExplanationForm;


AddExplanationForm.propTypes = {
  parentClaim: _react2.default.PropTypes.shape({
    id: _react2.default.propTypes.string.isRequired,
    text: _react2.default.propTypes.string.isRequired
  }).isRequired,
  updatedClaimHandler: _react2.default.PropTypes.func.isRequired
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _StatusIndicator = __webpack_require__(4);

var _StatusIndicator2 = _interopRequireDefault(_StatusIndicator);

var _Claim = __webpack_require__(1);

var _Claim2 = _interopRequireDefault(_Claim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* A claim
 * and all it's arguments
 * Also the options to add arguments - eventually
 */

var Circle = function (_React$Component) {
  _inherits(Circle, _React$Component);

  function Circle(props) {
    _classCallCheck(this, Circle);

    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Circle, [{
    key: 'handleClick',
    value: function handleClick(premis) {
      this.props.premisClickHandler(premis);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // loop through the premises in this argument
      var premises = this.props.argumentObject.premises.map(function (premis) {
        var isSelected = premis.id === _this2.props.highlightedPremisId;

        return _react2.default.createElement(
          'div',
          { className: 'argumentCircle__premis', key: premis.id },
          _react2.default.createElement(_Claim2.default, {
            claim: premis,
            isSelected: isSelected,
            handleClick: function handleClick() {
              _this2.handleClick(premis);
            }
          })
        );
      });

      var colour = this.props.argumentObject.probability < 50 ? 'false' : 'true';

      return _react2.default.createElement(
        'div',
        { className: 'argument argumentCircle--' + colour },
        _react2.default.createElement(
          'div',
          { className: 'argumentCircle__body' },
          premises
        )
      );
    }
  }]);

  return Circle;
}(_react2.default.Component);

exports.default = Circle;


Circle.propTypes = {
  highlightedPremisId: _react2.default.PropTypes.string.isRequired,
  argumentObject: _react2.default.PropTypes.shape({
    probability: _react2.default.PropTypes.number.isRequired,
    premises: _react2.default.PropTypes.array.isRequired
  }).isRequired,
  premisClickHandler: _react2.default.PropTypes.func.isRequired
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _api = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"API/api\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _api2 = _interopRequireDefault(_api);

var _ClaimDetail = __webpack_require__(14);

var _ClaimDetail2 = _interopRequireDefault(_ClaimDetail);

var _notify = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"Services/notify\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _notify2 = _interopRequireDefault(_notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Start with a claim ID. Ask the API for that claim.
 * Lets the user go deeper into the premises bloew that claim.
 */

var ClaimChain = function (_React$Component) {
  _inherits(ClaimChain, _React$Component);

  function ClaimChain(props) {
    _classCallCheck(this, ClaimChain);

    var _this = _possibleConstructorReturn(this, (ClaimChain.__proto__ || Object.getPrototypeOf(ClaimChain)).call(this, props));

    _this.state = {
      isLoading: true,
      chain: []
    };
    _this.premisClickHandler = _this.premisClickHandler.bind(_this);
    _this.updatedClaimHandler = _this.updatedClaimHandler.bind(_this);
    return _this;
  }

  _createClass(ClaimChain, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // when this view opens, the ID of the claim is passed in by the props - ask the API for it!
      _api2.default.getClaimDetailById(this.props.topClaimId).then(function (data) {
        _this2.setState({
          isLoading: false,
          chain: [{
            claim: data.claim,
            highlighted_premis_id: ''
          }]
        });
      }).catch(function (err) {
        _notify2.default.post(err);
      });
    }
  }, {
    key: 'premisClickHandler',
    value: function premisClickHandler(premis, index) {
      var _this3 = this;

      // When a chain link premis is clicked, we need to:
      var newChain = this.state.chain;

      // clear out any lower level rows. 
      newChain = newChain.slice(0, index + 1);

      // highlight the premis that was clicked
      newChain[index].highlighted_premis_id = premis.id;

      // load in the arguments of that premis into the next level
      _api2.default.getClaimDetailById(premis.id).then(function (data) {
        newChain.push({
          claim: data.claim,
          highlighted_premis_id: ''
        });

        _this3.setState({ chain: newChain });
      }).catch(function (err) {
        _notify2.default.post(err);
      });
    }
  }, {
    key: 'updatedClaimHandler',
    value: function updatedClaimHandler(claim, index) {
      // when a claim in the chain is updated (eg by adding a new argument) - this will replace that link in the chain
      var newChain = this.state.chain;
      newChain[index].claim = claim;

      this.setState({ chain: newChain });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var theChain = null;

      if (this.state.isLoading) {
        return _react2.default.createElement(
          'div',
          null,
          'Loading...'
        );
      }

      if (this.state.chain.length > 0) {
        theChain = this.state.chain.map(function (chainLink, index) {
          if (Object.prototype.hasOwnProperty.call(chainLink, 'claim')) {
            return _react2.default.createElement(_ClaimDetail2.default, {
              claim: chainLink.claim,
              key: chainLink.claim.id,
              highlightedPremisId: chainLink.highlighted_premis_id,
              premisClickHandler: function premisClickHandler(premis) {
                _this4.premisClickHandler(premis, index);
              },
              updatedClaimHandler: function updatedClaimHandler(claim) {
                _this4.updatedClaimHandler(claim, index);
              }
            });
          }
          return null;
        });
      }

      return _react2.default.createElement(
        'div',
        null,
        theChain
      );
    }
  }]);

  return ClaimChain;
}(_react2.default.Component);

exports.default = ClaimChain;


ClaimChain.propTypes = {
  topClaimId: _react2.default.PropTypes.string.isRequired
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _api = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"API/api\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _api2 = _interopRequireDefault(_api);

var _Argument = __webpack_require__(3);

var _Argument2 = _interopRequireDefault(_Argument);

var _StatusIndicator = __webpack_require__(4);

var _StatusIndicator2 = _interopRequireDefault(_StatusIndicator);

var _Modal = __webpack_require__(16);

var _Modal2 = _interopRequireDefault(_Modal);

var _AddArgumentForm = __webpack_require__(9);

var _AddArgumentForm2 = _interopRequireDefault(_AddArgumentForm);

var _AddExplanationForm = __webpack_require__(11);

var _AddExplanationForm2 = _interopRequireDefault(_AddExplanationForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* A claim
 * and all it's arguments
 * Also the options to add arguments - eventually
 */

var ClaimDetail = function (_React$Component) {
  _inherits(ClaimDetail, _React$Component);

  function ClaimDetail(props) {
    _classCallCheck(this, ClaimDetail);

    var _this = _possibleConstructorReturn(this, (ClaimDetail.__proto__ || Object.getPrototypeOf(ClaimDetail)).call(this, props));

    _this.state = {
      highlight_premis_id: '',
      new_argument_modal_open: false,
      new_explanation_modal_open: false
    };
    _this.premisClickHandler = _this.premisClickHandler.bind(_this);
    _this.openNewArgumentModal = _this.openNewArgumentModal.bind(_this);
    _this.openNewExplanationModal = _this.openNewExplanationModal.bind(_this);
    _this.updatedClaimHandler = _this.updatedClaimHandler.bind(_this);
    _this.closeNewArgumentModal = _this.closeNewArgumentModal.bind(_this);
    _this.closeNewExplanationModal = _this.closeNewExplanationModal.bind(_this);
    return _this;
  }

  // When this claim chain recieves new props that means there's a new focus argument. 
  // So this clears out the state


  _createClass(ClaimDetail, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setState({
        highlight_premis_id: '',
        new_argument_modal_open: false,
        new_explanation_modal_open: false
      });
    }

    // the focus premises get their own click handler as the logic is a bit different

  }, {
    key: 'premisClickHandler',
    value: function premisClickHandler(premis) {
      this.props.premisClickHandler(premis);
    }
  }, {
    key: 'openNewArgumentModal',
    value: function openNewArgumentModal() {
      this.setState({
        new_argument_modal_open: true
      });
    }
  }, {
    key: 'openNewExplanationModal',
    value: function openNewExplanationModal() {
      this.setState({
        new_explanation_modal_open: true
      });
    }
  }, {
    key: 'updatedClaimHandler',
    value: function updatedClaimHandler(claim) {
      // when a new argument is added the API returns the updated parent claim, so we should replace!
      this.props.updatedClaimHandler(claim);
      this.setState({
        new_argument_modal_open: false
      });
    }
  }, {
    key: 'closeNewArgumentModal',
    value: function closeNewArgumentModal() {
      this.setState({
        new_argument_modal_open: false
      });
    }
  }, {
    key: 'closeNewExplanationModal',
    value: function closeNewExplanationModal() {
      this.setState({
        new_explanation_modal_open: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (typeof this.props.claim.text === 'undefined') {
        return null;
      }
      var argumentMarkup = null;
      // the arguments
      if (this.props.claim.arguments.length > 0) {
        argumentMarkup = this.props.claim.arguments.map(function (argumentObject) {
          return _react2.default.createElement(_Argument2.default, {
            argumentObject: argumentObject,
            key: argumentObject.id,
            highlightedPremisId: _this2.props.highlightedPremisId,
            premisClickHandler: _this2.premisClickHandler
          });
        });
      } else {
        argumentMarkup = _react2.default.createElement(
          'div',
          null,
          'No arguments -',
          _react2.default.createElement(
            'a',
            { href: 'http://www.wikilogicfoundation.org/get-involved/', target: '_blank', rel: 'noopener noreferrer' },
            'sign up'
          ),
          ' to add your own!'
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'claim-detail' },
        _react2.default.createElement(
          'div',
          { className: 'claim-detail__header' },
          _react2.default.createElement(
            'div',
            { className: 'claim-detail__text' },
            this.props.claim.text
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'claim-detail__status' },
          _react2.default.createElement(_StatusIndicator2.default, { state: this.props.claim.state })
        ),
        _react2.default.createElement(
          'div',
          { className: 'claim-detail__options' },
          _react2.default.createElement(
            'button',
            { className: 'button', onClick: this.openNewExplanationModal },
            'This claim can be explained by...'
          ),
          _react2.default.createElement(
            'button',
            { className: 'button', onClick: this.openNewArgumentModal },
            'New Argument +'
          )
        ),
        _react2.default.createElement(
          _Modal2.default,
          {
            show: this.state.new_explanation_modal_open,
            title: 'New Explanation',
            onClose: this.closeNewExplanationModal
          },
          _react2.default.createElement(_AddExplanationForm2.default, {
            parentClaim: this.props.claim,
            updatedClaimHandler: this.updatedClaimHandler
          })
        ),
        _react2.default.createElement(
          _Modal2.default,
          {
            show: this.state.new_argument_modal_open,
            title: 'New Argument',
            onClose: this.closeNewArgumentModal
          },
          _react2.default.createElement(_AddArgumentForm2.default, {
            parentClaim: this.props.claim,
            updatedClaimHandler: this.updatedClaimHandler
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'claim-detail__arguments' },
          argumentMarkup
        )
      );
    }
  }]);

  return ClaimDetail;
}(_react2.default.Component);

exports.default = ClaimDetail;


ClaimDetail.propTypes = {
  claim: _react2.default.PropTypes.shape({
    id: _react2.default.PropTypes.string.isRequired,
    text: _react2.default.PropTypes.string.isRequired,
    state: _react2.default.PropTypes.number.isRequired,
    arguments: _react2.default.PropTypes.array.isRequired
  }).isRequired,
  premisClickHandler: _react2.default.PropTypes.func.isRequired,
  updatedClaimHandler: _react2.default.PropTypes.func.isRequired,
  highlightedPremisId: _react2.default.PropTypes.string.isRequired
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Claim = __webpack_require__(1);

var _Claim2 = _interopRequireDefault(_Claim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Each Claim in the list of search results
 */

var EditClaimForm = function (_React$Component) {
  _inherits(EditClaimForm, _React$Component);

  function EditClaimForm(props) {
    _classCallCheck(this, EditClaimForm);

    var _this = _possibleConstructorReturn(this, (EditClaimForm.__proto__ || Object.getPrototypeOf(EditClaimForm)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(EditClaimForm, [{
    key: 'handleClick',
    value: function handleClick(premis) {
      console.log("claim that's being edited was clicked... hmm");
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { className: 'form' },
        _react2.default.createElement(
          'h4',
          { className: 'form__title' },
          'Edit claim'
        ),
        _react2.default.createElement(_Claim2.default, { claim: this.props.claim, handleClick: this.handleClick }),
        _react2.default.createElement(
          'label',
          { className: 'form__label', htmlFor: 'edit-claim-textarea' },
          _react2.default.createElement(
            'div',
            { className: 'form__label-text' },
            'Claim text'
          ),
          _react2.default.createElement(
            'textarea',
            { className: 'form__input', id: 'edit-claim-textarea' },
            'text area'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form__submit' },
          _react2.default.createElement('input', { className: 'form__submit-button', type: 'submit', value: 'submit' })
        )
      );
    }
  }]);

  return EditClaimForm;
}(_react2.default.Component);

exports.default = EditClaimForm;


EditClaimForm.propTypes = {
  claim: _react2.default.PropTypes.shape({
    id: _react2.default.PropTypes.string.isRequired,
    text: _react2.default.PropTypes.string.isRequired,
    state: _react2.default.PropTypes.number.isRequired
  }).isRequired
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* The modal layout
 *
 */

function Modal(props) {
  // Render nothing if the "show" prop is false
  if (!props.show) {
    return null;
  }

  return _react2.default.createElement(
    "div",
    { className: "modal" },
    _react2.default.createElement(
      "div",
      { className: "modal__body" },
      _react2.default.createElement(
        "div",
        { className: "modal__header" },
        _react2.default.createElement(
          "h3",
          { className: "modal__title" },
          props.title
        ),
        _react2.default.createElement(
          "button",
          { onClick: props.onClose },
          "Close"
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "modal__content" },
        props.children
      )
    )
  );
}

Modal.propTypes = {
  show: _react2.default.PropTypes.bool.isRequired,
  title: _react2.default.PropTypes.string.isRequired,
  onClose: _react2.default.PropTypes.func.isRequired,
  children: _react2.default.PropTypes.element.isRequired
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchIcon;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* The search icon
 * 
 */

function SearchIcon() {
  return _react2.default.createElement(
    "svg",
    { version: "1.1", id: "Capa_1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 339.921 339.921", className: "svgicon" },
    _react2.default.createElement("path", { d: "M335.165,292.071l-81.385-84.077c-5.836-6.032-13.13-8.447-16.29-5.363\r c-3.171,3.062-10.47,0.653-16.306-5.379l-1.164-1.207c36.425-47.907,32.89-116.499-10.851-160.24\r c-47.739-47.739-125.142-47.739-172.875,0c-47.739,47.739-47.739,125.131,0,172.87c44.486,44.492,114.699,47.472,162.704,9.045\r l0.511,0.533c5.825,6.032,7.995,13.402,4.814,16.469c-3.166,3.068-1.012,10.443,4.83,16.464l81.341,84.11\r c5.836,6.016,15.452,6.195,21.49,0.354l22.828-22.088C340.827,307.735,340.99,298.125,335.165,292.071z M182.306,181.81\r c-32.852,32.857-86.312,32.857-119.159,0.011c-32.852-32.852-32.847-86.318,0-119.164c32.847-32.852,86.307-32.847,119.148,0.005\r C215.152,95.509,215.152,148.964,182.306,181.81z"
    })
  );
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _api = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"API/api\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _api2 = _interopRequireDefault(_api);

var _AddClaimForm = __webpack_require__(10);

var _AddClaimForm2 = _interopRequireDefault(_AddClaimForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Search Results page
 * @prop {*} name 
 */
var ClaimCreateScene = function (_React$Component) {
  _inherits(ClaimCreateScene, _React$Component);

  function ClaimCreateScene(props) {
    _classCallCheck(this, ClaimCreateScene);

    var _this = _possibleConstructorReturn(this, (ClaimCreateScene.__proto__ || Object.getPrototypeOf(ClaimCreateScene)).call(this, props));

    _this.state = {};

    return _this;
  }

  _createClass(ClaimCreateScene, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: 'new-claim-layout' },
        _react2.default.createElement(
          'div',
          { className: 'new-claim-layout__header' },
          _react2.default.createElement(
            'div',
            { className: 'max-width-wrap' },
            _react2.default.createElement(_AddClaimForm2.default, null)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'new-claim-layout__results' },
          _react2.default.createElement('div', { className: 'max-width-wrap' })
        )
      );
    }
  }]);

  return ClaimCreateScene;
}(_react2.default.Component);

exports.default = ClaimCreateScene;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _api = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"API/api\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _api2 = _interopRequireDefault(_api);

var _ClaimChain = __webpack_require__(13);

var _ClaimChain2 = _interopRequireDefault(_ClaimChain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Search Results page
 * @prop {*} name 
 */
var ClaimDetailScene = function (_React$Component) {
  _inherits(ClaimDetailScene, _React$Component);

  function ClaimDetailScene(props) {
    _classCallCheck(this, ClaimDetailScene);

    var _this = _possibleConstructorReturn(this, (ClaimDetailScene.__proto__ || Object.getPrototypeOf(ClaimDetailScene)).call(this, props));

    _this.state = {};

    return _this;
  }

  _createClass(ClaimDetailScene, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: 'claim-detail-layout' },
        _react2.default.createElement(
          'div',
          { className: 'claim-detail-layout__header' },
          _react2.default.createElement(
            'div',
            { className: 'max-width-wrap' },
            _react2.default.createElement(_ClaimChain2.default, { topClaimId: this.props.match.params.claimId })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'claim-detail-layout__body' },
          _react2.default.createElement('div', { className: 'max-width-wrap' })
        )
      );
    }
  }]);

  return ClaimDetailScene;
}(_react2.default.Component);

exports.default = ClaimDetailScene;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SearchInput = __webpack_require__(2);

var _SearchInput2 = _interopRequireDefault(_SearchInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Home page
 * @prop {*} name 
 */
var SearchScene = function (_React$Component) {
	_inherits(SearchScene, _React$Component);

	function SearchScene(props) {
		_classCallCheck(this, SearchScene);

		var _this = _possibleConstructorReturn(this, (SearchScene.__proto__ || Object.getPrototypeOf(SearchScene)).call(this, props));

		_this.state = {
			search_results: []
		};

		_this.searchClaims = _this.searchClaims.bind(_this);
		return _this;
	}

	_createClass(SearchScene, [{
		key: 'searchClaims',
		value: function searchClaims(search) {
			//go to /search?s=term
			this.props.history.push('/search?s=' + search);
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2.default.createElement(
				'div',
				{ className: 'search-layout' },
				_react2.default.createElement(
					'div',
					{ className: 'search-layout__header' },
					_react2.default.createElement(
						'div',
						{ className: 'max-width-wrap' },
						'You\'ve come home',
						_react2.default.createElement(_SearchInput2.default, { submissionHandler: this.searchClaims, placeholder: 'Search Claims' })
					)
				)
			);
		}
	}]);

	return SearchScene;
}(_react2.default.Component);

exports.default = SearchScene;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SearchInput = __webpack_require__(2);

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _SearchResults = __webpack_require__(5);

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _api = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"API/api\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _api2 = _interopRequireDefault(_api);

var _urlParameter = __webpack_require__(23);

var _urlParameter2 = _interopRequireDefault(_urlParameter);

var _notify = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"Services/notify\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _notify2 = _interopRequireDefault(_notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Search Results page
 */
var SearchScene = function (_React$Component) {
	_inherits(SearchScene, _React$Component);

	function SearchScene(props) {
		_classCallCheck(this, SearchScene);

		var _this = _possibleConstructorReturn(this, (SearchScene.__proto__ || Object.getPrototypeOf(SearchScene)).call(this, props));

		_this.state = {
			search_term: '',
			search_results: []
		};

		_this.searchClaims = _this.searchClaims.bind(_this);
		return _this;
	}

	_createClass(SearchScene, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			//get the search param to see if there is anything there
			var URLsearchTerm = _urlParameter2.default.get('s', this.props.location.search);

			//if there is
			if (URLsearchTerm != '') {
				//set the state so it renders
				this.setState({
					search_term: URLsearchTerm
				});

				//and run the search
				this.searchClaims(URLsearchTerm);
			}
		}
	}, {
		key: 'searchClaims',
		value: function searchClaims(search) {
			var _this2 = this;

			//run the search
			if (isNaN(search)) {
				console.log("searching by term", search);
				_api2.default.searchClaimsByTerm(search).then(function (data) {
					_this2.setState({ search_results: data.claims });
				}).catch(function (err) {
					_notify2.default.post(err);
				});
			} else {
				console.log("searching by id", search);
				_api2.default.getClaimDetailById(search).then(function (data) {
					_this2.setState({ focused_claim: data.claim });
				}).catch(function (err) {
					_notify2.default.post(err);
				});
			}

			//add it to the url
			this.props.history.push('/search?s=' + search);

			//set the state
			this.setState({
				search_term: search
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'search-layout' },
				_react2.default.createElement(
					'div',
					{ className: 'search-layout__header' },
					_react2.default.createElement(
						'div',
						{ className: 'max-width-wrap' },
						_react2.default.createElement(_SearchInput2.default, { submissionHandler: this.searchClaims, placeholder: 'Search Claims', inputValue: this.state.search_term })
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'search-layout__results' },
					_react2.default.createElement(
						'div',
						{ className: 'max-width-wrap' },
						_react2.default.createElement(_SearchResults2.default, { search_results: this.state.search_results })
					)
				)
			);
		}
	}]);

	return SearchScene;
}(_react2.default.Component);

exports.default = SearchScene;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _api = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"API/api\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _api2 = _interopRequireDefault(_api);

var _Claim = __webpack_require__(1);

var _Claim2 = _interopRequireDefault(_Claim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Search Results page
 * @prop {*} name 
 */
var StyleguideScene = function (_React$Component) {
  _inherits(StyleguideScene, _React$Component);

  function StyleguideScene(props) {
    _classCallCheck(this, StyleguideScene);

    var _this = _possibleConstructorReturn(this, (StyleguideScene.__proto__ || Object.getPrototypeOf(StyleguideScene)).call(this, props));

    _this.state = {};

    return _this;
  }

  _createClass(StyleguideScene, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Heading 1'
        ),
        _react2.default.createElement(
          'h2',
          null,
          'Heading 2'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Heading 3'
        ),
        _react2.default.createElement(
          'h4',
          null,
          'Heading 4'
        ),
        _react2.default.createElement(
          'h5',
          null,
          'Heading 5'
        ),
        _react2.default.createElement(
          'h6',
          null,
          'Heading 6'
        ),
        _react2.default.createElement(
          'p',
          null,
          '123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, repellat, ad. Autem reiciendis nobis, aspernatur, quo delectus modi quae vel assumenda aliquam inventore recusandae iure rerum odio veniam, consectetur non.'
        ),
        _react2.default.createElement(_Claim2.default, {
          claim: {
            text: "claim text",
            probability: 0.75
          }
        }),
        _react2.default.createElement(_Claim2.default, {
          claim: {
            text: "claim text",
            probability: 0.5
          }
        })
      );
    }
  }]);

  return StyleguideScene;
}(_react2.default.Component);

exports.default = StyleguideScene;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function addToQueryString(queryString, paramName, value) {
  if (queryString.length > 0) {
    // there's something in the querystring, I'm going to assume it's a properly formed parameter
    return queryString + '&' + paramName + '=' + value;
  }
  // guess there's nothing there, no need to '&'
  return '?' + paramName + '=' + value;
}

function removeQueryFromString(queryString, paramName) {
  // find the index of paramName 
  // (note that the param name could be a substring of another param name)
  // include the "?" and "=" to help negate the substring problem
  var startSlice = queryString.indexOf('?' + paramName + '=');
  if (startSlice === -1) {
    // it's not the first param, but it could be further along
    startSlice = queryString.indexOf('&' + paramName + '=');
    if (startSlice === -1) {
      // it's not there either, just return the string
      return queryString;
    }
  }

  // shift the index of the start slice along past the '?' or '&'
  startSlice += 1;

  // find index of the next &
  var endSlice = queryString.indexOf('&' + startSlice);
  if (endSlice === -1) {
    // it's the last / only one!
    // -1 to lop of the preceeding "?" if it's the only one or "&" if it's the last one
    return queryString.substr(0, startSlice - 1);
  }

  if (endSlice < queryString.length) {
    // we're in the middle, add to end slice so it'll lop off one of the "&"'s
    endSlice += 1;
  }

  // if we're here - the param is one of many - return the slice before & after the param
  return queryString.substr(0, startSlice) + queryString.substr(endSlice, queryString.length);
}

function formatStringForUrl(unsafeString) {
  // note: I've tried a bunch of alternate methods to replace characters, 
  // none have managed to beat the regex.
  var saferString = unsafeString.replace(/ /g, '%20');
  saferString = saferString.replace(/&/g, '%26');
  saferString = saferString.replace(/\//g, '%2F');

  return saferString;
}

exports.default = {
  get: function get(paramName, queryString) {
    if (typeof paramName !== 'string' || typeof queryString !== 'string') {
      return false;
    }

    // find the index of paramName
    var startSlice = queryString.indexOf(paramName);
    if (startSlice === -1) {
      // it's not in there, return false
      return false;
    }
    // start slice for the actual value. Param name + "="
    startSlice = startSlice + paramName.length + 1;

    // find index of the next &
    var endSlice = queryString.indexOf('&', startSlice);
    if (endSlice === -1) {
      // it's the last / only one!
      return queryString.substr(startSlice, queryString.length);
    }

    // end slice is index. substr needs length
    return queryString.substr(startSlice, endSlice - startSlice);
  },
  set: function set(paramName, value, queryString, isEncoded) {
    var formattedParamName = void 0;
    var formattedValue = void 0;

    if (typeof paramName !== 'string') {
      return false;
    }

    var cleanQueryString = removeQueryFromString(queryString, paramName);
    if (value === '') {
      return cleanQueryString;
    }

    if (!isEncoded) {
      // param name and value have passed, so format them 
      formattedParamName = formatStringForUrl(paramName);
      formattedValue = formatStringForUrl(value);
    } else {
      formattedParamName = paramName;
      formattedValue = value;
    }

    // and return the new string!
    var newQuery = addToQueryString(cleanQueryString, formattedParamName, formattedValue);

    return newQuery;
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib/ReactDOM\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
module.exports = __webpack_require__(8);


/***/ })
/******/ ]);