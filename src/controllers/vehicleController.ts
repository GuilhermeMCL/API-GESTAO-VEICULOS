import { FastifyReply, FastifyRequest } from "fastify";
import { InputVehicleParcial, parcialVehicleSchema, vehicleSchema } from "../validations/vehicleSchema";
import { prisma } from "../lib/prisma";
import { error } from "console";

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
            return reply.status(201).send({
                message: 'Veículo criado com sucesso.',
                vehicle: await prisma.vehicle.create({
                    data: vehicleData
                })

            }
            )


        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({
                    message: error.message
                });
            }
            return reply.status(500).send({
                message: 'Erro interno do servidor.'
            });
        }
    }

    async buscarTodos(request: FastifyRequest, reply: FastifyReply) {
        const vehicles = await prisma.vehicle.findMany();
        return reply.status(200).send({
            message: 'Veículos encontrados com sucesso.',
            vehicles
        });
    }

    async buscarPorId(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply
    ) {
        try {
            const id = Number(request.params.id);
            const vehicle = await prisma.vehicle.findUnique({ where: { id } });
            if (!vehicle) {
                return reply.status(404).send({
                    message: 'Veículo não encontrado.'
                });
            }
            return reply.status(200).send({
                message: 'Veículo encontrado com sucesso.',
                vehicle
            })
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({
                    message: error.message
                });
            }
            return reply.status(500).send({
                message: 'Erro interno do servidor.'
            });
        }
    }
    async atualizarVeiculo(request: FastifyRequest<{ Params: { id: string }; Body: InputVehicleParcial }>, reply: FastifyReply) {

        try {
            const data = parcialVehicleSchema.parse(request.body);
            const id = Number(request.params.id);
            if (data.vin) {
                const vehicleExistente = await prisma.vehicle.findUnique({
                    where: {
                        vin: data.vin,
                        NOT: {
                            id
                        }
                    }
                });
                if (vehicleExistente) {
                    return reply.status(400).send({
                        message: 'Vin Ja registrado POR OUTRO VEICULO .'
                    });
                }
                if (data.data_fabricacao && data.data_entrega && data.data_fabricacao > data.data_entrega) {
                    return reply.status(400).send({
                        message: 'Data de fabricação não pode ser maior que a data de entrega.'
                    });
                }
                if (data.data_fabricacao && data.data_venda && data.data_fabricacao > data.data_venda) {
                    return reply.status(400).send({
                        message: 'Data de fabricação não pode ser maior que a data de venda.'
                    });
                }
                if (data.data_ultimo_reparo && data.data_fabricacao && data.data_ultimo_reparo < data.data_fabricacao) {
                    return reply.status(400).send({
                        message: 'Data do último reparo não pode ser menor que a data de fabricação.'
                    });
                }
                if (data.data_ultimo_reparo && data.data_fabricacao && data.data_ultimo_reparo < data.data_fabricacao) {
                    return reply.status(400).send({
                        message: 'Data do último reparo não pode ser menor que a data de fabricação.'
                    });
                }
                const vehicle = await prisma.vehicle.update({
                    where: { id },
                    data
                })
                return reply.status(200).send({
                    message: 'Veículo atualizado com sucesso.',
                    vehicle
                });

            }
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({
                    message: error.message
                });
            }
            return reply.status(500).send({
                message: 'Erro interno do servidor.'
            });
        }

    }
}