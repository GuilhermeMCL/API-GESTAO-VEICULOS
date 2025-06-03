import { FastifyReply, FastifyRequest } from "fastify";


export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
    const token = req.headers.authorization;
    const expected = `Bearer ${process.env.API_TOKEN}`;

    if (token !== expected) {
        return reply.status(401).send({ error: 'Unauthorized' });
    }
}