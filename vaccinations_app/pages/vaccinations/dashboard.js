import OrdersClosestToExpiration from "../../components/orders/OrdersClosestToExpiration";
import ToBeExpiredCount from "../../components/vaccinations/ToBeExpiredCount";
import VaccinationsLeftToUse from "../../components/vaccinations/VaccinationsLeftToUse";

export default function Dashboard() {
  return (
    <div>
        <h1>Vaccinations dashboard</h1>

        <p>This page shows data that could be useful in the chosen date in the upper left corner</p>

        <h2>Vaccinations going to expire in the next 7 days:</h2>

        <ToBeExpiredCount />

        <h2>Vaccinations left to use (not expired):</h2>

        <VaccinationsLeftToUse />

        <h2>Vaccine bottles closest to expiration:</h2>

        <OrdersClosestToExpiration />
    </div>
  )
}