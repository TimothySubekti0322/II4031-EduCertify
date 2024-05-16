import type { NextApiRequest, NextApiResponse } from "next";
import { generatePdf } from "../../../utils/pdfGenerator";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    return res.status(200).json({ message: "Hello World" });
  } else if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const  data  = req.body;

  console.log("data : ", data);

  if (!data) {
    return res.status(400).json({ error: "data is required" });
  }

  try {
    const pdfBuffer = await generatePdf(data);
    console.log(pdfBuffer);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=generated.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: "Error generating PDF" });
  }
};

export default handler;
