const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

app.get('/card/:name', async (req, res) => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${req.params.name}`,
            headers: {
                'X-RapidAPI-Key': '4c4a4eb3admsh9af072eb37a9c4ep1d4c25jsnf01980708630',
                'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener datos de la API Hearthstone");
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Hearthstone Service running on port ${PORT}`));