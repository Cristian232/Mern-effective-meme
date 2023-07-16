import Wrapper from "../assets/wrappers/ThemeToggle.js";
import {useDashboardContext} from "../pages/DashboardLayout.jsx";
import {TbMoonFilled, TbSunHigh} from "react-icons/tb"

const ThemeToggle = () => {
    const {isDarkTheme, toggleDarkTheme} = useDashboardContext();
    return (
        <Wrapper onClick={toggleDarkTheme}>
            {isDarkTheme ? (
                <TbMoonFilled className={"toggle-icon"} />
            ) : (
                <TbSunHigh />
            )}
        </Wrapper>
    );
};

export default ThemeToggle;