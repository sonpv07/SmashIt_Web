import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Courts from "./scenes/court";
import GlobalProvider, { useGlobalContext } from "./context/GlobalProvider";
import PrivateRoute from "./route/ProtectedRoute";
import ProtectedRoute from "./route/ProtectedRoute";
import Login from "./scenes/login";
import { ToastContainer } from "react-toastify";
import CourtRevenue from "./scenes/bar/courtRevenue";
import TransactionHistory from "./scenes/invoices/TransactionHistory";

function App() {
  const { isLogged, loading } = useGlobalContext();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  if (loading) return <div>Loading...</div>;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/courts" element={<Courts />} />
              <Route path="/courtRevenue" element={<CourtRevenue />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/transaction" element={<TransactionHistory />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
