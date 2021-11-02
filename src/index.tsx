import React, { FC, useState, useEffect, useCallback } from "react"
import { Card, Select } from "antd"
import { formatValue, cleanValue } from "./utils"
import "antd/dist/antd.css"
import "./rate-card.css"
import axios from "axios"

interface Props {
  coins?: string[]
  currencies?: string[]
  customStyles?: any
  defaultSelected?: any
  customClass?: string
  currencyStyle?: any
  currencyClass?: string
  inputClass?: string
  inputStyle?: any
  currencylayer_access_key: string
  coinslayer_access_key: string
  errorStyle?: any
  errorClass?: string
}

// custom coins
const customCoins = ["XLM", "USDT"]

// custom currencies
const customCurrencies = ["XLM", "USDT", "KES", "RWF", "TZS"]

const customCurrencyConverter = (
  amount: number,
  currencies: string[],
  coins: string[],
  coinslayer_access_key: string,
  currencylayer_access_key: string,
  setCurrenciesResults: any,
  setCoinsResults: any,
  setCoinsLoading: any,
  setCurrenciesLoading: any,
  setCoinsError: any,
  setCurrenciesError: any
): any => {
  if (amount === undefined || amount === null) {
    setCurrenciesLoading(false)
    setCurrenciesError("Input Error")
    return null
  }
  setCurrenciesLoading(true)
  setCoinsLoading(true)
  setCurrenciesError("")
  setCoinsError("")
  let newCurrencies = ""
  let newCoins = ""
  currencies.forEach((el, index) => {
    if (!coins.find((e) => e === el)) {
      if (index === currencies?.length - 1) {
        newCurrencies = newCurrencies + el
      } else {
        newCurrencies = newCurrencies + el + ","
      }
    }
  })

  coins.forEach((el, index) => {
    if (index === coins?.length - 1) {
      newCoins = newCoins + el
    } else {
      newCoins = newCoins + el + ","
    }
  })

  // coinslayer
  let coinslayerApi = `https://api.coinlayer.com/api/live?access_key=${coinslayer_access_key}&symbols=${newCoins}&target=USD`
  let currencylayerApi = `https://apilayer.net/api/live?access_key=${currencylayer_access_key}&currencies=${newCurrencies}&source=USD&format=1`

  // fetch coins
  axios
    .get(coinslayerApi)
    .then((res: any) => {
      setCoinsLoading(false)
      if (res?.data?.rates) {
        setCoinsResults(res?.data?.rates)
      }
      if (res.data?.error) setCoinsError(res?.data?.error?.type)
    })
    .catch((err: any) => {
      setCoinsLoading(false)
      if (err.message === "Network Error") {
        setCoinsError(err?.message)
      } else {
        setCoinsError("Error")
      }
    })

  // fetch currencies
  axios
    .get(currencylayerApi)
    .then((res: any) => {
      setCurrenciesLoading(false)
      if (res?.data?.quotes) {
        setCurrenciesResults(res?.data?.quotes)
      }
      if (res.data?.error) setCurrenciesError(res?.data?.error?.info)
    })
    .catch((err: any) => {
      setCurrenciesLoading(false)
      if (err.message === "Network Error") {
        setCurrenciesError(err?.message)
      } else {
        setCurrenciesError("Error")
      }
    })
}

const RateCard: FC<Props> = ({
  coins = customCoins,
  currencies = customCurrencies,
  defaultSelected = coins[0],
  customStyles,
  customClass,
  inputClass,
  inputStyle,
  currencyStyle,
  currencyClass,
  currencylayer_access_key,
  coinslayer_access_key,
  errorStyle,
  errorClass,
}) => {
  const [coinsLoading, setCoinsLoading] = useState<boolean>(true)
  const [currenciesLoading, setCurrenciesLoading] = useState<boolean>(true)
  const [coinsError, setCoinsError] = useState<string>("")
  const [currenciesError, setCurrenciesError] = useState<string>("")
  const [rates, setRates] = useState<any>(null)
  const [conversionRate, setConversionRate] = useState<number>(0)
  const [coin, setCoins] = useState<any>(null)
  const [currenciesResults, setCurrenciesResults] = useState<any>(null)
  const [coinsResult, setCoinsResults] = useState<any>(null)
  const [variables, setVariables] = useState<{
    selected: string
    amount: any
    displayValue: any
  }>({
    selected: defaultSelected,
    amount: 0,
    displayValue: 0,
  })
  const { selected, amount, displayValue } = variables
  const { Option } = Select

  const handleSelectChange = useCallback(
    (value) => {
      setVariables({
        ...variables,
        selected: value,
      })
    },
    [variables]
  )

  const handleValueChange = (e: any) => {
    const { value } = e.target
    if (parseFloat(cleanValue({ value })) >= 0) {
      setVariables({
        ...variables,
        amount: cleanValue({ value }),
        displayValue: cleanValue({ value }),
      })
    } else {
      setVariables({
        ...variables,
        amount: 0,
        displayValue: cleanValue({ value }),
      })
    }
  }

  useEffect(() => {
    customCurrencyConverter(
      amount,
      currencies,
      coins,
      coinslayer_access_key,
      currencylayer_access_key,
      setCurrenciesResults,
      setCoinsResults,
      setCoinsLoading,
      setCurrenciesLoading,
      setCoinsError,
      setCurrenciesError
    )
  }, [currencies, coins])

  useEffect(() => {
    if (currenciesResults) {
      let arr = Object?.keys(currenciesResults)?.map(
        (key) => key && { rate: key, value: currenciesResults[key] }
      )
      setRates(arr)
    }
  }, [currenciesResults])

  useEffect(() => {
    if (coinsResult) {
      let arr = Object?.keys(coinsResult)?.map(
        (key) => key && { rate: key, value: coinsResult[key] }
      )
      setCoins(arr)
    }
  }, [coinsResult])

  useEffect(() => {
    let y = 0
    if (coin) {
      coin?.forEach((el: { rate: string; value: number }) => {
        if (el?.rate?.includes(selected)) {
          y = el?.value
        }
      })
    }
    setConversionRate(y)
  }, [coin, selected])

  return (
    <Card
      style={{
        ...customStyles,
      }}
      className={`rate-card ${customClass}`}
    >
      <section className="inputs-section">
        <article className="col">
          <div
            style={{
              textAlign: "right",
              marginBottom: ".5rem",
            }}
          >
            <label htmlFor="currency">Base currency</label>
          </div>
          <Select
            id="currency"
            defaultValue={coins[0]}
            value={selected}
            style={{
              width: "100%",
              textAlign: "right",
              fontWeight: 600,
              ...inputStyle,
            }}
            onChange={handleSelectChange}
            className={`input-field select-input ${inputClass}`}
          >
            {coins?.length > 0 &&
              coins.map((option) => (
                <Option value={option} key={option}>
                  {option}
                </Option>
              ))}
          </Select>
        </article>
        <article className="amount-field col">
          <div
            style={{
              textAlign: "right",
              marginBottom: ".5rem",
            }}
          >
            <label htmlFor="amount">Amount</label>
          </div>
          <input
            id="amount"
            value={
              parseFloat(amount) < 10000
                ? displayValue
                : formatValue({
                    value: displayValue + "",
                    groupSeparator: ",",
                    decimalSeparator: ".",
                  })
            }
            style={{
              width: "100%",
              textAlign: "right",
              fontWeight: 600,
              ...inputStyle,
            }}
            min={0}
            onChange={handleValueChange}
            className={`input-field amount-input ${inputClass}`}
          />
        </article>
      </section>
      {coinsLoading || currenciesLoading ? (
        <section>
          <p
            style={{
              textAlign: "center",
              width: "100%",
              fontWeight: 600,
            }}
          >
            Please wait
          </p>
        </section>
      ) : (
        <>
          {coinsError || currenciesError ? (
            <section>
              <p
                className={`${errorClass}`}
                style={{
                  color: "red",
                  textAlign: "center",
                  width: "100%",
                  fontWeight: 600,
                  ...errorStyle,
                }}
              >
                {coinsError} <br />
              </p>
            </section>
          ) : (
            <section>
              {currencies?.length > 0 &&
                currencies
                  .filter((el: any) => el !== selected)
                  .map((rate: any) => (
                    <Rate
                      key={rate}
                      rates={rates}
                      coins={coin}
                      conversionRate={conversionRate}
                      selected={selected}
                      currency={rate}
                      amount={amount}
                      currencyClass={currencyClass}
                      currencyStyle={currencyStyle}
                    />
                  ))}
            </section>
          )}
        </>
      )}
    </Card>
  )
}

interface RateProps {
  currency: string
  amount: number
  selected: string
  rates?: []
  conversionRate: number
  coins?: []
  currencyClass?: any
  currencyStyle?: any
  apiKey?: string
  errorClass?: any
  errorStyle?: any
}

const Rate: FC<RateProps> = ({
  currency,
  amount,
  conversionRate,
  rates,
  coins,
  currencyClass,
  currencyStyle,
}) => {
  const [newAmount, setAmount] = useState<any>("0.00")
  const [displayAmount, setDisplayAmount] = useState<any>("0.00")

  const splitValue = displayAmount.split(".")

  const decimals = () => {
    if (displayAmount) {
      let splitDecimals = splitValue[1]?.split("")
      if (splitDecimals?.length > 0) {
        return (
          splitDecimals[0] + "" + (splitDecimals[1] ? splitDecimals[1] : "0")
        )
      } else {
        return "00"
      }
    } else {
      return null
    }
  }

  useEffect(() => {
    setDisplayAmount(
      formatValue({
        value: newAmount + "",
        groupSeparator: ",",
        decimalSeparator: ".",
      })
    )
  }, [newAmount])

  useEffect(() => {
    if (rates) {
      let v, y
      rates?.forEach((el: { rate: string; value: number }) => {
        if (
          coins?.find(
            (e: { rate: string; value: number }) => e.rate === currency
          )
        ) {
          let x: any
          x = coins?.find((e: any) => e.rate === currency)
          if (x) {
            y = x?.value
          }

          return
        }
        if (el?.rate?.includes(currency)) {
          v = el?.value
        }
      })
      if (v && v > 0) {
        setAmount(v * amount * conversionRate)
      } else if (y && y > 0) {
        setAmount((amount * conversionRate) / y)
      }
    }
  }, [rates, amount, coins, conversionRate])

  return (
    <article
      style={{
        textAlign: "right",
        marginBottom: "2.5rem",
        fontWeight: 600,
        ...currencyStyle,
      }}
      className={`currency col ${currencyClass}`}
    >
      <p
        style={{
          fontSize: 17,
        }}
      >
        <span className="currency-code">{currency}</span>
      </p>
      <p
        className="currency-amount"
        style={{
          fontSize: 20,
        }}
      >
        <span
          style={{
            color:
              parseFloat(splitValue[0]) === 0 &&
              (splitValue[1] ? parseFloat(splitValue[1]) === 0 : true)
                ? "lightgray"
                : "gray",
          }}
        >
          {splitValue[0]}.
        </span>
        <span
          style={{
            color: decimals() === "00" ? "lightgray" : "gray",
          }}
        >
          {decimals()}
        </span>
      </p>
    </article>
  )
}

export default RateCard
