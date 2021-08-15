import styles from '../styles/Layout.module.css'

const fetcher = url => fetch(url).then(res => res.json());

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>
        Welcome to the Vaccinations App!
      </h1>

      <p>
        This application contains vaccination information based on a custom data set. The data contains vaccine orders and vaccinations given. One order is a vaccine bottle that can be used to give several vaccination injections. 
      </p>

      <p>
        The timestamps of the data are in the past, so we give an option to simulate a situation in the past by controlling the current date in the upper left corner. Some of the aggregated data of this application are purely statistical, and some could be useful in the simulated current moment.
      </p>
    </>
  )
}