import Link from 'next/link'
import useSWR from 'swr'
import {Line} from 'react-chartjs-2'

const fetcher = url => fetch(url).then(res => res.json());

export default function Statistics() {
  return (
    <div>
        <h1>Order statistics</h1>
        <h2>
        <Link href="/">
            <a>Back to home</a>
        </Link>
        </h2>

        <OrdersPerDay />
    </div>
  )
}

function OrdersPerDay() {
    const { data, error } = useSWR(
      "../api/orders/countPerDay",
      fetcher
    );
  
    if (!data) return "Loading...";
  
    const graph = {
      labels: data.map((obj) => obj._id),
      datasets: [
        {
          label: 'Orders per day',
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
        <h2>Orders per day</h2>
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
