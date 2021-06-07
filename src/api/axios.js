let axios = require('axios');
let baseUrl = 'https://www.fastmock.site/mock/17b0bb950821ae42a605409780cc166b/ecg-h5';

const axiosIns = axios.create({
    baseUrl,
    timeout: 30000
});

axiosIns.interceptors.request.use(config=>{
    console.log(config);
    return config;    
});

axiosIns.interceptors.response.use(
    response=>{
        return response.data;
    },
    err=>{
        if(err.message.include('timeout')){
            console.log('网络超时');
        }
        return new Promise.reject(err);
});

export default axiosIns;