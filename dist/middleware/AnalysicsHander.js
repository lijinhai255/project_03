"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _log4js = _interopRequireDefault(require("log4js"));

var _analyticsModel = _interopRequireDefault(require("../models/analyticsModel"));

var logger = _log4js["default"].getLogger('globallog');

var analyticsHander = {
  init: function init(app) {
    // 捕获 请求
    app.use( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
        var queryString, matchedArray, routerName;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                logger.info(ctx.req.url);

                if (ctx.method !== 'OPTIONS') {
                  // graphql 请求
                  if (ctx.request.url === '/graphql' && ctx.request.body.query) {
                    queryString = ctx.request.body.query.replace(/[\s|\n]/g, '');
                    matchedArray = queryString.match(/(?<={)\w+/);
                    routerName = matchedArray == null ? '' : matchedArray[0];

                    _analyticsModel["default"].add({
                      routerName: routerName
                    });
                  } else {
                    _analyticsModel["default"].add({
                      routerName: ctx.request.path.substr(1)
                    });
                  }
                }

                _context.next = 4;
                return next();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }
};
var _default = analyticsHander;
exports["default"] = _default;