import { createClient, type RedisClientType } from "redis";
import { REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } from "@/config";

let redisClient: RedisClientType;

const connectRedis = async () => {
    if (!redisClient) {
        redisClient = createClient({
            password: REDIS_PASSWORD,
            socket: {
                host: REDIS_HOST,
                port: REDIS_PORT
            }
        });

        redisClient.on("connect", () => {
            console.log(`Redis is connected successfully`);
        });

        redisClient.on("error", (err) => {
            console.error(`Failed to connect to Redis:`, err.message);
        });

        await redisClient.connect();
    }
};

export { redisClient, connectRedis };
