import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

export const SearchList = ({ data, onSearch, onDelete }) => {
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Search History
      </Typography>
      <Card sx={{ minWidth: 150, marginTop: 1 }}>
        <CardContent>
          {data?.map((item) => (
            <Grid
              key={item.name}
              container
              spacing={2}
              justifyContent={"space-between"}
            >
              <Grid size={8}>
                <Typography variant='h5'>
                  {item.name}, {item.country}
                </Typography>
              </Grid>

              <Grid container justifyContent={"start-end"}>
                <IconButton aria-label='search' onClick={() => onSearch(item)}>
                  <SearchIcon />
                </IconButton>
                <IconButton aria-label='delete' onClick={() => onDelete(item)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>
    </>
  );
};
