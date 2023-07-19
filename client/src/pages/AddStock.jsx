import {
    Form,
    redirect,
    useNavigation,
    useOutletContext
} from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import {FormRow} from "../components/index.js";
import {COMPANY_TYPE, STOCK_STATUS} from "../../../utils/constants.js";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";
import error from "./Error.jsx";

export const action = async ({request}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        await customFetch.post("/stocks",data)
        toast.success("Stock added success :)")
        return redirect("all-stocks")
    } catch (err) {
        toast.error(err?.response?.data?.msg)
        return err
    }
}

const AddStock = () => {
    const {user} = useOutletContext()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"
    return (
        <Wrapper>
            <Form method={"post"} className={"form"}>
                <h4 className={"form-title"}>Add Stock</h4>
                <div className={"form-center"}>
                    <FormRow type={"text"} name={"company"} />
                    <FormRow type={"text"} name={"ceo"} />
                    <div className={"form-row"}>
                        <label htmlFor={"stockStatus"} className={"form-label"}>
                            Stock Status
                        </label>
                        <select
                            name={"stockStatus"}
                            id={"stockStatus"}
                            className={"form-select"}
                            defaultValue={STOCK_STATUS.IN_PROGRESS}
                        >
                            {Object.values(STOCK_STATUS).map((itemValue)=> {
                                return (
                                    <option key={itemValue} value={itemValue}>
                                        {itemValue}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className={"form-row"}>
                        <label htmlFor={"companyType"} className={"form-label"}>
                            Company Type
                        </label>
                        <select
                            name={"companyType"}
                            id={"companyType"}
                            className={"form-select"}
                            defaultValue={COMPANY_TYPE.SOFTWARE}
                            >
                            {Object.values(COMPANY_TYPE).map((itemValue)=> {
                                return (
                                    <option key={itemValue} value={itemValue}>
                                        {itemValue}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <FormRow type={"text"} name={"companyLocation"}/>
                    <button type={"submit"} className={"btn btn-block form-btn"} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </Form>
        </Wrapper>
    );
};

export default AddStock;