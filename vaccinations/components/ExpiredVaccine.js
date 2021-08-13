import styles from '../styles/Vaccinations.module.css'

const ExpiredVaccine = ({expired}) => {
    return (
      <tr>
        <td>{expired._id}</td>
        <td>{expired.vaccinationsExpired}</td>
        <td>{expired.vaccinationsGivenInTime}</td>
        <td>{expired.totalInjections}</td>
      </tr>
    )
}

export default ExpiredVaccine