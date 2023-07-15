import main from '../assets/images/main.svg'
import Wrapper from "../assets/wrappers/LandingPage";
import {Logo} from "../components";
import {Link} from "react-router-dom";

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className={"container page"}>
                <div className={"info"}>
                    <h1>Assets <span>listing</span></h1>
                    <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Aperiam consequuntur eos
                        voluptate. Consectetur deleniti earum illum ipsam neque
                        quos recusandae!
                    </p>
                    <Link to={"/register"} className={"btn btn-hero"}>Login</Link>
                </div>
                <img src={main} alt={"logo img"} className={"img main-img"}/>
            </div>
        </Wrapper>
    );
};

export default Landing;