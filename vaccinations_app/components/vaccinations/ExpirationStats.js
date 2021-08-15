import useSWR from "swr";
import ExpiredVaccinesList from "./ExpiredVaccinesList";
import { DateContext } from '../../context/DateContext';
import { useContext } from 'react'

const fetcher = url => fetch(url).then(res => res.json());

const ExpirationStats = () => {
    const [state] = useContext(DateContext);

    const { data, error } = useSWR(
        `../api/vaccinations/expired?date=${state.date}`,
        fetcher
    );

    if (!data) return "Loading...";
    
    return (
        <>
            <ExpiredVaccinesList expirations={data} />
        </>
    )
}

export default ExpirationStats;