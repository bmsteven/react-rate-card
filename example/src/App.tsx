import RateCard from "react-rate-card"
const coinslayer_access_key: string = process.env.AMPLIFY_MONOREPO_APP_ROOT_COINSLAYER_KEY!
const currencylayer_access_key: string =
  process.env.AMPLIFY_MONOREPO_APP_ROOT_CURRENCYLAYER_KEY!

const App = () => {
  return (
    <div>
      <RateCard
        coinslayer_access_key={coinslayer_access_key}
        currencylayer_access_key={currencylayer_access_key}
      />
    </div>
  )
}

export default App
