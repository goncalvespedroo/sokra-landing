import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

        const email = body.email.trim().toLowerCase();

        if (!EMAIL_PATTERN.test(email)) {
            return NextResponse.json(
                { message: "Digite um e-mail válido." },
                { status: 400 },
            );
        }

        const apiKey = process.env.BREVO_API_KEY;
        const listId = Number(process.env.BREVO_LIST_ID);

        if (!apiKey || !Number.isInteger(listId)) {
            console.error("Variáveis da Brevo não configuradas.");

            return NextResponse.json(
                { message: "Integração com a Brevo não configurada." },
                { status: 500 },
            );
        }

        const brevoResponse = await fetch(
            "https://api.brevo.com/v3/contacts",
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "api-key": apiKey,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    listIds: [listId],
                    updateEnabled: true,
                }),
            },
        );

        if (!brevoResponse.ok) {
            const errorBody = await brevoResponse.text();

            console.error(
                "Erro da Brevo:",
                brevoResponse.status,
                errorBody,
            );

            return NextResponse.json(
                { message: "A Brevo não aceitou a inscrição." },
                { status: 502 },
            );
        }

        return NextResponse.json(
            { message: "Inscrição realizada com sucesso." },
            { status: 201 },
        );
    } catch (error) {
        console.error("Erro na rota da waitlist:", error);

        return NextResponse.json(
            { message: "Ocorreu um erro inesperado." },
            { status: 500 },
        );
    }
}