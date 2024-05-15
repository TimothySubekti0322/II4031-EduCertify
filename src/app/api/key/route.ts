import prisma from "../prisma";
import type { Key } from "@prisma/client";

export const GET = async (request: Request) => {
  const keys = await prisma.key.findMany();
  if (keys.length === 0) {
    return new Response(
      JSON.stringify({ message: "data not found", data: [], status: 404 }),
      { status: 200 }
    );
  }
  return new Response(
    JSON.stringify({ message: "success", data: keys, status: 200 }),
    { status: 200 }
  );
};

export const POST = async (request: Request) => {
  try {
    const key: Key = await request.json();

    // validate request data
    if (!key) {
      return new Response(
        JSON.stringify({ message: "request data not found", status: 404 }),
        { status: 200 }
      );
    }

    // validate key data
    if (!key.key) {
      return new Response(
        JSON.stringify({ message: "key is required", status: 400 }),
        { status: 200 }
      );
    }

    // validate owner data
    if (!key.owner) {
      return new Response(
        JSON.stringify({ message: "owner is required", status: 400 }),
        { status: 200 }
      );
    }

    // Insert data to database
    await prisma.key.create({ data: key });

    return new Response(JSON.stringify({ message: "success", status: 200 }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error, status: 500 }), {
      status: 200,
    });
  }
};
