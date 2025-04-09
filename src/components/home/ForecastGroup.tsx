import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { ListProps, SingleProps, WeatherDetail } from "../../interfaces";
import { useMemo } from "react";
import { getImage } from "../../http";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { startCase } from "lodash-es";
dayjs.extend(customParseFormat);

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
  const formatDate = (date: string) => {
    return dayjs(date.split(" ")[0], "YYYY-MM-DD").format("DD MMMM");
  };
  return (
    <>
      <Typography variant='h6' gutterBottom>
        {formatDate(data[0].dt_txt)}
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
          {data?.dt_txt.split(" ")[1].slice(0, 5)}
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
          {startCase(data?.weather[0]?.description)}
        </Typography>
      </Grid>
    </Grid>
  );
}
