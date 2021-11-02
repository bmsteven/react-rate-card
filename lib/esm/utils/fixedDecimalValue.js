export var fixedDecimalValue = function (value, decimalSeparator, fixedDecimalLength) {
    if (fixedDecimalLength && value.length > 1) {
        if (value.includes(decimalSeparator)) {
            var _a = value.split(decimalSeparator), int = _a[0], decimals = _a[1];
            if (decimals.length > fixedDecimalLength) {
                return "" + int + decimalSeparator + decimals.slice(0, fixedDecimalLength);
            }
        }
        var reg = value.length > fixedDecimalLength
            ? new RegExp("(\\d+)(\\d{" + fixedDecimalLength + "})")
            : new RegExp("(\\d)(\\d+)");
        var match = value.match(reg);
        if (match) {
            var int = match[1], decimals = match[2];
            return "" + int + decimalSeparator + decimals;
        }
    }
    return value;
};
