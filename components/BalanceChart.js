import React from "react";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'

const data = {
  labels: [
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Noz',
    'Dec',
    'Jan',
  ],
  datasets: [
    {
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#9f1313',
      borderColor: '#9f1313',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#9f1313',
      pointBackgroundColor: '#9f1313',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#9f1313',
      pointHoverBorderColor: '#9f1313',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 72, 45, 67, 55, 42],
    },
  ],
}

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
}

const BalanceChart = () => {
  return (
    <div>
      <Line data={data} options={options} width={400} height={150} />
    </div>
  )
}

export default BalanceChart;