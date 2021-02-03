"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _fs = require("fs");

var _path = require("path");

var _resolvers = _interopRequireDefault(require("./resolvers"));

// eslint-disable-next-line import/no-extraneous-dependencies
var typeDefs = (0, _fs.readFileSync)((0, _path.join)(__dirname, './typeDefs.graphql'), 'UTF-8');

function initGraphQL(app) {
  var server = new _apolloServerKoa.ApolloServer({
    typeDefs: typeDefs,
    resolvers: _resolvers["default"]
  });
  server.applyMiddleware({
    app: app
  });
}

var _default = initGraphQL;
exports["default"] = _default;