import {useState} from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import {FormRow, Logo, SubmitBtn} from "../components/index.js";
import {Form, Link, redirect, useNavigation} from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)
    try {
        await customFetch.post("/auth/register",data)
        toast.success("Registration Successful")
        return redirect("/login")
    } catch (err) {
    toast.error(err?.response?.data?.msg)
    return err
    }
}
const Register = () => {
    return (
        <Wrapper>
            <Form method='post' className='form'>
                <Logo />
                <h3>Register</h3>
                <FormRow type='text' name='name' defaultValue={"John"}/>
                <FormRow type='text' name='lastName' labelText='last name' defaultValue={"Smith"}/>
                <FormRow type='text' name='location' defaultValue={"Europe"}/>
                <FormRow type='email' name='email' defaultValue={"no@noemail.com"}/>
                <FormRow type='password' name='password' defaultValue={"aaaabbbb"}/>
                <SubmitBtn formBtn/>
                <p>
                    Already a member?
                    <Link to='/login' className='member-btn'>
                        Login
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};

export default Register;