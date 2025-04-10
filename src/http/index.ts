import axios from "axios";
const http = axios.create();

export const getCityList = async (value: string) => {
  const res = await http.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  return res.data;
};

export const getWeatherList = async (lat: number, lon: number) => {
  try {
    const res = await http.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    return res.data;
  } catch {
    return null;
  }
};

export const getImage = (code: string) => {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
};
