import prisma from "../../prisma";
import type { Key } from "@prisma/client";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    if (!params.id) {
      return new Response(
        JSON.stringify({ message: "id is required", status: 400 }),
        { status: 200 }
      );
    }

    const key = await prisma.key.findUnique({
      where: { key: params.id },
    });

    if (!key) {
      return new Response(
        JSON.stringify({ message: "data not found", status: 404 }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ message: "success", data: key, status: 200 }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error, status: 500 }), {
      status: 200,
    });
  }
};
