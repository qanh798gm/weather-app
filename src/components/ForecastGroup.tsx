import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { ListProps, SingleProps, WeatherDetail } from "../interfaces";
import { useMemo } from "react";
import { getImage } from "../http";
import { customFormat, SHORT_TIME } from "../utils/DateHelper";

const group = (data: WeatherDetail[]) => {
  return data.reduce((acc: WeatherDetail[][], curr: WeatherDetail) => {
    const lastGroup = acc[acc.length - 1];
    if (
      !lastGroup ||
      lastGroup[0].dt_txt.split(" ")[0] !== curr.dt_txt.split(" ")[0]
    ) {
      acc.push([curr]);
    } else {
      lastGroup.push(curr);
    }
    return acc;
  }, []);
};

export default function ForecastGroup({ data }: Readonly<ListProps>) {
  const groupedData = useMemo(() => group(data), [data]);
  return (
    <>
      <Typography variant='h6' gutterBottom>
        5-day Forecast (3 Hours)
      </Typography>
      <Card sx={{ minWidth: 150, marginTop: 1 }}>
        <CardContent>
          {groupedData?.map((list) => (
            <ForecastList data={list} key={list[0].dt} />
          ))}
        </CardContent>
      </Card>
    </>
  );
}

function ForecastList({ data }: Readonly<ListProps>) {
  console.log(data);
  return (
    <>
      <Typography variant='h6' gutterBottom>
        {data[0]?.dt_txt?.split(" ")[0]}
      </Typography>
      {data?.map((item) => (
        <ForecastItem key={item.dt} data={item} />
      ))}
    </>
  );
}

function ForecastItem({ data }: Readonly<SingleProps>) {
  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <Typography variant='subtitle2' gutterBottom>
          {customFormat(data?.dt, SHORT_TIME)}
        </Typography>
      </Grid>
      <Grid
        size={5}
        display='flex'
        justifyContent='space-around'
        alignItems='start'
      >
        <CardMedia
          sx={{ height: 30, width: 30 }}
          image={getImage(data?.weather[0]?.icon)}
          title='weather'
        />
        {data?.main.temp_max} / {data?.main.temp_min} ° C
      </Grid>
      <Grid size={4} display='flex' justifyContent='right'>
        <Typography variant='subtitle2' gutterBottom>
          {data?.weather[0]?.description}
        </Typography>
      </Grid>
    </Grid>
  );
}
