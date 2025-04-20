import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { Worker } from "../types";
import dayjs from "dayjs";

const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const getDayIndex = (date: string): number => {
  // JS: Sunday=0, ..., Saturday=6 → transformamos para que Lunes=0, ..., Domingo=6
  const jsDay = dayjs(date).day();
  return jsDay === 0 ? 6 : jsDay - 1;
};

type Props = {
  workers: Worker[];
};

const WorkerTable: React.FC<Props> = ({ workers }) => {
  const renderWorkerRow = (worker: Worker) => {
    const workDays: (number | null)[] = new Array(7).fill(null);

    worker.worklogs.forEach((log) => {
      const dayIndex = getDayIndex(log.workDate);
      const amount = log.journalUnits * worker.dailyWage;
      workDays[dayIndex] = (workDays[dayIndex] || 0) + amount;
    });

    return (
      <TableRow key={worker.id}>
        <TableCell>{worker.name}</TableCell>
        {workDays.map((amount, i) => (
          <TableCell
            key={i}
            style={{
              backgroundColor: amount ? "#d4edda" : "inherit",
            }}
          >
            {amount ? `$${amount.toFixed(2)}` : ""}
          </TableCell>
        ))}
        <TableCell>
          <strong>${worker.total.toFixed(2)}</strong>
        </TableCell>
      </TableRow>
    );
  };

  const totalGeneral = workers.reduce((acc, w) => acc + w.total, 0);

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Calendario Semanal de Trabajo y Sueldos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Trabajador</strong>
              </TableCell>
              {days.map((day) => (
                <TableCell key={day}>
                  <strong>{day}</strong>
                </TableCell>
              ))}
              <TableCell>
                <strong>Total Semanal ($)</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers.map(renderWorkerRow)}
            <TableRow>
              <TableCell colSpan={8} align="right">
                <strong>Total General:</strong>
              </TableCell>
              <TableCell>
                <strong>${totalGeneral.toFixed(2)}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WorkerTable;
