import fastify from "fastify";
import { vehicleRoutes } from "./routes/vehicleRoutes";


export const app = fastify();
app.register(vehicleRoutes, {
    prefix: '/vehicles'
});


