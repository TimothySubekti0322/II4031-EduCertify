/*
  Warnings:

  - You are about to drop the column `keyId` on the `Transcript` table. All the data in the column will be lost.
  - Added the required column `publicKey` to the `Transcript` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transcript" DROP CONSTRAINT "Transcript_keyId_fkey";

-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "keyId",
ADD COLUMN     "publicKey" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_publicKey_fkey" FOREIGN KEY ("publicKey") REFERENCES "Key"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
