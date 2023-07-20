import Wrapper from "../assets/wrappers/BigSidebar.js";
import {useDashboardContext} from "../pages/DashboardLayout.jsx";
import {Logo, NavLinks} from "./index.js";

const BigSidebar = () => {
    const { showSidebar } = useDashboardContext();

    return (
        <Wrapper>
            <div className={showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"}>
                <div className={"content"}>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks isBigSidebar/>
                </div>
            </div>
        </Wrapper>
    );
};

export default BigSidebar;