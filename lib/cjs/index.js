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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var utils_1 = require("./utils");
require("antd/dist/antd.css");
require("./rate-card.css");
var axios_1 = __importDefault(require("axios"));
// custom coins
var customCoins = ["XLM", "USDT"];
// custom currencies
var customCurrencies = ["XLM", "USDT", "KES", "RWF", "TZS"];
var customCurrencyConverter = function (amount, currencies, coins, coinslayer_access_key, currencylayer_access_key, setCurrenciesResults, setCoinsResults, setCoinsLoading, setCurrenciesLoading, setCoinsError, setCurrenciesError) {
    if (amount === undefined || amount === null) {
        setCurrenciesLoading(false);
        setCurrenciesError("Input Error");
        return null;
    }
    setCurrenciesLoading(true);
    setCoinsLoading(true);
    setCurrenciesError("");
    setCoinsError("");
    var newCurrencies = "";
    var newCoins = "";
    currencies.forEach(function (el, index) {
        if (!coins.find(function (e) { return e === el; })) {
            if (index === (currencies === null || currencies === void 0 ? void 0 : currencies.length) - 1) {
                newCurrencies = newCurrencies + el;
            }
            else {
                newCurrencies = newCurrencies + el + ",";
            }
        }
    });
    coins.forEach(function (el, index) {
        if (index === (coins === null || coins === void 0 ? void 0 : coins.length) - 1) {
            newCoins = newCoins + el;
        }
        else {
            newCoins = newCoins + el + ",";
        }
    });
    // coinslayer
    var coinslayerApi = "https://api.coinlayer.com/api/live?access_key=" + coinslayer_access_key + "&symbols=" + newCoins + "&target=USD";
    var currencylayerApi = "https://apilayer.net/api/live?access_key=" + currencylayer_access_key + "&currencies=" + newCurrencies + "&source=USD&format=1";
    // fetch coins
    axios_1.default
        .get(coinslayerApi)
        .then(function (res) {
        var _a, _b, _c, _d, _e;
        setCoinsLoading(false);
        if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.rates) {
            setCoinsResults((_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.rates);
        }
        if ((_c = res.data) === null || _c === void 0 ? void 0 : _c.error)
            setCoinsError((_e = (_d = res === null || res === void 0 ? void 0 : res.data) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.type);
    })
        .catch(function (err) {
        setCoinsLoading(false);
        if (err.message === "Network Error") {
            setCoinsError(err === null || err === void 0 ? void 0 : err.message);
        }
        else {
            setCoinsError("Error");
        }
    });
    // fetch currencies
    axios_1.default
        .get(currencylayerApi)
        .then(function (res) {
        var _a, _b, _c, _d, _e;
        setCurrenciesLoading(false);
        if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.quotes) {
            setCurrenciesResults((_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.quotes);
        }
        if ((_c = res.data) === null || _c === void 0 ? void 0 : _c.error)
            setCurrenciesError((_e = (_d = res === null || res === void 0 ? void 0 : res.data) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.info);
    })
        .catch(function (err) {
        setCurrenciesLoading(false);
        if (err.message === "Network Error") {
            setCurrenciesError(err === null || err === void 0 ? void 0 : err.message);
        }
        else {
            setCurrenciesError("Error");
        }
    });
};
var RateCard = function (_a) {
    var _b = _a.coins, coins = _b === void 0 ? customCoins : _b, _c = _a.currencies, currencies = _c === void 0 ? customCurrencies : _c, _d = _a.defaultSelected, defaultSelected = _d === void 0 ? coins[0] : _d, customStyles = _a.customStyles, customClass = _a.customClass, inputClass = _a.inputClass, inputStyle = _a.inputStyle, currencyStyle = _a.currencyStyle, currencyClass = _a.currencyClass, currencylayer_access_key = _a.currencylayer_access_key, coinslayer_access_key = _a.coinslayer_access_key, errorStyle = _a.errorStyle, errorClass = _a.errorClass;
    var _e = (0, react_1.useState)(true), coinsLoading = _e[0], setCoinsLoading = _e[1];
    var _f = (0, react_1.useState)(true), currenciesLoading = _f[0], setCurrenciesLoading = _f[1];
    var _g = (0, react_1.useState)(""), coinsError = _g[0], setCoinsError = _g[1];
    var _h = (0, react_1.useState)(""), currenciesError = _h[0], setCurrenciesError = _h[1];
    var _j = (0, react_1.useState)(null), rates = _j[0], setRates = _j[1];
    var _k = (0, react_1.useState)(0), conversionRate = _k[0], setConversionRate = _k[1];
    var _l = (0, react_1.useState)(null), coin = _l[0], setCoins = _l[1];
    var _m = (0, react_1.useState)(null), currenciesResults = _m[0], setCurrenciesResults = _m[1];
    var _o = (0, react_1.useState)(null), coinsResult = _o[0], setCoinsResults = _o[1];
    var _p = (0, react_1.useState)({
        selected: defaultSelected,
        amount: 0,
        displayValue: 0,
    }), variables = _p[0], setVariables = _p[1];
    var selected = variables.selected, amount = variables.amount, displayValue = variables.displayValue;
    var Option = antd_1.Select.Option;
    var handleSelectChange = (0, react_1.useCallback)(function (value) {
        setVariables(__assign(__assign({}, variables), { selected: value }));
    }, [variables]);
    var handleValueChange = function (e) {
        var value = e.target.value;
        if (parseFloat((0, utils_1.cleanValue)({ value: value })) >= 0) {
            setVariables(__assign(__assign({}, variables), { amount: (0, utils_1.cleanValue)({ value: value }), displayValue: (0, utils_1.cleanValue)({ value: value }) }));
        }
        else {
            setVariables(__assign(__assign({}, variables), { amount: 0, displayValue: (0, utils_1.cleanValue)({ value: value }) }));
        }
    };
    (0, react_1.useEffect)(function () {
        customCurrencyConverter(amount, currencies, coins, coinslayer_access_key, currencylayer_access_key, setCurrenciesResults, setCoinsResults, setCoinsLoading, setCurrenciesLoading, setCoinsError, setCurrenciesError);
    }, [currencies, coins]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (currenciesResults) {
            var arr = (_a = Object === null || Object === void 0 ? void 0 : Object.keys(currenciesResults)) === null || _a === void 0 ? void 0 : _a.map(function (key) { return key && { rate: key, value: currenciesResults[key] }; });
            setRates(arr);
        }
    }, [currenciesResults]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (coinsResult) {
            var arr = (_a = Object === null || Object === void 0 ? void 0 : Object.keys(coinsResult)) === null || _a === void 0 ? void 0 : _a.map(function (key) { return key && { rate: key, value: coinsResult[key] }; });
            setCoins(arr);
        }
    }, [coinsResult]);
    (0, react_1.useEffect)(function () {
        var y = 0;
        if (coin) {
            coin === null || coin === void 0 ? void 0 : coin.forEach(function (el) {
                var _a;
                if ((_a = el === null || el === void 0 ? void 0 : el.rate) === null || _a === void 0 ? void 0 : _a.includes(selected)) {
                    y = el === null || el === void 0 ? void 0 : el.value;
                }
            });
        }
        setConversionRate(y);
    }, [coin, selected]);
    return (react_1.default.createElement(antd_1.Card, { style: __assign({}, customStyles), className: "rate-card " + customClass },
        react_1.default.createElement("section", { className: "inputs-section" },
            react_1.default.createElement("article", { className: "col" },
                react_1.default.createElement("div", { style: {
                        textAlign: "right",
                        marginBottom: ".5rem",
                    } },
                    react_1.default.createElement("label", { htmlFor: "currency" }, "Base currency")),
                react_1.default.createElement(antd_1.Select, { id: "currency", defaultValue: coins[0], value: selected, style: __assign({ width: "100%", textAlign: "right", fontWeight: 600 }, inputStyle), onChange: handleSelectChange, className: "input-field select-input " + inputClass }, (coins === null || coins === void 0 ? void 0 : coins.length) > 0 &&
                    coins.map(function (option) { return (react_1.default.createElement(Option, { value: option, key: option }, option)); }))),
            react_1.default.createElement("article", { className: "amount-field col" },
                react_1.default.createElement("div", { style: {
                        textAlign: "right",
                        marginBottom: ".5rem",
                    } },
                    react_1.default.createElement("label", { htmlFor: "amount" }, "Amount")),
                react_1.default.createElement("input", { id: "amount", value: parseFloat(amount) < 10000
                        ? displayValue
                        : (0, utils_1.formatValue)({
                            value: displayValue + "",
                            groupSeparator: ",",
                            decimalSeparator: ".",
                        }), style: __assign({ width: "100%", textAlign: "right", fontWeight: 600 }, inputStyle), min: 0, onChange: handleValueChange, className: "input-field amount-input " + inputClass }))),
        coinsLoading || currenciesLoading ? (react_1.default.createElement("section", null,
            react_1.default.createElement("p", { style: {
                    textAlign: "center",
                    width: "100%",
                    fontWeight: 600,
                } }, "Please wait"))) : (react_1.default.createElement(react_1.default.Fragment, null, coinsError || currenciesError ? (react_1.default.createElement("section", null,
            react_1.default.createElement("p", { className: "" + errorClass, style: __assign({ color: "red", textAlign: "center", width: "100%", fontWeight: 600 }, errorStyle) },
                coinsError,
                " ",
                react_1.default.createElement("br", null)))) : (react_1.default.createElement("section", null, (currencies === null || currencies === void 0 ? void 0 : currencies.length) > 0 &&
            currencies
                .filter(function (el) { return el !== selected; })
                .map(function (rate) { return (react_1.default.createElement(Rate, { key: rate, rates: rates, coins: coin, conversionRate: conversionRate, selected: selected, currency: rate, amount: amount, currencyClass: currencyClass, currencyStyle: currencyStyle })); })))))));
};
var Rate = function (_a) {
    var currency = _a.currency, amount = _a.amount, conversionRate = _a.conversionRate, rates = _a.rates, coins = _a.coins, currencyClass = _a.currencyClass, currencyStyle = _a.currencyStyle;
    var _b = (0, react_1.useState)("0.00"), newAmount = _b[0], setAmount = _b[1];
    var _c = (0, react_1.useState)("0.00"), displayAmount = _c[0], setDisplayAmount = _c[1];
    var splitValue = displayAmount.split(".");
    var decimals = function () {
        var _a;
        if (displayAmount) {
            var splitDecimals = (_a = splitValue[1]) === null || _a === void 0 ? void 0 : _a.split("");
            if ((splitDecimals === null || splitDecimals === void 0 ? void 0 : splitDecimals.length) > 0) {
                return (splitDecimals[0] + "" + (splitDecimals[1] ? splitDecimals[1] : "0"));
            }
            else {
                return "00";
            }
        }
        else {
            return null;
        }
    };
    (0, react_1.useEffect)(function () {
        setDisplayAmount((0, utils_1.formatValue)({
            value: newAmount + "",
            groupSeparator: ",",
            decimalSeparator: ".",
        }));
    }, [newAmount]);
    (0, react_1.useEffect)(function () {
        if (rates) {
            var v_1, y_1;
            rates === null || rates === void 0 ? void 0 : rates.forEach(function (el) {
                var _a;
                if (coins === null || coins === void 0 ? void 0 : coins.find(function (e) { return e.rate === currency; })) {
                    var x = void 0;
                    x = coins === null || coins === void 0 ? void 0 : coins.find(function (e) { return e.rate === currency; });
                    if (x) {
                        y_1 = x === null || x === void 0 ? void 0 : x.value;
                    }
                    return;
                }
                if ((_a = el === null || el === void 0 ? void 0 : el.rate) === null || _a === void 0 ? void 0 : _a.includes(currency)) {
                    v_1 = el === null || el === void 0 ? void 0 : el.value;
                }
            });
            if (v_1 && v_1 > 0) {
                setAmount(v_1 * amount * conversionRate);
            }
            else if (y_1 && y_1 > 0) {
                setAmount((amount * conversionRate) / y_1);
            }
        }
    }, [rates, amount, coins, conversionRate]);
    return (react_1.default.createElement("article", { style: __assign({ textAlign: "right", marginBottom: "2.5rem", fontWeight: 600 }, currencyStyle), className: "currency col " + currencyClass },
        react_1.default.createElement("p", { style: {
                fontSize: 17,
            } },
            react_1.default.createElement("span", { className: "currency-code" }, currency)),
        react_1.default.createElement("p", { className: "currency-amount", style: {
                fontSize: 20,
            } },
            react_1.default.createElement("span", { style: {
                    color: parseFloat(splitValue[0]) === 0 &&
                        (splitValue[1] ? parseFloat(splitValue[1]) === 0 : true)
                        ? "lightgray"
                        : "gray",
                } },
                splitValue[0],
                "."),
            react_1.default.createElement("span", { style: {
                    color: decimals() === "00" ? "lightgray" : "gray",
                } }, decimals()))));
};
exports.default = RateCard;
