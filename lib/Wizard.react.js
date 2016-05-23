'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _pathval = require('pathval');

var _pathval2 = _interopRequireDefault(_pathval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wizard = function (_React$Component) {
  _inherits(Wizard, _React$Component);

  function Wizard(props) {
    _classCallCheck(this, Wizard);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Wizard).call(this, props));

    _this._originalData = props.initialData || {};

    _this.state = { currentComponentIndex: 0,
      maxComponentIndexReached: 0,
      data: _this._originalData };
    return _this;
  }

  _createClass(Wizard, [{
    key: '_breadcrumbClicked',
    value: function _breadcrumbClicked(index) {
      this.state.currentComponentIndex = index;
      this.setState(this.state);
    }
  }, {
    key: '_getComponentsBreadcrumbs',
    value: function _getComponentsBreadcrumbs() {
      var _this2 = this;

      return this.props.components.slice(0, this.state.maxComponentIndexReached + 1).map(function (component, index) {
        var className = _this2.props.components[_this2.state.currentComponentIndex] === component ? 'active' : 'inactive';

        var title = component.breadcrumbNamePath && _pathval2.default.get(_this2.state, component.breadcrumbNamePath) || component.name;

        return _react2.default.createElement(
          'li',
          { key: component.name, className: className,
            onClick: _this2._breadcrumbClicked.bind(_this2, index) },
          title
        );
      }.bind(this));
    }
  }, {
    key: 'onNextEnded',
    value: function onNextEnded(data) {
      this.state.currentComponentIndex++;
      this.state.maxComponentIndexReached++;
      this.state.data = data;
      this.setState(this.state);
      if (this.state.currentComponentIndex === this.props.components.length) {
        this.props.onFinish(this.state.data);
        this.state = { currentComponentIndex: 0,
          maxComponentIndexReached: 0,
          data: this._originalData };
        this.setState(this.state);
      }
    }
  }, {
    key: 'onPrevEnded',
    value: function onPrevEnded(data) {
      this.state.currentComponentIndex--;
      this.state.data = data;
      this.setState(this.state);
    }
  }, {
    key: 'onReset',
    value: function onReset() {
      this.setState({ currentComponentIndex: 0,
        maxComponentIndexReached: 0,
        data: this._originalData });
    }
  }, {
    key: '_getComponentInstance',
    value: function _getComponentInstance() {
      if (this.refs.currentComponent.onNext) {
        return this.refs.currentComponent;
      } else if (this.refs.currentComponent.getWrappedInstance) {
        // Patch for working with redux's connect
        return this.refs.currentComponent.getWrappedInstance();
      }

      return null;
    }
  }, {
    key: '_callOnNext',
    value: function _callOnNext() {
      this._getComponentInstance().onNext();
    }
  }, {
    key: '_callOnPrev',
    value: function _callOnPrev() {
      this._getComponentInstance().onPrev();
    }
  }, {
    key: 'render',
    value: function render() {
      var nextClass = 'fa fa-';
      nextClass += this.state.currentComponentIndex !== this.props.components.length - 1 ? 'arrow-right' : 'paper-plane';

      var currentActiveItem = this.props.components[this.state.currentComponentIndex];

      var currentComponent = _react2.default.createElement(this.props.components[this.state.currentComponentIndex].component, Object.assign(this.props.components[this.state.currentComponentIndex].additionalProps || {}, { onNextEnded: this.onNextEnded.bind(this),
        onPrevEnded: this.onPrevEnded.bind(this),
        data: this.state.data,
        ref: 'currentComponent' }));

      return _react2.default.createElement(
        'div',
        { className: 'react-gen-wizard' },
        _react2.default.createElement(
          'ul',
          { className: 'breadcrumbs' },
          this._getComponentsBreadcrumbs()
        ),
        _react2.default.createElement(
          'h3',
          { className: 'component-title' },
          currentActiveItem.name
        ),
        _react2.default.createElement(
          'div',
          { className: 'component-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'current-component' },
            currentComponent
          ),
          (currentActiveItem.showButtons === undefined || // If undefined default to true
          currentActiveItem.showButtons) && _react2.default.createElement(
            'div',
            { className: 'buttons' },
            this.state.currentComponentIndex !== 0 && _react2.default.createElement(_materialUi.IconButton, { className: 'icon-prev',
              iconClassName: 'fa fa-arrow-left',
              mini: true,
              onClick: this._callOnPrev.bind(this) }),
            _react2.default.createElement(_materialUi.IconButton, { className: 'icon-next',
              iconClassName: nextClass,
              mini: true,
              onClick: this._callOnNext.bind(this) })
          )
        )
      );
    }
  }]);

  return Wizard;
}(_react2.default.Component);

exports.default = Wizard;


Wizard.propTypes = {
  components: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    name: _react2.default.PropTypes.string.isRequired,
    component: _react2.default.PropTypes.func.isRequired,
    showButtons: _react2.default.PropTypes.bool,
    additionalProps: _react2.default.PropTypes.object,
    breadcrumbNamePath: _react2.default.PropTypes.string
  })).isRequired,
  onFinish: _react2.default.PropTypes.func.isRequired,
  initialData: _react2.default.PropTypes.object
};