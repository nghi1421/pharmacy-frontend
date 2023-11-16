import { Box, Grid, Paper, Typography } from "@mui/material"
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyImage from '../../assets/images/money.png'

import CountUp from 'react-countup';
const StatisticsPage = () => {
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
                        <CountUp
                            end={160527.012}
                            duration={2.75}
                            decimals={3}
                            decimal=","
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
                    </Box>
                </Paper>
            </Grid>
                    
            <Grid item xs={8} sm={6}>
                <Paper>
                    <Box sx={{
                        display: 'flex',
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
                            sx={{ px:3, py: 2 }}
                        >
                            Thống kê
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
        
        
    )
}


export default StatisticsPage