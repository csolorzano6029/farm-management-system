import axios from "axios";
import { API_URL } from "../constants";

export const getDashboardWeeklySummary = async () => {
  try {
    const response = await axios.get(API_URL + "/dashboard/weekly-summary");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard weekly summary:", error);
    throw error;
  }
};
