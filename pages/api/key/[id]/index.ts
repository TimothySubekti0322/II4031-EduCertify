import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(200).json({ message: "id is required", status: 400 });
  }

  if (req.method === "GET") {
    try {
      const key = await prisma.key.findUnique({
        where: { key: id },
      });

      if (!key) {
        return res.status(200).json({ message: "data not found", status: 404 });
      }

      return res
        .status(200)
        .json({ message: "success", data: key, status: 200 });
    } catch (error) {
      return res.status(500).json({ message: error, status: 500 });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
