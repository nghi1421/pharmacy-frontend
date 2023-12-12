import { Box, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material"
import MoneyImage from '../../assets/images/money.png'
import SalesImage from '../../assets/images/sales.png'
import PurchaseImage from '../../assets/images/purchase.png'
import PutInCartImage from '../../assets/images/put-in-cart.png'
import dayjs from 'dayjs';
import CountUp from 'react-countup';
import { FormInputDate } from "../../components/form/FormInputDate";
import { useForm } from "react-hook-form";
import yup from "../../utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LineChart from "../../components/chart/LineChart";
import BarChart from "../../components/chart/BarChart";
import EmptyImage from '../../assets/images/no-data.jpg'
import { useGetStatistics } from '../../hooks/useStatistics'
import React, { useEffect } from "react";
import useDateRange from "../../hooks/useDateRange";
import PieChart from "../../components/chart/PieChart";

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
                if (start.diff(end, 'day') + 1 !== 0) {
                    return schema.max(new Date(end.toString()), 'Ngày bắt đầu phải trước ngày kết thúc.')
                }
                return schema;
            })
        .required('Ngày kết thúc bắt buộc')
        .typeError('Ngày bắt đầu không hợp lệ.'),
    endDate: yup
        .date()
        .required('Ngày kết thúc bắt buộc')
        .typeError('Ngày kết thúc không hợp lệ.'),
});

const StatisticsPage = () => {
    const {
        handleSubmit,
        watch,
        control,
        setValue,
    } = useForm<StatisticsForm>({
        mode: 'all',
        defaultValues: {
            startDate: new Date(dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')),
            endDate: new Date(dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'))
        },
        resolver: yupResolver(statsiticsValidate)
    });
    const { isLoading: isLoadingStatistics, data: statisticsData } = useGetStatistics()
    const {
        dateRanges,
        chooseDateRange,
        getCurrentDateRange,
        updateStatisticsQuery,
        updateDateRange
    } = useDateRange(setValue)
    const watchStartDate = watch('startDate')
    const watchEndDate = watch('endDate')
    const onSubmit = (data: StatisticsForm) => {
        updateDateRange(
            dayjs(data.startDate).format('DD-MM-YYYY'),
            dayjs(data.endDate).format('DD-MM-YYYY')
        )
        updateStatisticsQuery(data.startDate, data.endDate)
    }

    useEffect(() => {
        updateDateRange(
            dayjs(watchStartDate).format('DD-MM-YYYY'),
            dayjs(watchEndDate).format('DD-MM-YYYY')
        )
    }, [watchStartDate, watchEndDate])

    return (
        <Grid spacing={3} container>
            <Grid item xs={8} sm={12}>
                <Paper sx={{ px: 3, py: 2 }}>
                    <Typography
                        variant="h4"
                        fontWeight='500'
                        sx={{ pb: 2, marginBottom: 2 }}
                    >
                        Thống kê {getCurrentDateRange().startDate} - {getCurrentDateRange().endDate}
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
            {
                !isLoadingStatistics && statisticsData
                    ?
                    <React.Fragment>
                        <Grid item xs={8} sm={3}>
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
                                        Doanh thu
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
                                        isLoadingStatistics
                                            ?
                                            <CircularProgress sx={{ margin: 'auto' }} />
                                            :
                                            <CountUp
                                                end={statisticsData.salesEarnings}
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
                                                        <span ref={countUpRef} style={{ fontSize: 20 }} />
                                                    </div>
                                                )}
                                            </CountUp>
                                    }

                                </Box>
                            </Paper>
                        </Grid>

                        <Grid item xs={8} sm={3}>
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
                                        Doanh số
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
                                        isLoadingStatistics
                                            ?
                                            <CircularProgress sx={{ margin: 'auto' }} />
                                            :
                                            <CountUp
                                                end={statisticsData.salesCount}
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
                                                        <span ref={countUpRef} style={{ fontSize: 20 }} />
                                                    </div>
                                                )}
                                            </CountUp>
                                    }

                                </Box>
                            </Paper>
                        </Grid>

                        <Grid item xs={8} sm={3}>
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
                                        Số lượng nhập
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
                                        src={PutInCartImage}
                                    />

                                    {
                                        isLoadingStatistics
                                            ?
                                            <CircularProgress sx={{ margin: 'auto' }} />
                                            :
                                            <CountUp
                                                end={statisticsData.importQuantity}
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
                                                        <span ref={countUpRef} style={{ fontSize: 20 }} />
                                                    </div>
                                                )}
                                            </CountUp>
                                    }
                                </Box>
                            </Paper>
                        </Grid>

                        <Grid item xs={8} sm={3}>
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
                                        Lượt khách
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
                                        isLoadingStatistics
                                            ?
                                            <CircularProgress sx={{ margin: 'auto' }} />
                                            :
                                            <CountUp
                                                end={statisticsData.customerPurchases}
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
                                                        <span ref={countUpRef} style={{ fontSize: 20 }} />
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
                                            labels={statisticsData.labels}
                                            data={statisticsData.salesEarningsList}
                                            xlabel='doanh thu'
                                            isFormatCurrentcy={true}
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
                                            labels={statisticsData.labels}
                                            data={statisticsData.salesCountList}
                                            xlabel='doanh số'
                                            isFormatCurrentcy={false}
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
                                        <BarChart
                                            title='Lượt khách'
                                            labels={statisticsData.labels}
                                            data={statisticsData.customerPurchasesList}
                                            xlabel='lượt khách'
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
                                        <PieChart
                                            title='Danh mục thuốc'
                                            labels={statisticsData.topSales.map((data: any) => data.name)}
                                            data={statisticsData.topSales.map((data: any) => data.sales)}
                                        />
                                }
                            </Paper>
                        </Grid>
                    </React.Fragment>
                    :
                    <Grid item xs={8} sm={12}>
                        <Paper
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                justifyItems: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    height: 150,
                                    width: 150,
                                }}
                                alt="No data."
                                src={EmptyImage}
                            />
                            <Typography
                                variant="h6"
                                fontWeight='500'

                                sx={{ opacity: '0.3', pb: 4 }}
                            >
                                Không có dữ liệu
                            </Typography>
                        </Paper>
                    </Grid>
            }


        </Grid>
    )
}

export default StatisticsPage