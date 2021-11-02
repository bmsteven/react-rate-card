"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
var isNumber = function (input) { return RegExp(/\d/, 'gi').test(input); };
exports.isNumber = isNumber;
