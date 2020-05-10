"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E = require("fp-ts/lib/Either");
var TE = require("fp-ts/lib/TaskEither");
var pipeable_1 = require("fp-ts/lib/pipeable");
var chainExample = pipeable_1.pipe(TE.taskEither.of(1), TE.chain(function (result) { return TE.tryCatch(function () { return new Promise(function (resolve, reject) { throw new Error('random error'); }); }, function (error) { return new Error(String(error)); }); }), TE.chain(function (result) { return TE.tryCatch(function () { return new Promise(function (resolve, reject) { return reject(result * 2); }); }, function (error) { return new Error(String(error)); }); }), TE.chain(function (result) { return TE.tryCatch(function () { return new Promise(function (resolve, reject) { return resolve(result * 2); }); }, function (error) { return new Error(String(error)); }); }));
chainExample().then(function (e) { return pipeable_1.pipe(e, E.fold(function (err) { return console.log("Chain error! (" + err.message + ")"); }, function (x) { return console.log('Chain success!', x); })); });
var mapExample = pipeable_1.pipe(TE.taskEither.of(1), TE.map(function (x) { return x.toString(); }));
mapExample().then(function (e) { return pipeable_1.pipe(e, E.fold(function (err) { return console.log("Map Error! (" + err.message + ")"); }, function (x) { return console.log('Map success!', x); })); });
