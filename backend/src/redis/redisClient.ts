// Example: backend/src/redisClient.ts
import IORedis from 'ioredis';

const redisClient = new IORedis({
  host: 'redis', // Matches Docker service name
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  // Add other options like password if needed
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));

export default redisClient;
