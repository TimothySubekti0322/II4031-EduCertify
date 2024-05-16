import type { Transcript } from "@prisma/client";
import toast from "react-hot-toast";

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

      // Encryption AES here

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transcript.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
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

export default downloadTranscript;
