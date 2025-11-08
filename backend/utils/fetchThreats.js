import axios from "axios";
export const fetchThreatData = async () => {
  try {
    const alienvault = await axios.get(
      "https://otx.alienvault.com/api/v1/pulses/subscribed",
      { headers: { "X-OTX-API-KEY": process.env.ALIENVAULT_API_KEY } }
    );
    const abuseipdb = await axios.get(
      "https://api.abuseipdb.com/api/v2/blacklist",
      { headers: { Key: process.env.ABUSEIPDB_API_KEY } }
    );
    return { alienvault: alienvault.data, abuseipdb: abuseipdb.data };
  } catch (err) {
    return { error: err.message };
  }
};
