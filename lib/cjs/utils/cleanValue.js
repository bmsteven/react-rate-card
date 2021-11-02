"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanValue = void 0;
var parseAbbrValue_1 = require("./parseAbbrValue");
var removeSeparators_1 = require("./removeSeparators");
var removeInvalidChars_1 = require("./removeInvalidChars");
var escapeRegExp_1 = require("./escapeRegExp");
/**
 * Remove prefix, separators and extra decimals from value
 */
var cleanValue = function (_a) {
    var value = _a.value, _b = _a.groupSeparator, groupSeparator = _b === void 0 ? ',' : _b, _c = _a.decimalSeparator, decimalSeparator = _c === void 0 ? '.' : _c, _d = _a.allowDecimals, allowDecimals = _d === void 0 ? true : _d, _e = _a.decimalsLimit, decimalsLimit = _e === void 0 ? 2 : _e, _f = _a.allowNegativeValue, allowNegativeValue = _f === void 0 ? true : _f, _g = _a.disableAbbreviations, disableAbbreviations = _g === void 0 ? false : _g, _h = _a.prefix, prefix = _h === void 0 ? '' : _h, _j = _a.transformRawValue, transformRawValue = _j === void 0 ? function (rawValue) { return rawValue; } : _j;
    var transformedValue = transformRawValue(value);
    if (transformedValue === '-') {
        return transformedValue;
    }
    var abbreviations = disableAbbreviations ? [] : ['k', 'm', 'b'];
    var reg = new RegExp("((^|\\D)-\\d)|(-" + (0, escapeRegExp_1.escapeRegExp)(prefix) + ")");
    var isNegative = reg.test(transformedValue);
    // Is there a digit before the prefix? eg. 1$
    var _k = RegExp("(\\d+)-?" + (0, escapeRegExp_1.escapeRegExp)(prefix)).exec(value) || [], prefixWithValue = _k[0], preValue = _k[1];
    var withoutPrefix = prefix
        ? prefixWithValue
            ? transformedValue.replace(prefixWithValue, '').concat(preValue)
            : transformedValue.replace(prefix, '')
        : transformedValue;
    var withoutSeparators = (0, removeSeparators_1.removeSeparators)(withoutPrefix, groupSeparator);
    var withoutInvalidChars = (0, removeInvalidChars_1.removeInvalidChars)(withoutSeparators, __spreadArray([
        groupSeparator,
        decimalSeparator
    ], abbreviations, true));
    var valueOnly = withoutInvalidChars;
    if (!disableAbbreviations) {
        // disallow letter without number
        if (abbreviations.some(function (letter) { return letter === withoutInvalidChars.toLowerCase(); })) {
            return '';
        }
        var parsed = (0, parseAbbrValue_1.parseAbbrValue)(withoutInvalidChars, decimalSeparator);
        if (parsed) {
            valueOnly = String(parsed);
        }
    }
    var includeNegative = isNegative && allowNegativeValue ? '-' : '';
    if (decimalSeparator && valueOnly.includes(decimalSeparator)) {
        var _l = withoutInvalidChars.split(decimalSeparator), int = _l[0], decimals = _l[1];
        var trimmedDecimals = decimalsLimit && decimals ? decimals.slice(0, decimalsLimit) : decimals;
        var includeDecimals = allowDecimals ? "" + decimalSeparator + trimmedDecimals : '';
        return "" + includeNegative + int + includeDecimals;
    }
    return "" + valueOnly;
};
exports.cleanValue = cleanValue;
