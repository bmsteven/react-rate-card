# react rating card

[![npm](https://img.shields.io/npm/v/react-rate-card)](https://www.npmjs.com/package/react-rate-card) [![NPM](https://img.shields.io/npm/l/react-rate-card)](https://www.npmjs.com/package/react-rate-card)
- [React Rate Card Component](#react-rate-card)
  - [Features](#features)  
  - [Installation](#Installation)  
  - [Usage](#usage)  
  - [Examples](#examples)  
  - [Props](#props)  

## Features

- Converts rates bewteen coins and currencies  
- Written in TypeScript and has type support  
- Requires `antd` and `axios` to work  

## Installation

`npm install react-rate-card`

or

`yarn add react-rate-card`

## Usage

```js
...
import RateCard from 'react-rate-card';

<RateCard
  coins={["coin"]} // array of coins
  currencies={["currencier"]} // array of currencies 
  defaultSelected="coin" // default selected coin
  currencylayer_access_key="http://apilayer.net/api/live api key"
  coinslayer_access_key="http://api.coinlayer.com/api/live api key"
  customStyles={{...styles}} // style props for the rate card
  customClass="className" // classname to style the rate card
  inputClass="classname" // classname to style inputs
  inputStyle={{...styles}} // style props for inputs
  currencyStyle={{...styles}} // style props for currencies section
  currencyClass="classname" // classname to style currencies section
  errorStyle={{...styles}} // style props to for error message
  errorClass="classname" // classname to style error message
/>
```

## Examples

[![NPM](https://github.com/bmsteven/react-rate-card/tree/v1.0.6/example)](https://github.com/bmsteven/react-rate-card/tree/v1.0.6/example)

## Props                                    

| Name                                               | Type       | Default       | Description                                                |
| -------------------------------------------------- | ---------- | -------------- | ----------------------------------------------------------|
| coins                                              | `array`    | `["XLM", "USDT"]`       | Array of coins                                   |
| currencies                            | `array`  | `["XLM", "USDT", "KES", "RWF", "TZS"]`| Array of currencies                               |
| defaultSelected                                    | `string`   | `XLM`    | Default selected coin                                           |
| currencylayer_access_key                                   | `string`   |    `null`       | http://apilayer.net/api/live api key **(Required)**                          |
| coinslayer_access_key                                      | `string` | `null`               | http://api.coinlayer.com/api/live api key **(Required)**                 |
| customStyle                                   | `React.CSSProperties`   |    `null`       | Style props for the rate card                                 |
| customClass                                      | `string` | `null`               | Classname to style the rate card                        |
| inputClass                            | `string`  | `null`| Classname to style inputs                                                        |
| inputStyle                                    | `React.CSSProperties`   | `null`    |  Style props for inputs                                          |
| currencyStyle                                   | `React.CSSProperties`   |    `null`       | Style props for currencies section                                |
| currencyClass                                      | `string` | `null`               | Classname to style currencies section                        |
| errorStyle                            | `React.CSSProperties`  | `null`| Style props to for error message                               |
| errorClass                                    | `string`   | `null`    | Classname to style error message                                          |
