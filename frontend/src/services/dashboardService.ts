import axios from "axios";

const API_URL = "http://localhost:3000/dashboard";

export const getDashboardData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
