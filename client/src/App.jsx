import {
    createBrowserRouter, RouterProvider
} from "react-router-dom";
import {action as registerAction} from "./pages/Register.jsx";
import {action as loginAction} from "./pages/Login.jsx";
import {action as addAction} from "./pages/AddStock.jsx";
import {loader as dashboardLoader} from "./pages/DashboardLayout.jsx";
import {action as editStockAction} from "./pages/EditStock.jsx";
import {action as deleteStockAction} from "./pages/DeleteStock.jsx";
import {loader as editStockLoader} from "./pages/EditStock.jsx";
import Admin, {loader as adminLoader} from "./pages/Admin.jsx";
import {loader as allStocksLoader} from "./components/AllStocks.jsx";
import {AddStock, EditStock, DashboardLayout, Error, Register, Landing, HomeLayout, Login} from "./pages/index.js";
import {AllStocks} from "./components/index.js";


const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    document.body.classList.toggle('dark-theme', isDarkTheme)
    return isDarkTheme
}

const isDarkThemeEnabled = checkDefaultTheme()

const router = createBrowserRouter([{
    path: "/", element: <HomeLayout/>, errorElement: <Error/>, children: [{
        index: true, element: <Landing/>
    }, {
        path: "dashboard",
        element: <DashboardLayout
            isDarkThemeEnabled={isDarkThemeEnabled}/>,
        loader: dashboardLoader,
        children: [
            {index: true, element: <AddStock/>, action: addAction},
            {path: "all-stocks", element: <AllStocks/>, loader: allStocksLoader
        }, {
            path: "edit-stock/:id",
            element: <EditStock/>,
            loader: editStockLoader,
            action: editStockAction
        }, {path: "delete-stock/:id", action: deleteStockAction}, {path: "admin", element: <Admin />, loader: adminLoader}]
    }, {
        path: "register", element: <Register/>, action: registerAction
    }, {
        path: "landing", element: <Landing/>
    }, {
        path: "login", element: <Login/>, action: loginAction
    }, {
        path: "*", element: <Error/>
    }]
}])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
