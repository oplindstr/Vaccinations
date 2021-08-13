import useSWR from 'swr'
import ExpiredVaccinesList from '../../components/ExpiredVaccinesList';
import { useContext } from 'react';
import { DateContext } from '../../DateContext';

const fetcher = url => fetch(url).then(res => res.json());

export default function Statistics() {
  return (
    <div>
        <h1>Vaccination expiration statistics</h1>

        <ExpireStats />
    </div>
  )
}

function ExpireStats() {
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