import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import dotenv from "dotenv";
dotenv.config();

type error = {
  status: number;
  message: string;
};

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getWeatherCurrent = async (
  city: string
): Promise<AxiosResponse | error> => {
  try {
    const response = await instance.get(
      `/current.json?q=${city}&key=${process.env.API_KEY}`
    );
    return response.data;
  } catch (err: any) {
    const error: error = {
      status: err.response.status,
      message: err.response.data.error.message,
    };
    return error;
  }
};

const getWeatherForecast = async (
  city: string,
  days: number = 5
): Promise<AxiosResponse | error> => {
  try {
    const response = await instance.get(
      `/forecast.json?q=${city}&days=${days}&key=${process.env.API_KEY}`
    );
    return response.data;
  } catch (err: any) {
    const error: error = {
      status: err.response.status,
      message: err.response.data.error.message,
    };
    return error;
  }
};

export { getWeatherCurrent, getWeatherForecast };
