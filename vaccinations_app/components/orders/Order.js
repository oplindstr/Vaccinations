const Order = ({order}) => {
    return (
      <tr>
        <td>{order.orderNumber}</td>
        <td>{order.responsiblePerson}</td>
        <td>{order.healthCareDistrict}</td>
        <td>{order.vaccine}</td>
        <td>{order.injectionsLeft}</td>
        <td>{order.expireTime}</td>
      </tr>
    )
}

export default Order