import Box from '@mui/material/Box';
import { useForgotPassword } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { EmailForm } from './forgot-password/EmailForm';
import { VerifyOtp } from './forgot-password/VerifyOtp';
import { SetNewPassword } from './forgot-password/SetNewPassword';

export const ForgotPassword = () => {
    const [otpResponse, setOtpResponse] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [verified, setVerified] = useState<boolean>(false)
    const forgotPassword = useForgotPassword()
    
    const resendOtp = () => {
        forgotPassword.mutate({email})
    }
    useEffect(() => {
        if (forgotPassword.data) {
            setOtpResponse(forgotPassword.data)
        }
    }, [forgotPassword.data])
    return (
        <Box
            sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {
                verified
                ?
                    <SetNewPassword email={email} />
                :
                    otpResponse 
                    ?
                    <VerifyOtp resendOtp={resendOtp} setVerified={setVerified} otpResponse={otpResponse} />
                    :
                    <EmailForm setOtpResponse={setOtpResponse} setEmail={setEmail} />
                
            }
        </Box>
    );
}