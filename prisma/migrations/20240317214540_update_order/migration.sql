/*
  Warnings:

  - You are about to drop the column `cpf` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idempotent_key]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payment_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idempotent_key` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_order_id_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "cpf",
DROP COLUMN "order_id",
ADD COLUMN     "idempotent_key" TEXT NOT NULL,
ADD COLUMN     "payment_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_idempotent_key_key" ON "Order"("idempotent_key");

-- CreateIndex
CREATE UNIQUE INDEX "Order_payment_id_key" ON "Order"("payment_id");
