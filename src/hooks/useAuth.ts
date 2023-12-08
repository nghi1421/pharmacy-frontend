import { API_CHANGE_PASSWORD, API_FRESH_TOKEN, API_LOGIN } from '../utils/constants';
import { useMutation } from 'react-query';
import axiosClient from '../services/axios';
import { AuthContext } from '../App';
import { useContext } from 'react';
import { setAccessToken, setStaff } from '../store/auth';
import { enqueueSnackbar } from 'notistack';
import { handleAddress } from '../utils/address';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../pages/Login';
import { ChangePasswordForm } from '../pages/ChangePassword';

export const useLogin = () => {
  const navigate = useNavigate()
  const { setRoleId, setUsername } = useContext(AuthContext)
    return useMutation({
    mutationFn: async (data: LoginForm) => {
      return await axiosClient.post(API_LOGIN, data)
        .then(response => {
          if (response.data.message) {
            switch (response.data.data.role.id) {
                case 1: {
                    setStaff({...response.data.data.staff, address: handleAddress(response.data.data.staff.address), rawAddress: response.data.data.staff.address})
                    setAccessToken(response.data.accessToken);
                    setRoleId(response.data.data.role.id)
                    setUsername(data.username)
                    enqueueSnackbar(
                        response.data.message, {
                        autoHideDuration: 3000,
                        variant: 'success'
                    })
                    navigate('/admin/users')
                    break;
                }
                case 2: {
                    setStaff({...response.data.data.staff, address: handleAddress(response.data.data.staff.address), rawAddress: response.data.data.staff.address})
                    setAccessToken(response.data.accessToken);
                    setRoleId(response.data.data.role.id)
                    setUsername(data.username)
                    enqueueSnackbar(
                        response.data.message, {
                        autoHideDuration: 3000,
                        variant: 'success'
                    })
                    navigate('/sales/create')
                    break;
                }
                default: {
                    setStaff(null)
                    setAccessToken(null)
                    setRoleId(null)
                    enqueueSnackbar(
                        'Bạn không có quyền thao tác trên phiên bản web.', {
                        autoHideDuration: 3000,
                        variant: 'error'
                    })
                }
            }
        }
        else {
            enqueueSnackbar(
                response.data.errorMessage, {
                autoHideDuration: 3000,
                variant: 'error'
            })
        }
        })
        .catch(error => {
            if (error.response.data.errorMessage) {
              enqueueSnackbar(
                error.response.data.errorMessage, {
                autoHideDuration: 3000,
                variant: 'error'
              })
            }
        }) 
    },
  })
}

export const useRefreshToken = () => {
  const { setRoleId, setUsername } = useContext(AuthContext)
  return useMutation({
  mutationFn: async () => {
    return await axiosClient.post(API_FRESH_TOKEN)
      .then(response => {
        setAccessToken(response.data.accessToken)
      })
      .catch(_ => {
        setAccessToken(null)
        setStaff(null)
        setRoleId(null)
        setUsername(null)
        enqueueSnackbar('Phiên đăng nhập đã hết hạn.', {
          variant: 'error',
          autoHideDuration: 3000
        })
      }) 
  },
}) 
}

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async () => {
      return await axiosClient.post(API_FRESH_TOKEN)
        .then(response => {
          if (response.data.message) {
            enqueueSnackbar('Phiên đăng nhập đã hết hạn.', {
              variant: 'error',
              autoHideDuration: 3000
            })
          }
        })
        .catch(_ => {
          enqueueSnackbar('Phiên đăng nhập đã hết hạn.', {
            variant: 'error',
            autoHideDuration: 3000
          })
        })
    },
  })
}

export const useChangePassword = () => {
  const { username, setRoleId, setUsername } = useContext(AuthContext)
  
  return useMutation({
    mutationFn: async (data: ChangePasswordForm) => {
      return await axiosClient.post(API_CHANGE_PASSWORD, { ...data, username: username})
        .then(response => {
          if (response.data.message) {
            enqueueSnackbar(response.data.message, {
              variant: 'success',
              autoHideDuration: 3000
            })
            setAccessToken(null)
            setStaff(null)
            setRoleId(null)
            setUsername(null)
          }
          return response
        })
        .catch(error => {
          console.log(error)
          if (error.response.data.errorMessage) {
            enqueueSnackbar(error.response.data.errorMessage, {
              variant: 'error',
              autoHideDuration: 3000
            })
          }
          else {
            enqueueSnackbar('Lỗi server!', {
              variant: 'error',
              autoHideDuration: 3000
            })
          }
        })
    },
  })
}