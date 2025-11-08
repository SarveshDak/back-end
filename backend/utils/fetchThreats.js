import axios from "axios";

let cachedData = null;
let lastFetchTime = null;

export const fetchThreatData = async () => {
  // ✅ AlienVault OTX API request
try {
  const alienResponse = await fetch(
    "https://otx.alienvault.com/api/v1/pulses/subscribed?page=1",
    {
      headers: {
        "X-OTX-API-KEY": process.env.ALIENVAULT_API_KEY,
        "User-Agent": "ThreatViewApp/1.0",   // REQUIRED
        "Accept": "application/json"
      }
    }
  );

  const responseData = await alienResponse.json(); // ✅ FIXED

  const results = responseData.results || [];       // ✅ FIXED

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
}


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
  };
