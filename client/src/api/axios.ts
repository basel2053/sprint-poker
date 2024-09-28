import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

const { VITE_API_URL: apiUrl } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: `http://${apiUrl}`,
  headers: {
    Accept: 'application/json, text/plain, */*',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  async (err) => {
    const status = err.response ? err.response.status : null;
    const originalConfig = err.config;

    if (status === 401) {
      try {
        // const refreshTokenFromStorage = localStorage.getItem('accessToken');
        // // const { accessToken, refreshToken } = await AuthService.refresh(refreshTokenFromStorage);
        // //
        // // LocalStorageService.setTokens(accessToken, refreshToken);
        // axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        return await axiosInstance(originalConfig);
      } catch (error: unknown) {
        return Promise.reject(error);
      }
    }

    if (status === 403 && err.response.data) {
      return Promise.reject(err.response.data);
    }

    return Promise.reject(err);
  },
);

export const request = async (options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => {
    const { data } = response;
    return data;
  };

  const onError = function (error: AxiosError) {
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response,
    });
  };

  return axiosInstance(options).then(onSuccess).catch(onError);
};
