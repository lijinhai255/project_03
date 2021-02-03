"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformArray = transformArray;

/* eslint-disable import/prefer-default-export */
function transformArray(array) {
  var result = array.map(function (item) {
    return {
      _id: item[0],
      area: item[2],
      name: item[3],
      number: Number.parseInt(item[6], 10),
      beginTime: item[8],
      endTime: item[9],
      status: item[13]
    };
  });
  return result;
}