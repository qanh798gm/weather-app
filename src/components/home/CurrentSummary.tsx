import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { WeatherDetail } from "../../interfaces";
import { getImage } from "../../http";
import { startCase } from "lodash-es";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

interface Props {
  data: WeatherDetail;
  city: string;
}

export default function CurrentSummary({ city, data }: Readonly<Props>) {
  return (
    <Card sx={{ minWidth: 150, marginTop: 1 }}>
      <CardContent>
        <Grid
          container
          spacing={2}
          display='flex'
          justifyContent='space-between'
        >
          <Typography variant='h5'>
            {dayjs(data?.dt_txt.split(" ")[0], "YYYY-MM-DD").format(
              "MMMM DD, YYYY"
            )}
          </Typography>
          <Typography variant='h6'>{city}</Typography>
        </Grid>

        <Grid
          container
          spacing={2}
          display='flex'
          justifyContent='space-around'
          alignItems='center'
        >
          <CardMedia
            sx={{ height: 120, width: 120 }}
            image={getImage(data?.weather[0]?.icon)}
            title='weather'
          />

          <div>
            <Typography variant='h3'>{data?.main?.temp}°C</Typography>
            <Typography variant='h6'>
              {startCase(data?.weather[0]?.description)}
            </Typography>
          </div>
        </Grid>

        <Grid
          container
          spacing={2}
          display='flex'
          justifyContent='space-around'
        >
          <div>
            <Typography variant='h6'>Humidity</Typography>
            <strong>{data?.main?.humidity} %</strong>
          </div>
          <div>
            <Typography variant='h6'>Winds</Typography>
            <strong>{data?.wind?.speed} m/s</strong>
          </div>
          <div>
            <Typography variant='h6'>Visibility</Typography>
            <strong>{data?.visibility / 1000} km</strong>
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
}
