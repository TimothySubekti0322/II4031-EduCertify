const initArrayS = (): number[] => {
  const array: number[] = new Array(256);
  for (let i = 0; i < 256; i++) {
    array[i] = i;
  }
  return array;
};

const permutationArrayS = (arrayS: number[], key: string) => {
  let j = 0;
  for (let i = 0; i < 256; i++) {
    j = (j + arrayS[i] + key.charCodeAt(i % key.length)) % 256;
    [arrayS[i], arrayS[j]] = [arrayS[j], arrayS[i]];
  }
};

const KSA = (key: string) => {
  const arrayS = initArrayS();
  permutationArrayS(arrayS, key);
  return arrayS;
};

const PRGAEncyrpt = (arrayS: number[], text: string, key: string) => {
  let i = 0;
  let j = 0;
  let result = "";
  for (let idx = 0; idx < text.length; idx++) {
    // console.log("===============ENCRYPT===================");
    // Find i and j
    i = (i + 1) % 256;

    // shift i using extended vigenere cipher
    i = (i + key.charCodeAt(idx % key.length)) % 256;

    j = (j + arrayS[i]) % 256;

    // shift j using extended vigenere cipher
    j = (j + key.charCodeAt(idx % key.length)) % 256;

    // Swap S[i] and S[j]
    [arrayS[i], arrayS[j]] = [arrayS[j], arrayS[i]];

    // Find t
    const t = (arrayS[i] + arrayS[j]) % 256;
    // console.log(`arrayS[${i}] = `, arrayS[i], ` | arrayS[${j}] = `, arrayS[j]);
    // console.log("t = ", t);

    // Find u (u is the value of S[t] which is used to encrypt the plain text character)
    const u = arrayS[t];
    // console.log("u = ", u);

    // Encrypt the plain text character
    const plainChar: number = text.charCodeAt(idx);

    // console.log("plainChar = ", plainChar);

    const c = plainChar ^ u;

    // console.log("c (plainChar ^ u ) = ", c);

    // Implement the extended vigenere cipher on the encrypted character
    // const extendedVigenereChar =
    //   (c + key[idx % key.length].charCodeAt(0)) % 256;

    // Append the encrypted character to the result
    // result += String.fromCharCode(extendedVigenereChar);
    result += String.fromCharCode(c);

    // Debugging
    // console.log(
    //   "u = ",
    //   u,
    //   " | c = ",
    //   c,
    //   " | key[idx % key.length].charCodeAt(0) = ",
    //   key[idx % key.length].charCodeAt(0),
    //   " | extendedVigenereChar = ",
    //   extendedVigenereChar
    // );
  }
  return result;
};

const PRGAFileEncrypt = (arrayS: number[], arr: Uint8Array, key: string) => {
  let i = 0;
  let j = 0;
  let result = new Uint8Array(arr.length);
  for (let idx = 0; idx < arr.length; idx++) {
    // Find i and j
    i = (i + 1) % 256;

    // shift i using extended vigenere cipher
    i = (i + key.charCodeAt(idx % key.length)) % 256;

    j = (j + arrayS[i]) % 256;

    // shift j using extended vigenere cipher
    j = (j + key.charCodeAt(idx % key.length)) % 256;

    // Swap S[i] and S[j]
    [arrayS[i], arrayS[j]] = [arrayS[j], arrayS[i]];

    // Find t
    const t = (arrayS[i] + arrayS[j]) % 256;

    // Find u (u is the value of S[t] which is used to encrypt the plain text character)
    const u = arrayS[t];

    // Encrypt the plain text character
    const c = arr[idx] ^ u;

    // Implement the extended vigenere cipher on the encrypted character
    // const extendedVigenereChar = (c + key.charCodeAt(idx % key.length)) % 256;

    // Append the encrypted character to the result
    // result[idx] = extendedVigenereChar;
    result[idx] = c;

    // Debugging
    // console.log(
    //   "u = ",
    //   u,
    //   " | c = ",
    //   c,
    //   " | key[idx % key.length].charCodeAt(0) = ",
    //   key[idx % key.length].charCodeAt(0),
    //   " | extendedVigenereChar = ",
    //   extendedVigenereChar
    // );
  }
  return result;
};

const PRGADecrypt = (arrayS: number[], text: string, key: string) => {
  let i = 0;
  let j = 0;
  let result = "";
  for (let idx = 0; idx < text.length; idx++) {
    // console.log("===============DECRYPT===================");
    // Find i and j
    i = (i + 1) % 256;
    i = (i + key.charCodeAt(idx % key.length)) % 256;
    j = (j + arrayS[i]) % 256;
    j = (j + key.charCodeAt(idx % key.length)) % 256;

    // Swap S[i] and S[j]
    [arrayS[i], arrayS[j]] = [arrayS[j], arrayS[i]];

    // Find t
    const t = (arrayS[i] + arrayS[j]) % 256;
    // console.log(`arrayS[${i}] = `, arrayS[i], ` | arrayS[${j}] = `, arrayS[j]);
    // console.log("t = ", t);

    // Find u (u is the value of S[t] which is used to encrypt the plain text character)
    const u = arrayS[t];
    // console.log("u = ", u);

    // Find the actual c , because in encrypt we implement vigenere cipher on c
    // const c =
    //   (text.charCodeAt(idx) - key[idx % key.length].charCodeAt(0) + 256) % 256;
    const c = text.charCodeAt(idx);

    // the actual c is XOR with the u to get the plain text character
    const plainChar = c ^ u;
    // console.log("c = ", c, " | plainChar = ", plainChar);

    // Debugging
    // console.log("u = ", u, " c = ", c, "plainChar = ", plainChar);

    // Append the decrypted character to the result
    result += String.fromCharCode(plainChar);
  }
  return result;
};

const PGRAFileDecrypt = (arrayS: number[], arr: Uint8Array, key: string) => {
  let i = 0;
  let j = 0;
  let result = new Uint8Array(arr.length);
  for (let idx = 0; idx < arr.length; idx++) {
    // Find i and j
    i = (i + 1) % 256;

    // shift i using extended vigenere cipher
    i = (i + key.charCodeAt(idx % key.length)) % 256;

    j = (j + arrayS[i]) % 256;

    // shift j using extended vigenere cipher
    j = (j + key.charCodeAt(idx % key.length)) % 256;

    // Swap S[i] and S[j]
    [arrayS[i], arrayS[j]] = [arrayS[j], arrayS[i]];

    // Find t
    const t = (arrayS[i] + arrayS[j]) % 256;

    // Find u (u is the value of S[t] which is used to encrypt the plain text character)
    const u = arrayS[t];

    // Find the actual c , because in encrypt we implement vigenere cipher on c
    // const c = (arr[idx] - key.charCodeAt(idx % key.length) + 256) % 256;
    const c = arr[idx];

    // the actual c is XOR with the u to get the plain text character
    const plainChar = c ^ u;

    // Debugging
    // console.log("u = ", u, " c = ", c, "plainChar = ", plainChar);

    // Append the decrypted character to the result
    result[idx] = plainChar;
  }
  return result;
};

const RC4 = {
  encrypt: (text: string, key: string) => {
    const KSAresult = KSA(key);
    const result = PRGAEncyrpt(KSAresult, text, key);
    // console.log("result = ", result);
    return result;
  },
  decrypt: (text: string, key: string) => {
    const KSAresult = KSA(key);
    const result = PRGADecrypt(KSAresult, text, key);
    // console.log("result = ", result);
    return result;
  },
  encryptFile: (arr: Uint8Array, key: string) => {
    const KSAresult = KSA(key);
    const result = PRGAFileEncrypt(KSAresult, arr, key);
    return result;
  },
  decryptFile: (arr: Uint8Array, key: string) => {
    const KSAresult = KSA(key);
    const result = PGRAFileDecrypt(KSAresult, arr, key);
    return result;
  },
};

export {RC4};