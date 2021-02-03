"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _log4js = _interopRequireDefault(require("log4js"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _ErrorHander = _interopRequireDefault(require("./middleware/ErrorHander"));

var _AnalysicsHander = _interopRequireDefault(require("./middleware/AnalysicsHander"));

var _controllers = _interopRequireDefault(require("./controllers"));

var _config = _interopRequireDefault(require("./config"));

require("./controllers/schedule");

var _graphql = _interopRequireDefault(require("./graphql"));

var app = new _koa["default"]();
app.use((0, _koaBody["default"])()); // 错误日志记录

_log4js["default"].configure({
  appenders: {
    globallog: {
      type: 'file',
      filename: './logs/globallog.log'
    }
  },
  categories: {
    "default": {
      appenders: ['globallog'],
      level: 'debug'
    }
  }
});

var logger = _log4js["default"].getLogger('globallog');

_ErrorHander["default"].init(app, logger);

_AnalysicsHander["default"].init(app); // 初始化路由


_controllers["default"].init(app); // 初始化 graphql


(0, _graphql["default"])(app); // 静态资源目录

app.use((0, _koaStatic["default"])('client')); // eslint-disable-next-line no-console

console.log("server is running at : http://localhost:".concat(_config["default"].serverPort)); // 全局异常捕获

process.on('uncaughtException', function (err) {
  logger.error(JSON.stringify(err));
}); // 导出给 jest 测试

module.exports = app.listen(_config["default"].serverPort);