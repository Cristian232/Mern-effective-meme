import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
    try {
        const response = await customFetch.get("/stocks/stats")
        return response.data
    } catch (err) {
        return err
    }
};

const Stats = () => {
    const  data  = useLoaderData();
    console.log(data)
    const { defaultStats, monthly } = data;

    return (
        <>
            <StatsContainer defaultStats={defaultStats} />
            {monthly?.length > 1 && (
                <ChartsContainer data={monthly} />
            )}
        </>
    );
};
export default Stats;