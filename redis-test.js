import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

const res1 = await client.lPush('bikes:repairs', 'bike:1');
console.log(res1);