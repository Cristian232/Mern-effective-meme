import {useAllStocksContext} from "./AllStocks.jsx";
import Wrapper from "../assets/wrappers/Stock.js";
import {StockInfo} from "./index.js";
import {
    BsCalendar2Date,
    MdOutlineLocationOn,
    SiMicrosoftacademic
} from "react-icons/all.js";
import {Form, Link} from "react-router-dom";
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const Stock = ({
    _id,
    company,
    ceo,
    stockStatus,
    companyType,
    companyLocation,
    createdAt
}) => {

    const {data} = useAllStocksContext()
    const {stocks} = data

    if (stocks.length === 0) {
        return (
            <Wrapper>
                <h2>No stocks loaded yet... :(</h2>
            </Wrapper>
        )
    }

    const date = day(createdAt).format("Do MMM, YYYY")

    return (
        <Wrapper>
            <header>
                <div className={"main-icon"}>{company.charAt(0)}</div>
                <div className={"info"}>
                    <h5>{company}</h5>
                    <p>{ceo}</p>
                </div>
            </header>
            <div className={"content"}>
                <div className={"content-center"}>
                    <StockInfo icon={<MdOutlineLocationOn />} text={companyLocation}/>
                    <StockInfo icon={<BsCalendar2Date />} text={date}/>
                    <StockInfo icon={<SiMicrosoftacademic />} text={companyType}/>
                    <div className={`status ${stockStatus}`}>{stockStatus}</div>
                </div>
                <footer className={"actions"}>
                    <Link to={`../edit-stock/${_id}`} className={"btn edit-btn"}>Edit</Link>
                    <Form method={"delete"} action={`../delete-stock/${_id}`}>
                        <button type={"submit"} className={"btn delete-btn"}>
                            Delete
                        </button>
                    </Form>
                </footer>
            </div>
        </Wrapper>
    );
};

export default Stock;