import { Typography } from '@mui/material'
import React from 'react'
import Chart from 'react-apexcharts'
import { formatCurrency, formatNumber } from '../../utils/format'

const defaultLineChartOption = {
    chart: {
        height: 300,
        type: 'line',
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    title: {
        align: 'left'
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
        },
    },
    animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    },
    xaxis: {
        tickAmount: 10
    },
    yaxis: {
        labels: {
            formatter: (value: number) => formatNumber(value)
        },
    },
}

interface LineChartProps {
    title: string
    xlabel: string
    labels: string[]
    data: number[]
    isFormatCurrentcy: boolean
}

const LineChart: React.FC<LineChartProps> = ({labels, title, xlabel, data, isFormatCurrentcy}) => {
    return (
        <React.Fragment>
            <Chart options={{
                ...defaultLineChartOption,
                xaxis: { ...defaultLineChartOption.xaxis,categories: labels },
                title: {
                    align: 'center',
                },
                yaxis: {
                    labels: isFormatCurrentcy
                        ? { formatter: (value: number) => formatCurrency(value) }
                        : { formatter: (value: number) => formatNumber(value)}
                }
            }}
                series={
                    [{ 
                        name: xlabel,
                        data: data
                    }]
                }
                type="line"
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

export default LineChart