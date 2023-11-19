import { Typography } from '@mui/material'
import React from 'react'
import Chart from 'react-apexcharts'

const defaultLineChartOption = {
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    } 
  },
  dataLabels: {
    enabled: true,
    // formatter: function (val) {
    //   return val + "%";
    // },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ["#304758"]
    }
  },
  
  xaxis: {
    position: 'bottom',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        }
      }
    },
    tooltip: {
      enabled: true,
    }
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      // formatter: function (val) {
      //   return val + "%";
      // }
    }
  
  }
}

interface BarChartProp {
    title: string
    xlabel: string
    labels: string[]
    data: number[]
}

const BarChart: React.FC<BarChartProp> = ({labels, title, xlabel, data}) => {
    return (
        <React.Fragment>
            <Chart 
              options={{
                  ...defaultLineChartOption,
                  xaxis: { ...defaultLineChartOption.xaxis,categories: labels }
              }}
              series={
                [{ 
                      name: xlabel,
                      data: data
                  }]
              }
              type="bar"
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

export default BarChart