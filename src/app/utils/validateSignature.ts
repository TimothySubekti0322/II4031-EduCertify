// utils/validation.ts
import { RSA } from './RSA';
import { keccak256 } from 'js-sha3';
import { Transcript2 } from '../transcript/record';

// const transcript = {
//     nim: "202121072",
//     nama: "Prikitiw",
//     kodeMk1: "MA1101",
//     namaMk1: "Matematika IA",
//     nilai1: "A",
//     sks1: "4",
//     kodeMk2: "FI1101",
//     namaMk2: "Fisika Dasar IA",
//     nilai2: "B",
//     sks2: "4",
//     kodeMk3: "KU1001",
//     namaMk3: "Olah Raga",
//     nilai3: "C",
//     sks3: "2",
//     kodeMk4: "KU1102",
//     namaMk4: "Pengenalan Komputasi",
//     nilai4: "D",
//     sks4: "3",
//     kodeMk5: "KU1011",
//     namaMk5: "Tata Tulis Karya Ilmiah",
//     nilai5: "A",
//     sks5: "2",
//     kodeMk6: "KU1024",
//     namaMk6: "Bahasa Inggris",
//     nilai6: "A",
//     sks6: "2",
//     kodeMk7: "MA1201",
//     namaMk7: "Matematika IIA",
//     nilai7: "B",
//     sks7: "4",
//     kodeMk8: "FI1201",
//     namaMk8: "Fisika Dasar IIA",
//     nilai8: "C",
//     sks8: "4",
//     kodeMk9: "IF1210",
//     namaMk9: "Dasar Pemrograman",
//     nilai9: "T",
//     sks9: "2",
//     kodeMk10: "KU1202",
//     namaMk10: "Pengantar Rekayasa dan Desain",
//     nilai10: "A",
//     sks10: "3",
//     totalSks: "30",
//     ipk: "2.77",
//     keyId: 4,
//     publicKeyE: "65537",
//     publicKeyN: "17802871687",
//     signature: "MTMxNTkwODkwODYxMjY5MDU0NzQ5MDY2NDk1NDU3MjIxMDQ5NTI1Njg2MzI5MTYxNzUzMzc3OTA4NDQyMzQxNzUwMzkzMDc0MTQ1MTc1NDY2ODIxMDI1NDkwNDMzNjQzNzczMzI3MzEzMjMzMTM0OTQwMTQ0NzIyNjE2MTUxMzk2MzgzOTU0MzA1MzYxMTgzMjE3Mjc2ODAzMTYxMDQ5NTI1Njg2MzAxMzQxMDQ2MTIyNTk3NTI0NzMzNzM4MzMwNTQ2MTQ1MTc1NDY2ODI4ODY5ODgyMTAzMTMxNTkwODkwODY0NzgxMzMxMzY4NTg5MTUxMDY4NjU0NTAzNTk4OTIxNzc0Nzc1Njk0MDI1NzA4NzU5MzcxMDQ5NTI1Njg2MTQ4NDIxNTEyNDYxNDc0ODM2Mzc3ODY1NjYzNDg1MTAxNTg2ODAxMzAxOTk2MzU5NDk4OTE0MjQ3MDgyNjM1MTM0ODE2NjkyMTcxMzIxODEzODAzNjMzMzMyMjQwNzMwNTM2MTE4MzI1NzQzOTUxMTY0MTQyOTUyNjU2NDEzMjkxNjE3NTMzNzc5MDg0NDIzNDM3NDE2NTg4NjgxNjYxNjY4NTAyNzc3OTA4NDQyMzQxNDI5NTI2NTY0MTE1ODY4MDEzMDE5MTA1NjUzNDg3OTI=",
//     encryptKey: "encryptKey123"
// };

export const handleValidate = (transcript: Transcript2) => {
    const {
        nim, nama, kodeMk1, namaMk1, nilai1, sks1,
        kodeMk2, namaMk2, nilai2, sks2,
        kodeMk3, namaMk3, nilai3, sks3,
        kodeMk4, namaMk4, nilai4, sks4,
        kodeMk5, namaMk5, nilai5, sks5,
        kodeMk6, namaMk6, nilai6, sks6,
        kodeMk7, namaMk7, nilai7, sks7,
        kodeMk8, namaMk8, nilai8, sks8,
        kodeMk9, namaMk9, nilai9, sks9,
        kodeMk10, namaMk10, nilai10, sks10,
        totalSks, ipk, keyId, publicKeyE, publicKeyN, signature
    } = transcript;
    

    const transcriptForHashing = {
        nim, nama, kodeMk1, namaMk1, nilai1, sks1,
        kodeMk2, namaMk2, nilai2, sks2,
        kodeMk3, namaMk3, nilai3, sks3,
        kodeMk4, namaMk4, nilai4, sks4,
        kodeMk5, namaMk5, nilai5, sks5,
        kodeMk6, namaMk6, nilai6, sks6,
        kodeMk7, namaMk7, nilai7, sks7,
        kodeMk8, namaMk8, nilai8, sks8,
        kodeMk9, namaMk9, nilai9, sks9,
        kodeMk10, namaMk10, nilai10, sks10,
        totalSks, ipk, keyId, publicKeyE, publicKeyN,
    };

    // Convert the transcriptForHashing object to a JSON string
    const dataString = JSON.stringify(transcriptForHashing);
    console.log(dataString);
    // Hash the data
    const messageDigest = keccak256(dataString);
    console.log("messageDigest", messageDigest);

    // Decrypt the signature with the public key
    const signatureDigest = RSA.decryptText(signature, publicKeyE, publicKeyN);
    console.log("signatureDigest", signatureDigest);

    // Compare the message digest with the decrypted signature digest
    if (signatureDigest === messageDigest) {
        console.log('valid');
    } else {
        console.log('invalid');
    }
};