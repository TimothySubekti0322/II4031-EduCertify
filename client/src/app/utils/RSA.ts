import { decode as atob, encode as btoa } from "base-64";

const RSA = {
  encryptText: (message: string, e:string, n:string) => {
    let cypher = "";
    let messageAscii = "";
    const nLength = n.toString().length;
    let asciiBlock = 0n;

    for (let i = 0; i < message.length; i++) {
      messageAscii += message
        .charAt(i)
        .charCodeAt()
        .toString()
        .padStart(3, "0");
    }

    while (messageAscii !== "") {
      asciiBlock = BigInt(messageAscii.substr(0, 4).padEnd(4, "0"));
      messageAscii = messageAscii.slice(4);
      cypher += encrypt
        .exponent(asciiBlock, e, n)
        .toString()
        .padStart(nLength, "0");
    }
    return btoa(cypher);
  },

  encrypt64: (message: string, e: string, n: string) => {
    const messageText = atob(message);
    return encrypt.encryptText(messageText, e, n);
  },

  decryptText: (cypher: string, d: string, n: string) => {
    let cypherText = atob(cypher);
    let message = "";
    let decrypted = "";
    let nLength = n.toString().length;
    let messageTemp = 0;

    while (cypherText > 0n) {
      let cTemp = BigInt(cypherText.substr(0, nLength));
      cypherText = cypherText.slice(nLength);
      message += encrypt.exponent(cTemp, d, n).toString().padStart(4, "0");
    }

    while (message !== "") {
      messageTemp = Number(message.substr(0, 3));
      message = message.slice(3);
      decrypted += String.fromCharCode(messageTemp);
    }
    return decrypted;
  },

  decrypt64: (cypher: string, d: string, n: string) => {
    return btoa(decryptText(cypher, d, n));
  },

  exponent: (base: string, exponent: string, modulus: string) => {
    let numBase = BigInt(base);
    let numExponent = BigInt(exponent);
    const numModulus = BigInt(modulus);
    if (numModulus === 0n || numModulus === 1n) return 0n;

    let result = 1n;
    numBase = numBase % numModulus;

    // pangkatkan
    while (numExponent > 0n) {
      if (numExponent % 2n === 1n) {
        result = (result * numBase) % numModulus;
      }
      numExponent = numExponent / 2n;
      numBase = (numBase * numBase) % numModulus;
    }

    return result;
  },
};

export { RSA };