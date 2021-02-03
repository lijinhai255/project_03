"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _log4js = _interopRequireDefault(require("log4js"));

var _dbHelper = _interopRequireDefault(require("../utils/dbHelper"));

var mongoose = _dbHelper["default"].connect();

var logger = _log4js["default"].getLogger('globallog'); // 创建数据库


var analyticsSchema = new mongoose.Schema({
  routerName: String,
  createdTime: {
    type: Date,
    "default": Date.now
  }
}); // 创建表

var AnalyticsCol = mongoose.model('analytics', analyticsSchema);
var analyticsModel = {
  add: function add(item) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var house;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              house = new AnalyticsCol(item);
              house.save(function (err) {
                if (err) {
                  logger.error(JSON.stringify(err));
                }
              });
              return _context.abrupt("return", item);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  find: function find(query) {
    return AnalyticsCol.find(query, function (err) {
      if (err) {
        logger.error(JSON.stringify(err));
      }
    });
  }
};
var _default = analyticsModel;
exports["default"] = _default;