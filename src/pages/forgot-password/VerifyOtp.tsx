import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CustomLink } from '../../components/CustomLink';
import { useState } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';

interface VerifyOtpProps {
    setVerified: (s: boolean) => void;
    otpResponse: string;
    resendOtp: () => void
}

export const VerifyOtp: React.FC<VerifyOtpProps> = ({setVerified, otpResponse, resendOtp}) => {
    const [otp, setOtp] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [counter, setCounter] = useState<number>(0);
    const handleChange = (newValue: string) => {
        setOtp(newValue)
    }
    
    const checkOtp = () => {
        if (otp === otpResponse) {
            setVerified(true)
            setErrorMessage('')
            setCounter(0)
        }
        else {
            if (counter + 1 > 5) {
                setErrorMessage('Xác thực OTP thất bại quá 5 lần vui lòng đợi 5:00 để tiếp tục xác thực.')
            }
            else {
                setCounter(counter + 1)
                setErrorMessage('Mã OTP không chính xác vui lòng kiểm tra.')
            }
        }
    }
    return (
        <>
            <Typography marginTop={15} component="h1" variant="h3" color='primary'
                sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2), -1px -1px 2px rgba(0, 0, 0, 0.2)' }}
            >
                Xác thực
            </Typography>
            <Box sx={{ mt: 2, width: '100%', px: 2, pt: 2, }} >
                <Grid container spacing={3}>
                    <Grid item xs={8} sm={12}>
                        <MuiOtpInput value={otp} onChange={handleChange} length={6} />
                        <Typography color='#d32f2f' sx={{ fontSize: 13, mt:0.5 }}>{errorMessage}</Typography>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <Button
                            fullWidth
                            disabled={counter > 5}
                            variant="contained"
                            sx={{ mt: 4, mb: 2 }}
                            onClick={() => checkOtp()}
                        >
                            Xác thực
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 4, mb: 2 }}
                            onClick={() => resendOtp()}
                        >
                            Gửi lại OTP
                        </Button>
                    </Box>
                    <CustomLink link='/login' title='Quay về trang đăng nhập'/>
                </Box>
            </Box>
        </>
    )
}