import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../env";

export function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const token = request.headers.authorization;

    if (!token || token !== env.BEARER_TOKEN) {
        return reply.status(401).send({
            message: 'Unauthorized'
        });
    }
}