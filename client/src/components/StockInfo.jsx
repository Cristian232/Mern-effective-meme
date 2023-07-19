import Wrapper from "../assets/wrappers/StockInfo.js";


const StockInfo = ({icon, text}) => {
    return (
        <Wrapper>
            <span className={"job-icon"}>{icon}</span>
            <span className={"text-icon"}>{text}</span>
        </Wrapper>
    )
};

export default StockInfo;