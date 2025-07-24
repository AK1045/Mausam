export async function handler(event) {
    console.log("Weather function triggered:", event.queryStringParameters);
  const { city } = event.queryStringParameters || 'gauribidanur';

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'City query parameter is required.' })
    };
  }
  console.log("Function triggered, city:", city);

  const API_KEY = "54812335ad7b5888f2363d0cabdb3d83";
  const url = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(city)}&units=m`;

  try {
    const response = await import('axios').then(({ default: axios }) => axios.get(url));
    console.log("Requesting URL:", url);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: { 'Content-Type': 'application/json' }
    };
 } catch (err) {
  console.error("Weather function failed:", err.response?.data || err.message);
  return {
    statusCode: 500,
    body: JSON.stringify({ error: "Unable to fetch weather data at the moment. Please try again later." })
  };
}

}
