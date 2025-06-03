import { FastifyReply, FastifyRequest } from "fastify";
import { vehicleSchema } from "../validations/vehicleSchema";
import { prisma } from "../lib/prisma";

export class VehicleController {
    async criarVeiculo(request: FastifyRequest, reply: FastifyReply) {
        try {
            const vehicleData = vehicleSchema.parse(request.body);

            const vehicleExistente = await prisma.vehicle.findUnique({
                where: {
                    vin: vehicleData.vin
                }
            })
            if (vehicleExistente) {
                return reply.status(400).send({
                    message: 'Vin Ja registrado.'
                });
            }
            if (vehicleData.data_fabricacao > vehicleData.data_entrega || vehicleData.data_fabricacao > vehicleData.data_venda) {
                return reply.status(400).send({
                    message: 'Data de fabricação não pode ser maior que a data de entrega ou venda.'
                });
            }
            if (vehicleData.data_ultimo_reparo < vehicleData.data_fabricacao) {
                return reply.status(400).send({
                    message: 'Data do último reparo não pode ser menor que a data de fabricação.'
                });
            }




        } catch (error) {

        }
    }
}