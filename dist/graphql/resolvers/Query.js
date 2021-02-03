"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _spiderHelper = _interopRequireDefault(require("../../utils/spiderHelper"));

var _houseModel = _interopRequireDefault(require("../../models/houseModel"));

var _analyticsModel = _interopRequireDefault(require("../../models/analyticsModel"));

// import { ObjectID } from 'mongodb'
var _default = {
  // 和 type Query 中的 allHouses 对应
  allHouses: function () {
    var _allHouses = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_parent, args) {
      var query, reg, allHouses;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              query = {};

              if (args.year !== 0) {
                reg = new RegExp("^".concat(args.year));
                query = {
                  beginTime: reg
                };
              }

              if (!(process.env.NODE_ENV === 'test')) {
                _context.next = 6;
                break;
              }

              allHouses = [{
                _id: '8493C6779815042CE053AC1D15D7580C',
                area: '温江区',
                name: '明信城',
                number: 388,
                beginTime: '2019-03-22 09:00:00',
                endTime: '2019-03-24 18:00:00',
                status: '正在报名',
                __v: 0
              }];
              _context.next = 9;
              break;

            case 6:
              _context.next = 8;
              return _houseModel["default"].find(query);

            case 8:
              allHouses = _context.sent;

            case 9:
              return _context.abrupt("return", allHouses);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function allHouses(_x, _x2) {
      return _allHouses.apply(this, arguments);
    }

    return allHouses;
  }(),
  spiderPageOne: function () {
    var _spiderPageOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", _spiderHelper["default"].spiderPage());

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function spiderPageOne() {
      return _spiderPageOne.apply(this, arguments);
    }

    return spiderPageOne;
  }(),
  pvs: function () {
    var _pvs = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_parent, args) {
      var analytics;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(process.env.NODE_ENV === 'test')) {
                _context3.next = 4;
                break;
              }

              analytics = {
                length: 7864
              };
              _context3.next = 7;
              break;

            case 4:
              _context3.next = 6;
              return _analyticsModel["default"].find(args);

            case 6:
              analytics = _context3.sent;

            case 7:
              return _context3.abrupt("return", analytics.length);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function pvs(_x3, _x4) {
      return _pvs.apply(this, arguments);
    }

    return pvs;
  }()
};
exports["default"] = _default;