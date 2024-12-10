import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { data } from 'autoprefixer';

export const DoughnutChart = (dataChart) => {
  console.log(dataChart.data.datasets[0].data);
  if (dataChart.data.datasets[0].data.length === 0) {
    //Datos por defecto
    dataChart = {
      data: {
        labels: ['Sin datos'],
        datasets: [{
          data: [1],
        }]
      }
    }

    return <Doughnut data={dataChart.data} />;
  }

  const data = {
    labels: dataChart.data.labels,
    datasets: [{
      label: 'Ventas por producto',
      data: dataChart.data.datasets[0].data,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(199, 199, 199)',
        'rgb(83, 102, 255)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(199, 199, 199)',
        'rgb(83, 102, 255)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(199, 199, 199)',
        'rgb(83, 102, 255)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
      hoverOffset: 4
    }]
  };

  const options = {};

  return <Doughnut data={data} options={options} />;
};