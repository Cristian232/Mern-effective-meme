import Wrapper from "../assets/wrappers/Dashboard.js";
import {BigSidebar, NavBar, SmallSidebar} from "../components/index.js";
import {Outlet, redirect, useLoaderData, useNavigate} from "react-router-dom";
import {createContext, useContext, useState} from "react";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";

export const loader = async () => {
    try {
        const {data} = await customFetch.get('/users/current-user')
        return data
    } catch (err) {
        return redirect("/")
    }
}

const DashboardContext = createContext()

const DashboardLayout = ({isDarkThemeEnabled}) => {

    const {user} = useLoaderData()
    const navigate = useNavigate()
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
        navigate("/")
        await customFetch.get("/auth/logout")
        toast.success("Logged out ... ")
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
                            <Outlet context={user}/>
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout;