"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.formatValue = void 0;
var escapeRegExp_1 = require("./escapeRegExp");
var getSuffix_1 = require("./getSuffix");
/**
 * Format value with decimal separator, group separator and prefix
 */
var formatValue = function (options) {
    var _value = options.value, decimalSeparator = options.decimalSeparator, intlConfig = options.intlConfig, decimalScale = options.decimalScale, _a = options.prefix, prefix = _a === void 0 ? '' : _a, _b = options.suffix, suffix = _b === void 0 ? '' : _b;
    if (_value === '' || _value === undefined) {
        return '';
    }
    if (_value === '-') {
        return '-';
    }
    var isNegative = new RegExp("^\\d?-" + (prefix ? (0, escapeRegExp_1.escapeRegExp)(prefix) + "?" : '') + "\\d").test(_value);
    var value = decimalSeparator !== '.'
        ? replaceDecimalSeparator(_value, decimalSeparator, isNegative)
        : _value;
    var numberFormatter = intlConfig
        ? new Intl.NumberFormat(intlConfig.locale, intlConfig.currency
            ? {
                style: 'currency',
                currency: intlConfig.currency,
                minimumFractionDigits: decimalScale || 0,
                maximumFractionDigits: 20,
            }
            : undefined)
        : new Intl.NumberFormat(undefined, {
            minimumFractionDigits: decimalScale || 0,
            maximumFractionDigits: 20,
        });
    var parts = numberFormatter.formatToParts(Number(value));
    var formatted = replaceParts(parts, options);
    // Does intl formatting add a suffix?
    var intlSuffix = (0, getSuffix_1.getSuffix)(formatted, __assign({}, options));
    // Include decimal separator if user input ends with decimal separator
    var includeDecimalSeparator = _value.slice(-1) === decimalSeparator ? decimalSeparator : '';
    var _c = value.match(RegExp('\\d+\\.(\\d+)')) || [], decimals = _c[1];
    // Keep original decimal padding if no decimalScale
    if (decimalScale === undefined && decimals && decimalSeparator) {
        if (formatted.includes(decimalSeparator)) {
            formatted = formatted.replace(RegExp("(\\d+)(" + (0, escapeRegExp_1.escapeRegExp)(decimalSeparator) + ")(\\d+)", 'g'), "$1$2" + decimals);
        }
        else {
            if (intlSuffix && !suffix) {
                formatted = formatted.replace(intlSuffix, "" + decimalSeparator + decimals + intlSuffix);
            }
            else {
                formatted = "" + formatted + decimalSeparator + decimals;
            }
        }
    }
    if (suffix && includeDecimalSeparator) {
        return "" + formatted + includeDecimalSeparator + suffix;
    }
    if (intlSuffix && includeDecimalSeparator) {
        return formatted.replace(intlSuffix, "" + includeDecimalSeparator + intlSuffix);
    }
    if (intlSuffix && suffix) {
        return formatted.replace(intlSuffix, "" + includeDecimalSeparator + suffix);
    }
    return [formatted, includeDecimalSeparator, suffix].join('');
};
exports.formatValue = formatValue;
/**
 * Before converting to Number, decimal separator has to be .
 */
var replaceDecimalSeparator = function (value, decimalSeparator, isNegative) {
    var newValue = value;
    if (decimalSeparator && decimalSeparator !== '.') {
        newValue = newValue.replace(RegExp((0, escapeRegExp_1.escapeRegExp)(decimalSeparator), 'g'), '.');
        if (isNegative && decimalSeparator === '-') {
            newValue = "-" + newValue.slice(1);
        }
    }
    return newValue;
};
var replaceParts = function (parts, _a) {
    var prefix = _a.prefix, groupSeparator = _a.groupSeparator, decimalSeparator = _a.decimalSeparator, decimalScale = _a.decimalScale, _b = _a.disableGroupSeparators, disableGroupSeparators = _b === void 0 ? false : _b;
    return parts
        .reduce(function (prev, _a, i) {
        var type = _a.type, value = _a.value;
        if (i === 0 && prefix) {
            if (type === 'minusSign') {
                return [value, prefix];
            }
            if (type === 'currency') {
                return __spreadArray(__spreadArray([], prev, true), [prefix], false);
            }
            return [prefix, value];
        }
        if (type === 'currency') {
            return prefix ? prev : __spreadArray(__spreadArray([], prev, true), [value], false);
        }
        if (type === 'group') {
            return !disableGroupSeparators
                ? __spreadArray(__spreadArray([], prev, true), [groupSeparator !== undefined ? groupSeparator : value], false) : prev;
        }
        if (type === 'decimal') {
            if (decimalScale !== undefined && decimalScale === 0) {
                return prev;
            }
            return __spreadArray(__spreadArray([], prev, true), [decimalSeparator !== undefined ? decimalSeparator : value], false);
        }
        if (type === 'fraction') {
            return __spreadArray(__spreadArray([], prev, true), [decimalScale !== undefined ? value.slice(0, decimalScale) : value], false);
        }
        return __spreadArray(__spreadArray([], prev, true), [value], false);
    }, [''])
        .join('');
};
