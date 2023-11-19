import { Typography } from '@mui/material'
import React from 'react'
import Chart from 'react-apexcharts'

const defaultPieChartOption = {
    chart: {
        type: 'donut',
    },
    responsive: [{
    breakpoint: 480,
    options: {
        chart: {
        width: 200
        },
        legend: {
        position: 'bottom'
        }
    }
    }]
}

interface PieChartProps {
    title: string
    labels: string[]
    data: number[]
}

const PieChart: React.FC<PieChartProps> = ({labels, title, data}) => {
    return (
        <React.Fragment>
            <Chart options={{ ...defaultPieChartOption, labels: labels}}
                series={ data }
                type="donut"
            />
            <Typography
                    variant="body2"
                    fontWeight='500'
                    align='center'
                    sx={{ fontSize: 18, fontWeight: 'bold' }}
                >
                {title}
            </Typography>
        </React.Fragment>
    )
}

export default PieChart