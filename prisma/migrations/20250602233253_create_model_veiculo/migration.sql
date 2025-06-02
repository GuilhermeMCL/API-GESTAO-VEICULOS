-- CreateTable
CREATE TABLE "Veiculo" (
    "id" SERIAL NOT NULL,
    "vin" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "data_entrega" TIMESTAMP(3) NOT NULL,
    "data_fabricacao" TIMESTAMP(3) NOT NULL,
    "data_venda" TIMESTAMP(3) NOT NULL,
    "pais_operacao" TEXT NOT NULL,
    "consessionaria_venda" TEXT NOT NULL,
    "data_ultimo_reparo" TIMESTAMP(3) NOT NULL,
    "documento_proprietario" TEXT NOT NULL,
    "ultima_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_vin_key" ON "Veiculo"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_placa_key" ON "Veiculo"("placa");
