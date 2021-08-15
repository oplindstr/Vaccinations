import useSWR from "swr";
import OrderList from "./OrderList";
import { DateContext } from '../../context/DateContext';
import { useContext } from 'react'

const fetcher = url => fetch(url).then(res => res.json());

const OrdersClosestToExpiration = () => {
    const [state] = useContext(DateContext);

    const { data, error } = useSWR(
      `../api/orders/closestToExpiration?date=${state.date}`,
      fetcher
    );
  
    if (!data) return "Loading...";
  
    return (
      <>
        <OrderList orders={data}/>
      </>
    )
}

export default OrdersClosestToExpiration;