import crypto from "crypto";
import { base64ToBlob } from "./downloadTranscript";
import { initialFactor, algorithm } from "../static/AES";

export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const byteArray = new Uint8Array(buffer);
  console.log("byteArray = ", byteArray);
  let binary = "";
  const len = byteArray.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(byteArray[i]);
  }

  return window.btoa(binary);
};

function hashStringTo32Bytes(inputString: string) {
  // Create a hash object using the SHA-256 algorithm
  const hash = crypto.createHash('sha256');

  // Update the hash object with the input string
  hash.update(inputString);

  // Generate the hash digest and return it as a hexadecimal string
  const hashDigest = hash.digest('hex');

  // Ensure the hash digest is exactly 32 bytes by truncating or padding
  const truncatedHashDigest = hashDigest.slice(0, 32); 

  return truncatedHashDigest;
}

export const handleAnyFileRead = async (
  e: ProgressEvent<FileReader>,
  key: string
) => {
  console.log(e.target);
  const content = arrayBufferToBase64(e.target?.result as ArrayBuffer);
  // setFileBaseString(content as ArrayBuffer);
  if (typeof content === "string") {
    console.log("content = ", content);

    // const key = "abcdefghijklmnopqrstuvwxyz123456";
    const hashKey = hashStringTo32Bytes(key)

    const decipher = crypto.createDecipheriv(algorithm, hashKey, initialFactor);

    const base64Encrypted = content;
    let decrypted = decipher.update(base64Encrypted, "base64", "base64");
    decrypted += decipher.final("base64");
    const newBase64string = `data:application/pdf;base64,${decrypted}`;
    console.log("decrypted = ", decrypted);

    const blobl = base64ToBlob(newBase64string);
    const url = URL.createObjectURL(blobl);
    const a = document.createElement("a");
    a.href = url;
    a.download = "decrypted_transcript.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};

export const handleAnyFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  key: string
) => {
  e.preventDefault();
  if (e.target.files) {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = (event) => handleAnyFileRead(event, key);
    reader.readAsArrayBuffer(e.target.files[0]);
  }
};
