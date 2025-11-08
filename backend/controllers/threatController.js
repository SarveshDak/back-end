import { fetchThreatData } from "../utils/fetchThreats.js";
export const fetchThreats = async (req, res) => {
  const result = await fetchThreatData();
  res.json(result);
};
