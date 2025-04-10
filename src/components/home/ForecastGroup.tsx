import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { WeatherDetail } from "../../interfaces";
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

export interface Props {
  data: WeatherDetail[];
}

export default function ForecastGroup({ data }: Readonly<Props>) {
  const groupedData = useMemo(() => group(data), [data]);
  return (
    <>
      <Typography variant='h6' sx={{ marginTop: 2 }}>
        5-day Forecast (3 Hours)
      </Typography>
      <Card>
        <CardContent>
          <Grid container rowSpacing={2}>
            {groupedData?.map((list) => (
              <ForecastList data={list} key={list[0].dt} />
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

function ForecastList({ data }: Readonly<Props>) {
  const formatDate = (date: string) => {
    return dayjs(date.split(" ")[0], "YYYY-MM-DD").format("DD MMMM");
  };
  return (
    <Grid size={12}>
      <Typography variant='h6' gutterBottom>
        {formatDate(data[0].dt_txt)}
      </Typography>
      {data?.map((item) => (
        <ForecastItem key={item.dt} data={item} />
      ))}
    </Grid>
  );
}

function ForecastItem({ data }: Readonly<{ data: WeatherDetail }>) {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <Typography variant='subtitle2' gutterBottom>
          {data?.dt_txt.split(" ")[1].slice(0, 5)}
        </Typography>
      </Grid>
      <Grid size={4} display='flex' alignItems='center'>
        <CardMedia
          sx={{ height: 30, width: 30, marginRight: 2 }}
          image={getImage(data?.weather[0]?.icon)}
          title='weather'
        />
        <Typography variant='subtitle2'>
          {data?.main.temp_max} / {data?.main.temp_min} ° C
        </Typography>
      </Grid>
      <Grid size={4} display='flex' justifyContent='right'>
        <Typography variant='subtitle2'>
          {startCase(data?.weather[0]?.description)}
        </Typography>
      </Grid>
    </Grid>
  );
}
