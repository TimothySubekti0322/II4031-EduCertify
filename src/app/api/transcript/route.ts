import prisma from "../prisma";
import type { Transcript } from "@prisma/client";

export const GET = async (request: Request) => {
  const transcripts = await prisma.transcript.findMany();
  if (transcripts.length === 0) {
    return new Response(
      JSON.stringify({
        message: "data not found",
        data: [],
        status: 404,
      }),
      { status: 200 }
    );
  }
  return new Response(
    JSON.stringify({ message: "success", data: transcripts, status: 200 }),
    { status: 200 }
  );
};

const transcriptField = [
  "nim",
  "nama",
  "kodemk1",
  "namamk1",
  "nilai1",
  "sks1",
  "kodemk2",
  "namamk2",
  "nilai2",
  "sks2",
  "kodemk3",
  "namamk3",
  "nilai3",
  "sks3",
  "kodemk4",
  "namamk4",
  "nilai4",
  "sks4",
  "kodemk5",
  "namamk5",
  "nilai5",
  "sks5",
  "kodemk6",
  "namamk6",
  "nilai6",
  "sks6",
  "kodemk7",
  "namamk7",
  "nilai7",
  "sks7",
  "kodemk8",
  "namamk8",
  "nilai8",
  "sks8",
  "kodemk9",
  "namamk9",
  "nilai9",
  "sks9",
  "kodemk10",
  "namamk10",
  "nilai10",
  "sks10",
  "ipk",
  "signature",
  "publicKey",
  "encryptKey",
];

export const POST = async (request: Request) => {
  try {
    const transcript: Transcript = await request.json();

    // validate request
    if (!transcript) {
      return new Response(
        JSON.stringify({ message: "request data not found", status: 404 }),
        { status: 200 }
      );
    }

    // validate transcript data
    for (const field of transcriptField) {
      if (!transcript.hasOwnProperty(field)) {
        return new Response(
          JSON.stringify({ message: `${field} is required`, status: 400 }),
          { status: 200 }
        );
      }
    }

    // Insert data to database
    await prisma.transcript.create({ data: transcript });

    return new Response(JSON.stringify({ message: "success", status: 200 }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error, status: 500 }), {
      status: 500,
    });
  }
};
