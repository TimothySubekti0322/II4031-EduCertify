import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../prisma";
import type { Transcript } from "@prisma/client";

const transcriptFields = [
  "nim",
  "nama",
  "kodeMk1",
  "namaMk1",
  "nilai1",
  "sks1",
  "kodeMk2",
  "namaMk2",
  "nilai2",
  "sks2",
  "kodeMk3",
  "namaMk3",
  "nilai3",
  "sks3",
  "kodeMk4",
  "namaMk4",
  "nilai4",
  "sks4",
  "kodeMk5",
  "namaMk5",
  "nilai5",
  "sks5",
  "kodeMk6",
  "namaMk6",
  "nilai6",
  "sks6",
  "kodeMk7",
  "namaMk7",
  "nilai7",
  "sks7",
  "kodeMk8",
  "namaMk8",
  "nilai8",
  "sks8",
  "kodeMk9",
  "namaMk9",
  "nilai9",
  "sks9",
  "kodeMk10",
  "namaMk10",
  "nilai10",
  "sks10",
  "totalSks",
  "ipk",
  "keyId",
  "publicKeyE",
  "publicKeyN",
  "signature",
  "encryptKey",
];

const getTranscriptsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const transcripts = await prisma.transcript.findMany();

    if (transcripts.length === 0) {
      return res.status(200).json({
        message: "data not found",
        data: [],
        status: 404,
      });
    }

    let result = [];
    for (const transcript of transcripts) {
      const owner = await prisma.key.findUnique({
        where: {
          id: transcript.keyId,
        },
      });

      result.push({ ...transcript, owner: owner?.owner });
    }
    return res
      .status(200)
      .json({ message: "success", data: result, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error, status: 500 });
  }
};

const postTranscriptHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const transcript: Transcript = req.body;

    // validate request
    if (!transcript) {
      return res
        .status(200)
        .json({ message: "request data not found", status: 404 });
    }

    // validate transcript data
    for (const field of transcriptFields) {
      if (!transcript.hasOwnProperty(field)) {
        return res
          .status(200)
          .json({ message: `${field} is required`, status: 400 });
      }
    }

    // Insert data to database
    await prisma.transcript.create({ data: transcript });

    return res.status(200).json({ message: "success", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error, status: 500 });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await getTranscriptsHandler(req, res);
  } else if (req.method === "POST") {
    await postTranscriptHandler(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
