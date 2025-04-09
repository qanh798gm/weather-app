import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { getCities } from "../../http";
import { City } from "../../interfaces";

interface Option {
  metadata: City;
  label: string;
  id: string;
}

export const Search = ({ onChange }) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [error, setError] = useState("");

  const onSearch = async () => {
    try {
      setError("");
      const res = await getCities(value);
      const data = res.map((item: City) => ({
        metadata: { ...item },
        label: `${item.state || item.name}, ${item.country}`,
        id: `${item.lat},${item.lon}`,
      }));
      if (data.length) {
        setOptions(data);
      } else {
        setError("No result found");
      }
    } catch {
      setError("No result found");
    }
  };

  const handleChange = (event) => {
    setError("");
    setValue(event.target.value);
  };

  return (
    <Card sx={{ minWidth: 150, marginTop: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <TextField
            aria-describedby='search-box'
            fullWidth={true}
            label='Search'
            placeholder='Search country or city here...'
            size='small'
            variant='outlined'
            value={value}
            onChange={handleChange}
            sx={{
              bgcolor: "white",
            }}
          />
        </Grid>
        <Grid size={2}>
          <Button onClick={onSearch} variant='contained'>
            Search
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={0.5} sx={{ marginTop: 1 }}>
        {options?.map((option) => (
          <Button
            key={option.id}
            onClick={() => onChange(option.metadata)}
            variant='outlined'
          >
            {option.label}
          </Button>
        ))}

        {error && (
          <Typography variant='h6' color='error'>
            {error}
          </Typography>
        )}
      </Grid>
    </Card>
  );
};
