const redis = require('redis');
const axios = require('axios');
const client = redis.createClient();

const API_URL = 'https://api.clima.com/weather'; // URL de la API de clima

client.on('error', (err) => console.log('Redis Client Error', err));

const getWeatherData = async (city) => {
    const cacheKey = `weather:${city}`;
    try {
        // Verifica si los datos están en Redis
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            console.log('Serving from Cache');
            return JSON.parse(cachedData);
        }

        // Si no, obtiene los datos de la API
        const response = await axios.get(`${API_URL}?city=${city}`);
        const weatherData = response.data;

        // Guarda los datos en Redis para futuras solicitudes
        await client.set(cacheKey, JSON.stringify(weatherData), {
            EX: 3600, // Tiempo de expiración en segundos (1 hora)
        });

        console.log('Serving from API');
        return weatherData;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

(async () => {
    await client.connect();
    try {
        const weather = await getWeatherData('Madrid');
        console.log(weather);
    } finally {
        client.quit();
    }
})();