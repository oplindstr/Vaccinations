import useSWR from 'swr'
import {Line} from 'react-chartjs-2'

const fetcher = url => fetch(url).then(res => res.json());

const VaccinationsPerDayAndVaccine = () => {
    const { data, error } = useSWR(
      "../api/vaccinations/countPerDayAndVaccine",
      fetcher
    );
  
    if (!data) return "Loading...";

    const AntiquaData = data.filter(obj => obj._id.vaccine == 'Antiqua')
    const SolarBuddhicaData = data.filter(obj => obj._id.vaccine == 'SolarBuddhica')
    const ZerpfyData = data.filter(obj => obj._id.vaccine == 'Zerpfy')
  
    const AntiquaGraph = {
      labels: AntiquaData.map((obj) => obj._id.date),
      datasets: [
        {
          label: 'Antiqua vaccinations',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: AntiquaData.map((obj) => obj.count)
        }
      ]
    };

    const SolarBuddhicaGraph = {
      labels: SolarBuddhicaData.map((obj) => obj._id.date),
      datasets: [
        {
          label: 'SolarBuddhica vaccinations',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(192,75,192,0.4)',
          borderColor: 'rgba(192,75,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(192,75,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(192,75,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: SolarBuddhicaData.map((obj) => obj.count)
        }
      ]
    };

    const ZerpfyGraph = {
      labels: ZerpfyData.map((obj) => obj._id.date),
      datasets: [
        {
          label: 'Zerpfy vaccinations',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(192,192,75,0.4)',
          borderColor: 'rgba(192,192,75,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(192,192,75,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(192,192,75,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: ZerpfyData.map((obj) => obj.count)
        }
      ]
    };
    return (
      <div>
        <Line
          data={AntiquaGraph}
          width={800}
          height={300}
        />
        <Line
          data={SolarBuddhicaGraph}
          width={800}
          height={300}
        />
        <Line
          data={ZerpfyGraph}
          width={800}
          height={300}
        />
      </div>
    )
  }

  export default VaccinationsPerDayAndVaccine;