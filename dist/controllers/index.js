"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _houseModel = _interopRequireDefault(require("../models/houseModel"));

var _spiderHelper = _interopRequireDefault(require("../utils/spiderHelper"));

// eslint-disable-next-line import/no-extraneous-dependencies
var router = new _koaRouter["default"]();
router.get('/initspider', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var _ctx$request$query, pageStart, pageEnd, pageStartNumber, pageEndNumber, result;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$query = ctx.request.query, pageStart = _ctx$request$query.pageStart, pageEnd = _ctx$request$query.pageEnd;
            pageStartNumber = Number.parseInt(pageStart, 10);
            pageEndNumber = Number.parseInt(pageEnd, 10);
            _context.next = 5;
            return _spiderHelper["default"].initspider(pageStartNumber, pageEndNumber);

          case 5:
            result = _context.sent;
            ctx.body = result;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()).get('/getMongoData', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = [];

            if (!(process.env.NODE_ENV === 'test')) {
              _context2.next = 5;
              break;
            }

            result = [{
              _id: '8493C6779815042CE053AC1D15D7580C',
              area: '温江区',
              name: '明信城',
              number: 388,
              beginTime: '2019-03-22 09:00:00',
              endTime: '2019-03-24 18:00:00',
              status: '正在报名',
              __v: 0
            }];
            _context2.next = 8;
            break;

          case 5:
            _context2.next = 7;
            return _houseModel["default"].find();

          case 7:
            result = _context2.sent;

          case 8:
            ctx.body = result;

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}()).get('/spiderPage', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var pageNo, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            pageNo = ctx.request.query.pageNo;
            _context3.next = 3;
            return _spiderHelper["default"].spiderPage(pageNo);

          case 3:
            result = _context3.sent;
            ctx.body = result;

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}()) // 支持 browserRouter
.get(/\/20[1-9][0-9]/, function (ctx) {
  var file = _fs["default"].readFileSync(_path["default"].join('client/index.html'));

  ctx.set('Content-Type', 'text/html; charset=utf-8');
  ctx.body = file;
}).get("/cssData", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ctx.body = JSON.stringify({
              data: "ok"
            });

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = {
  init: function init(app) {
    app.use(router.routes()).use(router.allowedMethods());
  }
};
exports["default"] = _default;