import { createClient } from 'redis';

// conexion
const client = createClient({
    url: 'redis://127.0.0.1:10001'
  });

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

// operaciones
try {
    const res39 = await client.lPush('new_bikes', 'bike:2', 'bike:3');
    // redis.exceptions.ResponseError:
    // [ErrorReply: WRONGTYPE Operation against a key holding the wrong kind of value]
    console.log("ok");
  }
  catch(e){
    console.log(e);
  }