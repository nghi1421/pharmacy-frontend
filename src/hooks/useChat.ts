import { enqueueSnackbar } from 'notistack';
import axiosClient from '../services/axios';
import { API_GET_MESSAGES } from '../utils/constants';
import { useQuery } from 'react-query';
import { User } from '../types/User';
import { formatDateTime } from '../utils/format';
import dayjs from 'dayjs';

export interface Message {
    id: number
    content: string
    time: string
    fromCustomer: boolean
}

export interface Room {
    id: number
    name: string
    user: User
    recent: string
    messages: Message[]
}

const createDataRoom = (room: Room) => {
    return {
        ...room,
        recent: formatDateTime(room.recent),
        messages: room.messages.map((message: Message) => {
            return { ...message, time: dayjs(message.time).format('HH:mm') }
        })
    }
}

const useGetMessages = () => {
    return useQuery({
        queryFn: () => axiosClient
            .get(`${API_GET_MESSAGES}`)
            .then((response) => {
                if (response.data.message) {
                    return response.data.data.map((room: Room) => createDataRoom(room))
                }
                enqueueSnackbar(response.data.errorMessage, {
                    autoHideDuration: 3000,
                    variant: 'error'
                })

                return undefined;
            }),
    })
};

export {
    useGetMessages,
    createDataRoom
}