let backendUrl: string = ''
const addressApiUrl = 'https://vn-public-apis.fpo.vn/'

if(import.meta.env.MODE === "development"){
    backendUrl = 'http://localhost:3000/api/'
}
else{
    backendUrl = (import.meta.env.REACT_APP_API_URL as string);
}

export {
    backendUrl,
    addressApiUrl
}