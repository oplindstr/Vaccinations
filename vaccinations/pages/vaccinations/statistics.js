import Link from 'next/link'
import useSWR from 'swr'
import {Line} from 'react-chartjs-2'

const fetcher = url => fetch(url).then(res => res.json());

export default function Statistics() {
  return (
    <div>
        <h1>Vaccination statistics</h1>

        <VaccinationsPerDay />
    </div>
  )
}

function VaccinationsPerDay() {
    const { data, error } = useSWR(
      "../api/vaccinations/countPerDay",
      fetcher
    );
  
    if (!data) return "Loading...";
  
    const graph = {
      labels: data.map((obj) => obj._id),
      datasets: [
        {
          label: 'Vaccinations per day',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data.map((obj) => obj.count)
        }
      ]
    };
    return (
      <div>
        <h2>Vaccinations per day</h2>
        <Line
          data={graph}
          width={800}
          height={300}
        />
      </div>
    )
  }
  
  function OrdersPerMonth() {
    const { data, error } = useSWR(
      "../api/orders/countPerMonth",
      fetcher
    );
  
    if (!data) return "Loading...";
  
    const graph = {
      labels: data.map((obj) => obj._id),
      datasets: [
        {
          label: 'Orders per month',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data.map((obj) => obj.count)
        }
      ]
    };
    return (
      <div>
        <h2>Orders per month</h2>
        <Line
          data={graph}
          width={400}
          height={400}
        />
      </div>
    )
  }
