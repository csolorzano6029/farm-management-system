// src/components/TabPanel.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { TabPanelProps } from "../types";

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography component="div">{children}</Typography>
      </Box>
    )}
  </div>
);

export default TabPanel;
