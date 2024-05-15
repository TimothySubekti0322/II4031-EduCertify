import prisma from "../../prisma";
import type { Key } from "@prisma/client";

export const GET = async (
  request: Request,
  { params }: { params: { nim: string } }
) => {
  try {
    if (!params.nim) {
      return new Response(
        JSON.stringify({ message: "nim is required", status: 400 }),
        { status: 200 }
      );
    }

    const transcript = await prisma.transcript.findUnique({
      where: { nim: params.nim },
    });

    if (!transcript) {
      return new Response(
        JSON.stringify({ message: "data not found", status: 404 }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ message: "success", data: transcript, status: 200 }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error, status: 500 }), {
      status: 200,
    });
  }
};
