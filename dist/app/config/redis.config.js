import { env } from 'node:process';
import { createClient } from 'redis';
export const redisClient = createClient({
    username: env.REDIS_USERNAME || 'default',
    password: env.REDIS_PASSWORD || 'AHCErMrxyc9neb1AtPHngryh7FHx5uPp',
    socket: {
        host: env.REDIS_HOST || 'redis-13859.c89.us-east-1-3.ec2.cloud.redislabs.com',
        port: parseInt(env.REDIS_PORT) || 13859
    }
});
redisClient.on('error', err => console.log('Redis Client Error', err));
export const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log("Connected to Redis successfully");
    }
};
//# sourceMappingURL=redis.config.js.map