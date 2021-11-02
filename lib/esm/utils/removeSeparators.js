import { escapeRegExp } from './escapeRegExp';
export var removeSeparators = function (value, separator) {
    if (separator === void 0) { separator = ','; }
    var reg = new RegExp(escapeRegExp(separator), 'g');
    return value.replace(reg, '');
};
