import useSWR from "swr";
import { useContext } from 'react';
import { DateContext } from '../../DateContext';

const fetcher = url => fetch(url).then(res => res.json());

export default function Dashboard() {
  return (
    <div>
        <h1>Current status of vaccinations</h1>

        <ToBeExpiredCount />
    </div>
  )
}

const ToBeExpiredCount = () => {
    const [state] = useContext(DateContext);

    const { data, error } = useSWR(
      `../api/vaccinations/toBeExpired?date=${state.date}`,
      fetcher
    );
  
    if (!data) return "Loading...";
  
    return (
      <>
        <h2>Vaccinations going to expire in the next 7 days:</h2>
        
        {data.map((vaccine) => 
          <p>{vaccine._id}: {vaccine.count}</p>
        )}
      </>
    )
  }