import Wrapper from "../assets/wrappers/Dashboard.js";
import {BigSidebar, NavBar, SmallSidebar} from "../components/index.js";
import {Outlet} from "react-router-dom";
import {createContext, useContext, useState} from "react";

const DashboardContext = createContext()

const DashboardLayout = ({isDarkThemeEnabled}) => {

    const user = {name: 'john'}
    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme
        setIsDarkTheme(newDarkTheme)
        document.body.classList.toggle('dark-theme', newDarkTheme)
        localStorage.setItem('darkTheme', newDarkTheme);
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const logoutUser = async () => {
        console.log("Logout user")
    }

    return (
        <DashboardContext.Provider value={{
            user,
            showSidebar,
            isDarkTheme,
            toggleDarkTheme,
            toggleSidebar,
            logoutUser
        }}>
            <Wrapper>
                <main className={"dashboard"}>
                    <SmallSidebar/>
                    <BigSidebar/>
                    <div>
                        <NavBar/>
                        <div className={"dashboard-page"}>
                            <Outlet/>
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout;