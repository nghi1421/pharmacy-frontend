import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Typography } from '@mui/material';
import React from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const defautlOption: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

interface LineChartProps {
    title: string;
    options?: ChartOptions<'line'>;
    data: ChartData<'line'>;
}

// [
//     {
//         label: 'Sản phẩm 1',
//         data: [100, 200, 244, 211, 673, 234, 123],
//         borderColor: 'rgb(255, 99, 132)',
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//         label: 'Sản phẩm 2',
//         data: [589, 246, 100, 593, 789, 246, 23],
//         borderColor: 'rgb(53, 162, 235)',
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
// ]

const LineChart: React.FC<LineChartProps> = ({ data, options, title }) => {
    return (
        <React.Fragment>
            <Line
                options={options ? options : defautlOption}
                data={ data }
            />
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

export default LineChart