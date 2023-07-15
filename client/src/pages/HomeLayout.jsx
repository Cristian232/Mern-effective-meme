import {Outlet} from "react-router-dom";

const HomeLayout = () => {
    return (
        <div>
            <p>HomeLayout</p>
            <Outlet  />
        </div>
    );
};

export default HomeLayout;