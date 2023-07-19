import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";
import {redirect} from "react-router-dom";

export const action = async ({params}) => {
    try {
        await customFetch.delete(`/stocks/${params.id}`)
        toast.success("Stock deleted")
    } catch (err) {
        toast.error(err?.response?.data?.msg)
    }
    return redirect("/dashboard/all-stocks")
}

