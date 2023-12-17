import { Staff } from "../types/Staff";

const setAccessToken = (accessToken: string | null) => {
    localStorage.setItem('accessToken', accessToken);
}

const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
}

const setStaff = (staff: Staff | null) => {
    localStorage.setItem('staffInfomation', JSON.stringify(staff));
}

const getStaff = () => {
    const staff: string | null = localStorage.getItem('staffInfomation');
    if (staff) {
        return JSON.parse(staff);
    }
    return null;
}

export {
    setAccessToken,
    getAccessToken,
    setStaff,
    getStaff,
}