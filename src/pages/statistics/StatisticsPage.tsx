import { Box, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material"
import MoneyImage from '../../assets/images/money.png'
import SalesImage from '../../assets/images/sales.png'
import PurchaseImage from '../../assets/images/purchase.png'
import dayjs from 'dayjs';
import CountUp from 'react-countup';
import { FormInputDate } from "../../components/form/FormInputDate";
import { useForm } from "react-hook-form";
import yup from "../../utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LineChart from "../../components/chart/LineChart";
import BarChart from "../../components/chart/BarChart";
import { useGetStatistics, useGetStatisticsToday } from '../../hooks/useStatistics'
import { useEffect } from "react";
import useDateRange from "../../hooks/useDateRange";
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export interface StatisticsForm {
    startDate: Date;
    endDate: Date;
}

 // @ts-ignore
const statsiticsValidate: Yup.ObjectSchema<StatisticsForm> = yup.object({
    startDate: yup
        .date()
        .when('endDate',
            (endDate, schema, val) => {
                const start = dayjs(val.value.toString()).startOf('day')
                const end = dayjs(endDate.toString()).endOf('day')
                console.log(val)
                if (start.diff(end, 'day') !== 0) {
                    return schema.max(new Date(dayjs(endDate.toString()).endOf('day').toString()),'Ngày bắt đầu phải trước ngày kết thúc.')
                }
                return schema;
            }),
    endDate: yup
        .date()
        .when('startDate',
            (startDate, schema, val) => {
                const end = dayjs(val.value.toString()).startOf('day')
                const start = dayjs(startDate.toString()).endOf('day')
                console.log(val)
                if (start.diff(end, 'day') !== 0) {
                    return schema.max(new Date(dayjs(startDate.toString()).endOf('day').toString()),'Ngày kết thúc phải sau ngày bắt đầu.')
                }
                return schema;
            }),
});

const StatisticsPage = () => {
    const {
        handleSubmit,
        watch,
        control,
        setValue,
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
    const { isLoading: isLoadingStatistics, data: statisticsData } = useGetStatistics()
    const {
        dateRanges,
        chooseDateRange,
        getCurrentDateRange,
        updateStatisticsQuery,
        updateDateRange
    } = useDateRange(setValue)
    const onSubmit = (data: StatisticsForm) => {
        updateStatisticsQuery(data.startDate, data.endDate)
    }

    const watchAllFields = watch()

    useEffect(() => {
        if (formState.isValid && !isValidating) {
            updateDateRange(
                dayjs(watchAllFields.startDate).format('DD-MM-YYYY'),
                dayjs(watchAllFields.endDate).format('DD-MM-YYYY')
            )
        }
    }, [formState, watchAllFields, isValidating])
    return (
        <Grid spacing={3} container>
            <Grid item xs={8} sm={12}>
                <Paper sx={{ px: 3, py: 2 }}>
                    <Typography
                            variant="h4"
                            fontWeight='500'
                            sx={{ pb: 2, marginBottom: 2 }}
                        >
                        Thống kê { getCurrentDateRange().startDate } - { getCurrentDateRange().endDate }
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
                                    height: 40,
                                    m: 'auto',
                                    textTransform: 'none',
                                }}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Thống kê
                            </Button>
                        </Grid>
                        <Grid item xs={8} sm={12}>
                            <Stack direction="row" spacing={1}>
                                {
                                    dateRanges.map((dateRange) => 
                                        <Chip
                                            label={dateRange.label}
                                            color="primary"
                                            sx={{ cursor: dateRange.checked ? 'not-allowed' : 'pointer' }}
                                            variant={dateRange.checked ? "filled" : "outlined"}
                                            onClick={() => {
                                               chooseDateRange(dateRange)
                                            }}
                                        />
                                    )
                                }
                            </Stack> 
                        </Grid>
      
                    </Grid>

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

            <Grid item xs={8} sm={6}>
                <Paper sx={{ px: 3, py: 2 }}>
                    {
                        isLoadingStatistics 
                            ?
                        <CircularProgress sx={{ margin: 'auto' }} />
                            :
                        <LineChart
                            title='Biểu đồ doanh thu'
                            data={{
                                labels: statisticsData.labels,
                                datasets: [
                                    {
                                        label: 'Doanh thu',
                                        data: statisticsData.salesEarningsList,
                                        borderColor: 'rgb(53, 162, 235)',
                                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                    },
                                ],
    
                            }}
                        />
                    }
                </Paper>
            </Grid>

            <Grid item xs={8} sm={6}>
                <Paper sx={{ px: 3, py: 2 }}>
                    {
                        isLoadingStatistics 
                            ?
                        <CircularProgress sx={{ margin: 'auto' }} />
                            :
                        <LineChart
                        title='Biểu đồ doanh số'
                        data={{
                            labels: statisticsData.labels,
                            datasets: [
                                {
                                    label: 'Doanh số',
                                    data: statisticsData.salesCountList,
                                    borderColor: 'rgb(53, 162, 235)',
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                },
                            ],
                        }}
                        />
                    }
                </Paper>
            </Grid>

            <Grid item xs={8} sm={6}>
                <Paper sx={{ px: 3, py: 2 }}>
                    {
                        isLoadingStatistics 
                            ?
                        <CircularProgress sx={{ margin: 'auto' }} />
                            :
                        <LineChart
                        title='Lượt khách'
                        data={{
                            labels: statisticsData.labels,
                            datasets: [
                                {
                                    label: 'Lượt khách',
                                    data: statisticsData.customerPurchasesList,
                                    borderColor: 'rgb(53, 162, 235)',
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                },
                            ],
                        }}
                        />
                    }
                </Paper>
            </Grid>

            <Grid item xs={8} sm={6}>
                <Paper sx={{ px: 3, py: 2 }}>
                    <BarChart
                        title='Biểu đồ doanh số sản phẩm'
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
                </Paper>
            </Grid>

        </Grid>
    )
}

export default StatisticsPage