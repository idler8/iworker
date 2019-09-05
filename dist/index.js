(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.IWorker = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createWorker = function createWorker(response) {
    var URL = window.URL || window.webkitURL;
    var blob = new Blob([response], {
      type: 'application/javascript'
    }); // eslint-disable-line

    var objectURL = URL.createObjectURL(blob);
    var worker = new Worker(objectURL); // eslint-disable-line

    URL.revokeObjectURL(objectURL);
    return worker;
  };

  var IWorker =
  /*#__PURE__*/
  function () {
    function IWorker() {
      _classCallCheck(this, IWorker);

      this.response = 'var window = self;';
    }

    _createClass(IWorker, [{
      key: "set",
      value: function set(func, name) {
        this.response += "".concat(name ? 'self' + name + '=' : '', " self.").concat(func.name, " = ").concat(func, ";");
        return this;
      }
    }, {
      key: "import",
      value: function _import(url) {
        this.response += "importScripts('".concat(url, "');");
        return this;
      }
    }, {
      key: "run",
      value: function run(name) {
        var _arguments = arguments;
        var request = "self.onmessage  = function(e){self.postMessage(self.".concat(name, ".apply(self,e.data));self.close();};");
        var worker = createWorker(this.response + request);
        return new Promise(function (resolve, reject) {
          worker.onmessage = function (event) {
            return resolve(event.data);
          };

          worker.onerror = reject;
          worker.postMessage(Array.prototype.splice.call(_arguments, 1));
        });
      }
    }]);

    return IWorker;
  }();

  return IWorker;

}));
