# react rating card

[![npm](https://img.shields.io/npm/v/react-rate-card)](https://www.npmjs.com/package/react-rate-card) [![NPM](https://img.shields.io/npm/l/react-rate-card)](https://www.npmjs.com/package/react-rate-card)
- [React Rate Card Component](#react-rate-card)
  - [Features](#features)
  - [Installation](#Installation)
  - [Usage](#usage)
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
  currencylayer_access_key="your http://apilayer.net/api/live api key"
  coinslayer_access_key="your http://api.coinlayer.com/api/live api key"
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

## Props                                    

| Name                                               | Type       | Default       | Description                                                |
| -------------------------------------------------- | ---------- | -------------- | ----------------------------------------------------------|
| coins                                              | `array`    | `["XLM", "USDT"]`       | array of coins                                   |
| currencies                            | `array`  | `["XLM", "USDT", "KES", "RWF", "TZS"]`| Array of currencies                               |
| defaultSelected                                    | `string`   | `XLM`    | Default selected coin                                           |
| currencylayer_access_key                                   | `string`   |    `null`       | your http://apilayer.net/api/live api key **(Required)**                          |
| coinslayer_access_key                                      | `string` | `null`               | your http://api.coinlayer.com/api/live api key **(Required)**                 |
| customStyle                                   | `React.CSSProperties`   |    `null`       | style props for the rate card                                 |
| customClass                                      | `string` | `null`               | classname to style the rate card                        |
| inputClass                            | `string`  | `null`| classname to style inputs                                                        |
| inputStyle                                    | `React.CSSProperties`   | `null`    |  style props for inputs                                          |
| currencyStyle                                   | `React.CSSProperties`   |    `null`       | style props for currencies section                                |
| currencyClass                                      | `string` | `null`               | cclassname to style currencies section                        |
| errorStyle                            | `React.CSSProperties`  | `null`| style props to for error message                               |
| errorClass                                    | `string`   | `null`    | classname to style error message                                          |
