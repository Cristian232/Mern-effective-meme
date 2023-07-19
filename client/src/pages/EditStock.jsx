import {
    Form,
    redirect,
    useLoaderData,
    useNavigation
} from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import {FormRow, FormRowSelect} from "../components/index.js";
import {COMPANY_TYPE, STOCK_STATUS} from "../../../utils/constants.js";

export const loader = async ({params}) => {
    try {
        const {data} = await customFetch.get(`/stocks/${params.id}`)
        console.log(data)
        return data
    } catch (err) {
        toast.error(err?.response?.data?.msg)
        return redirect("/dashboard/all-stocks")
    }
}
export const action = async ({request, params}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        await customFetch.patch(`/stocks/${params.id}`,data)
        toast.success("Stock edited :)")
        return redirect('/dashboard/all-stocks')
    } catch (err) {
        toast.error(err?.response?.data?.msg)
        return err
    }
}
const EditStock = () => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"
    const {stock} = useLoaderData()
    return (
        <Wrapper>
            <Form method={"post"} className={"form"}>
                <h4 className={"form-title"}>Edit Stock</h4>
                <div className={"form-center"}>
                    <FormRow type={"text"} name={"company"} defaultValue={stock.company} />
                    <FormRow type={"text"} name={"ceo"} defaultValue={stock.ceo}/>
                    <FormRowSelect
                            name={"stockStatus"}
                            labelText={"stockStatus"}
                            defaultValue={stock.stockStatus}
                            list={Object.values(STOCK_STATUS)}
                        />
                    <FormRowSelect
                            name={"companyType"}
                            labelText={"companyType"}
                            defaultValue={stock.companyType}
                            list={Object.values(COMPANY_TYPE)}
                        />
                    <FormRow type={"text"} name={"companyLocation"} defaultValue={stock.companyLocation} labelText={"companyLocation"}/>
                    <button type={"submit"} className={"btn btn-block form-btn"} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </Form>
        </Wrapper>
    );
};

export default EditStock;