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
import React, { useState, useEffect, useCallback } from "react";
import { Card, Select } from "antd";
import { formatValue, cleanValue } from "./utils";
import "antd/dist/antd.css";
import "./rate-card.css";
import axios from "axios";
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
    var coinslayerApi = "http://api.coinlayer.com/api/live?access_key=" + coinslayer_access_key + "&symbols=" + newCoins + "&target=USD";
    var currencylayerApi = "http://apilayer.net/api/live?access_key=" + currencylayer_access_key + "&currencies=" + newCurrencies + "&source=USD&format=1";
    // fetch coins
    axios
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
    axios
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
    var _e = useState(true), coinsLoading = _e[0], setCoinsLoading = _e[1];
    var _f = useState(true), currenciesLoading = _f[0], setCurrenciesLoading = _f[1];
    var _g = useState(""), coinsError = _g[0], setCoinsError = _g[1];
    var _h = useState(""), currenciesError = _h[0], setCurrenciesError = _h[1];
    var _j = useState(null), rates = _j[0], setRates = _j[1];
    var _k = useState(0), conversionRate = _k[0], setConversionRate = _k[1];
    var _l = useState(null), coin = _l[0], setCoins = _l[1];
    var _m = useState(null), currenciesResults = _m[0], setCurrenciesResults = _m[1];
    var _o = useState(null), coinsResult = _o[0], setCoinsResults = _o[1];
    var _p = useState({
        selected: defaultSelected,
        amount: 0,
        displayValue: 0,
    }), variables = _p[0], setVariables = _p[1];
    var selected = variables.selected, amount = variables.amount, displayValue = variables.displayValue;
    var Option = Select.Option;
    var handleSelectChange = useCallback(function (value) {
        setVariables(__assign(__assign({}, variables), { selected: value }));
    }, [variables]);
    var handleValueChange = function (e) {
        var value = e.target.value;
        if (parseFloat(cleanValue({ value: value })) >= 0) {
            setVariables(__assign(__assign({}, variables), { amount: cleanValue({ value: value }), displayValue: cleanValue({ value: value }) }));
        }
        else {
            setVariables(__assign(__assign({}, variables), { amount: 0, displayValue: cleanValue({ value: value }) }));
        }
    };
    useEffect(function () {
        customCurrencyConverter(amount, currencies, coins, coinslayer_access_key, currencylayer_access_key, setCurrenciesResults, setCoinsResults, setCoinsLoading, setCurrenciesLoading, setCoinsError, setCurrenciesError);
    }, [currencies, coins]);
    useEffect(function () {
        var _a;
        if (currenciesResults) {
            var arr = (_a = Object === null || Object === void 0 ? void 0 : Object.keys(currenciesResults)) === null || _a === void 0 ? void 0 : _a.map(function (key) { return key && { rate: key, value: currenciesResults[key] }; });
            setRates(arr);
        }
    }, [currenciesResults]);
    useEffect(function () {
        var _a;
        if (coinsResult) {
            var arr = (_a = Object === null || Object === void 0 ? void 0 : Object.keys(coinsResult)) === null || _a === void 0 ? void 0 : _a.map(function (key) { return key && { rate: key, value: coinsResult[key] }; });
            setCoins(arr);
        }
    }, [coinsResult]);
    useEffect(function () {
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
    return (React.createElement(Card, { style: __assign({}, customStyles), className: "rate-card " + customClass },
        React.createElement("section", { className: "inputs-section" },
            React.createElement("article", { className: "col" },
                React.createElement("div", { style: {
                        textAlign: "right",
                        marginBottom: ".5rem",
                    } },
                    React.createElement("label", { htmlFor: "currency" }, "Base currency")),
                React.createElement(Select, { id: "currency", defaultValue: coins[0], value: selected, style: __assign({ width: "100%", textAlign: "right", fontWeight: 600 }, inputStyle), onChange: handleSelectChange, className: "input-field select-input " + inputClass }, (coins === null || coins === void 0 ? void 0 : coins.length) > 0 &&
                    coins.map(function (option) { return (React.createElement(Option, { value: option, key: option }, option)); }))),
            React.createElement("article", { className: "amount-field col" },
                React.createElement("div", { style: {
                        textAlign: "right",
                        marginBottom: ".5rem",
                    } },
                    React.createElement("label", { htmlFor: "amount" }, "Amount")),
                React.createElement("input", { id: "amount", value: parseFloat(amount) < 10000
                        ? displayValue
                        : formatValue({
                            value: displayValue + "",
                            groupSeparator: ",",
                            decimalSeparator: ".",
                        }), style: __assign({ width: "100%", textAlign: "right", fontWeight: 600 }, inputStyle), min: 0, onChange: handleValueChange, className: "input-field amount-input " + inputClass }))),
        coinsLoading || currenciesLoading ? (React.createElement("section", null,
            React.createElement("p", { style: {
                    textAlign: "center",
                    width: "100%",
                    fontWeight: 600,
                } }, "Please wait"))) : (React.createElement(React.Fragment, null, coinsError || currenciesError ? (React.createElement("section", null,
            React.createElement("p", { className: "" + errorClass, style: __assign({ color: "red", textAlign: "center", width: "100%", fontWeight: 600 }, errorStyle) },
                coinsError,
                " ",
                React.createElement("br", null)))) : (React.createElement("section", null, (currencies === null || currencies === void 0 ? void 0 : currencies.length) > 0 &&
            currencies
                .filter(function (el) { return el !== selected; })
                .map(function (rate) { return (React.createElement(Rate, { key: rate, rates: rates, coins: coin, conversionRate: conversionRate, selected: selected, currency: rate, amount: amount, currencyClass: currencyClass, currencyStyle: currencyStyle })); })))))));
};
var Rate = function (_a) {
    var currency = _a.currency, amount = _a.amount, conversionRate = _a.conversionRate, rates = _a.rates, coins = _a.coins, currencyClass = _a.currencyClass, currencyStyle = _a.currencyStyle;
    var _b = useState("0.00"), newAmount = _b[0], setAmount = _b[1];
    var _c = useState("0.00"), displayAmount = _c[0], setDisplayAmount = _c[1];
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
    useEffect(function () {
        setDisplayAmount(formatValue({
            value: newAmount + "",
            groupSeparator: ",",
            decimalSeparator: ".",
        }));
    }, [newAmount]);
    useEffect(function () {
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
    return (React.createElement("article", { style: __assign({ textAlign: "right", marginBottom: "2.5rem", fontWeight: 600 }, currencyStyle), className: "currency col " + currencyClass },
        React.createElement("p", { style: {
                fontSize: 17,
            } },
            React.createElement("span", { className: "currency-code" }, currency)),
        React.createElement("p", { className: "currency-amount", style: {
                fontSize: 20,
            } },
            React.createElement("span", { style: {
                    color: parseFloat(splitValue[0]) === 0 &&
                        (splitValue[1] ? parseFloat(splitValue[1]) === 0 : true)
                        ? "lightgray"
                        : "gray",
                } },
                splitValue[0],
                "."),
            React.createElement("span", { style: {
                    color: decimals() === "00" ? "lightgray" : "gray",
                } }, decimals()))));
};
export default RateCard;
