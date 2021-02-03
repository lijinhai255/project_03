"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var schedule = _interopRequireWildcard(require("node-schedule"));

var _log4js = _interopRequireDefault(require("log4js"));

var _houseModel = _interopRequireDefault(require("../models/houseModel"));

var _spiderHelper = require("../utils/spiderHelper");

var logger = _log4js["default"].getLogger('globallog'); // 定时器middleware,每隔15分钟爬一次


var runEvery15Minute = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            schedule.scheduleJob('*/15 * * * *', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              var pageList, page, newNumber;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return Promise.all([(0, _spiderHelper.createRequestPromise)(1), (0, _spiderHelper.createRequestPromise)(2), (0, _spiderHelper.createRequestPromise)(3)]);

                    case 2:
                      pageList = _context.sent;
                      page = [].concat((0, _toConsumableArray2["default"])(pageList[0]), (0, _toConsumableArray2["default"])(pageList[1]), (0, _toConsumableArray2["default"])(pageList[2]));
                      _context.next = 6;
                      return new Promise(function (resolve) {
                        var newDataNumber = 0;
                        var i = 0;
                        page.forEach(function (item) {
                          _houseModel["default"].add(item).then(function (isSuccess) {
                            i += 1;

                            if (isSuccess) {
                              newDataNumber += 1;
                            }

                            if (i === page.length - 1) {
                              resolve(newDataNumber);
                            }
                          });
                        });
                      });

                    case 6:
                      newNumber = _context.sent;
                      logger.info("\u6293\u53D6\u6570\u636E".concat(page.length, "\u6761\uFF0C\u65B0\u6570\u636E").concat(newNumber, "\u6761\u3002"));

                    case 8:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function runEvery15Minute() {
    return _ref.apply(this, arguments);
  };
}(); // 每15分钟自动抓取前三页数据(房协网一个时间点不可能同时发布30套房源)


runEvery15Minute();