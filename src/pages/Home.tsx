import { useEffect, useState } from "react";
import { getData } from "../http";
import { Box, Container } from "@mui/material";
import CurrentSummary from "../components/CurrentSummary";
import { WeatherDetail } from "../interfaces";
import ForecastGroup from "../components/ForecastGroup";

export default function Home() {
  const [data, setData] = useState<WeatherDetail[]>([]);
  const fetchData = async () => {
    const res = await getData();
    setData(res.list);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth='sm'>
      <Box>
        <CurrentSummary data={data[0]} />
        <ForecastGroup data={data} />
      </Box>
    </Container>
  );
}
