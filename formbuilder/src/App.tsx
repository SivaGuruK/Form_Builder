import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "./store/store";
import theme from "./theme";
import Home from "./pages/Home";
import CreateFormPage from "./pages/CreateFormPage";
import PreviewFormPage from "./pages/PreviewFormPage";
import MyFormsPage from "./pages/MyFormsPage";


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/create" element={<CreateFormPage />} />
            <Route path="/preview" element={<PreviewFormPage />} />
            <Route path="/myforms" element={<MyFormsPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;