"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var start = document.getElementById('app'),
    root = ReactDOM.createRoot(start);

var TodoItem = /*#__PURE__*/function (_React$Component) {
  _inherits(TodoItem, _React$Component);

  var _super = _createSuper(TodoItem);

  function TodoItem(props) {
    var _this;

    _classCallCheck(this, TodoItem);

    _this = _super.call(this, props);
    _this.inputChecked = _this.inputChecked.bind(_assertThisInitialized(_this));
    _this.localProcess = _this.localProcess.bind(_assertThisInitialized(_this));
    _this.todoSil = _this.todoSil.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TodoItem, [{
    key: "inputChecked",
    value: function inputChecked(e) {
      var todoID = e.target.getAttribute('todo-id'),
          todoElement = document.getElementById(todoID);
      todoElement.classList.toggle('active');
    }
  }, {
    key: "localProcess",
    value: function localProcess(e) {
      var dataID = e.target.getAttribute('data-id'),
          data = localStorage.getItem(dataID),
          dataArray = data.split(','),
          head = dataArray[0],
          description = dataArray[1],
          active = dataArray[2],
          sil = dataArray[3];

      if (active == 0) {
        active = 1;
      } else {
        active = 0;
      }

      localStorage.setItem(dataID, [head, description, active, 0]);
    }
  }, {
    key: "todoSil",
    value: function todoSil(e) {
      var dataID = e.target.getAttribute('data-id'),
          data = localStorage.getItem(dataID),
          dataArray = data.split(','),
          head = dataArray[0],
          description = dataArray[1];
      localStorage.setItem(dataID, [head, description, 1, 1]);
      appRender();
    }
  }, {
    key: "render",
    value: function render() {
      var data = localStorage.getItem(this.props.getItem),
          dataArray = data.split(','),
          head = dataArray[0],
          description = dataArray[1],
          active = dataArray[2],
          sil = dataArray[3],
          setChecked = '';

      if (active == 0) {
        active = '';

        setChecked: '';
      } else {
        active = ' active ';
        setChecked = ' checked ';
      }

      if (sil == 1) {
        sil = 'delete';
      } else {
        sil = '';
      }

      return /*#__PURE__*/React.createElement("div", {
        id: "todo" + this.props.getNumber,
        className: 'todo-item ' + active + sil
      }, /*#__PURE__*/React.createElement("div", {
        className: "item-checkbox"
      }, /*#__PURE__*/React.createElement("input", {
        id: "checkbox" + this.props.getNumber,
        "todo-id": "todo" + this.props.getNumber,
        defaultChecked: setChecked,
        type: "checkbox",
        className: "checkbox",
        onClick: this.inputChecked
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "checkbox" + this.props.getNumber,
        className: "checkbox-label",
        "data-id": this.props.getItem,
        onClick: this.localProcess
      })), /*#__PURE__*/React.createElement("div", {
        className: "item-text"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "text-head"
      }, head), /*#__PURE__*/React.createElement("p", {
        className: "text-description"
      }, description)), /*#__PURE__*/React.createElement("div", {
        className: "item-delete"
      }, /*#__PURE__*/React.createElement("i", {
        onClick: this.todoSil,
        "data-id": this.props.getItem,
        className: "fa-solid fa-trash-can"
      })));
    }
  }]);

  return TodoItem;
}(React.Component);

var Todo = /*#__PURE__*/function (_React$Component2) {
  _inherits(Todo, _React$Component2);

  var _super2 = _createSuper(Todo);

  function Todo(props) {
    _classCallCheck(this, Todo);

    return _super2.call(this, props);
  }

  _createClass(Todo, [{
    key: "render",
    value: function render() {
      var items = localStorage.getItem('todoItems'),
          itemsArray = items.split(',');
      return /*#__PURE__*/React.createElement("section", {
        id: "todo",
        className: "container"
      }, itemsArray.map(function (item, key) {
        return /*#__PURE__*/React.createElement(TodoItem, {
          key: key,
          getItem: item,
          getNumber: item.slice(-1)
        });
      }));
    }
  }]);

  return Todo;
}(React.Component);

var Form = /*#__PURE__*/function (_React$Component3) {
  _inherits(Form, _React$Component3);

  var _super3 = _createSuper(Form);

  function Form(props) {
    var _this2;

    _classCallCheck(this, Form);

    _this2 = _super3.call(this, props);
    _this2.formSubmit = _this2.formSubmit.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(Form, [{
    key: "formSubmit",
    value: function formSubmit(e) {
      e.preventDefault();
      var todoHead = e.target.HEAD.value,
          todoDescription = e.target.DESCRIPTION.value,
          todoNumber = localStorage.getItem('todoNumber'),
          todoName = 'todo' + todoNumber;

      if (todoHead == '' || todoDescription == '') {
        toastr.error('İçerik boş bırakılamaz!');
      } else {
        localStorage.setItem(todoName, [todoHead, todoDescription, 0, 0]);
        toastr.success('To-do oluşturuldu!');
        localStorage.setItem('todoNumber', parseInt(todoNumber) + 1);
        var todoItems = localStorage.getItem('todoItems');

        if (todoItems != null) {
          if (todoItems == 'todo0') {
            localStorage.setItem('todoItems', [todoItems, todoName]);
            localStorage.setItem('todo0', [null, null, 1, 1]);
          } else {
            localStorage.setItem('todoItems', [todoItems, todoName]);
          }
        } else {
          localStorage.setItem('todoItems', [todoName]);
        }

        e.target.HEAD.value = '';
        e.target.DESCRIPTION.value = '';
        appRender();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("section", {
        id: "form",
        className: "container"
      }, /*#__PURE__*/React.createElement("form", {
        onSubmit: this.formSubmit,
        className: "todo-form"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "HEAD",
        placeholder: "To-do ba\u015Fl\u0131\u011F\u0131"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "DESCRIPTION",
        placeholder: "To-do a\xE7\u0131klamas\u0131"
      }), /*#__PURE__*/React.createElement("input", {
        type: "submit",
        value: "To-do Olu\u015Ftur"
      })));
    }
  }]);

  return Form;
}(React.Component);

var App = /*#__PURE__*/function (_React$Component4) {
  _inherits(App, _React$Component4);

  var _super4 = _createSuper(App);

  function App(props) {
    var _this3;

    _classCallCheck(this, App);

    _this3 = _super4.call(this, props);
    var todoNumber = localStorage.getItem('todoNumber');

    if (todoNumber == null) {
      localStorage.setItem('todoNumber', 1);
      localStorage.setItem('todoItems', 'todo0');
      localStorage.setItem('todo0', ['Örnek To-do Başlığı (ilk To-do oluştuktan sonra otomatik silinecektir.)', 'Örnek To-do Açıklaması (ilk To-do oluştuktan sonra otomatik silinecektir.)', 0, 0]);
    }

    return _this3;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Form, null), /*#__PURE__*/React.createElement(Todo, null));
    }
  }]);

  return App;
}(React.Component);

function appRender() {
  root.render( /*#__PURE__*/React.createElement(App, null));
}

appRender();
