let backendUrl: string = ''

if (import.meta.env.MODE === "development") {
    backendUrl = 'http://localhost:3000/api/'
}
else{
    backendUrl = (import.meta.env.REACT_APP_API_URL as string);
}

export {
    backendUrl
}