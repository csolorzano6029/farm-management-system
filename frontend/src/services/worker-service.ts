import axios from "axios";
import { API_URL } from "../constants";

export const findAllWorkers = async () => {
  try {
    const response = await axios.get(API_URL + "/workers");
    return response.data;
  } catch (error) {
    console.error("Error fetching workers:", error);
    throw error;
  }
};
