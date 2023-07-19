import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import {
    DashboardLayout,
    Error,
    Register,
    Landing,
    HomeLayout,
    Login
} from "./pages";
import {action as registerAction} from "./pages/Register.jsx";
import {action as loginAction} from "./pages/Login.jsx";
import {loader as dashboardLoader} from "./pages/DashboardLayout.jsx";

const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    document.body.classList.toggle('dark-theme', isDarkTheme)
    return isDarkTheme
}

const isDarkThemeEnabled = checkDefaultTheme()

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing/>
            },
            {
                path: "dashboard",
                element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled}/>,
                loader: dashboardLoader
            }, {
                path: "register",
                element: <Register/>,
                action: registerAction
            }, {
                path: "landing",
                element: <Landing/>
            }, {
                path: "login",
                element: <Login/>,
                action: loginAction
            }, {
                path: "*",
                element: <Error/>
            }
        ]
    }
])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
