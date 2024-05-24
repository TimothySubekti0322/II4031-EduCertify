-- CreateTable
CREATE TABLE "Key" (
    "id" SERIAL NOT NULL,
    "publicKeyE" INTEGER NOT NULL,
    "publicKeyN" INTEGER NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transcript" (
    "nim" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kodeMk1" TEXT NOT NULL,
    "namaMk1" TEXT NOT NULL,
    "nilai1" TEXT NOT NULL,
    "sks1" TEXT NOT NULL,
    "kodeMk2" TEXT NOT NULL,
    "namaMk2" TEXT NOT NULL,
    "nilai2" TEXT NOT NULL,
    "sks2" TEXT NOT NULL,
    "kodeMk3" TEXT NOT NULL,
    "namaMk3" TEXT NOT NULL,
    "nilai3" TEXT NOT NULL,
    "sks3" TEXT NOT NULL,
    "kodeMk4" TEXT NOT NULL,
    "namaMk4" TEXT NOT NULL,
    "nilai4" TEXT NOT NULL,
    "sks4" TEXT NOT NULL,
    "kodeMk5" TEXT NOT NULL,
    "namaMk5" TEXT NOT NULL,
    "nilai5" TEXT NOT NULL,
    "sks5" TEXT NOT NULL,
    "kodeMk6" TEXT NOT NULL,
    "namaMk6" TEXT NOT NULL,
    "nilai6" TEXT NOT NULL,
    "sks6" TEXT NOT NULL,
    "kodeMk7" TEXT NOT NULL,
    "namaMk7" TEXT NOT NULL,
    "nilai7" TEXT NOT NULL,
    "sks7" TEXT NOT NULL,
    "kodeMk8" TEXT NOT NULL,
    "namaMk8" TEXT NOT NULL,
    "nilai8" TEXT NOT NULL,
    "sks8" TEXT NOT NULL,
    "kodeMk9" TEXT NOT NULL,
    "namaMk9" TEXT NOT NULL,
    "nilai9" TEXT NOT NULL,
    "sks9" TEXT NOT NULL,
    "kodeMk10" TEXT NOT NULL,
    "namaMk10" TEXT NOT NULL,
    "nilai10" TEXT NOT NULL,
    "sks10" TEXT NOT NULL,
    "totalSks" TEXT NOT NULL,
    "ipk" TEXT NOT NULL,
    "keyId" INTEGER NOT NULL,
    "publicKeyE" TEXT NOT NULL,
    "publicKeyN" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "encryptKey" TEXT NOT NULL,

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("nim")
);

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_keyId_fkey" FOREIGN KEY ("keyId") REFERENCES "Key"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
