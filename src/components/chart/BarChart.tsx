import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const defaultOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

interface BarChartProp {
    title: string
    options?: ChartOptions<'bar'>;
    data: ChartData<'bar'>;
}

const BarChart: React.FC<BarChartProp> = ({ options, data, title}) => {
    return (
        <React.Fragment>
            <Bar options={options ? options : defaultOptions} data={data} /> 
            <Typography
                    variant="body2"
                    fontWeight='500'
                    align='center'
                    sx={{ fontSize: 18 }}
                >
                {title}
            </Typography>
        </React.Fragment>
    )
}

export default BarChart