import type { Transcript } from "@prisma/client";
import toast from "react-hot-toast";
import crypto from "crypto";
import { initialFactor, algorithm } from "../static/AES";

type Data = String | ArrayBuffer | null;

interface DownloadTranscriptProps {
  data: Transcript;
  setLoading: (loading: boolean) => void;
}

const downloadTranscript = async ({
  data,
  setLoading,
}: DownloadTranscriptProps) => {
  setLoading(true);
  try {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const blob = await response.blob();

      // Transform blob into Base64
      let base64data: Data = null;
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        base64data = reader.result;
        console.log("base64data", base64data?.toString());

        // Encryption AES here
        const key = "abcdefghijklmnopqrstuvwxyz123456";

        const cipher = crypto.createCipheriv(algorithm, key, initialFactor);

        if (typeof base64data == "string") {
          const removedPrefix = base64data.split(",")[1];

          let encrypted = cipher.update(removedPrefix, "base64", "base64");
          encrypted += cipher.final("base64");
          const newBase64string = `data:application/pdf;base64,${encrypted}`;

          // Test Decrypt
          // const decipher = crypto.createDecipheriv(algorithm, key, iv);

          // const base64Encrypted = fromUrlSafeBase64(encryptedString);
          // let decrypted = decipher.update(base64Encrypted, "base64", "base64");
          // decrypted += decipher.final("base64");
          // console.log("decrypted = ", decrypted);

          const blobl = base64ToBlob(newBase64string);
          const url = URL.createObjectURL(blobl);
          const a = document.createElement("a");
          a.href = url;
          a.download = "encrypted_transcript.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      };
    } else {
      toast.error("Failed to generate PDF ❌");
    }
  } catch (error) {
    console.error("Failed to generate PDF", error);
    toast.error("Failed to generate PDF ❌");
  } finally {
    setLoading(false);
  }
};

export const base64ToBlob = (base64: string): Blob => {
  console.log("base64 in base64ToBlob = ", base64);
  const byteCharacters = atob(base64.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "application/pdf" });
};

export default downloadTranscript;
