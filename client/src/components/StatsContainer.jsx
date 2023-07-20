import { SiMicrosoftacademic, BsCalendar2Date, FaBug } from 'react-icons/all.js';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';
const StatsContainer = ({ defaultStats }) => {
    const stats = [
        {
            title:  "Available",
            count: defaultStats["Available"] || 0,
            icon: <SiMicrosoftacademic />,
            color: '#f59e0b',
            bcg: '#fef3c7',
        },
        {
            title: "Not-available",
            count: defaultStats["Not-available"] || 0,
            icon: <BsCalendar2Date />,
            color: '#647acb',
            bcg: '#e0e8f9',
        },
        {
            title: "In-progress",
            count: defaultStats["In-progress"]|| 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee',
        },
    ];
    return (
        <Wrapper>
            {stats.map((item) => {
                return <StatItem key={item.title} {...item} />;
            })}
        </Wrapper>
    );
};
export default StatsContainer;