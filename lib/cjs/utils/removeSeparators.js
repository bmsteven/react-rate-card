"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSeparators = void 0;
var escapeRegExp_1 = require("./escapeRegExp");
var removeSeparators = function (value, separator) {
    if (separator === void 0) { separator = ','; }
    var reg = new RegExp((0, escapeRegExp_1.escapeRegExp)(separator), 'g');
    return value.replace(reg, '');
};
exports.removeSeparators = removeSeparators;
