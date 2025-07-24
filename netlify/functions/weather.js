// const axios = require('axios');

// exports.handler = async (event) => {
//   const { city } = event.queryStringParameters || "gauribidanur";

//   if (!city) {
//     return { statusCode: 400, body: JSON.stringify({ error: "City is required" }) };
//   }

//   const API_KEY = "bae7a2d6f5b35e276a0740129a503d8c";
//   const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(city)}&units=m`;

// //   try {
// //   const response = await axios.get(url);
// //   console.log("WeatherStack response:", response.data);
// //   return { statusCode: 200, body: JSON.stringify(response.data) };
// // } catch (err) {
// //   console.error("Weather function failed:", err.response?.data || err.message);
// //   return { statusCode: 500, body: JSON.stringify({ error: err.message, details: err.response?.data }) };
// // }
// try {
//     console.log("Requesting WeatherStack URL:", url);
//     const response = await axios.get(url);
//     console.log("WeatherStack response received.");
//     return {
//       statusCode: 200,
//       body: JSON.stringify(response.data),
//       headers: { 'Content-Type': 'application/json' }
//     };
//   } catch (err) {
//     console.error("Weather function failed:", err.response?.data || err.message);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ 
//         error: err.message,
//         details: err.response?.data || null
//       })
//     };
// }

// };


export async function handler(event) {
  const { city } = event.queryStringParameters || 'gauribidanur';

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'City query parameter is required.' })
    };
  }

  const API_KEY = "bae7a2d6f5b35e276a0740129a503d8c";
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(city)}&units=m`;

  try {
    console.log("Requesting WeatherStack URL:", url);
    const response = await import('axios').then(({ default: axios }) => axios.get(url));
    console.log("WeatherStack response received.");

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (err) {
    console.error("Weather function failed:", err.response?.data || err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
        details: err.response?.data || null
      })
    };
  }
}
