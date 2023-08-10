import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./utils/theme";
import Events from "./pages/events";
import { EventsProvider } from "./context/events";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EventsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Events />} />
          </Routes>
        </BrowserRouter>
      </EventsProvider>
    </ThemeProvider>
  );
}

export default App;
