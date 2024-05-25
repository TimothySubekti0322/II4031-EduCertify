// utils/validation.ts
import { RSA } from './RSA';
import { keccak256 } from 'js-sha3';
import { Transcript2 } from '../transcript/record';

export const handleValidate = (plainTranscript: Transcript2) => {
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
    } = plainTranscript;
    

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
    const signatureDigest = signature
    // const signatureDigest = RSA.decryptText(signature, publicKeyE, publicKeyN);
    console.log("signatureDigest", signatureDigest);

    // Compare the message digest with the decrypted signature digest
    if (signatureDigest === messageDigest) {
        plainTranscript.validated = 'valid';
        console.log('valid');
    } else {
        plainTranscript.validated = 'invalid';
        console.log('invalid');
    }
    console.log("original", plainTranscript.validated);
    return plainTranscript;
};