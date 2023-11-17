import { Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material"
import MoneyImage from '../../assets/images/money.png'
import SalesImage from '../../assets/images/sales.png'
import PurchaseImage from '../../assets/images/purchase.png'
import dayjs from 'dayjs';
import CountUp from 'react-countup';
import { useEffect } from "react";
import { FormInputDate } from "../../components/form/FormInputDate";
import { useForm } from "react-hook-form";
import yup from "../../utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LineChart from "../../components/chart/LineChart";
import BarChart from "../../components/chart/BarChart";
import { useGetStatisticsToday } from '../../hooks/useStatistics'
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [100, 200, 244, 211, 673, 234, 123],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: [589, 246, 100, 593, 789, 246, 23],
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

interface StatisticsForm {
    startDate: Date;
    endDate: Date;
}

 // @ts-ignore
const statsiticsValidate: Yup.ObjectSchema<StatisticsForm> = yup.object({
    startDate: yup
        .date()
        .when('endDate',
            (endDate, schema, val) => {
                if (endDate) {
                    // @ts-ignore
                    const endDateValue = new Date(endDate + 48000)
                    return schema.max(endDateValue,'Ngày bắt đầu phải trước ngày kết thúc')
                }
                return schema;
            }),
    endDate: yup
        .date()
});

const StatisticsPage = () => {
    const {
        handleSubmit,
        watch,
        control,
        formState,
        formState: { isValidating }
    } = useForm<StatisticsForm>({
        mode: 'all',
        defaultValues: {
            startDate: new Date(dayjs().format('YYYY-MM-DD')),
            endDate: new Date(dayjs().format('YYYY-MM-DD'))
        },
        resolver: yupResolver(statsiticsValidate)
    });
    const { data: statisticsToday, isLoading: isLoadingToday } = useGetStatisticsToday() 

    const onSubmit = (data: StatisticsForm) => {
        console.log(data)
    }

    const data = watch();

  useEffect(() => {
    if (formState.isValid && !isValidating) {
      
    }
  }, [formState, data, isValidating]);
    return (
        <Grid spacing={4} container>
            <Grid item xs={8} sm={4}>
                <Paper sx={{
                    zIndex: 0,
                    overflow: 'hidden',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                
                    }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight='500'
                            sx={{ pb: 2 }}
                        >
                            Doanh thu trong ngày
                        </Typography>

                        <Box
                            component="img"
                            sx={{
                                position: 'absolute',
                                height: 80,
                                width: 80,
                                overflow: 'hidden',
                                boxSizing: 'border-box',
                                opacity: 0.2,
                                top: 40,
                                left: -15
                            }}
                            alt="No data."
                            src={MoneyImage}
                        />
                        {
                            isLoadingToday
                                ?
                                    <CircularProgress sx={{ margin: 'auto' }} />
                                :
                            <CountUp
                                end={statisticsToday.salesEarnings}
                                duration={2.75}
                                decimals={3}
                                decimal="."
                                suffix=' VND'
                            >
                                {({ countUpRef }) => (
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyItems: 'flex-end',
                                        justifyContent: 'end'
                                    }}>
                                        <span ref={countUpRef} style={{ fontSize: 20}} />
                                    </div>
                                )}
                            </CountUp>
                        }
                        
                    </Box>
                </Paper>
            </Grid>
                    
            <Grid item xs={8} sm={4}>
                <Paper sx={{
                    zIndex: 0,
                    overflow: 'hidden',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                
                    }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight='500'
                            sx={{ pb: 2 }}
                        >
                            Doanh số trong ngày
                        </Typography>

                        <Box
                            component="img"
                            sx={{
                                position: 'absolute',
                                height: 80,
                                width: 80,
                                overflow: 'hidden',
                                boxSizing: 'border-box',
                                opacity: 0.2,
                                top: 40,
                                left: -15
                            }}
                            src={SalesImage}
                        />
                        {
                            isLoadingToday
                                ?
                                    <CircularProgress sx={{ margin: 'auto' }} />
                                :
                             <CountUp
                                end={statisticsToday.salesCount}
                                duration={2.75}
                                decimal=","
                            >
                                {({ countUpRef }) => (
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyItems: 'flex-end',
                                        justifyContent: 'end'
                                    }}>
                                        <span ref={countUpRef} style={{ fontSize: 20}} />
                                    </div>
                                )}
                            </CountUp>
                        }
                       
                    </Box>
                </Paper>
            </Grid>

            <Grid item xs={8} sm={4}>
                <Paper sx={{
                    zIndex: 0,
                    overflow: 'hidden',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                
                    }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight='500'
                            sx={{ pb: 2 }}
                        >
                            Lượt khách trong ngày
                        </Typography>

                        <Box
                            component="img"
                            sx={{
                                position: 'absolute',
                                height: 80,
                                width: 80,
                                overflow: 'hidden',
                                boxSizing: 'border-box',
                                opacity: 0.2,
                                top: 40,
                                left: -15
                            }}
                            src={PurchaseImage}
                        />

                         {
                            isLoadingToday
                                ?
                                    <CircularProgress sx={{ margin: 'auto' }} />
                                :
                             <CountUp
                                end={statisticsToday.customerPurchases}
                                duration={2.75}
                                decimal=","
                            >
                                {({ countUpRef }) => (
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyItems: 'flex-end',
                                        justifyContent: 'end'
                                    }}>
                                        <span ref={countUpRef} style={{ fontSize: 20}} />
                                    </div>
                                )}
                            </CountUp>
                        }
                    </Box>
                </Paper>
            </Grid>

            <Grid item xs={8} sm={12}>
                <Paper sx={{ px: 3, py: 2 }}>
                    <Typography
                            variant="h4"
                            fontWeight='500'
                            sx={{ pb: 2, marginBottom: 2 }}
                        >
                        Thống kê { dayjs(watch('startDate')).format('DD/MM/YYYY')} - { dayjs(watch('endDate')).format('DD/MM/YYYY')}
                    </Typography>
                    <Grid spacing={2} container>
                        <Grid item xs={8} sm={3}>
                            <FormInputDate
                                name="startDate"
                                control={control}
                                label="Từ ngày"
                                placeholder='x'
                            />
                        </Grid>
                        <Grid item xs={8} sm={3}>
                            <FormInputDate
                                name="endDate"
                                control={control}
                                label="Đến ngày"
                                placeholder='x'
                            />
                        </Grid>
                        <Grid item xs={8} sm={3}>
                            <Button
                                variant="contained"
                                color="success"
                                sx={{
                                    height: '100%',
                                    m: 'auto',
                                    textTransform: 'none',
                                }}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Thống kê
                            </Button>
                        </Grid>
                        <Grid item xs={8} sm={6}>
                            <LineChart
                                title='Doanh thu'
                                data={{
                                labels,
                                datasets: [
                                    {
                                        label: 'Dataset 1',
                                        data: [100, 200, 244, 211, 673, 234, 123],
                                        borderColor: 'rgb(255, 99, 132)',
                                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                    },
                                    {
                                        label: 'Dataset 2',
                                        data: [589, 246, 100, 593, 789, 246, 23],
                                        borderColor: 'rgb(53, 162, 235)',
                                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                    },
                                ],
                            }}
                            />;
                        </Grid>
                        <Grid item xs={8} sm={6}>
                            <LineChart
                                title='Doanh số'
                                data={{
                                    labels,
                                    datasets: [
                                        {
                                            label: 'Dataset 1',
                                            data: [100, 200, 244, 211, 673, 234, 123],
                                            borderColor: 'rgb(255, 99, 132)',
                                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                        },
                                        {
                                            label: 'Dataset 2',
                                            data: [589, 246, 100, 593, 789, 246, 23],
                                            borderColor: 'rgb(53, 162, 235)',
                                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                        },
                                    ],
                                }}
                            />
                        </Grid>
                        <Grid item xs={8} sm={6}>
                            <BarChart
                                title='Mua sản phẩm'
                                data={{
                                    labels,
                                    datasets: [
                                        {
                                        label: 'Dataset 1',
                                        data: [100,23,123,653,345,235,690],
                                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                        },
                                    ],
                                }}
                            />;
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            
        </Grid>
    )
}

export default StatisticsPage