import {useState} from "react";
import Wrapper from "../assets/wrappers/RegisterPage";

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
        <Wrapper className={"full-page"}>
            <form />
            <p>Register</p>
        </Wrapper>
    );
};

export default Register;