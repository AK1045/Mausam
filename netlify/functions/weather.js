export async function handler(event) {
  const { city } = event.queryStringParameters || 'gauribidanur';

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'City query parameter is required.' })
    };
  }

  const API_KEY = "619734e245c6796d8230f0fa4de45bea";
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(city)}&units=m`;

  try {
    const response = await import('axios').then(({ default: axios }) => axios.get(url));
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (err) {
   console.log('Failed to fetch the data ',err.message);
  }
}
