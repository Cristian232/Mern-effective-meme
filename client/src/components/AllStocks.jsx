import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";
import {useLoaderData} from "react-router-dom";
import {SearchContainer, StocksContainer} from "./index.js";
import {createContext, useContext} from "react";

export const loader = async () => {
    try {
        const {data} = await customFetch.get('/stocks')
        return {data}
    } catch (err) {
        toast.error(err?.response?.data?.msg)
        return err
    }
}

const AllStocksContext = createContext()
const AllStocks = () => {
    const {data} = useLoaderData()
    return (
        <AllStocksContext.Provider value={{data}}>
            <SearchContainer />
            <StocksContainer />
        </AllStocksContext.Provider>
    );
};

export const useAllStocksContext = () => useContext(AllStocksContext)

export default AllStocks;