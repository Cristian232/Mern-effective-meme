import {
    Form,
    redirect,
    useOutletContext
} from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import {FormRow, SubmitBtn} from "../components/index.js";
import {toast} from "react-toastify";
import customFetch from "../utils/customFetch.js";

export const action = async ({request}) => {
    const formData = await request.formData()
    const file = formData.get("avatar")
    if (file && file.size > 500000){
        toast.error("Image to large ?? max 0.5 MB")
        return null
    }
    try {
        await customFetch.patch("/users/update-user", formData)
        toast.success("Profile updated")
        return redirect('/dashboard');
    } catch (err) {
        toast.error(err?.response?.data?.msg)
        return null;
    }
}

const Profile = () => {
    const user = useOutletContext()
    const {name, lastName, email, location} = user
    return (
        <Wrapper>
            <Form method={"post"} className={"form"} encType={"multipart/form-data"}>
                <h4 className={"form-title"}>Profile</h4>
                <div className={"form-center"}>
                    <div className={"form-row"}>
                        <label htmlFor={"avatar"} className={"form-label"}>
                            Upload img (0.5MB) max
                        </label>
                        <input type={"file"} id={"avatar"} name={"avatar"} className={"form-input"} accept={"image/*"}/>
                    </div>
                    <FormRow type={"text"} name={"name"} defaultValue={name}/>
                    <FormRow type={"text"} name={"lastName"} labelText={"last name"} defaultValue={lastName}/>
                    <FormRow type={"email"} name={"email"} defaultValue={email}/>
                    <FormRow type={"text"} name={"location"} defaultValue={location}/>
                    <SubmitBtn formBtn/>
                </div>
            </Form>
        </Wrapper>
    );
};

export default Profile;