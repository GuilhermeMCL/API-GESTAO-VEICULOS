import { FastifyInstance } from "fastify";
import { VehicleController } from "../controllers/vehicleController";

const vehicleController = new VehicleController();

export function vehicleRoutes(app: FastifyInstance) {
    app.post('/criar', vehicleController.criarVeiculo);
}