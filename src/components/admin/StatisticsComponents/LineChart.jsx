import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };


  const options = {
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'black',
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        stepSize: 10,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'black',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};
