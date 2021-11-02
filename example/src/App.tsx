import RateCard from "react-rate-card"
import {coinslayer_access_key, currencylayer_access_key} from "./key"

const App = () => {
  return (
    <div>
      <RateCard coinslayer_access_key={coinslayer_access_key} currencylayer_access_key={currencylayer_access_key} />
    </div>
  )
}

export default App
