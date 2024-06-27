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
import Login from "./scenes/login";
import GlobalProvider, { useGlobalContext } from "./context/GlobalProvider";
import PrivateRoute from "./route/ProtectedRoute";
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  const { isLogged, loading } = useGlobalContext();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/team"
              element={
                <ProtectedRoute>
                  <Team />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <ProtectedRoute>
                  <Contacts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courts"
              element={
                <ProtectedRoute>
                  <Courts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/invoices"
              element={
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/form"
              element={
                <ProtectedRoute>
                  <Form />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bar"
              element={
                <ProtectedRoute>
                  <Bar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pie"
              element={
                <ProtectedRoute>
                  <Pie />
                </ProtectedRoute>
              }
            />
            <Route
              path="/line"
              element={
                <ProtectedRoute>
                  <Line />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faq"
              element={
                <ProtectedRoute>
                  <FAQ />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/geography"
              element={
                <ProtectedRoute>
                  <Geography />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
