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
                element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled}/>
            }, {
                path: "register",
                element: <Register/>
            }, {
                path: "landing",
                element: <Landing/>
            }, {
                path: "login",
                element: <Login/>
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
