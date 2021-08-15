import Order from "./Order"

const OrderList = ({orders}) => {
    return (
      <table cellSpacing="5">
        <tr>
          <th>Order number</th>
          <th>Responsible person</th>
          <th>Healthcare district</th>
          <th>Vaccine</th>
          <th>Injections left</th>
          <th>Expires on</th>
        </tr>
        {orders.map((order) => 
          <Order order={order} />
        )}
      </table>
    )
}

export default OrderList