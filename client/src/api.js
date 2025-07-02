import axios from "axios";

const BASE_URL = "";

// GET all exoplanets
export const fetchExoplanets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/planets`);
    return response.data.exoplanets || [];
  } catch (error) {
    console.error("❌ Failed to fetch exoplanets:", error);
    return [];
  }
};
