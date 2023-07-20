import Wrapper from "../assets/wrappers/LoginPage.js";
import {FormRow, Logo, SubmitBtn} from "../components/index.js";
import {
    Form,
    Link,
    redirect,
    useNavigate,
    useNavigation
} from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
        await customFetch.post("/auth/login",data)
        toast.success("Logged in :)")
        return redirect('/dashboard')
    } catch (err) {
        toast.error(err?.response?.data?.msg)
        console.log(err)
        return err
    }
}

const onSubmit = (e) => {
    e.preventDefault()
}

const Login = () => {

    const navigate = useNavigate()

    const loginDemoUser = async () => {
        const data = {
            email: "test@test.com",
            password: "aaaabbbb"
        }
        try {
            await customFetch.post("/auth/login",data)
            toast.success("Testing user func..")
            navigate("/dashboard")
        } catch (err) {
            toast.error(err?.response?.data?.msg)
        }
    }

    return (
        <Wrapper>
            <Form method={"post"} className={"form"}>
                <Logo />
                <h4>login</h4>
                <FormRow type='email' name='email' defaultValue={"no@noemail.com"}/>
                <FormRow type='password' name='password' defaultValue={"aaaabbbb"}/>
                <SubmitBtn formBtn/>
                <button type={"button"} className={"btn btn-block"} onClick={loginDemoUser}>
                    Explore the app
                </button>
                <p>
                    Not a member yet?
                    <Link to='/register' className='member-btn'>
                        Register
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};

export default Login;