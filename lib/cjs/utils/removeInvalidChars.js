"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeInvalidChars = void 0;
var escapeRegExp_1 = require("./escapeRegExp");
var removeInvalidChars = function (value, validChars) {
    var chars = (0, escapeRegExp_1.escapeRegExp)(validChars.join(''));
    var reg = new RegExp("[^\\d" + chars + "]", 'gi');
    return value.replace(reg, '');
};
exports.removeInvalidChars = removeInvalidChars;
