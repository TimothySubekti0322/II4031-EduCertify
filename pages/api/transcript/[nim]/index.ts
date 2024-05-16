import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nim } = req.query;

  if (typeof nim !== "string") {
    return res.status(200).json({ message: "nim is required", status: 400 });
  }

  if (req.method === "GET") {
    try {
      const transcript = await prisma.transcript.findUnique({
        where: { nim },
      });

      if (!transcript) {
        return res.status(200).json({ message: "data not found", status: 404 });
      }

      return res
        .status(200)
        .json({ message: "success", data: transcript, status: 200 });
    } catch (error) {
      return res.status(500).json({ message: error, status: 500 });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
