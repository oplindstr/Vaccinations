import useSWR from "swr";
import { DateContext } from '../../context/DateContext';
import { useContext } from 'react'

const fetcher = url => fetch(url).then(res => res.json());

const ToBeExpiredCount = () => {
    const [state] = useContext(DateContext);

    const { data, error } = useSWR(
      `../api/vaccinations/toBeExpired?date=${state.date}`,
      fetcher
    );
  
    if (!data) return "Loading...";
  
    return (
      <>
        {data.map((vaccine) => 
          <p key={vaccine._id}>{vaccine._id}: {vaccine.count}</p>
        )}
      </>
    )
  }

  export default ToBeExpiredCount;