import { makeUseAxios } from 'axios-hooks';
import Axios from 'axios';


const request = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_SERVER_URL,
});

export const useRequest = makeUseAxios({ axios: request, cache: false, defaultOptions: { ssr: true } });