import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";
import {redirect, useLoaderData} from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer.js";
import {StatItem} from "../components/index.js";
import {AiOutlineGift, FaDragon} from "react-icons/all.js";

export const loader = async () => {
    try {
        const response = await customFetch.get("/users/admin/app-stats")
        return response.data
    } catch (err) {
        toast.error("Not allowed for users")
        return redirect("/dashboard")
    }
}
const Admin = () => {
    const {users, stocks} = useLoaderData()
    return (
        <Wrapper>
            <StatItem title={"current users"} count={users} color={"#e1b141"} bcg={"#fcefc7"} icon={<FaDragon/>}/>
            <StatItem title={"total stocks"} count={stocks} color={"#617bcd"} bcg={"#e5e5f5"} icon={<AiOutlineGift/>}/>
        </Wrapper>
    );
};

export default Admin;