import Wrapper from "../assets/wrappers/LoginPage.js";
import {FormRow, Logo} from "../components/index.js";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <Wrapper>
            <form className={"form"}>
                <Logo />
                <h4>login</h4>
                <FormRow type='email' name='email' defaultValue={"no@noemail.com"}/>
                <FormRow type='password' name='password' defaultValue={"abc"}/>
                <button type={"submit"} className={"btn btn-block"}>
                    submit
                </button>
                <button type={"button"} className={"btn btn-block"}>
                    Explore the app
                </button>
                <p>
                    Not a member yet?
                    <Link to='/register' className='member-btn'>
                        Register
                    </Link>
                </p>
            </form>
        </Wrapper>
    );
};

export default Login;