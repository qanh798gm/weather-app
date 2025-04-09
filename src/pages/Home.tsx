import { useEffect, useState } from "react";
import { getWeatherList } from "../http";
import { Box, Container, Typography } from "@mui/material";
import CurrentSummary from "../components/home/CurrentSummary";
import ForecastGroup from "../components/home/ForecastGroup";
import { WeatherDetail } from "../interfaces";

export default function Home() {
  const [data, setData] = useState<WeatherDetail[]>([]);
  const [error, setError] = useState("");
  const fetchData = async () => {
    const recentCity = JSON.parse(localStorage.getItem("city") ?? "null");
    console.log(recentCity);
    if (recentCity) {
      const res = await getWeatherList(recentCity.lat, recentCity.lon);
      setData(res.list);
    } else {
      setError("Please switch to Search & History tab to search for a city.");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const newList = data.slice(1);

  return (
    <Container maxWidth='sm'>
      <Box>
        {error && (
          <Typography variant='h6' sx={{ marginTop: 1 }} color='error'>
            {error}
          </Typography>
        )}
        {!error && (
          <>
            <CurrentSummary data={data?.[0]} />
            <ForecastGroup data={newList} />
          </>
        )}
      </Box>
    </Container>
  );
}
