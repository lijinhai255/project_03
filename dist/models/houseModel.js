"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _asyncIterator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncIterator"));

var _log4js = _interopRequireDefault(require("log4js"));

var _dbHelper = _interopRequireDefault(require("../utils/dbHelper"));

/* eslint-disable no-underscore-dangle */
var mongoose = _dbHelper["default"].connect();

var logger = _log4js["default"].getLogger('globallog'); // 创建数据库


var HouseSchema = new mongoose.Schema({
  _id: String,
  area: String,
  name: String,
  number: Number,
  beginTime: String,
  endTime: String,
  status: String
}); // 创建表

var HouseCol = mongoose.model('house', HouseSchema);
var houseModel = {
  /**
   *
   * 新增一个房源信息，若存在，则更新
   * @param {cdFang.IhouseData} item
   * @returns {(Promise<boolean | cdFang.IhouseData>)}
   */
  add: function add(item) {
    var _this = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var result, findItem, house;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = item;
              _context.next = 3;
              return _this.find({
                _id: item._id
              });

            case 3:
              findItem = _context.sent;

              if (!(findItem.length > 0)) {
                _context.next = 8;
                break;
              }

              // 如果状态变更执行更新操作
              if (findItem[0].status !== item.status) {
                _this.update(item);
              } else {
                result = false;
              }

              _context.next = 12;
              break;

            case 8:
              house = new HouseCol(item);
              _context.next = 11;
              return new Promise(function (resolve) {
                house.save(function (err) {
                  if (err) {
                    logger.error(JSON.stringify(err));
                    resolve(false);
                  }
                });
              });

            case 11:
              result = _context.sent;

            case 12:
              return _context.abrupt("return", result);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

  /**
   *
   * 批量插入房源信息
   * @param {cdFang.IhouseData[]} array
   * @returns {Promise<void>}
   */
  addMany: function addMany(array) {
    var _this2 = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var newArray, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item, findItem;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              newArray = []; // eslint-disable-next-line no-restricted-syntax

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _context2.prev = 3;
              _iterator = (0, _asyncIterator2["default"])(array);

            case 5:
              _context2.next = 7;
              return _iterator.next();

            case 7:
              _step = _context2.sent;
              _iteratorNormalCompletion = _step.done;
              _context2.next = 11;
              return _step.value;

            case 11:
              _value = _context2.sent;

              if (_iteratorNormalCompletion) {
                _context2.next = 21;
                break;
              }

              item = _value;
              _context2.next = 16;
              return _this2.find({
                _id: item._id
              });

            case 16:
              findItem = _context2.sent;

              if (findItem.length === 0) {
                newArray.push(item);
              }

            case 18:
              _iteratorNormalCompletion = true;
              _context2.next = 5;
              break;

            case 21:
              _context2.next = 27;
              break;

            case 23:
              _context2.prev = 23;
              _context2.t0 = _context2["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 27:
              _context2.prev = 27;
              _context2.prev = 28;

              if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
                _context2.next = 32;
                break;
              }

              _context2.next = 32;
              return _iterator["return"]();

            case 32:
              _context2.prev = 32;

              if (!_didIteratorError) {
                _context2.next = 35;
                break;
              }

              throw _iteratorError;

            case 35:
              return _context2.finish(32);

            case 36:
              return _context2.finish(27);

            case 37:
              HouseCol.create(newArray, function (err) {
                if (err) {
                  logger.error(JSON.stringify(err));
                }
              });

            case 38:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 23, 27, 37], [28,, 32, 36]]);
    }))();
  },

  /**
   *
   * 更新一个房源信息
   * @param {cdFang.IhouseData} item
   */
  update: function update(item) {
    HouseCol.findOneAndUpdate({
      _id: item._id
    }, item, function (err) {
      if (err) {
        logger.error(JSON.stringify(err));
      }
    });
  },

  /**
   *
   *
   * @param {object} [query]
   * @returns {cdFang.IhouseData[]}
   */
  find: function find(query) {
    return HouseCol.find(query, function (err) {
      if (err) {
        logger.error(JSON.stringify(err));
      }
    });
  }
};
var _default = houseModel;
exports["default"] = _default;