import styles from '../styles/Layout.module.css'
import useSWR from 'swr'
import Link from 'next/link'
import { useContext } from 'react';
import { DateContext } from '../DateContext';

const fetcher = url => fetch(url).then(res => res.json());

export default function Home() {
  const [ state ] = useContext(DateContext);
  return (
    <>
      <h1 className={styles.title}>
        Welcome to the Vaccinations App!
      </h1>

      <p>Current date: {state.date}</p>

      <OrderCount />

      <Link href="/orders/statistics">
        <a>Order statistics</a>
      </Link>
    </>
  )
}

function VaccinationCount() {
  const { data, error } = useSWR(
    "api/vaccinations/count",
    fetcher
  );

  if (!data) return "Loading...";

  return (
    <p className={styles.description}>
      Vaccinations in this application: {data}
    </p>
  )
}

function OrderCount() {
  const { data, error } = useSWR(
    "api/orders/count",
    fetcher
  );

  if (!data) return "Loading...";

  return (
    <p className={styles.description}>
      Orders in this application: {data}
    </p>
  )
}