import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import dotenv from "dotenv";
dotenv.config();

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getWeatherCurrent = async (city: string): Promise<AxiosResponse> => {
  return instance.get(`/current.json?q=${city}&key=${process.env.API_KEY}`);
};

const getWeatherForecast = async (city: string, days: number = 5): Promise<AxiosResponse> => {
  return instance.get(`/forecast.json?q=${city}&days=${days}&key=${process.env.API_KEY}`);
};

export { getWeatherCurrent, getWeatherForecast };
