import axios from "./axiosConfig";



// export const axiosClient = axios.create({
//   baseURL: 'http://localhost:8000'
// });

// axiosClient.defaults.headers = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json'
// };

// //All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 5000;
// axiosClient.defaults.withCredentials = true;
// axiosClient.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;


// axios.interceptors.request.use(function (request) {
//   request.headers['Content-Type'] = 'multipart/form-data';
//   request.headers['token'] = 'ssssssssssss';
//   return request;
// }, null, { synchronous: true });


// axios.interceptors.response.use(function (response) {
//   //Dispatch any action on success
//   window.replace('/')

//   return response;
// }, function (error) {
//   if (error.response.status === 404) {
//     window.replace('/sdfsdf')

//     //Add Logic to 
//     //1. Redirect to login page or 
//     //2. Request refresh token
//   }
//   return Promise.reject(error);
// });

// export function getRequest(URL, headers = null) {
//   return axios.get(`/${URL}`, headers).then(response => response);
// }

export function getRequest(URL, headers = null) {
  return axios.get(`${URL}`, headers).then(response => response);
}

export function postRequest(URL, payload, headers = null) {
  return axios.post(`${URL}`, payload, headers)
    .then(response => response)
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return Promise.reject( error.response.data)
      } else {
        return error.response;
      }
    });
}

export function patchRequest(URL, payload, headers = null) {
  return axios.patch(`/${URL}`, payload, headers).then(response => response)
  .catch((error)=> console.log(error));
}

export function deleteRequest(URL, headers = null) {
  return axios.delete(`/${URL}`, headers).then(response => response);
}

