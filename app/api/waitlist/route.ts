import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "A rota da waitlist está funcionando.",
    });
}

export async function POST(request: Request) {
    try {
        const body: unknown = await request.json();

        if (
            typeof body !== "object" ||
            body === null ||
            !("email" in body) ||
            typeof body.email !== "string"
        ) {
            return NextResponse.json(
                { message: "E-mail não informado." },
                { status: 400 },
            );
        }

        return NextResponse.json(
            {
                message: "Requisição recebida.",
                email: body.email,
            },
            { status: 200 },
        );
    } catch {
        return NextResponse.json(
            { message: "Corpo da requisição inválido." },
            { status: 400 },
        );
    }
}