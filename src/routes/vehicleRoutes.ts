import { FastifyInstance } from "fastify";
import { VehicleController } from "../controllers/vehicleController";
import { authMiddleware } from "../middleware/authMiddleware";

const vehicleController = new VehicleController();

export function vehicleRoutes(app: FastifyInstance) {
    app.addHook('onRequest', authMiddleware);
    app.post('/', vehicleController.criarVeiculo);
    app.get('/', vehicleController.buscarTodos);
    app.get('/:id', vehicleController.buscarPorId);
    app.put('/:id', vehicleController.atualizarVeiculo);
    app.delete('/:id', vehicleController.deletarVeiculo);

}