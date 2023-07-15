import {useState} from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import {FormRow, Logo} from "../components/index.js";
import {Link} from "react-router-dom";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true
}

const Register = () => {
    const [values, setValues] = useState(initialState)
    const handleChange = (e) => {
        console.log(e.target)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
    }

    return (
        <Wrapper>
            <form method='post' className='form'>
                <Logo />
                <h3>Register</h3>
                <FormRow type='text' name='name' defaultValue={"John"}/>
                <FormRow type='text' name='lastName' labelText='last name' defaultValue={"Smith"}/>
                <FormRow type='text' name='location' defaultValue={"Europe"}/>
                <FormRow type='email' name='email' defaultValue={"no@noemail.com"}/>
                <FormRow type='password' name='password' defaultValue={"abc"}/>
                <button type={"submit"} className={"btn btn-block"}>
                    submit
                </button>
                <p>
                    Already a member?
                    <Link to='/login' className='member-btn'>
                        Login
                    </Link>
                </p>
            </form>
        </Wrapper>
    );
};

export default Register;