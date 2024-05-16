import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../prisma";
import type { Key } from "@prisma/client";

const getKeyHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const keys = await prisma.key.findMany();
  if (keys.length === 0) {
    return res
      .status(200)
      .json({ message: "data not found", data: [], status: 404 });
  }
  return res.status(200).json({ message: "success", data: keys, status: 200 });
};

const postKeyHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const key: Key = req.body;

    // validate request data
    if (!key) {
      return res
        .status(200)
        .json({ message: "request data not found", status: 404 });
    }

    // validate key data
    if (!key.key) {
      return res.status(200).json({ message: "key is required", status: 400 });
    }

    // validate owner data
    if (!key.owner) {
      return res
        .status(200)
        .json({ message: "owner is required", status: 400 });
    }

    // Insert data to database
    await prisma.key.create({ data: key });

    return res.status(200).json({ message: "success", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error, status: 500 });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await getKeyHandler(req, res);
  } else if (req.method === "POST") {
    await postKeyHandler(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
