import { escapeRegExp } from './escapeRegExp';
export var removeInvalidChars = function (value, validChars) {
    var chars = escapeRegExp(validChars.join(''));
    var reg = new RegExp("[^\\d" + chars + "]", 'gi');
    return value.replace(reg, '');
};
