import { z } from "zod";

function documentoValido(doc: string): boolean {
    return /^\d{11}$/.test(doc) || /^\d{14}$/.test(doc);
}

export const vehicleSchema = z.object({
    vin: z.string().min(1),
    placa: z.string().min(1),
    modelo: z.string().min(1),
    data_entrega: z.coerce.date(),
    data_fabricacao: z.coerce.date(),
    data_venda: z.coerce.date(),
    pais_operacao: z.string().min(1),
    consessionaria_venda: z.string().min(1),
    data_ultimo_reparo: z.coerce.date(),
    documento_proprietario: z.string().refine((doc) => documentoValido(doc), {
        message: 'Documento inválido'
    }),
})

export const parcialVehicleSchema = vehicleSchema.partial()
export type InputVehicleParcial = z.infer<typeof parcialVehicleSchema>;
