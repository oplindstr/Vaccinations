import VaccinationsPerDay from "../../components/vaccinations/VaccinationsPerDay";
import VaccinationsPerDayAndVaccine from "../../components/vaccinations/VaccinationsPerDayAndVaccine";
import VaccinationsExpiredPerDay from "../../components/vaccinations/VaccinationsExpiredPerDay";

export default function Statistics() {
  return (
    <div>
        <h1>Vaccination statistics</h1>

        <p>This page shows aggregated information on vaccinations based on the whole data set of the application. The date in the upper left corner doesn&apos;t matter here</p>

        <h2>Vaccinations given per day</h2>

        <VaccinationsPerDay />

        <h2>Vaccinations given per day and per vaccine</h2>

        <VaccinationsPerDayAndVaccine />

        <h2>Vaccinations expired per day</h2>

        <VaccinationsExpiredPerDay />
    </div>
  )
}