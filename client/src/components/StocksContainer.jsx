import {useAllStocksContext} from "./AllStocks.jsx";
import Wrapper from "../assets/wrappers/StocksContainer.js";
import {Stock} from "./index.js";

const StocksContainer = () => {
    const {data} = useAllStocksContext()
    const {stocks} = data

    if (stocks.length === 0) {
        return (
            <Wrapper>
                <h2>No stocks loaded yet... :(</h2>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div className={"jobs"}>
                {stocks.map((stock)=>{
                    return <Stock key={stock._id} {...stock} />
                })}
            </div>
        </Wrapper>
    );
};

export default StocksContainer;