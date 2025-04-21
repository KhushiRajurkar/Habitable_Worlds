import axios from "axios";

// Backend base (adjust this if hosting separately)
const BASE_URL = "http://localhost:3000";

// GET all exoplanets (optionally filtered server-side)
export const fetchExoplanets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/planets`);
    return response.data?.exoplanets || [];
  } catch (error) {
    console.error("❌ Failed to fetch exoplanets:", error);
    return [];
  }
};
