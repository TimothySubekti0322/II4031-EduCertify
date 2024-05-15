-- CreateTable
CREATE TABLE "Key" (
    "key" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Transcript" (
    "nim" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kodemk1" TEXT NOT NULL,
    "namamk1" TEXT NOT NULL,
    "nilai1" TEXT NOT NULL,
    "sks1" INTEGER NOT NULL,
    "kodemk2" TEXT NOT NULL,
    "namamk2" TEXT NOT NULL,
    "nilai2" TEXT NOT NULL,
    "sks2" INTEGER NOT NULL,
    "kodemk3" TEXT NOT NULL,
    "namamk3" TEXT NOT NULL,
    "nilai3" TEXT NOT NULL,
    "sks3" INTEGER NOT NULL,
    "kodemk4" TEXT NOT NULL,
    "namamk4" TEXT NOT NULL,
    "nilai4" TEXT NOT NULL,
    "sks4" INTEGER NOT NULL,
    "kodemk5" TEXT NOT NULL,
    "namamk5" TEXT NOT NULL,
    "nilai5" TEXT NOT NULL,
    "sks5" INTEGER NOT NULL,
    "kodemk6" TEXT NOT NULL,
    "namamk6" TEXT NOT NULL,
    "nilai6" TEXT NOT NULL,
    "sks6" INTEGER NOT NULL,
    "kodemk7" TEXT NOT NULL,
    "namamk7" TEXT NOT NULL,
    "nilai7" TEXT NOT NULL,
    "sks7" INTEGER NOT NULL,
    "kodemk8" TEXT NOT NULL,
    "namamk8" TEXT NOT NULL,
    "nilai8" TEXT NOT NULL,
    "sks8" INTEGER NOT NULL,
    "kodemk9" TEXT NOT NULL,
    "namamk9" TEXT NOT NULL,
    "nilai9" TEXT NOT NULL,
    "sks9" INTEGER NOT NULL,
    "kodemk10" TEXT NOT NULL,
    "namamk10" TEXT NOT NULL,
    "nilai10" TEXT NOT NULL,
    "sks10" INTEGER NOT NULL,
    "ipk" DOUBLE PRECISION NOT NULL,
    "signature" TEXT NOT NULL,
    "keyId" TEXT NOT NULL,
    "encryptKey" TEXT NOT NULL,

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("nim")
);

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_keyId_fkey" FOREIGN KEY ("keyId") REFERENCES "Key"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
