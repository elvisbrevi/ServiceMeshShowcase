import axios from 'axios';
import { createClient } from 'redis';

const connectRedis = async (serverUrl) => {
    const client = createClient({
        url: serverUrl
      });
    
    client.on('error', err => console.log('Redis Client Error', err));
    
    await client.connect();
    return client;
}

const getCardfromApi = async (name) => {
    const options = {
        method: 'GET',
        url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${name}`,
        headers: {
            'X-RapidAPI-Key': '4c4a4eb3admsh9af072eb37a9c4ep1d4c25jsnf01980708630',
            'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const saveCardToRedis = async (cacheKey, cardInfo, redisClient) => {
    try {
        await redisClient.hSet(cacheKey, {
            name: cardInfo.name,
            artist: cardInfo.artist,
            img: cardInfo.img
        });

        await redisClient.expire(cacheKey, 10);
    } catch (err) {
        console.error(err);
    } 
}

const getCardfromRedis = async (cacheKey, redisClient) => {
    try {
        const cachedData = await redisClient.hGetAll(cacheKey);
        return cachedData;
    } catch (err) {
        console.error(err);
    } 
}

const printData = (data) => {
    console.log(JSON.stringify(data, null, 2));
}

let cardName = "animal companion";
let cacheKey = `card:${cardName}`;
let redisClient = await connectRedis('redis://127.0.0.1:10001');

let cardInfo = await getCardfromRedis(cacheKey, redisClient);

if (Object.keys(cardInfo).length > 0) {
    console.log("Card from Redis:");
    printData(cardInfo);
} else {
    console.log("Card from API:");
    cardInfo = await getCardfromApi(cardName);
    printData(cardInfo[0]);
    console.log("Save card to Redis!");
    saveCardToRedis(cacheKey, cardInfo[0], redisClient);
}

