import axios from "axios";

let cachedData = null;
let lastFetchTime = null;

export const fetchThreatData = async () => {
  try {
    const now = Date.now();

    // ✅ CACHE FOR 5 MINUTES (prevents hitting AlienVault too often)
    if (cachedData && lastFetchTime && now - lastFetchTime < 5 * 60 * 1000) {
      console.log("✅ Returning cached threat data");
      return cachedData;
    }

    const response = await axios.get(
      "https://otx.alienvault.com/api/v1/pulses/subscribed",
      {
        headers: {
          "X-OTX-API-KEY": process.env.OTX_API_KEY,
        },
      }
    );

    const results = response.data.results || [];

    const formattedData = {
      totalThreats: results.length,
      alienvault: { results },
      severityData: [],
      countryData: []
    };

    cachedData = formattedData;
    lastFetchTime = now;

    return formattedData;
  } catch (err) {
    console.log("❌ AlienVault Error:", err.message);

    // ✅ FALLBACK DATA TO PREVENT FRONTEND CRASH
    return {
      totalThreats: 5,
      alienvault: {
        results: [
          { name: "Sample Threat 1", description: "Fallback threat data" },
          { name: "Sample Threat 2", description: "Backend fallback" }
        ]
      },
      severityData: [],
      countryData: []
    };
  }
};
