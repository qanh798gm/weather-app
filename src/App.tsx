import { Routes, Route, useNavigate } from "react-router";

import { AppBar, Box, Button, Toolbar } from "@mui/material";

import Home from "./pages/Home";
import SearchAndHistory from "./pages/SearchAndHistory";
import { brown } from "@mui/material/colors";

const BG_COLOR = brown[600];

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' style={{ backgroundColor: BG_COLOR }}>
          <Toolbar>
            <Button
              color='inherit'
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
            <Button
              color='inherit'
              onClick={() => {
                navigate("/history");
              }}
            >
              history
            </Button>
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
