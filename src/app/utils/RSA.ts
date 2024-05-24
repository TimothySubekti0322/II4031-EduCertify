import { encode as btoa, decode as atob } from 'js-base64';

const RSA = {
  encryptText: (message: string, e: string, n: string): string => {
    let cypher = "";
    let messageAscii = "";
    const nLength = n.length;
    let asciiBlock;
    console.log("m", n);
    
    for (let i = 0; i < message.length; i++) {
      messageAscii += message.charAt(i).charCodeAt(0).toString().padStart(3, "0");
    }

    while (messageAscii !== "") {
      asciiBlock = BigInt(messageAscii.substr(0, 4).padEnd(4, "0"));
      messageAscii = messageAscii.slice(4);
      cypher += RSA.exponent(asciiBlock, e, n).toString().padStart(nLength, "0");
    }
    return btoa(cypher);
  },

  encrypt64: (message: string, e: string, n: string): string => {
    const messageText = atob(message);
    return RSA.encryptText(messageText, e, n);
  },

  decryptText: (cypher: string, d: string, n: string): string => {
    let cypherText = atob(cypher);
    let message = "";
    let decrypted = "";
    const nLength = n.length;
    let messageTemp = 0;

    while (cypherText.length > 0) {
      const cTemp = BigInt(cypherText.substr(0, nLength));
      cypherText = cypherText.slice(nLength);
      message += RSA.exponent(cTemp, d, n).toString().padStart(4, "0");
    }

    while (message !== "") {
      messageTemp = Number(message.substr(0, 3));
      message = message.slice(3);
      decrypted += String.fromCharCode(messageTemp);
    }
    return decrypted;
  },

  decrypt64: (cypher: string, d: string, n: string): string => {
    return btoa(RSA.decryptText(cypher, d, n));
  },

  exponent: (base: string | bigint, exponent: string, modulus: string): bigint => {
    let numBase = typeof base === 'bigint' ? base : BigInt(base);
    console.log(modulus);
    let numExponent = BigInt(exponent);
    const numModulus = BigInt(modulus);
    console.log(numModulus);
    if (numModulus === BigInt(1) || numModulus === BigInt(1)) return BigInt(0);

    let result = BigInt(1);
    numBase = numBase % numModulus;

    while (numExponent > BigInt(0)) {
      if (numExponent % BigInt(2) === BigInt(1)) {
        result = (result * numBase) % numModulus;
      }
      numExponent = numExponent / BigInt(2);
      numBase = (numBase * numBase) % numModulus;
    }

    return result;
  },
};

export { RSA };
