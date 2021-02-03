"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("../config/index"));

/* eslint-disable no-console */
var connectTimeOut;
var DbHelper = {
  connectTimes: 8,
  connect: function connect() {
    if (process.env.NODE_ENV !== 'test') {
      DbHelper.mongooseConnect();
    }

    var db = _mongoose["default"].connection;
    db.once('error', function () {
      console.error('连接 mongodb 失败。');
      connectTimeOut = setInterval(function () {
        if (DbHelper.connectTimes > 0) {
          console.log("\u6B63\u5728\u91CD\u8FDE mongodb\uFF0C\u5269\u4F59\u6B21\u6570 ".concat(DbHelper.connectTimes, "\u3002"));
          DbHelper.connectTimes -= 1;
          DbHelper.mongooseConnect();
        } else {
          console.log('重连 mongodb 失败。');
          clearTimeout(connectTimeOut);
        }
      }, 8000);
    });
    db.on('open', function () {
      console.log('连接 mongodb 成功。');
      clearTimeout(connectTimeOut);
    }); // 单例模式

    DbHelper.connect = function () {
      return _mongoose["default"];
    };

    return _mongoose["default"];
  },
  mongooseConnect: function mongooseConnect() {
    _mongoose["default"].connect(_index["default"].databaseUrl, {
      useNewUrlParser: true,
      // 弃用警告 https://mongoosejs.com/docs/deprecations.html#-findandmodify-
      useFindAndModify: false
    });
  }
};
var _default = DbHelper;
exports["default"] = _default;