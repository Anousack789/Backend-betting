import { createClient } from 'redis';
const client = createClient();

client.on('error', (err) => {
  console.log('Error ' + err);
});

client.on('connect', () => {
  console.log('Redis client connected');
});
(async () => {
  console.log('Connecting to Redis...');
  try {
    await client.connect();
  } catch (err) {
    console.log('Error connecting to Redis', err);
  }
})();

export default client;
