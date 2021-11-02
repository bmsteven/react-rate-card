import { FC } from "react";
import "antd/dist/antd.css";
import "./rate-card.css";
interface Props {
    coins?: string[];
    currencies?: string[];
    customStyles?: any;
    defaultSelected?: any;
    customClass?: string;
    currencyStyle?: any;
    currencyClass?: string;
    inputClass?: string;
    inputStyle?: any;
    currencylayer_access_key: string;
    coinslayer_access_key: string;
    errorStyle?: any;
    errorClass?: string;
}
declare const RateCard: FC<Props>;
export default RateCard;
