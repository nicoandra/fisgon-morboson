
import axios from 'axios'
import { initialize } from './rapini-generated-package'

const axiosInstance = axios.create({
    baseURL: process.env['REACT_APP_API_SERVER'],
    timeout: 1000,
    headers: {'X-Custom-Header-If-Any': 'foobar'}
});


export const api = initialize(axiosInstance)