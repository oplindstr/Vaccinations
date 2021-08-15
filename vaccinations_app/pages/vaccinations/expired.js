import ExpirationStats from '../../components/vaccinations/ExpirationStats';

export default function Statistics() {
  return (
    <div>
        <h1>Vaccination expiration statistics</h1>

        <p>This page shows how many vaccine injections were given before expiration and how many expired before usage, counted from the current date in the upper left corner</p>

        <ExpirationStats />
    </div>
  )
}