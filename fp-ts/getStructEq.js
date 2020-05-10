"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Eq_1 = require("fp-ts/lib/Eq");
var eqNumber = {
    equals: function (x, y) { return x === y; }
};
var eqPoint = Eq_1.getStructEq({
    x: eqNumber,
    y: eqNumber
});
var point1 = { x: 0, y: 1 };
var point2 = { x: 0, y: 1 };
console.log(eqPoint.equals(point1, point2));
