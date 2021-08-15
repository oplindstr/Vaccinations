import InjectionsPerDay from "../../components/orders/InjectionsPerDay";
import OrdersPerDay from "../../components/orders/OrdersPerDay";
import OrdersPerDayAndVaccine from "../../components/orders/OrdersPerDayAndVaccine";

export default function Statistics() {
  return (
    <div>
        <h1>Order statistics</h1>

        <p>This page shows aggregated information on orders based on the whole data set of the application. The date in the upper left corner doesn't matter here</p>

        <h2>Orders arrived per day</h2>

        <OrdersPerDay />

        <h2>Orders arrived per day and per vaccine</h2>

        <OrdersPerDayAndVaccine />

        <h2>Number of injections arrived per day</h2>        
        
        <InjectionsPerDay />
    </div>
  )
}