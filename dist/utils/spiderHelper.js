"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createRequestPromise = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var request = _interopRequireWildcard(require("superagent"));

var cheerio = _interopRequireWildcard(require("cheerio"));

var util = _interopRequireWildcard(require("./index"));

var _houseModel = _interopRequireDefault(require("../models/houseModel"));

var _config = _interopRequireDefault(require("../config"));

var createRequestPromise = function createRequestPromise(pageNo) {
  return new Promise(function (resolve) {
    request.post("".concat(_config["default"].spiderDomain, "/lottery/accept/projectList?pageNo=").concat(pageNo)).end(function (err, result) {
      if (err) {
        return;
      }

      var $ = cheerio.load(result.text);
      var trList = [];
      $('#_projectInfo>tr').each(function (i, tr) {
        var tdList = [];
        $(tr).find('td').each(function (j, td) {
          tdList.push($(td).text());
        });
        trList.push(tdList);
      });
      resolve(util.transformArray(trList));
    });
  });
};

exports.createRequestPromise = createRequestPromise;

var initspider = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(pageStart, pageEnd) {
    var allPromises, i, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            allPromises = [];

            for (i = pageStart; i <= pageEnd; i += 1) {
              allPromises.push(createRequestPromise(i));
            }

            _context.next = 4;
            return Promise.all(allPromises).then(function (posts) {
              _houseModel["default"].addMany(posts[0]);

              return posts[0];
            });

          case 4:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initspider(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var spiderPage = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var pageNo,
        page,
        promises,
        successArray,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            pageNo = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 1;
            _context2.next = 3;
            return createRequestPromise(pageNo);

          case 3:
            page = _context2.sent;
            promises = page.map(function (item) {
              return new Promise(function (resolve) {
                resolve(_houseModel["default"].add(item));
              });
            });
            _context2.next = 7;
            return Promise.all(promises).then(function (posts) {
              return posts.filter(function (item) {
                return !!item;
              });
            })["catch"](function () {
              return [];
            });

          case 7:
            successArray = _context2.sent;
            return _context2.abrupt("return", {
              successArray: successArray,
              allLength: page.length
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function spiderPage() {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  initspider: initspider,
  spiderPage: spiderPage
};
exports["default"] = _default;