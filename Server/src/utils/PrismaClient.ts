// CACHEING ISCHANGED
import { Prisma, PrismaClient } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import RedisServer from "redis-server"
import Redis from "ioredis";

const redisServer = new RedisServer({ port: 6379 })
export const prisma = new PrismaClient();
export const redis: Redis = new Redis();
redisServer.open((err) => {
    if (err === null) {
        const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
            models: [
                { model: "authors" },
                { model: "book" },
                { model: "book_authors" },
                { model: "book_loans" },
                { model: "book_loans" },
                { model: "borrower" },
                { model: "fines" },
            ],
            //@ts-ignore
            storage: { type: "redis", options: { client: redis, invalidation: { referencesTTL: 30 } } },
            cacheTime: 30,
            onHit: (key) => {
                console.log("[server] Using cache for API call");
            },
            onMiss: (key) => {
                console.log("[server] Retrieving from Database");
            },
            onError: (key) => {
                console.log("[server] Cache Middleware error");
            },
        });

        cacheMiddleware

        prisma.$use(cacheMiddleware);
    }
});
