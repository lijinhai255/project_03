"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Query = _interopRequireDefault(require("./Query"));

// import Mutation from "./Mutation";
// import Type from "./Type";
var _default = {
  Query: _Query["default"] // Mutation,
  // ...Type

};
exports["default"] = _default;