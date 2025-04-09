import { Box, Container } from "@mui/material";
import { useState } from "react";
import { Search } from "../components/search-and-history/Search";
import { SearchList } from "../components/search-and-history/SearchList";
import { City } from "../interfaces";
import { useNavigate } from "react-router";

export default function SearchAndHistory() {
  const navigate = useNavigate();
  const [list, setList] = useState(() => {
    const localState = localStorage.getItem("history");
    return localState ? JSON.parse(localState) : [];
  });
  const onChange = (value: City) => {
    if (value) {
      const newState = [...list, value];
      localStorage.setItem("history", JSON.stringify(newState));
      localStorage.setItem("city", JSON.stringify(value));
      navigate("/");
    }
  };

  const onSearch = (city: City) => {
    localStorage.setItem("city", JSON.stringify(city));
    navigate("/");
  };

  const onDelete = (city) => {
    const history = JSON.parse(localStorage.getItem("history") ?? "null");
    if (history) {
      const newHistory = history.filter(
        (item) => item.name !== city.name && item.country !== city.country
      );
      localStorage.setItem("history", JSON.stringify(newHistory));
      setList(newHistory);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box component='form' noValidate autoComplete='off'>
        <Search onChange={onChange} />
        <SearchList data={list} onSearch={onSearch} onDelete={onDelete} />
      </Box>
    </Container>
  );
}
