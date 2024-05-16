/*
  Warnings:

  - You are about to drop the column `kodemk1` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `kodemk10` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `kodemk2` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `kodemk3` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `kodemk4` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `kodemk5` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `kodemk6` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `kodemk7` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `kodemk8` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `kodemk9` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `namamk1` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `namamk10` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `namamk2` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `namamk3` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `namamk4` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `namamk5` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `namamk6` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `namamk7` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `namamk8` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `namamk9` on the `Transcript` table. All the data in the column will be lost.
  - Added the required column `kodeMk1` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeMk10` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeMk2` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeMk3` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeMk4` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeMk5` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeMk6` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeMk7` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeMk8` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeMk9` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaMk1` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaMk10` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaMk2` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaMk3` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaMk4` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaMk5` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaMk6` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaMk7` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaMk8` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaMk9` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSks` to the `Transcript` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "kodemk1",
DROP COLUMN "kodemk10",
DROP COLUMN "kodemk2",
DROP COLUMN "kodemk3",
DROP COLUMN "kodemk4",
DROP COLUMN "kodemk5",
DROP COLUMN "kodemk6",
DROP COLUMN "kodemk7",
DROP COLUMN "kodemk8",
DROP COLUMN "kodemk9",
DROP COLUMN "namamk1",
DROP COLUMN "namamk10",
DROP COLUMN "namamk2",
DROP COLUMN "namamk3",
DROP COLUMN "namamk4",
DROP COLUMN "namamk5",
DROP COLUMN "namamk6",
DROP COLUMN "namamk7",
DROP COLUMN "namamk8",
DROP COLUMN "namamk9",
ADD COLUMN     "kodeMk1" TEXT NOT NULL,
ADD COLUMN     "kodeMk10" TEXT NOT NULL,
ADD COLUMN     "kodeMk2" TEXT NOT NULL,
ADD COLUMN     "kodeMk3" TEXT NOT NULL,
ADD COLUMN     "kodeMk4" TEXT NOT NULL,
ADD COLUMN     "kodeMk5" TEXT NOT NULL,
ADD COLUMN     "kodeMk6" TEXT NOT NULL,
ADD COLUMN     "kodeMk7" TEXT NOT NULL,
ADD COLUMN     "kodeMk8" TEXT NOT NULL,
ADD COLUMN     "kodeMk9" TEXT NOT NULL,
ADD COLUMN     "namaMk1" TEXT NOT NULL,
ADD COLUMN     "namaMk10" TEXT NOT NULL,
ADD COLUMN     "namaMk2" TEXT NOT NULL,
ADD COLUMN     "namaMk3" TEXT NOT NULL,
ADD COLUMN     "namaMk4" TEXT NOT NULL,
ADD COLUMN     "namaMk5" TEXT NOT NULL,
ADD COLUMN     "namaMk6" TEXT NOT NULL,
ADD COLUMN     "namaMk7" TEXT NOT NULL,
ADD COLUMN     "namaMk8" TEXT NOT NULL,
ADD COLUMN     "namaMk9" TEXT NOT NULL,
ADD COLUMN     "totalSks" INTEGER NOT NULL;
