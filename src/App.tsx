import { Routes, Route, useNavigate } from "react-router";

import { AppBar, Box, Button, Grid, Toolbar } from "@mui/material";

import Home from "./pages/Home";
import SearchAndHistory from "./pages/SearchAndHistory";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='static'
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Toolbar>
            <Grid display={"flex"} justifyContent='center' width='100%'>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "primary",
                  marginRight: 2,
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Button>
              <Button
                sx={{ backgroundColor: "white", color: "primary" }}
                onClick={() => {
                  navigate("/history");
                }}
              >
                Search & History
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<SearchAndHistory />} />
      </Routes>
    </>
  );
}

export default App;
