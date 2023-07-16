import Wrapper from "../assets/wrappers/Navbar.js";
import {TfiAlignLeft} from "react-icons/tfi";
import {Logo, LogoutContainer} from "./index.js";
import {useDashboardContext} from "../pages/DashboardLayout";
import ThemeToggle from "./ThemeToggle.jsx";

const NavBar = () => {
    const { toggleSidebar } = useDashboardContext();
    return (
        <Wrapper>
            <div className={"nav-center"}>
                <button type={"button"} className={'toggle-btn'}
                onClick={toggleSidebar}>
                    <TfiAlignLeft/>
                </button>
                <div>
                    <Logo />
                    <h4 className={'logo-text'}>dashboard</h4>
                </div>
                <div className={"btn-container"}>
                    <ThemeToggle />
                    <LogoutContainer />
                </div>
            </div>
        </Wrapper>
    );
};

export default NavBar;