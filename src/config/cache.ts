import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

// Error handling for Redis
redis.on("error", (err) => {
    console.error("Redis error:", err);
});

export default redis;