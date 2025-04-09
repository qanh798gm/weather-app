import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { SingleProps } from "../interfaces";
import { getImage } from "../http";
import { customFormat, SUMMARY_FORMAT } from "../utils/DateHelper";

export default function CurrentSummary({ data }: Readonly<SingleProps>) {
  return (
    <Card sx={{ minWidth: 150, marginTop: 1 }}>
      <CardContent>
        <Typography variant='h5'>
          {customFormat(data?.dt, SUMMARY_FORMAT)}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <CardMedia
              sx={{ height: 80, width: 80 }}
              image={getImage(data?.weather[0]?.icon)}
              title='weather'
            />
          </Grid>
          <Grid size={6}>
            <Typography variant='h3' gutterBottom>
              {data?.main?.temp} ° C
            </Typography>
            <Typography variant='h6' gutterBottom>
              {data?.weather[0]?.description}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={4}>
            <Typography variant='h6'>Humidity</Typography>
            <strong>{data?.main?.humidity} %</strong>
          </Grid>
          <Grid size={4}>
            <Typography variant='h6'>Winds</Typography>
            <strong>{data?.wind?.speed} m/s</strong>
          </Grid>
          <Grid size={4}>
            <Typography variant='h6'>Visibility</Typography>
            <strong>{data?.visibility / 1000} km</strong>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
