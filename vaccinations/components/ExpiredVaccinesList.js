import ExpiredVaccine from "./ExpiredVaccine"

const ExpiredVaccinesList = ({expirations}) => {
    return (
      <table cellSpacing="5">
        <tr>
          <th>Vaccine</th>
          <th>Expired injections</th>
          <th>Injections used before expiration</th>
          <th>Total amount of injections</th>
        </tr>
        {expirations.map((expiration) => 
          <ExpiredVaccine expired={expiration} />
        )}
      </table>
    )
}

export default ExpiredVaccinesList