// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, Typography, CircularProgress, Box } from "@mui/material";
import TabPanel from "../components/TabPanel";
import WorkerTable from "../components/WorkerTable";
import { Worker } from "../types";
import { getDashboardWeeklySummary } from "../services";

const Dashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardWeeklySummary();
        setWorkers(data);
      } catch (err) {
        console.log(err);
        setError("Hubo un problema al cargar el resumen semanal.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ marginTop: 5 }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Trabajadores" />
        <Tab label="Sueldos" />
        <Tab label="Calendario Semanal" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <Typography>Lista de trabajadores (próximamente)</Typography>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <Typography>Sueldos detallados (próximamente)</Typography>
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <WorkerTable workers={workers} />
        )}
      </TabPanel>
    </Container>
  );
};

export default Dashboard;
