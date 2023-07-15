import Landing from "./pages/Landing";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Logo} from "./components";

function App() {
  return (
    <BrowserRouter>
        <nav>
            <Link to={"/"}>Dashboard</Link>
            <Link to={"/register"}>Register</Link>
            <Link to={"/landing"}>Landing</Link>
        </nav>
        <Routes>
            <Route path={"/"} element={<div>Dashboard</div>}/>
            <Route path={"/register"} element={<div>Register</div>}/>
            <Route path={"/landing"} element={<Landing />}/>
            <Route path={"*"} element={<h1>Error</h1>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
