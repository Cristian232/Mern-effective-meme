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
                element: <DashboardLayout/>
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
