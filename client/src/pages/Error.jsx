import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";
import {Link, useRouteError} from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.log(error)

    if (error.status === 400){
        return (
        <Wrapper className={"full-page"}>
            <div>
                <img src={img} alt={"img 404"}/>
                <h2>Nothing here</h2>
                <p>This is a 404 error</p>
                <Link to={"/dashboard"}>Run back Home</Link>
            </div>
        </Wrapper>
        )
    }
    return (
        <Wrapper className={"full-page"}>
            <div>
                <img src={img} alt={"img 404"}/>
                <h2>There was a problem</h2>
                <p>This is a 404 error</p>
                <Link to={"/"}>Run back Home</Link>
            </div>
        </Wrapper>
    );
};

export default Error;