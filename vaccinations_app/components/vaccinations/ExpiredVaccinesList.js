import ExpiredVaccine from "./ExpiredVaccine"

const ExpiredVaccinesList = ({expirations}) => {
    let vaccinationsExpiredSum = 0;
    let vaccinationsGivenInTimeSum = 0;
    let totalInjectionsSum = 0;

    expirations.forEach(expiration => {
      vaccinationsExpiredSum += expiration.vaccinationsExpired;
      vaccinationsGivenInTimeSum += expiration.vaccinationsGivenInTime;
      totalInjectionsSum += expiration.totalInjections;
    });

    return (
      <table cellSpacing="5">
        <tr>
          <th>Vaccine</th>
          <th>Injections expired before usage</th>
          <th>Injections used before expiration</th>
          <th>Total number of injections in expired bottles</th>
        </tr>
        {expirations.map((expiration) => 
          <ExpiredVaccine key={expiration.id} expired={expiration} />
        )}
        <tr>
          <td>Total</td>
          <td>{vaccinationsExpiredSum}</td>
          <td>{vaccinationsGivenInTimeSum}</td>
          <td>{totalInjectionsSum}</td>
        </tr>
      </table>
    )
}

export default ExpiredVaccinesList