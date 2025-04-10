import { useEffect, useState } from "react";
import { getWeatherList } from "../http";
import { Box, Container, Grid, Typography } from "@mui/material";
import CurrentSummary from "../components/home/CurrentSummary";
import ForecastGroup from "../components/home/ForecastGroup";
import { WeatherDetail } from "../interfaces";

export default function Home() {
  const [data, setData] = useState<WeatherDetail[]>([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const fetchData = async () => {
    const recentCity = JSON.parse(localStorage.getItem("city") ?? "null");
    if (recentCity) {
      const res = await getWeatherList(recentCity.lat, recentCity.lon);
      console.log(res);
      if (res) {
        setData(res.list);
        setCity(`${recentCity.name}, ${recentCity.country}`);
      } else {
        setError("Error while fetching data, please try again.");
      }
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
          <Grid display='flex' justifyContent='center'>
            <Typography variant='h6' sx={{ marginTop: 1 }} color='error'>
              {error}
            </Typography>
          </Grid>
        )}
        {!error && (
          <>
            <CurrentSummary data={data?.[0]} city={city} />
            <ForecastGroup data={newList} />
          </>
        )}
      </Box>
    </Container>
  );
}
